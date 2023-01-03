import { devLog } from '../utils/RGCommon';

export const createDefaultConfig = (userGraphSetting) => {
  const _graphSetting = {
    instanceId: 'SeeksGraph',
    debug: true, // UI
    showDebugPanel: false, // UI
    backgrounImage: '', // UI
    downloadImageFileName: '', // UI
    disableZoom: false, // UI
    disableDragNode: false, // UI
    moveToCenterWhenRefresh: false, // UI
    zoomToFitWhenRefresh: true, // UI
    useAnimationWhenRefresh: true, // UI
    defaultFocusRootNode: true, // UI
    disableNodeClickEffect: false, // UI
    disableLineClickEffect: false, // UI
    allowShowZoomMenu: true, // UI
    allowAutoLayoutIfSupport: true, // UI
    allowShowRefreshButton: true, // UI
    allowShowDownloadButton: true, // UI TODO
    backgrounImageNoRepeat: false, // UI
    allowShowMiniToolBar: true, // UI
    allowSwitchLineShape: false, // UI
    allowSwitchJunctionPoint: false, // UI
    isMoveByParentNode: false, // UI
    defaultExpandHolderPosition: 'hide', // UI
    defaultNodeColor: '#67C23A', // UI
    checkedLineColor: '#FD8B37', //  // UI
    defaultNodeFontColor: '#ffffff', // UI
    defaultNodeBorderColor: '#90EE90', // UI
    defaultNodeBorderWidth: 5, // UI
    defaultLineColor: '#dddddd', // UI
    defaultLineWidth: 1, // UI
    defaultLineShape: 1, // UI
    defaultNodeShape: 0, // UI
    defaultNodeWidth: undefined, // UI
    defaultNodeHeight: undefined, // UI
    defaultShowLineLabel: true, // UI
    hideNodeContentByZoom: false, // UI
    defaultJunctionPoint: 'border', // UI
    disableDragCanvas: false, // UI
    lineUseTextPath: false, // UI
    viewSize: { width: 300, height: 300 },
    viewELSize: { width: 1300, height: 800, left: 0, top: 100 },
    viewNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
    canvasNVInfo: { width: 1300, height: 800, x: 0, y: 100 },
    // NMViewCenter: { x: 0, y: 0 },
    // NMCanvasCenter: { x: 0, y: 0 },
    defaultLineMarker: {
      markerWidth: 12,
      markerHeight: 12,
      refX: 6,
      refY: 6,
      color: undefined,
      data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
    },
    allowShowMiniView: false, // private
    allowShowSettingPanel: false, // private
    allowShowMiniNameFilter: true, // private
    fullscreen: false, // private
    checkedNodeId: '', // private
    checkedLineId: '', // private
    layouts: [], // private
    layoutLabel: '', // private
    layoutName: 'tree', // private
    layoutClassName: '', // private
    layoutDirection: 'h', // private
    autoLayouting: false, // private
    layouter: undefined, // private
    isNeedShowAutoLayoutButton: false, // private
    canvasZoom: 100, // private
    showSingleNode: true, // private
    showNodeLabel: true, // private
    showNodeShortLabel: true, // private
    // defaultLineMarker: {
    //   markerWidth: 6,
    //   markerHeight: 6,
    //   refX: 3,
    //   refY: 3,
    //   color: undefined,
    //   data: 'M 0 0, V 6, L 4 3, Z'
    // },
    // defaultLineMarker: { // 另一种箭头样式
    //   markerWidth: 15,
    //   markerHeight: 15,
    //   refX: 50,
    //   refY: 7,
    //   color: '#128bed',
    //   data: 'M 14 7 L 1 .3 L 4 7 L .4 13 L 14 7, Z'
    // },
    canvasSize: {
      width: 2000,
      height: 2000
    },
    canvasOffset: {
      x: 25,
      y: 27,
      zoom_buff_x: 0,
      zoom_buff_y: 0
    }
  };
  const _debug = userGraphSetting.debug === true;
  if (_debug) devLog('RGOptions:user instance graphSetting:', userGraphSetting);
  if (window) {
    window.relationGraphDebug = _debug;
  }
  if (userGraphSetting) {
    Object.keys(userGraphSetting).forEach(key => {
      const _thisUserValue = userGraphSetting[key];
      if (typeof _thisUserValue === 'object') {
        devLog('RGOptions:user setting object:', key, _thisUserValue);
        const _objectValue = _graphSetting[key];
        if (_objectValue) {
          if (_objectValue && !Array.isArray(_objectValue) && _thisUserValue) {
            Object.keys(_objectValue).forEach(l2Key => {
              // devLog('RGOptions:   user setting:', key + '.' + l2Key, _thisUserValue[l2Key]);
              _objectValue[l2Key] = _thisUserValue[l2Key];
            });
          } else if (Array.isArray(_objectValue)) {
            // devLog('RGOptions:   user setting array:', key, 'size:', _thisUserValue.length);
            const _new_arr = [];
            _thisUserValue.forEach(thisItem => {
              // devLog('RGOptions:   user setting array:', key, 'push:', thisItem);
              if (thisItem && typeof thisItem === 'object') {
                _new_arr.push(JSON.parse(JSON.stringify(thisItem)));
              } else {
                _new_arr.push(thisItem);
              }
            });
            _graphSetting[key] = _new_arr;
            // devLog('   user setting array:', key, 'copy size:', _new_arr.length)
          } else {
            // devLog('RGOptions:user setting value:', key);
            _graphSetting[key] = _thisUserValue;
          }
        } else {
          devLog('ignore option:', key);
        }
      } else {
        // devLog('RGOptions:user setting:', key, _thisUserValue);
        _graphSetting[key] = _thisUserValue;
      }
    });
  }
  if (!_graphSetting.layouts || _graphSetting.layouts.length === 0) {
    _graphSetting.layouts = [{
      label: '中心',
      layoutName: 'center',
      layoutDirection: 'v',
      defaultExpandHolderPosition: 'hide',
      defaultNodeShape: 0,
      defaultLineShape: 1,
      defaultJunctionPoint: 'border'
    }];
  }
  if (!Array.isArray(_graphSetting.layouts)) {
    _graphSetting.layouts = [_graphSetting.layouts];
  }
  _graphSetting.layouts.forEach(thisLayout => {
    appendDefaultOptions4Layout(thisLayout, _graphSetting);
  });
  return _graphSetting;
};

