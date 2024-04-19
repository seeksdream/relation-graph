import { RelationGraphWithData } from './RelationGraphWithData';
import type { RGListeners, RGOptions } from '../RelationGraph';
export declare class RelationGraphWithDom extends RelationGraphWithData {
    constructor(options: RGOptions, listeners: RGListeners);
    $dom: HTMLElement | undefined;
    $canvasDom: HTMLElement | undefined;
    setDom(relationGraphDom: HTMLElement): void;
    setCanvasDom(canvasDom: HTMLElement): void;
    fullscreen(newValue?: boolean): void;
}
