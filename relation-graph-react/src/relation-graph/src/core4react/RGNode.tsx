import React, { useContext, useEffect, useRef } from 'react';
import RGEffectUtils from '../utils/RGEffectUtils'
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { MutableRefObject} from 'react';
import type { RGNode, RGNodeSlotProps } from '../RelationGraph';

export interface RGNodeProps {
  nodeProps: RGNode
  NodeSlot?: React.FC<RGNodeSlotProps>
}
const RGNodeFC: React.FC<RGNodeProps> = ({nodeProps, NodeSlot}) => {
  const seeksRGNode$ = useRef() as MutableRefObject<HTMLDivElement>;
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  useEffect(() => {
    refreshNodeProperties()
    return () => {
      // seeksRGNode$.current!.remove()
    }
  }, [])
  const refreshNodeProperties = () => {
    if (
      nodeProps.el.offsetWidth !== seeksRGNode$.current!.offsetWidth ||
      nodeProps.el.offsetHeight !== seeksRGNode$.current!.offsetHeight
    ) {
      // console.log('relationGraph:', relationGraph)
      relationGraph.updateNodeOffsetSize(
        nodeProps,
        seeksRGNode$.current!.offsetWidth,
        seeksRGNode$.current!.offsetHeight
      )
      updateView();
    }
  }
  const expandOrCollapseNode = (e: React.MouseEvent | React.TouchEvent) => {
    // @ts-ignore
    relationGraph.expandOrCollapseNode(nodeProps, e)
  }
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (relationGraph.options.disableDragNode || nodeProps.disableDrag) {
      return
    }
    // @ts-ignore
    RGEffectUtils.startDrag(e, nodeProps, onNodeDraged, (offsetX, offsetY, basePosition) => {
        const x =
          offsetX / (relationGraph.options.canvasZoom / 100) + basePosition.x
        const y =
          offsetY / (relationGraph.options.canvasZoom / 100) + basePosition.y
        relationGraph.setNodePosition(nodeProps, x, y)
      updateView();
      }
    )
  }
  const onNodeDraged = (x_buff: number, y_buff: number, e: MouseEvent | TouchEvent) => {
    if (x_buff === 0 && y_buff === 0) {
      relationGraph.onNodeClick(nodeProps, e)
      return
    }
    if (relationGraph.options.isMoveByParentNode) {
      nodeProps.lot.childs.forEach((thisCnode) => {
        thisCnode.x += x_buff
        thisCnode.y += y_buff
      })
    }
    if (Math.abs(x_buff) + Math.abs(y_buff) > 6) {
      // setTimeout(() => {
      //   // devLog('delay end dragging', dragging.value)
      //   // dragging.value = false
      // }, 100)
    } else {
      // dragging.value = false
    }
    updateView();
  }
  const onclick = (e: React.MouseEvent | React.TouchEvent) => {
    // if (dragging.value) {
    //   return
    // }
    // @ts-ignore
    relationGraph.onNodeClick(nodeProps, e)
    updateView();
  }
  const isAllowShowNode = (thisNode:RGNode):boolean => {
    const _r =
      thisNode.isShow !== false &&
      thisNode.isHide !== true &&
      (!thisNode.lot.parent || isAllowShowNode(thisNode.lot.parent) === true)
    return _r
  }
  const expandButtonClass = nodeProps.expanded === false ? 'c-expanded' : 'c-collapsed'
  const isShow = isAllowShowNode(nodeProps)
  const showExpandedButton = (nodeProps.expandHolderPosition &&
      nodeProps.expandHolderPosition !== 'hide') ||
    (relationGraph.options.defaultExpandHolderPosition &&
      relationGraph.options.defaultExpandHolderPosition !== 'hide' &&
      nodeProps.lot.childs &&
      nodeProps.lot.childs.length > 0);
  const hideNodeContent = !(
    relationGraph.options.hideNodeContentByZoom === true &&
    relationGraph.options.canvasZoom < 40
  )
  return <div
    ref={seeksRGNode$}
    style={{
      display: isShow ? '':'hidden',
      left: `${nodeProps.x  }px`,
      top: `${nodeProps.y  }px`,
      opacity: nodeProps.opacity ? (nodeProps.opacity > 1 ? nodeProps.opacity / 100 : nodeProps.opacity):1
    }}
    className="rel-node-peel"
  >
    {showExpandedButton &&
    <div
      className={`c-btn-open-close c-expand-positon-${(nodeProps.expandHolderPosition || relationGraph.options.defaultExpandHolderPosition)}`}>
      <span
        className={expandButtonClass}
        style={{
          backgroundColor: nodeProps.color || relationGraph.options.defaultNodeColor
        }}
        onClickCapture={(e) => {
          expandOrCollapseNode(e);
        }}
      />
    </div>
    }
    {nodeProps.html?
      <div
        onClick={(e)=>{onclick(e)}}
        onMouseDownCapture={(e)=>{onDragStart(e)}}
        onTouchStartCapture={(e)=>{onDragStart(e)}}
        dangerouslySetInnerHTML={{__html:nodeProps.html!}}
      />
      :
      <div
        className={[
          'rel-node',
          `rel-node-shape-${  nodeProps.nodeShape === undefined ? relationGraph.options.defaultNodeShape : nodeProps.nodeShape}`,
          `rel-node-type-${  nodeProps.type}`,
          (nodeProps.id === relationGraph.options.checkedNodeId ? 'rel-node-checked' : ''),
          nodeProps.selected ? 'rel-node-selected' : '',
          nodeProps.styleClass,
          nodeProps.innerHTML ? 'rel-diy-node' : '',
        ].join(' ')}
        style={{
          backgroundColor: nodeProps.color === undefined ? relationGraph.options.defaultNodeColor : nodeProps.color,
          color: nodeProps.fontColor === undefined ? relationGraph.options.defaultNodeFontColor : nodeProps.fontColor,
          border: `${nodeProps.borderColor || relationGraph.options.defaultNodeBorderColor  } solid ${nodeProps.borderWidth || relationGraph.options.defaultNodeBorderWidth }px`,
          width: `${nodeProps.width || relationGraph.options.defaultNodeWidth  }px`,
          height: `${nodeProps.height || relationGraph.options.defaultNodeHeight  }px`
        }}
        onClick={(e)=>{onclick(e)}}
        onMouseDownCapture={(e)=>{onDragStart(e)}}
        onTouchStartCapture={(e)=>{onDragStart(e)}}
      >
        {
          hideNodeContent &&
          <>
          {
            NodeSlot ? <NodeSlot node={nodeProps} relationGraph={relationGraph} /> :
              <>
                {!nodeProps.innerHTML ? <div
                    style={{ color: nodeProps.fontColor || relationGraph.options.defaultNodeFontColor }}
                    className="c-node-text"
                  >
                    <span dangerouslySetInnerHTML={{ __html: nodeProps.text! }} />
                  </div>
                  :
                  <div dangerouslySetInnerHTML={{__html: nodeProps.innerHTML!}} />}
              </>
          }
          </>
        }
      </div>
    }
  </div>;
};

export default RGNodeFC;
