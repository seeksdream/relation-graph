import React, { useContext, useEffect } from 'react';
import {RGToolBarProps} from '../../../../types';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore'; // You need to create this context similar to Vue's inject

const GraphXsToolBar: React.FC<RGToolBarProps> = ({ direction = 'h', positionH = 'left', positionV = 'bottom' }) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const options = relationGraph && relationGraph.options;

  const toggleAutoLayout = () => {
    relationGraph?.toggleAutoLayout();
  };

  const zoomToFit = async () => {
    if (relationGraph) {
      await relationGraph.setZoom(100);
      await relationGraph.moveToCenter();
      await relationGraph.zoomToFit();
    }
  };

  const doZoom = async (value: number) => {
    await relationGraph?.zoom(value);
  };

  const fullscreen = async () => {
    await relationGraph?.fullscreen();
  };

  useEffect(() => {
    // Equivalent to onMounted in Vue
    // console.log('Component mounted');
  }, []);

  return (
    <div className={`rel-toolbar rel-xs-toolbar rel-toolbar-h-${positionH} rel-toolbar-v-${positionV} rel-toolbar-${direction}`}>
      {options?.allowShowFullscreenMenu && (
        <div title="Full Screen" className="c-mb-button" style={{ marginTop: 0 }} onClick={fullscreen}>
          <svg className="rg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M298.666667 597.333333H213.333333v213.333334h213.333334v-85.333334H298.666667v-128z m-85.333334-170.666666h85.333334V298.666667h128V213.333333H213.333333v213.333334z m512 298.666666h-128v85.333334h213.333334v-213.333334h-85.333334v128zM597.333333 213.333333v85.333334h128v128h85.333334V213.333333h-213.333334z"></path></svg>
        </div>
      )}
      {options?.allowShowZoomMenu && (
        <>
          <div className="c-mb-button" onClick={() => doZoom(20)}>
            <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-fangda"></use></svg>
          </div>
          <div className="c-current-zoom" onClick={zoomToFit}>{`${options.canvasZoom}%`}</div>
          <div className="c-mb-button" style={{ marginTop: 0 }} onClick={() => doZoom(-20)}>
            <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-suoxiao"></use></svg>
          </div>
        </>
      )}
      {options?.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton && (
        <div
          title={options.autoLayouting ? 'Stop Force Layout' : 'Start Force Layout'}
          className={`c-mb-button ${options.autoLayouting ? 'c-mb-button-on' : ''}`}
          onClick={toggleAutoLayout}
        >
          {
            !options.autoLayouting ? <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-zidong"></use></svg>
              :<svg className="c-loading-icon rg-icon" aria-hidden="true"><use xlinkHref="#icon-lianjiezhong"></use></svg>
          }
        </div>
      )}
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default GraphXsToolBar;
