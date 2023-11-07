import { RelationGraphBase } from './RelationGraphBase';
import { RGListeners, RGOptions } from '../types';
export declare class RelationGraphWith1Dom extends RelationGraphBase {
    $dom: HTMLDivElement;
    $canvasDom: HTMLDivElement;
    constructor(options: RGOptions, listeners: RGListeners);
    setDom(relationGraphDom: HTMLDivElement): void;
    setCanvasDom(canvasDom: HTMLDivElement): void;
    getBoundingClientRect(): DOMRect;
}
