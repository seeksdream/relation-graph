import type { RelationGraphInstance } from './relation-graph/src/RelationGraph';
import type { InjectionKey, Ref } from 'vue';
// @ts-ignore
export { version } from '../../package.json';

export const INSTALLED_KEY = Symbol('INSTALLED_KEY');
export const relationGraphKey = Symbol() as InjectionKey<Ref<RelationGraphInstance>>;
