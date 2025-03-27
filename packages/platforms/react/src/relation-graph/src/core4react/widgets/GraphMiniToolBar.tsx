import React, { useContext } from 'react';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';


const GraphMiniToolBar: React.FC = ({children}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const refresh = async() => {
    await relationGraph.refresh();
    relationGraph.dataUpdated();
  };
  const updateViewLoop = () => {
    if (relationGraph.options.autoLayouting) {
      relationGraph.dataUpdated();
      requestAnimationFrame(() => { updateViewLoop(); });
    }
  };
  const toggleAutoLayout = () => {
    relationGraph.toggleAutoLayout();
    // updateViewLoop();
  };
  const toogleFullScreen = async() => {
    await relationGraph.fullscreen();
    relationGraph.dataUpdated();
  };
  const downloadAsImage = () => {
    relationGraph.downloadAsImage('png');
  };
  const zoomToFit = async () => {
    const instance = relationGraph;
    await instance.setZoom(100);
    await instance.moveToCenter();
    await instance.zoomToFit();
  };
  const addZoom = (buff:number) => {
    relationGraph.zoom(buff);
    relationGraph.dataUpdated();
  };
  const options = relationGraph && relationGraph.options;
  return (
    <div
      className={[
        'rel-toolbar',
        'rel-toolbar-h-' + options.toolBarPositionH,
        'rel-toolbar-v-' + options.toolBarPositionV,
        'rel-toolbar-' + options.toolBarDirection
      ].join(' ')}
    >
      {options.allowShowFullscreenMenu &&
          <div title="全屏/退出全屏" className="c-mb-button" onClick={()=>{toogleFullScreen();}}>
            <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-resize-"></use></svg>
          </div>}
      {options.allowShowZoomMenu &&
          <React.Fragment>
            <div title="放大" className="c-mb-button" onClick={() => {addZoom(20);}}>
              <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-fangda"></use></svg>
            </div>
            <div className="c-current-zoom" onClick={() => {zoomToFit();}}>{options.canvasZoom}%</div>
            <div title="缩小" className="c-mb-button" onClick={()=>{addZoom(-20);}}>
              <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-suoxiao"></use></svg>
            </div>
          </React.Fragment>
      }

      {options.allowAutoLayoutIfSupport && options.isNeedShowAutoLayoutButton &&
          <div
            title={options.autoLayouting?'点击停止自动布局':'点击开始自动调整布局'}
            className={[
              'c-mb-button',
              options.autoLayouting && 'c-mb-button-on'
            ].join(' ')}
            onClick={()=>{toggleAutoLayout();}}
          >
            {
              !options.autoLayouting ?
                <svg className="rg-icon" aria-hidden="true">
                  <use xlinkHref="#icon-zidong"></use>
                </svg>
                :
                <svg className="c-loading-icon rg-icon" aria-hidden="true">
                  <use xlinkHref="#icon-lianjiezhong"></use>
                </svg>
            }
          </div>
      }
      {options.allowShowRefreshButton &&
          <div title="刷新" className="c-mb-button" onClick={()=>{refresh();}}>
            <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-ico_reset"></use></svg>
          </div>
      }
      {options.allowShowDownloadButton &&
          <div title="下载图片" className="c-mb-button" onClick={()=>{downloadAsImage();}}>
            <svg className="rg-icon" aria-hidden="true"><use xlinkHref="#icon-tupian"></use></svg>
          </div>
      }
      {children}
      <div style={{clear: 'both'}}></div>
    </div>
  );
};

export default GraphMiniToolBar;
