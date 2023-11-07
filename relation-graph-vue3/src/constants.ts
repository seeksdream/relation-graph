import type { InjectionKey, Ref } from 'vue';
import {RelationGraphInstance, RGGraphData, RGGraphReactiveData} from "../../relation-graph-vue2/src/types";
export { version } from '../../package.json';
export const INSTALLED_KEY = Symbol('INSTALLED_KEY');
export const graphInstanceKey = Symbol('graphInstance') as InjectionKey<Ref<RelationGraphInstance|undefined>>;
export const graphDataKey = Symbol('graphData') as InjectionKey<RGGraphData>;
export const graphKey = Symbol('graph') as InjectionKey<RGGraphReactiveData>;
