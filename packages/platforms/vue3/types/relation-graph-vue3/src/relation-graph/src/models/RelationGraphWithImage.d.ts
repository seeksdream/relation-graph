import { RelationGraphWithEvent } from './RelationGraphWithEvent';
import type { RGListeners, RGOptions } from '../RelationGraph';
export declare class RelationGraphWithImage extends RelationGraphWithEvent {
    constructor(options: RGOptions, listeners: RGListeners);
    dataURLToBlob(dataurl: string): Blob;
    downloadAsImage(fileName?: string, format?: string): void;
    createImage(exportDom: HTMLElement, opts: {
        [key: string]: any;
    }, format: string, fileName: string, callback: () => void): void;
}
