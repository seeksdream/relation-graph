import { RelationGraphBase } from './RelationGraphBase';
import { RGListeners, RGNode, RGOptions } from '../types';
export declare class RelationGraphWith1Dom extends RelationGraphBase {
    $dom: HTMLDivElement;
    $canvasDom: HTMLDivElement;
    resizeObserver: ResizeObserver;
    resizeListenerMap: WeakMap<WeakKey, any>;
    nodeMap: WeakMap<WeakKey, any>;
    constructor(options: RGOptions, listeners: RGListeners);
    setDom(relationGraphDom: HTMLDivElement): void;
    setCanvasDom(canvasDom: HTMLDivElement): void;
    getBoundingClientRect(): DOMRect;
    addResizeListener(dom: HTMLElement, callback: (width: number, height: number) => void): void;
    private _onNodeResize;
    addNodeResizeListener(dom: HTMLElement, node: RGNode): void;
    removeNodeResizeListener(dom: HTMLElement): void;
    removeResizeListener(dom: HTMLElement): void;
}
