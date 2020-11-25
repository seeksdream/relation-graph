const SeeksStoreManager = {
  createDefaultConfig(userGraphSetting) {
    var _graphSetting = {
      instanceId: 'SeeksGraph',
      debug: true,
      allowShowSettingPanel: false,
      backgrounImage: '',
      disableZoom: false,
      disableDragNode: false,
      moveToCenterWhenResize: true,
      defaultFocusRootNode: true,
      allowShowZoomMenu: true,
      backgrounImageNoRepeat: false,
      allowShowMiniToolBar: true,
      allowShowMiniView: false,
      allowShowMiniNameFilter: true,
      fullscreen: false,
      allowSwitchLineShape: false,
      allowSwitchJunctionPoint: false,
      isMoveByParentNode: false,
      checkedNodeId: '',
      checkedLineId: '',
      layouts: [],
      layoutLabel: '',
      layoutName: 'tree',
      layoutClassName: '',
      layoutDirection: 'h',
      defaultExpandHolderPosition: 'hide',
      autoLayouting: false,
      layouter: undefined,
      allowAutoLayoutIfSupport: true,
      isNeedShowAutoLayoutButton: false,
      canvasZoom: 100,
      defaultNodeColor: '#67C23A',
      defaultNodeFontColor: '#ffffff',
      defaultNodeBorderColor: '#90EE90',
      defaultNodeBorderWidth: 5,
      defaultLineColor: '#dddddd',
      defaultLineWidth: 1,
      defaultLineShape: 1,
      defaultNodeShape: 0,
      defaultNodeWidth: undefined,
      defaultNodeHeight: undefined,
      defaultShowLineLabel: true,
      showSingleNode: true,
      showNodeLabel: true,
      showNodeShortLabel: true,
      hideNodeContentByZoom: false,
      defaultJunctionPoint: 'border',
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
      },
      resetViewSize: (config) => {
        // config.canvasOffset.x = parseInt(config.viewSize.width - config.canvasSize.width) / 2
        // config.canvasOffset.y = parseInt(config.viewSize.height - config.canvasSize.height) / 2
        config.canvasOffset.x = config.viewNVInfo.width / 2 - 100
        config.canvasOffset.y = config.viewNVInfo.height / 2 - 100
      }
    }
    var _debug = userGraphSetting.debug !== true ? false : true
    if (_debug) console.log('user instance graphSetting:', userGraphSetting)
    if (window) {
      window.SeeksGraphDebug = _debug
    }
    if (userGraphSetting) {
      Object.keys(userGraphSetting).forEach(key => {
        var _thisUserValue = userGraphSetting[key]
        if (typeof _thisUserValue === 'object') {
          if (window.SeeksGraphDebug) console.log('user setting object:', key, _thisUserValue)
          var _objectValue = _graphSetting[key]
          if (_objectValue) {
            if (_objectValue && !Array.isArray(_objectValue) && _thisUserValue) {
              Object.keys(_objectValue).forEach(l2Key => {
                if (window.SeeksGraphDebug) console.log('   user setting:', key + '.' + l2Key, _thisUserValue[l2Key])
                _objectValue[l2Key] = _thisUserValue[l2Key]
              })
            } else if(Array.isArray(_objectValue)) {
              if (window.SeeksGraphDebug) console.log('   user setting array:', key, 'size:', _thisUserValue.length)
              var _new_arr = []
              _thisUserValue.forEach(thisItem => {
                if (window.SeeksGraphDebug) console.log('   user setting array:', key, 'push:', thisItem)
                if (thisItem && typeof thisItem === 'object') {
                  _new_arr.push(JSON.parse(JSON.stringify(thisItem)))
                } else {
                  _new_arr.push(thisItem)
                }
              })
              _graphSetting[key] = _new_arr
              // if (window.SeeksGraphDebug) console.log('   user setting array:', key, 'copy size:', _new_arr.length)
            } else {
              if (window.SeeksGraphDebug) console.log('user setting value:', key)
              _graphSetting[key] = _thisUserValue
            }
          } else {
            console.log('ignore option:', key)
          }
        } else {
          if (window.SeeksGraphDebug) console.log('user setting:', key, _thisUserValue)
          _graphSetting[key] = _thisUserValue
        }
      })
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
      }]
    }
    if (!Array.isArray(_graphSetting.layouts)) {
      _graphSetting.layouts = [_graphSetting.layouts]
    }
    _graphSetting.layouts.forEach(thisLayout => {
      SeeksStoreManager.appendDefaultOptions4Layout(thisLayout)
    })
    return _graphSetting
  },
  appendDefaultOptions4Layout(thisLayout) {
    if (thisLayout.useLayoutStyleOptions === undefined) thisLayout.useLayoutStyleOptions = false
    if (thisLayout.defaultNodeColor === undefined) thisLayout.defaultNodeColor = '#FFC5A6'
    if (thisLayout.defaultNodeFontColor === undefined) thisLayout.defaultNodeFontColor = '#000000'
    if (thisLayout.defaultNodeBorderColor === undefined) thisLayout.defaultNodeBorderColor = '#efefef'
    if (thisLayout.defaultNodeBorderWidth === undefined) thisLayout.defaultNodeBorderWidth = 1
    if (thisLayout.defaultLineColor === undefined) thisLayout.defaultLineColor = '#FD8B37'
    if (thisLayout.defaultLineWidth === undefined) thisLayout.defaultLineWidth = 1
    // if (thisLayout.defaultLineShape === undefined) thisLayout.defaultLineShape = 2
    // if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 1
    if (thisLayout.defaultNodeWidth === undefined) thisLayout.defaultNodeWidth = undefined
    if (thisLayout.defaultNodeHeight === undefined) thisLayout.defaultNodeHeight = undefined
    if (thisLayout.defaultShowLineLabel === undefined) thisLayout.defaultShowLineLabel = true
    if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = undefined
    if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = undefined
    if (thisLayout.defaultLineMarker === undefined) {
      thisLayout.defaultLineMarker = {
        markerWidth: 12,
        markerHeight: 12,
        refX: 6,
        refY: 6,
        color: undefined,
        data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
      }
    }
    if (thisLayout.layoutName === 'SeeksCenterLayouter' || thisLayout.layoutName === 'center') {
      if (thisLayout.label === undefined) thisLayout.label = '中心'
      if (thisLayout.layoutClassName === undefined) thisLayout.layoutClassName = 'seeks-layout-' + thisLayout.layoutName
      if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 0
      if (thisLayout.defaultLineShape === undefined) thisLayout.defaultLineShape = 1
      if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = 'hide'
      if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = 'border'
      if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h'
      if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0
      if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0
      if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = ''
      if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 30
      if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 200
      if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100
      if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500
    } else if (thisLayout.layoutName === 'SeeksBidirectionalTreeLayouter' || thisLayout.layoutName === 'tree') {
      if (thisLayout.label === undefined) thisLayout.label = '树状'
      if (thisLayout.layoutClassName === undefined) thisLayout.layoutClassName = 'seeks-layout-' + thisLayout.layoutName
      if (thisLayout.defaultNodeShape === undefined) thisLayout.defaultNodeShape = 1
      if (thisLayout.defaultLineShape === undefined) thisLayout.defaultLineShape = 2
      if (thisLayout.defaultExpandHolderPosition === undefined) thisLayout.defaultExpandHolderPosition = 'hide'
      if (thisLayout.defaultJunctionPoint === undefined) thisLayout.defaultJunctionPoint = 'ltrb'
      if (thisLayout.layoutDirection === undefined) thisLayout.layoutDirection = 'h'
      if (thisLayout.centerOffset_x === undefined) thisLayout.centerOffset_x = 0
      if (thisLayout.centerOffset_y === undefined) thisLayout.centerOffset_y = 0
      if (thisLayout.from === undefined) thisLayout.from = 'top'
      if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = ''
      if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 30
      if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 200
      if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100
      if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500
      if (thisLayout.from === 'top' || thisLayout.from === 'bottom') thisLayout.layoutDirection = 'v'
    }
  },
  createNewStore(userGraphSetting) {
    if (window.SeeksGraphDebug) console.log('Create new GraphSetting:')
    var _graphSetting = SeeksStoreManager.createDefaultConfig(userGraphSetting)
    return new SeeksRGStore(_graphSetting)
  }
}
function SeeksRGStore(_graphSetting) {
  this.graphSetting = _graphSetting
  this.resetViewSize = function() {
    // state.graphSetting.canvasOffset.x = parseInt(state.graphSetting.viewSize.width - state.graphSetting.canvasSize.width) / 2
    // state.graphSetting.canvasOffset.y = parseInt(state.graphSetting.viewSize.height - state.graphSetting.canvasSize.height) / 2
    this.graphSetting.canvasOffset.x = 0 // state.graphSetting.viewNVInfo.width / 2 - 100
    this.graphSetting.canvasOffset.y = 0 // state.graphSetting.viewNVInfo.height / 2 - 100
    // console.log('resetViewSize:', state.graphSetting.viewSize.width, state.graphSetting.canvasSize.width, state.graphSetting.canvasZoom / 100, state.graphSetting.canvasSize.width * (state.graphSetting.canvasZoom / 100), state.graphSetting.canvasOffset.x)
  }
  this.getOptions = function() {
    var _options = {}
    var _ignore = [
        'layouter', 'autoLayouting', 'canvasNVInfo', 'canvasOffset', 'canvasZoom', 'fullscreen', 'instanceId', 'layoutClassName', 'layoutDirection',
        'layoutLabel', 'layoutName', 'resetViewSize', 'viewELSize', 'viewNVInfo', 'viewSize', 'canvasSize'
    ]
    Object.keys(this.graphSetting).forEach(thisKey => {
      if (_ignore.indexOf(thisKey) === -1) {
        _options[thisKey] = this.graphSetting[thisKey]
      }
    })
    return _options
  }
  console.log('relation-graph instance full option:', this.getOptions())
}
export default SeeksStoreManager