export const appendDefaultOptions4Layout = (thisLayout, _graphSetting) => {
  if (thisLayout.useLayoutStyleOptions === undefined) thisLayout.useLayoutStyleOptions = false;
  if (thisLayout.defaultNodeColor === undefined) thisLayout.defaultNodeColor = '#FFC5A6';
  if (thisLayout.defaultNodeFontColor === undefined) thisLayout.defaultNodeFontColor = '#000000';
  if (thisLayout.defaultNodeBorderColor === undefined) thisLayout.defaultNodeBorderColor = '#efefef';
  if (thisLayout.defaultNodeBorderWidth === undefined) thisLayout.defaultNodeBorderWidth = 1;
  if (thisLayout.defaultLineColor === undefined) thisLayout.defaultLineColor = '#FD8B37';
  if (thisLayout.defaultLineWidth === undefined) thisLayout.defaultLineWidth = 1;
  // if (thisLayout.defaultLineShape === undefined) thisLayout.defaultLineShape = 2
  // if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 1
  if (thisLayout.defaultNodeWidth === undefined) thisLayout.defaultNodeWidth = undefined;
  if (thisLayout.defaultNodeHeight === undefined) thisLayout.defaultNodeHeight = undefined;
  if (thisLayout.defaultShowLineLabel === undefined) thisLayout.defaultShowLineLabel = true;
  if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = undefined;
  if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = undefined;
  if (thisLayout.defaultLineMarker === undefined) {
    thisLayout.defaultLineMarker = {
      markerWidth: 12,
      markerHeight: 12,
      refX: 6,
      refY: 6,
      color: undefined,
      data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
    };
  }
  if (thisLayout.layoutName === 'SeeksCenterLayouter' || thisLayout.layoutName === 'center') {
    if (thisLayout.label === undefined) thisLayout.label = '中心';
    if (thisLayout.layoutClassName === undefined) thisLayout.layoutClassName = 'seeks-layout-' + thisLayout.layoutName;
    if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 0;
    if (thisLayout.defaultLineShape === undefined) thisLayout.defaultLineShape = 1;
    if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = 'hide';
    if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = 'border';
    if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h';
    if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0;
    if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0;
    if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = '';
    if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 30;
    if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 200;
    if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100;
    if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500;
  } else if (thisLayout.layoutName === 'SeeksBidirectionalTreeLayouter' || thisLayout.layoutName === 'tree') {
    if (thisLayout.label === undefined) thisLayout.label = '树状';
    if (thisLayout.layoutClassName === undefined) thisLayout.layoutClassName = 'seeks-layout-' + thisLayout.layoutName;
    if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 1;
    if (thisLayout.defaultLineShape === undefined) _graphSetting.defaultLineShape = 4;
    if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = 'hide';
    if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = 'ltrb';
    if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h';
    if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0;
    if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0;
    if (thisLayout.from === undefined) thisLayout.from = 'top';
    if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = '';
    if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 30;
    if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 200;
    if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100;
    if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500;
    if (thisLayout.from === 'top' || thisLayout.from === 'bottom') {
      thisLayout.layoutDirection = 'v';
      _graphSetting.defaultJunctionPoint = 'tb';
      devLog('set layoutDirection=v');
      devLog('set defaultJunctionPoint=tb');
    }
    if (thisLayout.from === 'left' || thisLayout.from === 'right') {
      _graphSetting.defaultJunctionPoint = 'lr';
      devLog('set defaultJunctionPoint=lr');
    }
  } else if (thisLayout.layoutName === 'fixed') {
    _graphSetting.moveToCenterWhenRefresh = false;
    _graphSetting.zoomToFitWhenRefresh = false;
  } else if (thisLayout.layoutName === 'force') {
    _graphSetting.moveToCenterWhenRefresh = false;
    _graphSetting.zoomToFitWhenRefresh = false;
  }
};
let graphInstanceIndex = 0;
class RGOptions {
  constructor(options) {
    const graphOptions = createDefaultConfig(options);
    devLog('RGOptions:new RGOptions:by:', options);
    devLog('RGOptions:new RGOptions:by:', this);
    Object.assign(this, graphOptions);
    this.instanceId = 'RGIns-' + graphInstanceIndex++;
  }
}
export default RGOptions;
