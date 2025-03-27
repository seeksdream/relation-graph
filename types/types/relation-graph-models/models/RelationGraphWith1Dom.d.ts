import { RelationGraphBase } from './RelationGraphBase';
import { RGListeners, RGNode, RGOptions } from '../types';
export declare class RelationGraphWith1Dom extends RelationGraphBase {
    $dom: HTMLDivElement;
    $canvasDom: HTMLDivElement;
    protected resizeObserver: ResizeObserver;
    protected resizeListenerMap: WeakMap<WeakKey, any>;
    protected nodeMap: WeakMap<WeakKey, any>;
    constructor(options: RGOptions, listeners: RGListeners);
    /**
     * [relation-graph内部使用]当RelationGraph组件被挂载后，会调用这个方法，用于在js实例对象中方便对dom进行操作（这里仅仅会获取dom视觉信息并监测器大小位置信息的变化）
     * @param relationGraphDom:HTMLDivElement RelationGraph容器dom
     */
    setDom(relationGraphDom: HTMLDivElement): void;
    /**
     * [relation-graph内部使用]当RelationGraph组件的画布元素被挂载后，会调用这个方法，用于在js实例对象中方便对画布dom进行操作（这里仅仅会获取dom视觉信息并监测器大小位置信息的变化）
     * @param relationGraphDom:HTMLDivElement 画布dom
     */
    setCanvasDom(canvasDom: HTMLDivElement): void;
    /**
     * 获取RelationGraph组件dom
     * @return relationGraphDom:HTMLDivElement RelationGraph容器dom
     */
    getBoundingClientRect(): DOMRect;
    protected addResizeListener(dom: HTMLElement, callback: (width: number, height: number) => void): void;
    private _onNodeResize;
    /**
     * [relation-graph内部使用]用于Node组件在挂载完成时，调用此方法可以将Node的dom大小变化监测起来。
     * @param dom Node组件对应的dom元素
     * @param node Node的js数据对象
     */
    addNodeResizeListener(dom: HTMLElement, node: RGNode): void;
    /**
     * [relation-graph内部使用]在Node 组件被销毁时，调用此方法移除对Node对应的dom元素的监测
     * @param dom Node组件对应的dom元素
     */
    removeNodeResizeListener(dom: HTMLElement): void;
    protected removeResizeListener(dom: HTMLElement): void;
}
