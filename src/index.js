import RelationGraph from './core4vue/index.vue';
import { RelationGraphFinal } from '@/models/RelationGraphFinal';
import BidirectionalTreeLayouter from '@/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from '@/layouters/SeeksCenterLayouter';
import CircleLayouter from '@/layouters/SeeksCircleLayouter';
import FixedLayouter from '@/layouters/SeeksFixedLayouter';
import ForceLayouter from '@/layouters/SeeksForceLayouter';

import * as SeeksRGLink from '@/models/RGLink';
import * as SeeksRGNode from '@/models/RGNode';
import * as SeeksRGOptions from '@/models/RGOptions';

// RelationGraph.install = function(Vue) {
//   Vue.component('RelationGraph', RelationGraph);
//   Vue.component('SeeksRelationGraph', RelationGraph);
// };
export const RelationGraphCore = RelationGraphFinal;
export const Layout = {
  BidirectionalTreeLayouter,
  CenterLayouter,
  CircleLayouter,
  FixedLayouter,
  ForceLayouter
};
export const RGOptions = SeeksRGOptions;
export const RGLink = SeeksRGLink;
export const RGNode = SeeksRGNode;
const install = (Vue, options) => {
  // console.log('install:RelationGraph');
  Vue.component('RelationGraph', RelationGraph);
  Vue.component('SeeksRelationGraph', RelationGraph);
  // console.log('install:RelationGraph:ok:', RelationGraph);
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  // console.log('run:install:RelationGraph');
  install(window.Vue);
}
export default {
  ...RelationGraph,
  RelationGraphCore,
  Layout,
  RGOptions,
  RGLink,
  RGNode,
  install
};
