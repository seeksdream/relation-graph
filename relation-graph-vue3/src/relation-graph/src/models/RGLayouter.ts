import SeeksBidirectionalTreeLayouter from '../layouters/SeeksBidirectionalTreeLayouter'
import SeeksCenterLayouter from '../layouters/SeeksCenterLayouter'
import SeeksCircleLayouter from '../layouters/SeeksCircleLayouter'
import SeeksForceLayouter from '../layouters/SeeksForceLayouter'
import { SeeksFixedLayouter } from '../layouters/SeeksFixedLayouter'
import { devLog } from '../utils/RGCommon'
import type {
  RGLayoutOptions,
  RGLayouter,
  RGOptionsFull,
} from '../RelationGraph'

export const createLayout = (
  layoutOptions: RGLayoutOptions,
  options: RGOptionsFull
): RGLayouter => {
  // _graphSetting.canvasZoom = 100;
  options.layoutClassName = layoutOptions.layoutClassName
  options.layoutLabel = layoutOptions.label
  options.layoutName = layoutOptions.layoutName
  options.layoutDirection = layoutOptions.layoutDirection

  if (layoutOptions.useLayoutStyleOptions === true) {
    // @ts-ignore
    options.defaultExpandHolderPosition =
      // @ts-ignore
      layoutOptions.defaultExpandHolderPosition
    // @ts-ignore
    options.defaultJunctionPoint = layoutOptions.defaultJunctionPoint
    // @ts-ignore
    options.defaultNodeColor = layoutOptions.defaultNodeColor
    // @ts-ignore
    options.defaultNodeFontColor = layoutOptions.defaultNodeFontColor
    // @ts-ignore
    options.defaultNodeBorderColor = layoutOptions.defaultNodeBorderColor
    // @ts-ignore
    options.defaultNodeBorderWidth = layoutOptions.defaultNodeBorderWidth
    // @ts-ignore
    options.defaultLineColor = layoutOptions.defaultLineColor
    // @ts-ignore
    options.defaultLineWidth = layoutOptions.defaultLineWidth
    // @ts-ignore
    options.defaultLineShape = layoutOptions.defaultLineShape
    // @ts-ignore
    options.defaultNodeShape = layoutOptions.defaultNodeShape
    // @ts-ignore
    options.defaultNodeWidth = layoutOptions.defaultNodeWidth
    // @ts-ignore
    options.defaultNodeHeight = layoutOptions.defaultNodeHeight
    // @ts-ignore
    options.defaultLineMarker = layoutOptions.defaultLineMarker
    // @ts-ignore
    options.defaultShowLineLabel = layoutOptions.defaultShowLineLabel
  }
  let _layout: RGLayouter
  if (
    layoutOptions.layoutName === 'SeeksBidirectionalTreeLayouter' ||
    layoutOptions.layoutName === 'tree'
  ) {
    _layout = new SeeksBidirectionalTreeLayouter(layoutOptions, options)
  } else if (
    layoutOptions.layoutName === 'SeeksCenterLayouter' ||
    layoutOptions.layoutName === 'center'
  ) {
    _layout = new SeeksCenterLayouter(layoutOptions, options)
  } else if (
    layoutOptions.layoutName === 'SeeksCircleLayouter' ||
    layoutOptions.layoutName === 'circle'
  ) {
    _layout = new SeeksCircleLayouter(layoutOptions, options)
  } else if (
    layoutOptions.layoutName === 'SeeksForceLayouter' ||
    layoutOptions.layoutName === 'force'
  ) {
    _layout = new SeeksForceLayouter(layoutOptions, options)
  } else if (
    layoutOptions.layoutName === 'SeeksFixedLayouter' ||
    layoutOptions.layoutName === 'fixed'
  ) {
    _layout = new SeeksFixedLayouter(layoutOptions, options)
  }
  options.isNeedShowAutoLayoutButton =
    layoutOptions.allowAutoLayoutIfSupport !== false &&
    _layout!.autoLayout !== undefined
  return _layout!
}
export const switchLayout = (
  layoutLabelOrLayoutOptions: RGLayoutOptions | string,
  options: RGOptionsFull
) => {
  const __origin_nodes = options.layouter ? options.layouter.__origin_nodes : []
  const __rootNode = options.layouter ? options.layouter.rootNode : undefined
  let layoutOptions = layoutLabelOrLayoutOptions
  if (typeof layoutLabelOrLayoutOptions === 'string') {
    for (const thisLayoutSetting in options.layouts) {
      if (thisLayoutSetting === layoutLabelOrLayoutOptions) {
        layoutOptions = thisLayoutSetting
        break
      }
    }
  }
  devLog('[change layout]switchLayout')
  options.layouter = createLayout(layoutOptions as RGLayoutOptions, options)
  if (options.layouter) {
    options.layouter.__origin_nodes = __origin_nodes
    options.layouter.rootNode = __rootNode
  }
}
