import React, { useContext } from 'react';
import { RelationGraphStoreContext, RGUpdateContext } from "../store/reducers/StockStore";
import { switchLayout } from '../../models/RGLayouter'
import { devLog } from '../../utils/RGCommon'
import type { RGLayoutOptions} from '../../RelationGraph';

const GraphMiniToolBar: React.FC = () => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const refresh = () => {
    relationGraph.refresh()
  }
  const onLayoutChanged = (layoutConfig: RGLayoutOptions) => {
    devLog('change layout:', layoutConfig)
    switchLayout(layoutConfig, relationGraph.options)
    refresh()
    updateView();
  }
  const toggleAutoLayout = () => {
    relationGraph.startAutoLayout()
  }
  const setDefaultLineShape = (v:number) => {
    // @ts-ignore
    relationGraph.setDefaultLineShape(v)
    updateView()
  }
  const setDefaultJunctionPoint = (v:string) => {
    // @ts-ignore
    relationGraph.setDefaultJunctionPoint(v)
    updateView()
  }
  const downloadPanelWidth = 106
  return (
    <div
      style={{
        marginLeft: `${relationGraph.options.viewELSize.width - 50  }px`,
        marginTop: `${(relationGraph.options.viewELSize.height - 260) / 2  }px`,
      }}
      className="c-mini-toolbar"
    >
      <div
        className="c-mb-button"
        style={{marginTop: '0px'}}
        onClick={()=>{relationGraph.fullscreen()}}
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-resize-" />
        </svg>
        <span className="c-mb-text">{
          relationGraph.options.fullscreen ? '退出' : '全屏'
        }</span>
      </div>
      {relationGraph.options.allowShowZoomMenu && <div
        className="c-mb-button"
        onClick={()=>{relationGraph.zoom(20);updateView();}}
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-fangda" />
        </svg>
        <span className="c-mb-text">放大</span>
      </div>}
      {relationGraph.options.allowShowZoomMenu &&
      <div
        style={{
          float: 'left',
          marginTop: '0px',
          height: '20px',
          width: '40px',
          borderTop: '0px',
          borderBottom: '0px',
          color: '#262626',
          fontSize: '10px',
          backgroundColor: '#efefef',
          textAlign: 'center',
          lineHeight: '20px',
        }}
      >
        { relationGraph.options.canvasZoom }%
      </div>
      }
      {relationGraph.options.allowShowZoomMenu &&
      <div
        className="c-mb-button"
        style={{marginTop: '0px'}}
        onClick={()=>{relationGraph.zoom(-20);updateView();}}
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-suoxiao" />
        </svg>
        <span className="c-mb-text">缩小</span>
      </div>
      }
      {relationGraph.options.layouts!.length > 1 &&
      <div className="c-mb-button">
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-yuanquanfenxiang" />
        </svg>
        <span className="c-mb-text">布局</span>
        <div
          style={{
            width: `${relationGraph.options.layouts!.length * 70 + 6  }px`,
            marginLeft: `${relationGraph.options.layouts!.length * -70 - 5  }px`
          }}
          className="c-mb-child-panel"
        >
          {relationGraph.options.layouts!.map(thisLayoutSetting => <div
            key={thisLayoutSetting.label}
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.layoutLabel === thisLayoutSetting.label ? 'c-mb-button-on' : '')].join(' ')
            }
            style={{ width: '70px' }}
            onClick={() => {
              onLayoutChanged(thisLayoutSetting);
            }}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-yuanquanfenxiang" />
            </svg>
            <span className="c-mb-text">{ thisLayoutSetting.label }</span>
          </div>)}
        </div>
      </div>
      }
      {relationGraph.options.allowSwitchLineShape &&
      <div className="c-mb-button">
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-hj2" />
        </svg>
        <span className="c-mb-text">线条</span>
        <div className="c-mb-child-panel" style={{width: '256px', marginLeft: '-255px'}}>
          <div
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.defaultLineShape === 1 ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultLineShape(1)}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-hj2" />
            </svg>
            <span className="c-mb-text">直线</span>
          </div>
          <div
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.defaultLineShape === 2 ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultLineShape(2)}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjieliu" />
            </svg>
            <span className="c-mb-text">简洁</span>
          </div>
          <div
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.defaultLineShape === 6 ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultLineShape(6)}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjieliu" />
            </svg>
            <span className="c-mb-text">生动</span>
          </div>
          <div
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.defaultLineShape === 5 ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultLineShape(5)}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjieliu" />
            </svg>
            <span className="c-mb-text">鱼尾</span>
          </div>
          <div
            className={
              ['c-mb-button', 'c-mb-button-c', (relationGraph.options.defaultLineShape === 4 ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultLineShape(4)}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-hj2" />
            </svg>
            <span className="c-mb-text">折线</span>
          </div>
        </div>
      </div>
      }
      {relationGraph.options.allowSwitchJunctionPoint &&
      <div
        className="c-mb-button"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-lianjie_connecting5" />
        </svg>
        <span className="c-mb-text">连接点</span>
        <div className="c-mb-child-panel" style={{width: '206px', marginLeft: '-205px'}}>
          <div
            className={
              [
                'c-mb-button',
                'c-mb-button-c',
                (relationGraph.options.defaultJunctionPoint === 'border' ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultJunctionPoint('border')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjie_connecting5" />
            </svg>
            <span className="c-mb-text">边缘</span>
          </div>
          <div
            className={
              [
                'c-mb-button',
                'c-mb-button-c',
                (relationGraph.options.defaultJunctionPoint === 'ltrb' ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultJunctionPoint('ltrb')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjie_connecting5" />
            </svg>
            <span className="c-mb-text">四点</span>
          </div>
          <div
            className={
              [
                'c-mb-button',
                'c-mb-button-c',
                (relationGraph.options.defaultJunctionPoint === 'tb' ? 'c-mb-button-on': '')].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultJunctionPoint('tb')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjie_connecting5" />
            </svg>
            <span className="c-mb-text">上下</span>
          </div>
          <div
            className={
              [
                'c-mb-button',
                'c-mb-button-c',
                (relationGraph.options.defaultJunctionPoint === 'lr' ? 'c-mb-button-on': '')
              ].join(' ')
            }
            style={{width: '50px'}}
            onClick={()=>{setDefaultJunctionPoint('lr')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-lianjie_connecting5" />
            </svg>
            <span className="c-mb-text">左右</span>
          </div>
        </div>
      </div>
      }
      {relationGraph.options.allowAutoLayoutIfSupport &&
        relationGraph.options.isNeedShowAutoLayoutButton &&
      <div
        title={relationGraph.options.autoLayouting
          ? '点击停止自动布局'
          : '点击开始自动调整布局'}
        className={ ['c-mb-button',relationGraph.options.autoLayouting ? 'c-mb-button-on': ''].join(' ') }
        onClick={()=>{toggleAutoLayout()}}
      >
        {!relationGraph.options.autoLayouting ? <svg
          className="rg-icon"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-zidong" />
        </svg>
          :
        <svg className="c-loading-icon rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-lianjiezhong" />
        </svg>
        }
        <span className="c-mb-text">自动</span>
      </div>
      }
      {relationGraph.options.allowShowRefreshButton &&
      <div
        className="c-mb-button"
        onClick={()=>{refresh();updateView();}}
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-ico_reset" />
        </svg>
        <span className="c-mb-text">刷新</span>
      </div>
      }
      {relationGraph.options.allowShowDownloadButton&&
      <div
        className="c-mb-button"
      >
        <svg className="rg-icon" aria-hidden="true">
          <use xlinkHref="#icon-ziyuan" />
        </svg>
        <span className="c-mb-text">下载</span>
        <div
          style={{
            width: `${downloadPanelWidth  }px`,
            marginLeft: `${downloadPanelWidth * -1  }px`
          }}
          className="c-mb-child-panel"
        >
          <div
            className="c-mb-button c-mb-button-c"
            style={{width: '50px'}}
            onClick={()=>{relationGraph.downloadAsImage('', 'png')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-tupian" />
            </svg>
            <span className="c-mb-text">PNG</span>
          </div>
          <div
            className="c-mb-button c-mb-button-c"
            style={{width: '50px'}}
            onClick={()=>{relationGraph.downloadAsImage('', 'jpg')}}
          >
            <svg className="rg-icon" aria-hidden="true">
              <use xlinkHref="#icon-tupian" />
            </svg>
            <span className="c-mb-text">JPG</span>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default GraphMiniToolBar;
