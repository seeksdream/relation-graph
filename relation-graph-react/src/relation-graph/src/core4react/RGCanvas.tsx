import React, { useContext, useEffect, useRef } from 'react';
import { devLog } from '../../../../../relation-graph-vue2/src/utils/RGCommon';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type {
  RGLineSlotProps,
  RGNodeSlotProps,
  RelationGraphInstance
} from '../../../../../relation-graph-vue2/src/types';
import type { MutableRefObject} from 'react';
import RGSingleGraph from './RGGraph';
import {RGNodeExpandHolderProps} from "../../../types-react";
export interface RGCanvasProps {
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}>
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps>
}
const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
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
    };
  };
  const canvasSizeAndPosition = createCurrrentStyles();
  useEffect(() => {
    console.log('[debug][RelationGraph-canvas] ready!');
    devLog('[RGCanvas mounted]');
    relationGraph.setCanvasDom(seeksRGCanvas$.current!);
    seeksRGCanvas$.current?.parentElement?.addEventListener('wheel', mouseListener, { passive: false, capture: true });
    return () => {
      seeksRGCanvas$.current?.parentElement?.removeEventListener('wheel', mouseListener);
    };
  }, []);
  const mouseListener = (e:WheelEvent) => {
    relationGraph.onMouseWheel(e);
    updateView();
  };
  const onDragStart = (e:  React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onCanvasDragStart(e);
  };
  const contextmenu = (e:  React.MouseEvent|React.TouchEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onContextmenu(e);
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${relationGraph.options.backgroundImage})`,
        backgroundColor: relationGraph.options.backgroundColor,
      }}
      className={[
        'rel-map',
        relationGraph.options.layoutClassName,
        relationGraph.options.backgroundImageNoRepeat
          ? 'rel-map-background-norepeat'
          : '',
      ].join(' ')}
      onContextMenuCapture={($event) => {contextmenu($event);}}
      onMouseDownCapture={($event)=>{onDragStart($event);}}
      onTouchStartCapture={($event)=>{onDragStart($event);}}
    >
      <div
        ref={seeksRGCanvas$}
        style={canvasSizeAndPosition}
        className="rel-map-canvas"
      >
        {canvasProps.canvasPlugSlot && <canvasProps.canvasPlugSlot relationGraph={relationGraph} />}
        <RGSingleGraph nodeSlot={canvasProps.nodeSlot} lineSlot={canvasProps.lineSlot} expandHolderSlot={canvasProps.expandHolderSlot} />
      </div>
    </div>
  );
};

export default RGCanvas;
