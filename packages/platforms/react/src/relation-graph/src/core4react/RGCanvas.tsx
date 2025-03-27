import React, { useContext, useEffect, useRef } from 'react';
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type {
  RGLineSlotProps,
  RGNodeSlotProps,
  RelationGraphInstance
} from '../../../../../../relation-graph-models/types';
import type { MutableRefObject} from 'react';
import RGSingleGraph from './RGGraph';
import {RGNodeExpandHolderProps} from "../../../types-react";
import RGEasyView from "./RGEasyView";

export interface RGCanvasProps {
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  lineSlot?: React.FC<RGLineSlotProps> | React.ReactNode
  svgDefs?: React.FC | React.ReactNode
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  canvasPlugAboveSlot?: React.ReactNode | React.ReactNode
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | React.ReactNode
}
const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  // const updateView = useContext(RGUpdateContext);
  const seeksRGCanvas$ = useRef() as MutableRefObject<HTMLDivElement>;
  const rgMap$ = useRef() as MutableRefObject<HTMLDivElement>;
  // console.log('================== RGCanvas:', relationGraph.graphData.nodes.map(n=>n.text).join(','))
  const createCurrrentStyles = () => {
    return {
      width: `${relationGraph.options.canvasSize.width}px`,
      height: `${relationGraph.options.canvasSize.height}px`,
      marginLeft: `${relationGraph.options.canvasOffset.x}px`,
      marginTop: `${relationGraph.options.canvasOffset.y}px`,
      backgroundColor: 'transparent',
      transform: `scale(${relationGraph.options.canvasZoom! / 100},${
        relationGraph.options.canvasZoom! / 100
      })`,
      // 'transform-origin': (this.options.canvasOffset.zoom_buff_x * 100).toFixed(2) + '% ' + (this.options.canvasOffset.zoom_buff_y * 100).toFixed(2) + '%'
    };
  };
  const canvasSizeAndPosition = createCurrrentStyles();

  useEffect(() => {
    // console.log('[debug][RelationGraph-canvas] ready!');
    devLog('[RGCanvas mounted]');
    relationGraph.setCanvasDom(seeksRGCanvas$.current!);
    rgMap$.current && rgMap$.current.addEventListener('wheel', mouseListener);
    return () => {
      rgMap$.current && rgMap$.current.removeEventListener('wheel', mouseListener);
    };
  }, []);

  const mouseListener = (e:WheelEvent) => {
    relationGraph.onMouseWheel(e);
  };
  const onDragStart = (e:  React.MouseEvent|React.TouchEvent) => {
    if (e.type === "mousedown" && e.button !== 0) {
      return;
    }
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
        backgroundImage: relationGraph.options.backgroundImage && `url(${relationGraph.options.backgroundImage})`,
        backgroundColor: relationGraph.options.backgroundColor,
      }}
      ref={rgMap$}
      className={[
        'rel-map',
        (relationGraph.options.canvasOpacity === 1 ? 'rel-map-ready':undefined),
        relationGraph.options.layoutClassName,
        relationGraph.options.backgroundImageNoRepeat
          ? 'rel-map-background-norepeat'
          : '',
      ].join(' ')}
      onContextMenu={($event) => {contextmenu($event);}}
      onMouseDown={($event)=>{onDragStart($event);}}
      onTouchStart={($event)=>{onDragStart($event);}}
    >
      <RGEasyView />
      <div
        ref={seeksRGCanvas$}
        style={canvasSizeAndPosition}
        className="rel-map-canvas"
      >
        <div className="rel-canvas-slot rel-canvas-slot-behind">
          {canvasProps.canvasPlugSlot && (typeof canvasProps.canvasPlugSlot === 'function' ? <canvasProps.canvasPlugSlot relationGraph={relationGraph} /> : canvasProps.canvasPlugSlot)}
        </div>
        <RGSingleGraph svgDefs={canvasProps.svgDefs} nodeSlot={canvasProps.nodeSlot} lineSlot={canvasProps.lineSlot} expandHolderSlot={canvasProps.expandHolderSlot} />
        <div className="rel-canvas-slot rel-canvas-slot-above">
          {canvasProps.canvasPlugAboveSlot}
        </div>
      </div>
    </div>
  );
};

export default RGCanvas;
