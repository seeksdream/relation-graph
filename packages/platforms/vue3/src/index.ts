import {App} from "vue";
import { version as _version } from './constants';
import _RelationGraph from './relation-graph/src/core4vue3/index.vue';
import _GraphToolBar from './relation-graph/src/core4vue3/widgets/GraphMiniToolBar.vue';

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
export const GraphToolBar = _GraphToolBar;
export const version = _version;
export default _RelationGraph;
