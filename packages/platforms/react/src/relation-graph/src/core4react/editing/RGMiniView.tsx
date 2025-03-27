import React, { useEffect, useRef } from 'react';
import { useContext } from 'react';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';
import {RGMiniViewProps} from "../../../../../../../relation-graph-models/types";

const RGMiniView:React.FC<RGMiniViewProps> = ({ position = 'br', width, height }) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const options = graphInstance && graphInstance.options;
  const $rgMiniView = useRef<HTMLDivElement>(null);
  const $rgMiniViewCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    options.showMiniView = true;
    $rgMiniView.current!.style.setProperty('--mv-width', width || '150px');
    $rgMiniView.current!.style.setProperty('--mv-height', height || '150px');
    graphInstance.setMiniViewCanvas($rgMiniViewCanvas.current!);

    return () => {
      options.showMiniView = false;
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    graphInstance.onVisiableViewHandleDragStart(e.nativeEvent);
  };

  const onClickCanvas = async(e: React.MouseEvent) => {
    graphInstance.resetByVisiableView(e.nativeEvent);
  };

  return (
    <div
      className={`rel-miniview rel-miniview-${position}`}
      ref={$rgMiniView}
    >
      <canvas
        ref={$rgMiniViewCanvas}
        className={
          options.miniViewVisibleHandle.emptyContent
            ? 'rel-mv-canvas-reset'
            : ''
        }
        onClick={onClickCanvas}
      />
      <div
        className="rel-mv-visible-area"
        onMouseDown={onMouseDown}
        style={{
          left: options.miniViewVisibleHandle.x + 'px',
          top: options.miniViewVisibleHandle.y + 'px',
          width: options.miniViewVisibleHandle.width + 'px',
          height: options.miniViewVisibleHandle.height + 'px',
        }}
      ></div>
    </div>
  );
};

export default RGMiniView;
