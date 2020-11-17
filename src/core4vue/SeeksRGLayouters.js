import SeeksBidirectionalTreeLayouter from './layouters/SeeksBidirectionalTreeLayouter'
import SeeksCenterLayouter from './layouters/SeeksCenterLayouter'
import SeeksCircleLayouter from './layouters/SeeksCircleLayouter'
import SeeksAutoLayouter from './layouters/SeeksAutoLayouter'
import SeeksFixedLayouter from './layouters/SeeksFixedLayouter'

var SeeksRGLayouters = {
  createLayout(layoutSetting, _graphSetting) {
    _graphSetting.canvasZoom = 100
    _graphSetting.layoutClassName = layoutSetting.layoutClassName
    _graphSetting.layoutLabel = layoutSetting.label
    _graphSetting.layoutName = layoutSetting.layoutName
    _graphSetting.layoutDirection = layoutSetting.layoutDirection

    if (layoutSetting.useLayoutStyleOptions === true) {
      _graphSetting.defaultExpandHolderPosition = layoutSetting.defaultExpandHolderPosition
      _graphSetting.defaultJunctionPoint = layoutSetting.defaultJunctionPoint

      _graphSetting.defaultNodeColor = layoutSetting.defaultNodeColor
      _graphSetting.defaultNodeFontColor = layoutSetting.defaultNodeFontColor
      _graphSetting.defaultNodeBorderColor = layoutSetting.defaultNodeBorderColor
      _graphSetting.defaultNodeBorderWidth = layoutSetting.defaultNodeBorderWidth
      _graphSetting.defaultLineColor = layoutSetting.defaultLineColor
      _graphSetting.defaultLineWidth = layoutSetting.defaultLineWidth
      _graphSetting.defaultLineShape = layoutSetting.defaultLineShape
      _graphSetting.defaultNodeShape = layoutSetting.defaultNodeShape
      _graphSetting.defaultNodeWidth = layoutSetting.defaultNodeWidth
      _graphSetting.defaultNodeHeight = layoutSetting.defaultNodeHeight
      _graphSetting.defaultLineMarker = layoutSetting.defaultLineMarker
      _graphSetting.defaultShowLineLabel = layoutSetting.defaultShowLineLabel
    }
    var _layout = null
    if (layoutSetting.layoutName === 'SeeksBidirectionalTreeLayouter' || layoutSetting.layoutName === 'tree') {
      _layout = new SeeksBidirectionalTreeLayouter(layoutSetting, _graphSetting)
    } else if (layoutSetting.layoutName === 'SeeksCenterLayouter' || layoutSetting.layoutName === 'center') {
      _layout = new SeeksCenterLayouter(layoutSetting, _graphSetting)
    } else if (layoutSetting.layoutName === 'SeeksCircleLayouter' || layoutSetting.layoutName === 'circle') {
      _layout = new SeeksCircleLayouter(layoutSetting, _graphSetting)
    } else if (layoutSetting.layoutName === 'SeeksAutoLayouter' || layoutSetting.layoutName === 'force') {
      _layout = new SeeksAutoLayouter(layoutSetting, _graphSetting)
    } else if (layoutSetting.layoutName === 'SeeksFixedLayouter' || layoutSetting.layoutName === 'fixed') {
      _layout = new SeeksFixedLayouter(layoutSetting, _graphSetting)
    }
    _graphSetting.isNeedShowAutoLayoutButton = layoutSetting.allowAutoLayoutIfSupport !== false && _layout.autoLayout !== undefined
    return _layout
  },
  switchLayout(layoutLabelOrSetting, _graphSetting) {
    const __origin_nodes = _graphSetting.layouter ? _graphSetting.layouter.__origin_nodes : []
    const __rootNode = _graphSetting.layouter ? _graphSetting.layouter.rootNode : null
    if ((typeof layoutLabelOrSetting) === 'string') {
      for (var thisLayoutSetting in _graphSetting.layouts) {
        if (thisLayoutSetting.label === layoutLabelOrSetting) {
          layoutLabelOrSetting = thisLayoutSetting
          break
        }
      }
    }
    _graphSetting.layouter = SeeksRGLayouters.createLayout(layoutLabelOrSetting, _graphSetting)
    _graphSetting.layouter.__origin_nodes = __origin_nodes
    _graphSetting.layouter.rootNode = __rootNode
  }
}
export default SeeksRGLayouters
