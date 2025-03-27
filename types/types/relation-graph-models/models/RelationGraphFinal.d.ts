import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith92MiniView } from "./RelationGraphWith92MiniView";
export declare class RelationGraphFinal extends RelationGraphWith92MiniView {
    constructor(options: RGOptions, listeners: RGListeners);
    /**
     * [relation-graph内部使用]，这个方法会被调用，用于根据options来初始化一些配置（比如根据options.layout的配置来创建布局器）、获取视口大小等信息。
     */
    ready(): void;
}
