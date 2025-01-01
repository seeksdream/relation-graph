import { RelationGraphWithDom } from './RelationGraphWithDom';
import type { RGListeners, RGOptions, RGPosition } from '../RelationGraph';
export declare class RelationGraphWithZoom extends RelationGraphWithDom {
    constructor(options: RGOptions, listeners: RGListeners);
    zoom(buff: number, userZoomCenter?: RGPosition): void;
    setZoom(finalZoom: number, userZoomCenter?: RGPosition): void;
    zoomCenter_of_newSize: {
        x: number;
        y: number;
    };
    showZoomCenter(zoomBuff: number, userZoomCenter?: RGPosition): {
        buff_x: number;
        buff_y: number;
    } | undefined;
    analysisByZoom(zoom: number, userZoomCenter?: RGPosition): {
        NMViewPosition: {
            x: number;
            y: number;
        };
        NMViewCenter: {
            x: number;
            y: number;
        };
        NMCanvasCenter: {
            x: number;
            y: number;
        };
        NMCanvasStart: {
            x: number;
            y: number;
        };
        NMCanvasEnd: {
            x: number;
            y: number;
        };
        NMZoomCenter: {
            x: number;
            y: number;
        };
        NMViewBuff: {
            x: number;
            y: number;
        };
        NMCanvasOffsetBuff: {
            x: number;
            y: number;
        };
        NMCanvasSize: {
            width: number;
            height: number;
        };
    };
}
