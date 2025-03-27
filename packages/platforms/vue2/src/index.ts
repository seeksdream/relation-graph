/*
* relation-graph
* (c) 2019-2024 relation-graph.com
* Released under the MIT License.
* More info: https://relation-graph.com
*/
import { version } from '../../../relation-graph-models/constants';
import RelationGraph from './core4vue/index.vue';
// import RGSlotOnCanvasAboveComponent from './core4vue/slots/RGSlotOnCanvasAbove';
// import RGSlotOnGraphComponent from './core4vue/slots/RGSlotOnGraph';
// import RGSlotOnLineComponent from './core4vue/slots/RGSlotOnLine.vue';
// import RGSlotOnNodeComponent from './core4vue/slots/RGSlotOnNode.vue';
// import RGSlotOnNodeExpandHandleComponent from './core4vue/slots/RGSlotOnNodeExpandHandle.vue';
// import RGSlotOnToolbarComponent from './core4vue/slots/RGSlotOnToolbar.vue';
import GraphToolBarComponent from './core4vue/widgets/GraphToolBar.vue';
import GraphXsToolBarComponent from './core4vue/widgets/GraphXsToolBar.vue';
import GraphBackgroundComponent from './core4vue/widgets/GraphBackground.vue';
import GraphWatermarkComponent from './core4vue/widgets/GraphWatermark.vue';
import RGEditingControllerComponent from './core4vue/editing/RGEditingController.vue';
import RGEditingResizeComponent from './core4vue/editing/RGEditingResize.vue';
import RGMiniViewComponent from './core4vue/editing/RGMiniView.vue';
import RGEditingNearNodeWidgetComponent from './core4vue/editing/RGEditingNearNodeWidget.vue';
import RGEditingLineControllerComponent from './core4vue/editing/RGEditingLineController.vue';
import RGEditingConnectControllerComponent from './core4vue/editing/RGEditingConnectController.vue';
import RGEditingCreateLineHandleComponent from './core4vue/editing/RGEditingCreateLineHandle.vue';
import RGEditingConnectPointsComponent from './core4vue/editing/RGEditingConnectPoints.vue';
import RGEditingReferenceLineComponent from './core4vue/editing/RGEditingReferenceLine.vue';
import { RelationGraphFinal } from '../../../relation-graph-models/models/RelationGraphFinal';
import BidirectionalTreeLayouter from '../../../relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from '../../../relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from '../../../relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from '../../../relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from '../../../relation-graph-models/layouters/SeeksForceLayouter';
import SeeksBaseLayouter from '../../../relation-graph-models/layouters/SeeksBaseLayouter';

import * as SeeksRGLink from '../../../relation-graph-models/models/RGLink';
import {RGGraphMath as _RGGraphMath} from '../../../relation-graph-models/utils/RGGraphMath';
import * as _RGEffectUtils from '../../../relation-graph-models/utils/RGEffectUtils';
import * as _RGNodesAnalytic from '../../../relation-graph-models/utils/RGNodesAnalytic';
import * as SeeksRGNode from '../../../relation-graph-models/models/RGNode';
import * as SeeksRGOptions from '../../../relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from '../../../relation-graph-models/models/RGLayouter';

export * from '../../../relation-graph-models/types';
export const RelationGraphCore = RelationGraphFinal;
// export const RGSlotOnCanvasAbove = RGSlotOnCanvasAboveComponent;
// export const RGSlotOnGraph = RGSlotOnGraphComponent;
// export const RGSlotOnLine = RGSlotOnLineComponent;
// export const RGSlotOnNode = RGSlotOnNodeComponent;
// export const RGSlotOnNodeExpandHandle = RGSlotOnNodeExpandHandleComponent;
// export const RGSlotOnToolbar = RGSlotOnToolbarComponent;

export const GraphToolBar = GraphToolBarComponent;
export const RGMiniToolBar = GraphXsToolBarComponent;
export const RGMiniView = RGMiniViewComponent;
export const RGBackground = GraphBackgroundComponent;
export const RGWatermark = GraphWatermarkComponent;
export const RGEditingController = RGEditingControllerComponent;
export const RGEditingResize = RGEditingResizeComponent;
export const RGEditingNearNodeWidget = RGEditingNearNodeWidgetComponent;
export const RGEditingLineController = RGEditingLineControllerComponent;
export const RGEditingConnectController = RGEditingConnectControllerComponent;
export const RGEditingCreateLineHandle = RGEditingCreateLineHandleComponent;
export const RGEditingConnectPoints = RGEditingConnectPointsComponent;
export const RGEditingReferenceLine = RGEditingReferenceLineComponent;
export const Layout = {
  BaseLayouter: SeeksBaseLayouter,
  BidirectionalTreeLayouter,
  CenterLayouter,
  CircleLayouter,
  FixedLayouter,
  ForceLayouter
};
export const RGLayouterUtils = SeeksRGLayouter;
export const RGOptionsUtils = SeeksRGOptions;
export const RGLinkUtils = SeeksRGLink;
export const RGNodeUtils = SeeksRGNode;
export const RGGraphMath = _RGGraphMath;
export const RGNodesAnalyticUtils = _RGNodesAnalytic;
export const RGEffectUtils = _RGEffectUtils;
const install = (Vue:any, options?:any) => {
  Vue.component('RelationGraph', RelationGraph);
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
const rg = RelationGraph;// as RelationGraphVueComponent;
export default {
  ...rg,
  version,
  install
};
