import { version } from './constants';
import RelationGraph from './core4vue/index.vue';
import GraphToolBarComponent from './core4vue/widgets/GraphToolBar.vue';

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
export const GraphToolBar = GraphToolBarComponent;
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
