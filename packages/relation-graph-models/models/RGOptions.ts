import { devLog } from '../utils/RGCommon';
import { json2Line } from './RGLink';
import { appendDefaultOptions4Layout } from './RGLayouter';
import { json2Node } from './RGNode';
import {RGLayoutOptions, RGOptions, RGOptionsFull, RGV2Options} from '../types';

export const newNodeTemplate = {
  id: 'rg-newNodeTemplate',
  x: 0,
  y: 0,
  text: '',
  styleClass: ''
};
let graphInstanceIndex = 0;
export const createDefaultConfig = (userOptions:RGV2Options):RGOptionsFull => {
  !userOptions.backgroundImage && (userOptions.backgroundImage = userOptions.backgrounImage);// 修改一个typo bug, 同时想要兼容之前的版本
  !userOptions.backgroundImageNoRepeat && (userOptions.backgroundImageNoRepeat = userOptions.backgrounImageNoRepeat);// 修改一个typo bug, 同时想要兼容之前的版本
  if (typeof userOptions.graphOffset_x === 'string') {
    userOptions.graphOffset_x = parseInt(userOptions.graphOffset_x);
  }
  if (typeof userOptions.graphOffset_y === 'string') {
    userOptions.graphOffset_y = parseInt(userOptions.graphOffset_y);
  }
  // console.log('xxxxxxxxxxxxxxxx', userOptions.defaultPolyLineRadius, userOptions.defaultPloyLineRadius);
  if (userOptions.defaultPloyLineRadius) {
    userOptions.defaultPolyLineRadius = userOptions.defaultPloyLineRadius;
  }
  const _options:RGOptionsFull = {
    instanceId: '',
    debug: true, // UI
    graphLoading: false, // UI
    graphLoadingText: '', // UI
    showMaskWhenLayouting: false, // UI
    instanceDestroyed: false, // UI
    useHorizontalView: false, // UI
    oldVueVersion: false, // UI
    ovUseNodeSlot: false, // UI
    ovUseLineSlot: false, // UI
    ovUseToolbarSlot: false, // UI
    ovUseNodeExpandHolderSlot: false, // UI
    showDebugPanel: false, // UI
    backgroundColor: undefined, // UI
    backgroundImage: undefined, // UI
    backgroundImageNoRepeat: undefined, // UI
    downloadImageFileName: '', // UI
    disableZoom: false, // UI
    disableDragNode: false, // UI
    disableDragLine: true, // UI
    selectionMode: false, // UI
    moveToCenterWhenRefresh: true, // UI
    zoomToFitWhenRefresh: true, // UI
    useAnimationWhenRefresh: false, // UI
    defaultFocusRootNode: true, // UI
    disableNodeClickEffect: false, // UI
    disableLineClickEffect: false, // UI
    allowShowFullscreenMenu: true, // UI
    allowShowZoomMenu: true, // UI
    allowAutoLayoutIfSupport: true, // UI
    allowShowRefreshButton: true, // UI
    allowShowDownloadButton: true, // UI TODO
    backgrounImageNoRepeat: false, // UI
    allowShowMiniToolBar: true, // UI
    toolBarVersion: 'v2', // right/left/top/bottom
    toolBarDirection: 'v', // v/h
    toolBarPositionH: 'right', // right/left/top/bottom
    toolBarPositionV: 'center', //  right/left/center/top/bottom
    allowSwitchLineShape: false, // UI
    allowSwitchJunctionPoint: false, // UI
    isMoveByParentNode: false, // UI
    defaultExpandHolderPosition: 'hide', // UI
    defaultExpandHolderColor: undefined, // UI
    defaultNodeBorderWidth: undefined, // UI
    defaultNodeColor: '#409EFF',
    defaultNodeBorderColor: '#0c7ff6',
    defaultNodeFontColor: '#ffffff',
    defaultLineColor: '#cccccc',
    checkedLineColor: '#FD8B37',
    // ------------------------
    // defaultNodeColor: '#FD8B37',
    // defaultNodeBorderColor: 'rgb(183,101,40)',
    // defaultNodeFontColor: '#ffffff',
    // defaultLineColor: 'rgb(183,101,40, 0.7)',
    // checkedLineColor: '#FD8B37',
    // -------------------
    defaultLineFontColor: undefined,
    defaultLineWidth: 1, // UI
    defaultLineShape: undefined, // UI
    defaultLineTextOffset_x: undefined, // UI
    defaultLineTextOffset_y: undefined, // UI
    defaultNodeShape: undefined, // UI
    defaultNodeWidth: undefined, // UI
    defaultNodeHeight: undefined, // UI
    defaultShowLineLabel: true, // UI
    hideNodeContentByZoom: false, // UI
    defaultJunctionPoint: undefined, // UI
    defaultBottomJuctionPoint_X: undefined, // UI
    defaultPolyLineRadius: undefined, // UI
    disableDragCanvas: false, // UI
    placeSingleNode: true,
    placeOtherGroup: false,
    lineUseTextPath: false, // UI
    lineTextMaxLength: 66,
    multiLineDistance: 14,
    graphOffset_x: 0,
    graphOffset_y: 0,
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
    checkedLinkId: '', // private
    layouts: [], // private
    layoutLabel: '', // private
    layoutName: 'tree', // private
    layoutClassName: '', // private
    layoutDirection: 'h', // private
    useAnimationWhenExpanded: false,
    reLayoutWhenExpandedOrCollapsed: false,
    autoLayouting: false, // private
    layouter: undefined, // private
    isNeedShowAutoLayoutButton: false, // private
    canvasZoom: 100, // private
    showEasyView: false, // private
    performanceMode: false, // private
    canvasOpacity: 1, // private
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
      width: 10,
      height: 10
    },
    canvasOffset: {
      x: 25,
      y: 27,
      zoom_buff_x: 0,
      zoom_buff_y: 0
    },
    creatingSelection: false,
    selectionView: {
      x: 25,
      y: 27,
      width: 0,
      height: 0
    },
    creatingNodePlot: false,
    showTemplateNode: true,
    newNodeTemplate: json2Node(JSON.parse(JSON.stringify(newNodeTemplate))),
    creatingLinePlot: false,
    newLineTemplate: {
      from: 'newRelationTemplate-from',
      to: 'newRelationTemplate-to',
      color: '',
      text: 'new line'
    },
    newLinkTemplate: {
      fromNode: null,
      toNodeObject: null,
      toNode: {
        nothing: true,
        x: 400,
        y: 400,
        el: {
          offsetWidth: 30,
          offsetHeight: 30
        }
      },
      relations: [{}]
    },
    data: {

    }
  };
  _options.newLineTemplate = json2Line(_options.newLineTemplate);
  if (userOptions.layout && userOptions.layouts) {
    throw new Error('Graph options cannot have both layout and layouts properties !');
  }
  const _debug = userOptions.debug === true;
  if (_debug) devLog('RGOptions:user instance options:', userOptions);
  if (window) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.relationGraphDebug = _debug;
  }
  const optionsKeys = Object.keys(_options);
  if (userOptions) {
    Object.keys(userOptions).forEach(key => {
      if (key === 'layouts') return;// layouts特殊处理
      if (key === 'layout') return;// layouts特殊处理
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const _thisUserValue = userOptions[key];
      if (!optionsKeys.includes(key)) {
        devLog('RGOptions: unknow option key:', key);
        return;
      }
      if (typeof _thisUserValue === 'object') {
        devLog('RGOptions:user setting object:', key, _thisUserValue);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const _objectValue = _options[key];
        if (_objectValue && !Array.isArray(_objectValue) && _thisUserValue) {
          Object.keys(_objectValue).forEach(l2Key => {
            _objectValue[l2Key] = _thisUserValue[l2Key];
          });
        } else if (Array.isArray(_objectValue)) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const _new_arr = [];
          _thisUserValue.forEach((thisItem:any) => {
            if (thisItem && typeof thisItem === 'object') {
              _new_arr.push(JSON.parse(JSON.stringify(thisItem)));
            } else {
              _new_arr.push(thisItem);
            }
          });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _options[key] = _new_arr;
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          _options[key] = _thisUserValue;
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _options[key] = _thisUserValue;
      }
    });
  }
  let layouts:RGLayoutOptions[] = [];
  if (!userOptions.layouts || !Array.isArray(userOptions.layouts) || userOptions.layouts.length === 0) {
    if (userOptions.layout) {
      layouts = [userOptions.layout];
    } else {
      layouts = [{
        label: '中心',
        layoutName: 'center',
        layoutDirection: 'v'
      }];
    }
  } else {
    layouts = userOptions.layouts;
  }
  devLog('final layouts:', layouts);
  _options.layouts = layouts.map((config:any) => {
    return JSON.parse(JSON.stringify(config));
  });
  if (_options.disableNodeClickEffect) {
    _options.defaultFocusRootNode = false;
  }
  // if (!_options.defaultLineFontColor) {
  //   _options.defaultLineFontColor = _options.defaultLineColor;
  // }
  appendDefaultOptions4Layout(_options.layouts[0]);
  applyDefaultOptionsByLayout(_options.layouts[0], _options);
  return _options;
};

