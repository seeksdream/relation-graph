import type { RelationGraphInstance } from './relation-graph/src/RelationGraph';
import type { InjectionKey, Ref } from 'vue';
export { version } from '../../package.json';
export declare const INSTALLED_KEY: unique symbol;
export declare const relationGraphKey: InjectionKey<Ref<RelationGraphInstance>>;
