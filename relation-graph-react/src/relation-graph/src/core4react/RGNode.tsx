import React, { useCallback, useContext } from 'react';
import RGNodesAnalytic from '../../../../../relation-graph-vue2/src/utils/RGNodesAnalytic';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import RGNodeExpandHolder from './RGNodeExpandHolder';
import {RGNodeProps} from '../../../types-react';

const SeeksRGNode: React.FC<RGNodeProps> = ({nodeProps, NodeSlot, ExpandHolderSlot}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  // const seeksRGNodeRef = useRef() as MutableRefObject<HTMLDivElement>;
  // useEffect(() => {
  //   refreshNodeProperties();
  // });
  const seeksRGNodeRef = useCallback((seeksRGNodeEl:HTMLDivElement) => {
    if (seeksRGNodeEl!==null) {
      refreshNodeProperties(seeksRGNodeEl);
    }
  }, []);



  const refreshNodeProperties = (seeksRGNodeEl:HTMLDivElement) => {
    if (
      seeksRGNodeEl.offsetWidth === 0 &&
      seeksRGNodeEl.offsetHeight === 0
    ) {
      return;
    }

    const elWidth = seeksRGNodeEl.offsetWidth;
    const elHeight = seeksRGNodeEl.offsetHeight;

    if (
      nodeProps.el.offsetWidth !== elWidth ||
      nodeProps.el.offsetHeight !== elHeight
    ) {
      relationGraph.updateNodeOffsetSize(nodeProps, elWidth, elHeight);
      updateView();
    }
  };

  const expandOrCollapseNode = async (e: React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await relationGraph.expandOrCollapseNode(nodeProps, e);
  };

  const onDragStart = (e :React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onNodeDragStart(nodeProps, e);
  };

  const onNodeClick = (e :React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onNodeClick(nodeProps, e);
  };


  const options = relationGraph.options;
  const width = nodeProps.width || options.defaultNodeWidth;
  const height = nodeProps.height || options.defaultNodeHeight;
  const borderStyle = `${nodeProps.borderColor || options.defaultNodeBorderColor} solid ${nodeProps.borderWidth === undefined ? options.defaultNodeBorderWidth : nodeProps.borderWidth}px`;
  const hideNodeContent = !(
    options.hideNodeContentByZoom === true &&
    options.canvasZoom < 40
  );
  const opacity = nodeProps.opacity === undefined ? 1 : (nodeProps.opacity > 1 ? nodeProps.opacity / 100 : nodeProps.opacity);
  const showNode = RGNodesAnalytic.isAllowShowNode(nodeProps);
  const showExpandHolder = (nodeProps.expandHolderPosition && nodeProps.expandHolderPosition !== 'hide') ||
    (options.defaultExpandHolderPosition &&
      options.defaultExpandHolderPosition !== 'hide' &&
      nodeProps.lot.childs &&
      nodeProps.lot.childs.length > 0);
  const expandButtonClass = nodeProps.expanded === false ? 'c-expanded' : 'c-collapsed';
  return (
    <div
      ref={seeksRGNodeRef}
      style={{
        display: showNode ? undefined : 'none',
        left: nodeProps.x + 'px',
        top: nodeProps.y + 'px',
        opacity: opacity
      }}
      className={`rel-node-peel ${nodeProps.selected ? 'rel-node-selected' : ''}`}
      data-id={nodeProps.id}
    >
      { showExpandHolder &&
        (
          ExpandHolderSlot ?
            <ExpandHolderSlot
              nodeProps={nodeProps}
              expandButtonClass={expandButtonClass}
              expandOrCollapseNode={($event: React.MouseEvent|React.TouchEvent) => {expandOrCollapseNode($event);}}
              expandHolderPosition={nodeProps.expandHolderPosition||options.defaultExpandHolderPosition}
              color={options.defaultExpandHolderColor||nodeProps.color||options.defaultNodeColor}
            />
            :
            <RGNodeExpandHolder
              nodeProps={nodeProps}
              expandButtonClass={expandButtonClass}
              expandOrCollapseNode={($event: React.MouseEvent|React.TouchEvent) => {expandOrCollapseNode($event);}}
              expandHolderPosition={nodeProps.expandHolderPosition||options.defaultExpandHolderPosition}
              color={options.defaultExpandHolderColor||nodeProps.color||options.defaultNodeColor}
            />
        )
      }
      {nodeProps.html ? (
        <div
          onClickCapture={(e)=>{onNodeClick(e);}}
          onMouseDownCapture={(e)=>{onDragStart(e);}}
          onTouchStartCapture={(e)=>{onDragStart(e);}}
          dangerouslySetInnerHTML={{__html:nodeProps.html!}}
        ></div>
      ) : (
        <div
          className={`rel-node-shape-${nodeProps.nodeShape === undefined ? options.defaultNodeShape : nodeProps.nodeShape} rel-node-type-${nodeProps.type} ${
            nodeProps.id === options.checkedNodeId ? 'rel-node-checked' : ''
          } ${nodeProps.flashing ? 'rel-node-flashing' : ''} ${nodeProps.styleClass} ${nodeProps.innerHTML ? 'rel-diy-node' : ''}`}
          style={{
            backgroundColor: nodeProps.color === undefined ? options.defaultNodeColor : nodeProps.color,
            color: nodeProps.fontColor === undefined ? options.defaultNodeFontColor : nodeProps.fontColor,
            border: borderStyle,
            width: width && `${width}px`,
            height: height && `${height}px`
          }}
          onClickCapture={(e)=>{onNodeClick(e);}}
          onMouseDownCapture={(e)=>{onDragStart(e);}}
          onTouchStartCapture={(e)=>{onDragStart(e);}}
        >
          {
            hideNodeContent &&
              <>
                {
                  NodeSlot ? <NodeSlot node={nodeProps} relationGraph={relationGraph} /> :
                    <>
                      {!nodeProps.innerHTML ? <div
                        style={{ color: nodeProps.fontColor || options.defaultNodeFontColor }}
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
      )}
    </div>
  );
};

export default SeeksRGNode;
