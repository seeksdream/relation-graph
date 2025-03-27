/*
* relation-graph
* (c) 2019-2024 relation-graph.com
* Released under the MIT License.
* More info: https://relation-graph.com
*/
import {App} from "vue";
import { version as _version } from './constants';
import _RelationGraph from './relation-graph/src/core4vue3/index.vue';
import GraphToolBarComponent from './relation-graph/src/core4vue3/widgets/GraphMiniToolBar.vue';
import GraphXsToolBarComponent from './relation-graph/src/core4vue3/widgets/GraphXsToolBar.vue';
import GraphBackgroundComponent from './relation-graph/src/core4vue3/widgets/GraphBackground.vue';
import GraphWatermarkComponent from './relation-graph/src/core4vue3/widgets/GraphWatermark.vue';
import RGEditingControllerComponent from './relation-graph/src/core4vue3/editing/RGEditingController.vue';
import RGEditingResizeComponent from './relation-graph/src/core4vue3/editing/RGEditingResize.vue';
import RGMiniViewComponent from './relation-graph/src/core4vue3/editing/RGMiniView.vue';
import RGEditingNearNodeWidgetComponent from './relation-graph/src/core4vue3/editing/RGEditingNearNodeWidget.vue';
import RGEditingLineControllerComponent from './relation-graph/src/core4vue3/editing/RGEditingLineController.vue';
import RGEditingConnectControllerComponent from './relation-graph/src/core4vue3/editing/RGEditingConnectController.vue';
import RGEditingCreateLineHandleComponent from './relation-graph/src/core4vue3/editing/RGEditingCreateLineHandle.vue';
import RGEditingConnectPointsComponent from './relation-graph/src/core4vue3/editing/RGEditingConnectPoints.vue';
import RGEditingReferenceLineComponent from './relation-graph/src/core4vue3/editing/RGEditingReferenceLine.vue';

import { RelationGraphFinal } from '../../../relation-graph-models/models/RelationGraphFinal';
import BidirectionalTreeLayouter from '../../../relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from '../../../relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from '../../../relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from '../../../relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from '../../../relation-graph-models/layouters/SeeksForceLayouter';
import BaseLayouter from '../../../relation-graph-models/layouters/SeeksBaseLayouter';

import * as SeeksRGLink from '../../../relation-graph-models/models/RGLink';
import * as SeeksRGNode from '../../../relation-graph-models/models/RGNode';
import * as SeeksRGOptions from '../../../relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from '../../../relation-graph-models/models/RGLayouter';
import * as _RGEffectUtils from '../../../relation-graph-models/utils/RGEffectUtils';
import * as _RGNodesAnalytic from '../../../relation-graph-models/utils/RGNodesAnalytic';
import {RGGraphMath as _RGGraphMath} from '../../../relation-graph-models/utils/RGGraphMath';

export * from './types';
export * from './constants';
export const RelationGraphCore = RelationGraphFinal;
export const Layout = {
  BaseLayouter,
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
_RelationGraph.install = (app: App): void => {
  app.component('RelationGraph', _RelationGraph);
  app.component('SeeksRelationGraph', _RelationGraph);
};
export const RelationGraph = _RelationGraph;

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
export const version = _version;
export default _RelationGraph;
