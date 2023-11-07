import { version } from './constants';
import RelationGraph from './core4vue/index.vue';
import { RelationGraphFinal } from './models/RelationGraphFinal';
import BidirectionalTreeLayouter from './layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './layouters/SeeksCenterLayouter';
import CircleLayouter from './layouters/SeeksCircleLayouter';
import FixedLayouter from './layouters/SeeksFixedLayouter';
import ForceLayouter from './layouters/SeeksForceLayouter';

import * as SeeksRGLink from './models/RGLink';
import * as SeeksRGNode from './models/RGNode';
import * as SeeksRGOptions from './models/RGOptions';
import * as SeeksRGLayouter from './models/RGLayouter';

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
