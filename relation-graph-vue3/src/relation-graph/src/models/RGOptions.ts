import { devLog } from '../utils/RGCommon'
import type {
  RGCenterLayoutOptions,
  RGLayoutOptions,
  RGOptions,
  RGOptionsFull,
  RGTreeLayoutOptions,
} from '../RelationGraph'

export const createDefaultOptions = (userOptions: RGOptions): RGOptionsFull => {
  const fullOptions: RGOptionsFull = {
    instanceId: 'SeeksGraph',
    debug: true, // UI
    showDebugPanel: false, // UI
    backgrounImage: '', // UI
    downloadImageFileName: '', // UI
    disableZoom: false, // UI
    disableDragNode: false, // UI
    moveToCenterWhenRefresh: true, // UI
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
    placeSingleNode: true,
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
      data: 'M2,2 L10,6 L2,10 L6,6 L2,2',
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
      height: 2000,
    },
    canvasOffset: {
      x: 25,
      y: 27,
      zoom_buff_x: 0,
      zoom_buff_y: 0,
    },
  }
  const _debug = userOptions.debug === true
  if (_debug) devLog('RGOptions:user instance graphSetting:', userOptions)
  if (userOptions) {
    Object.keys(userOptions).forEach((key) => {
      // @ts-ignore
      const _thisUserValue = userOptions[key]
      if (typeof _thisUserValue === 'object') {
        devLog('RGOptions:user setting object:', key, _thisUserValue)
        // @ts-ignore
        const _objectValue = fullOptions[key]
        if (_objectValue) {
          if (_objectValue && !Array.isArray(_objectValue) && _thisUserValue) {
            Object.keys(_objectValue).forEach((l2Key) => {
              _objectValue[l2Key] = _thisUserValue[l2Key]
            })
          } else if (Array.isArray(_objectValue)) {
            const _new_arr: any[] = []
            _thisUserValue.forEach((thisItem: any) => {
              if (thisItem && typeof thisItem === 'object') {
                _new_arr.push(JSON.parse(JSON.stringify(thisItem)))
              } else {
                _new_arr.push(thisItem)
              }
            })
            // @ts-ignore
            fullOptions[key] = _new_arr
          } else {
            // @ts-ignore
            fullOptions[key] = _thisUserValue
          }
        } else {
          devLog('ignore option:', key)
        }
      } else {
        // @ts-ignore
        fullOptions[key] = _thisUserValue
      }
    })
  }
  if (!fullOptions.layouts || fullOptions.layouts.length === 0) {
    fullOptions.layouts = [
      {
        label: '中心',
        layoutName: 'center',
        layoutDirection: 'v',
      },
    ]
  }
  if (!Array.isArray(fullOptions.layouts)) {
    fullOptions.layouts = [fullOptions.layouts]
  }
  fullOptions.layouts.forEach((thisLayout) => {
    appendDefaultOptions4Layout(thisLayout, fullOptions)
  })
  return fullOptions
}
export const appendDefaultOptions4Layout = (
  layoutOptions: RGLayoutOptions,
  options: RGOptionsFull
) => {
  if (
    layoutOptions.layoutName === 'SeeksCenterLayouter' ||
    layoutOptions.layoutName === 'center'
  ) {
    if (layoutOptions.label === undefined) layoutOptions.label = '中心'
    if (layoutOptions.layoutClassName === undefined)
      layoutOptions.layoutClassName = `seeks-layout-${layoutOptions.layoutName}`
    if (layoutOptions.layoutDirection === undefined)
      layoutOptions.layoutDirection = 'h'
    if (layoutOptions.centerOffset_x === undefined)
      layoutOptions.centerOffset_x = 0
    if (layoutOptions.centerOffset_y === undefined)
      layoutOptions.centerOffset_y = 0
    const centerLayoutOptions = layoutOptions as RGCenterLayoutOptions
    if (centerLayoutOptions.distance_coefficient === undefined)
      centerLayoutOptions.distance_coefficient = 1
  } else if (
    layoutOptions.layoutName === 'SeeksBidirectionalTreeLayouter' ||
    layoutOptions.layoutName === 'tree'
  ) {
    if (layoutOptions.label === undefined) layoutOptions.label = '树状'
    if (layoutOptions.layoutClassName === undefined)
      layoutOptions.layoutClassName = `seeks-layout-${layoutOptions.layoutName}`
    if (layoutOptions.layoutDirection === undefined)
      layoutOptions.layoutDirection = 'h'
    if (layoutOptions.centerOffset_x === undefined)
      layoutOptions.centerOffset_x = 0
    if (layoutOptions.centerOffset_y === undefined)
      layoutOptions.centerOffset_y = 0
    const treeLayoutOptions = layoutOptions as RGTreeLayoutOptions
    if (treeLayoutOptions.from === undefined) treeLayoutOptions.from = 'top'
    if (treeLayoutOptions.levelDistance === undefined)
      treeLayoutOptions.levelDistance = ''
    if (treeLayoutOptions.min_per_width === undefined)
      treeLayoutOptions.min_per_width = 30
    if (treeLayoutOptions.max_per_width === undefined)
      treeLayoutOptions.max_per_width = 200
    if (treeLayoutOptions.min_per_height === undefined)
      treeLayoutOptions.min_per_height = 100
    if (treeLayoutOptions.max_per_height === undefined)
      treeLayoutOptions.max_per_height = 500
    if (
      treeLayoutOptions.from === 'top' ||
      treeLayoutOptions.from === 'bottom'
    ) {
      treeLayoutOptions.layoutDirection = 'v'
      options.defaultJunctionPoint = 'tb'
      devLog('set layoutDirection=v')
      devLog('set defaultJunctionPoint=tb')
    }
    if (
      treeLayoutOptions.from === 'left' ||
      treeLayoutOptions.from === 'right'
    ) {
      options.defaultJunctionPoint = 'lr'
      devLog('set defaultJunctionPoint=lr')
    }
  } else if (layoutOptions.layoutName === 'fixed') {
    options.moveToCenterWhenRefresh = false
    options.zoomToFitWhenRefresh = false
  } else if (layoutOptions.layoutName === 'force') {
    options.moveToCenterWhenRefresh = false
    options.zoomToFitWhenRefresh = false
  }
}
