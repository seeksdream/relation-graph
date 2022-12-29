import RelationGraph from './core4vue/index.vue';
import { RelationGraphFinal } from '@/models/RelationGraphFinal';
import SeeksBidirectionalTreeLayouter from '@/layouters/SeeksBidirectionalTreeLayouter';
import { SeeksCenterLayouter } from '@/layouters/SeeksCenterLayouter';
import SeeksCircleLayouter from '@/layouters/SeeksCircleLayouter';
import SeeksFixedLayouter from '@/layouters/SeeksFixedLayouter';
import SeeksForceLayouter from '@/layouters/SeeksForceLayouter';

// RelationGraph.install = function(Vue) {
//   Vue.component('RelationGraph', RelationGraph);
//   Vue.component('SeeksRelationGraph', RelationGraph);
// };
export const RelationGraphCore = RelationGraphFinal;
export const BidirectionalTreeLayouter = SeeksBidirectionalTreeLayouter;
export const CenterLayouter = SeeksCenterLayouter;
export const CircleLayouter = SeeksCircleLayouter;
export const FixedLayouter = SeeksFixedLayouter;
export const ForceLayouter = SeeksForceLayouter;
export default {
  ...RelationGraph,
  install(Vue, options) {
    Vue.component('RelationGraph', RelationGraph);
    Vue.component('SeeksRelationGraph', RelationGraph);
  }
};
