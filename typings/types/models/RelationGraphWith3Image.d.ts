import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith2Data } from './RelationGraphWith2Data';
export declare class RelationGraphWith3Image extends RelationGraphWith2Data {
    constructor(options: RGOptions, listeners: RGListeners);
    dataURLToBlob(dataurl: string): Blob;
    createGraphCanvas(format?: string): Promise<HTMLCanvasElement>;
    createImage(exportDom: HTMLDivElement, opts: any, format: string, fileName: string, callback: (canvas: HTMLCanvasElement) => void): void;
    getImageBase64(format?: string): Promise<string>;
    downloadAsImage(format?: string, fileName?: string): Promise<void>;
    downloadImageAsFile(canvas: HTMLCanvasElement, format: string, fileName: string): Promise<void>;
}
