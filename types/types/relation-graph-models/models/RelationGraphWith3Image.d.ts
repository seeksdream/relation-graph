import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith2Data } from './RelationGraphWith2Data';
export declare class RelationGraphWith3Image extends RelationGraphWith2Data {
    constructor(options: RGOptions, listeners: RGListeners);
    private $watermarkDom;
    private $watermarkPosition;
    private $backgroundDom;
    setWatermarkDom(watermarkDom: HTMLDivElement | null, forImage?: boolean, forDisplay?: boolean, position?: string): void;
    setBackgroundDom(backgroundDom: HTMLDivElement | null, forImage?: boolean, forDisplay?: boolean): void;
    dataURLToBlob(dataurl: string): Blob;
    createGraphCanvas(format?: string): Promise<HTMLCanvasElement>;
    private mergeCanvas;
    private createGraphBackgroundCanvas;
    private createGraphWatermarkCanvas;
    private createGraphMainCanvas;
    createImage(exportDom: HTMLDivElement, opts: any, format: string, fileName: string): Promise<any>;
    getImageBase64(format?: string): Promise<string>;
    downloadAsImage(format?: string, fileName?: string): Promise<void>;
    downloadImageAsFile(canvas: HTMLCanvasElement, format: string, fileName: string): Promise<void>;
}
