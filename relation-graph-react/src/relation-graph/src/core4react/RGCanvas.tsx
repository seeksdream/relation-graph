import React, { useContext, useEffect, useRef } from 'react';
import RGEffectUtils from '../utils/RGEffectUtils'
import { devLog, isSupportTouch } from '../utils/RGCommon'
import SeeksRGNode from './RGNode';
import SeeksRGLink from './RGLink'
import SeeksRGLinePath from './RGLinePath'
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineSlotProps, RGNodeSlotProps, RelationGraphInstance } from '../RelationGraph';
import type { MutableRefObject} from 'react';
export interface RGCanvasProps {
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}>
}
const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const rgCanvas$ = useRef() as MutableRefObject<HTMLDivElement>;
  const seeksRGCanvas$ = useRef() as MutableRefObject<HTMLDivElement>;
  // console.log('================== RGCanvas:', relationGraph.graphData.nodes.map(n=>n.text).join(','))
  const createCurrrentStyles = () => {
    return {
      width: `${relationGraph.options.canvasSize.width}px`,
      height: `${relationGraph.options.canvasSize.height}px`,
      marginLeft: `${relationGraph.options.canvasOffset.x}px`,
      marginTop: `${relationGraph.options.canvasOffset.y}px`,
      backgroundColor: 'transparent',
      transform: `scale(${relationGraph.options.canvasZoom / 100},${
        relationGraph.options.canvasZoom / 100
      })`,
      // 'transform-origin': (this.options.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.options.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
    }
  }
  const canvasSizeAndPosition = createCurrrentStyles();
  useEffect(() => {
    devLog('[RGCanvas mounted]')
    init()
    relationGraph.setCanvasDom(seeksRGCanvas$.current!)
    seeksRGCanvas$.current!.parentElement!.addEventListener('wheel', mouseListener, { passive: false, capture: true })
    return () => {
      seeksRGCanvas$.current!.parentElement!.removeEventListener('wheel', mouseListener)
    }
  }, [])
  const init = () => {
    rgCanvas$.current!.style.setProperty(
      '--stroke',
      `url('#${relationGraph.options.instanceId}-lineStyle')`
    )
    rgCanvas$.current!.style.setProperty(
      '--markerEnd',
      `url('#${relationGraph.options.instanceId}-start-arrow-default')`
    )
    rgCanvas$.current!.style.setProperty(
      '--markerStart',
      `url('#${relationGraph.options.instanceId}-arrow-default')`
    )
    rgCanvas$.current!.style.setProperty(
      '--markerEndChecked',
      `url('#${relationGraph.options.instanceId}-arrow-checked')`
    )
    rgCanvas$.current!.style.setProperty(
      '--markerStartChecked',
      `url('#${relationGraph.options.instanceId}-start-arrow-checked')`
    )
  }
  const mouseListener = (e:WheelEvent) => {
    if (relationGraph.options.disableZoom) {
      // e.cancelable = false
      return true
    }
    try {
      // e.cancelable = true
      // e.stopPropagation()
      e.preventDefault()
    } catch {
      // xxx
    }
    const userZoomCenter = {
      x: e.clientX,
      y: e.clientY,
    }
    let _deltaY = e.deltaY
    if (_deltaY === undefined) {
      // @ts-ignore
      _deltaY = e.wheelDelta
    }
    // #25 https://github.com/seeksdream/relation-graph/issues/25
    // const _isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    // const _zoomDirection = _isMac ? 1 : -1;
    const _zoomDirection = -1
    // const _zoomDirection = 1;
    if (_deltaY > 0) {
      relationGraph.zoom(5 * _zoomDirection, userZoomCenter)
    } else {
      relationGraph.zoom(-5 * _zoomDirection, userZoomCenter)
    }
    // rgUpdater(relationGraph);
    updateView();
  }
  const onDragEnd = () => {
    // console.log('xxxxxxxxx onDragEnd');
    // do something
    // rgUpdater(relationGraph);
    updateView();
  }
  const onDragStart = (e:  React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // console.log('xxxxxxxxx onDragStart', isSupportTouch);
    if (relationGraph.options.disableDragCanvas) {
      return
    }
    let draggingCallback
    let doDefault = false
    if (isSupportTouch) {
      let baseEventPosition2: { x: number; y: number } | null = null
      let baseZoom = 100
      // @ts-ignore
      draggingCallback = (x: number, y: number, basePosition: { x: number; y: number }, baseEventPosition: { x: number; y: number }, e: MouseEvent | TouchEvent) => {
        // @ts-ignore
        const touches = e.touches || e.targetTouches
        const touchPointer1 = touches[0]
        if (touches && touches.length > 1) {
          // 双指操作
          e.preventDefault()
          const touchPointer2 = touches[1]
          if (!baseEventPosition2) {
            baseEventPosition2 = {
              x: touchPointer2.clientX,
              y: touchPointer2.clientY,
            }
            baseZoom = relationGraph.options.canvasZoom
          }
          const touchPointer1Postion = {
            x: touchPointer1.clientX,
            y: touchPointer1.clientY,
          }
          const touchPointer2Postion = {
            x: touchPointer2.clientX,
            y: touchPointer2.clientY,
          }
          const baseDistance = Math.hypot(
            baseEventPosition2.x - baseEventPosition.x,
            baseEventPosition2.y - baseEventPosition.y
          )
          const currentDistance = Math.hypot(
            touchPointer2Postion.x - touchPointer1Postion.x,
            touchPointer2Postion.y - touchPointer1Postion.y
          )
          const zoom = currentDistance / baseDistance
          const newZoom = baseZoom * zoom
          relationGraph.setZoom(newZoom)
        } else {
          const ex = touchPointer1.clientX
          const ey = touchPointer1.clientY
          const x = basePosition.x + (ex - baseEventPosition.x)
          const y = basePosition.y + (ey - baseEventPosition.y)
          relationGraph.setCanvasOffset(x, y)
        }
        // rgUpdater(relationGraph);
        updateView();
      }
    } else {
      doDefault = true
      draggingCallback = () => {
        // relationGraph.options.canvasOffset.x = startPosition.x + ex
        // relationGraph.options.canvasOffset.y = startPosition.x + ey
        // rgUpdater(relationGraph);
        updateView();
      }
    }
    // @ts-ignore
    RGEffectUtils.startDrag(e,relationGraph.options.canvasOffset,onDragEnd,draggingCallback,doDefault)
  }
  // const updateView = () => {
  //   console.log('--------------canvas:updateView:');
  //   // const newStyles = createCurrrentStyles();
  //   // Object.keys(newStyles).forEach(key=>{
  //   //   // @ts-ignore
  //   //   seeksRGCanvas$.current.style[key] = newStyles[key];
  //   // })
  //   rgUpdater(relationGraph);
  // }
  const nodes = relationGraph.graphData.nodes;
  const links = relationGraph.graphData.links;
  return (
    <div
      style={
        {width: '100%',
          height: '100%',
          backgroundImage: `url(${  relationGraph.options.backgrounImage  })`}
      }
      className={[
        'rel-map',
        relationGraph.options.layoutClassName,
        relationGraph.options.backgrounImageNoRepeat
          ? 'rel-map-background-norepeat'
          : '',
      ].join(' ')}
      onMouseDownCapture={($event)=>{onDragStart($event)}}
      onTouchStartCapture={($event)=>{onDragStart($event)}}
    >
      <div
        ref={seeksRGCanvas$}
        style={canvasSizeAndPosition}
        className="rel-map-canvas"
      >
        {canvasProps.canvasPlugSlot && <canvasProps.canvasPlugSlot relationGraph={relationGraph} />}
        <div ref={rgCanvas$} className="rel-linediv" style={{ overflow: 'visible' }}>
          <svg
            style={
              {width: `${relationGraph.options.canvasSize.width  }px`,
                height: `${relationGraph.options.canvasSize.height  }px`,
                overflow:'visible'}
            }
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id={`${relationGraph.options.instanceId  }-lineStyle`}
                x1="1"
                y1="0"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#e52c5c" />
                <stop offset="100%" stopColor="#FD8B37" />
              </linearGradient>
              <marker
                id={`${relationGraph.options.instanceId  }-arrow-default`}
                markerWidth={relationGraph.options.defaultLineMarker!.markerWidth}
                markerHeight={relationGraph.options.defaultLineMarker!.markerHeight}
                refX={relationGraph.options.defaultLineMarker!.refX}
                refY={relationGraph.options.defaultLineMarker!.refY}
                markerUnits="strokeWidth"
                orient="auto"
                viewBox="0 0 12 12"
              >
                <path
                  style={{ fill: relationGraph.options.defaultLineColor }}
                  d={relationGraph.options.defaultLineMarker!.data}
                />
              </marker>
              <marker
                id={`${relationGraph.options.instanceId  }-start-arrow-default`}
                markerWidth={relationGraph.options.defaultLineMarker!.markerWidth}
                markerHeight={relationGraph.options.defaultLineMarker!.markerHeight}
                refX={relationGraph.options.defaultLineMarker!.refX}
                refY={relationGraph.options.defaultLineMarker!.refY}
                markerUnits="strokeWidth"
                orient="auto"
                viewBox="0 0 12 12"
              >
                <path
                  style={{ fill: relationGraph.options.defaultLineColor }}
                  d={relationGraph.options.defaultLineMarker!.data}
                  transform="translate(12,12)rotate(180)"
                />
              </marker>
              <marker
                id={`${relationGraph.options.instanceId  }-arrow-checked`}
                markerUnits="strokeWidth"
                markerWidth="12"
                markerHeight="12"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                orient="auto"
              >
                <path
                  style={{ fill: relationGraph.options.checkedLineColor }}
                  d="M2,2 L10,6 L2,10 L6,6 L2,2"
                />
              </marker>
              <marker
                id={`${relationGraph.options.instanceId  }-start-arrow-checked`}
                markerUnits="strokeWidth"
                markerWidth="12"
                markerHeight="12"
                viewBox="0 0 12 12"
                refX="6"
                refY="6"
                orient="auto"
              >
                <path
                  style={{ fill: relationGraph.options.checkedLineColor }}
                  d="M2,2 L10,6 L2,10 L6,6 L2,2"
                  transform="translate(12,12)rotate(180)"
                />
              </marker>
              {relationGraph.allLineColors.map(thisColor=>
                <marker
                  id={`${relationGraph.options.instanceId  }-arrow-${  thisColor.id}`}
                  key={thisColor.id}
                  markerWidth={relationGraph.options.defaultLineMarker!.markerWidth}
                  markerHeight={relationGraph.options.defaultLineMarker!.markerHeight}
                  refX={relationGraph.options.defaultLineMarker!.refX}
                  refY={relationGraph.options.defaultLineMarker!.refY}
                  markerUnits="strokeWidth"
                  orient="auto"
                >
                  <path
                    fill={relationGraph.options.defaultLineMarker!.color ||
                      thisColor.color}
                    d={relationGraph.options.defaultLineMarker!.data}
                  />
                </marker>)}
              {relationGraph.allLineColors.map(thisColor=>
                <marker
                  id={`${relationGraph.options.instanceId
                  }-start-arrow-${
                    thisColor.id}`}
                  key={`start-${  thisColor.id}`}
                  markerWidth={relationGraph.options.defaultLineMarker!.markerWidth}
                  markerHeight={relationGraph.options.defaultLineMarker!.markerHeight}
                  refX={relationGraph.options.defaultLineMarker!.refX}
                  refY={relationGraph.options.defaultLineMarker!.refY}
                  markerUnits="strokeWidth"
                  orient="auto"
                >
                  <path
                    fill={relationGraph.options.defaultLineMarker!.color ||
                      thisColor.color}
                    d={relationGraph.options.defaultLineMarker!.data}
                    transform="translate(12,12)rotate(180)"
                  />
                </marker>
              )}
              {relationGraph.graphData.links.map(thisLink=>
                <React.Fragment key={thisLink.seeks_id}>
                  {thisLink.relations.filter(thisRelation => (relationGraph.options.lineUseTextPath || thisRelation.useTextPath)).map((thisRelation, ri) =>
                    <SeeksRGLinePath
                      key = { thisRelation.seeks_id }
                      link = { thisLink }
                      relation = { thisRelation }
                      relationIndex = { ri }
                    />
                  )}
                </React.Fragment>
              )}
            </defs>
            {
              links.map(thisLink=>
                <SeeksRGLink
                  key={thisLink.seeks_id}
                  linkProps={thisLink}
                  LineSlot={canvasProps.lineSlot}
                />
              )
            }
          </svg>
        </div>
        <div className="rel-nodediv rel-nodediv-for-webkit">
          {
            nodes.map(thisNode=>
              <SeeksRGNode
                key={thisNode.seeks_id}
                nodeProps={thisNode}
                NodeSlot={canvasProps.nodeSlot}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default RGCanvas;
