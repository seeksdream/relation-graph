import {App} from "vue";
import { version as _version } from './constants';
import _RelationGraph from './relation-graph/src/core4vue3/index.vue';

import { RelationGraphFinal } from '../../relation-graph-vue2/src/models/RelationGraphFinal';
import BidirectionalTreeLayouter from '../../relation-graph-vue2/src/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from '../../relation-graph-vue2/src/layouters/SeeksCenterLayouter';
import CircleLayouter from '../../relation-graph-vue2/src/layouters/SeeksCircleLayouter';
import FixedLayouter from '../../relation-graph-vue2/src/layouters/SeeksFixedLayouter';
import ForceLayouter from '../../relation-graph-vue2/src/layouters/SeeksForceLayouter';

import * as SeeksRGLink from '../../relation-graph-vue2/src/models/RGLink';
import * as SeeksRGNode from '../../relation-graph-vue2/src/models/RGNode';
import * as SeeksRGOptions from '../../relation-graph-vue2/src/models/RGOptions';
import * as SeeksRGLayouter from '../../relation-graph-vue2/src/models/RGLayouter';

export * from './types';
export const RelationGraphCore = RelationGraphFinal;
export const Layout = {
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
_RelationGraph.install = (app: App): void => {
  app.component('RelationGraph', _RelationGraph);
  app.component('SeeksRelationGraph', _RelationGraph);
};
export const RelationGraph = _RelationGraph;
export const version = _version;
export default _RelationGraph;