export const applyDefaultOptionsByLayout = (thisLayout:RGLayoutOptions, _options:RGOptionsFull) => {
  devLog('applyDefaultOptionsByLayout', thisLayout.layoutName, _options);
  if (thisLayout.layoutName === 'SeeksCenterLayouter' || thisLayout.layoutName === 'center') {
    if (_options.defaultNodeShape === undefined) _options.defaultNodeShape = 0;
    if (_options.defaultLineShape === undefined) _options.defaultLineShape = 1;
    if (_options.defaultJunctionPoint === undefined) _options.defaultJunctionPoint = 'border';
  } else if (thisLayout.layoutName === 'SeeksBidirectionalTreeLayouter' || thisLayout.layoutName.includes('tree')) {
    if (_options.defaultNodeBorderWidth === undefined) _options.defaultNodeBorderWidth = 0;
    if (_options.defaultNodeShape === undefined) _options.defaultNodeShape = 1;
    if (_options.defaultLineShape === undefined) _options.defaultLineShape = 4;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (thisLayout.from === 'top' || thisLayout.from === 'bottom') {
      _options.layoutDirection = 'v';
      devLog('set layoutDirection=v');
      if (_options.defaultLineShape === 4) {
        if (_options.defaultJunctionPoint === undefined) _options.defaultJunctionPoint = 'tb';
        devLog('set defaultJunctionPoint=tb');
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (thisLayout.from === 'left' || thisLayout.from === 'right') {
      _options.layoutDirection = 'h';
      devLog('set layoutDirection=h');
      if (_options.defaultLineShape === 4) {
        if (_options.defaultJunctionPoint === undefined) _options.defaultJunctionPoint = 'lr';
        devLog('set defaultJunctionPoint=lr');
      }
    }
  } else if (thisLayout.layoutName === 'fixed') {
    _options.moveToCenterWhenRefresh = false;
    _options.zoomToFitWhenRefresh = false;
  } else if (thisLayout.layoutName === 'force') {
    _options.moveToCenterWhenRefresh = false;
    _options.zoomToFitWhenRefresh = false;
  }
  if (_options.defaultNodeShape === undefined) _options.defaultNodeShape = 0;
  if (_options.defaultLineShape === undefined) _options.defaultLineShape = 1;
  if (_options.defaultJunctionPoint === undefined) _options.defaultJunctionPoint = 'border';
};
export const newInstanceOptions = (options:RGOptions) => {
  const graphOptions = createDefaultConfig(options);
  devLog('RGOptions:new RGOptions:by:', options);
  devLog('RGOptions:new RGOptions:', graphOptions);
  if (!graphOptions.instanceId) graphOptions.instanceId = `RGIns-${graphInstanceIndex++}`;
  return graphOptions;
};
export default {
  newInstanceOptions,
  createDefaultConfig,
  applyDefaultOptionsByLayout
};
