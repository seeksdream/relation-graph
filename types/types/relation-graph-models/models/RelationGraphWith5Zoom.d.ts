import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith4Line } from './RelationGraphWith4Line';
export type RGZoomCenter = {
    x: number;
    y: number;
};
export type RGCoordinate = {
    x: number;
    y: number;
};
export declare class RelationGraphWith5Zoom extends RelationGraphWith4Line {
    constructor(options: RGOptions, listeners: RGListeners);
    zoom(buff: number, userZoomCenter?: RGZoomCenter, e: WheelEvent): void;
    protected _zoomEnd(oldZoomValue: number, newZoomValue: number): void;
    setZoom(finalZoom: number, userZoomCenter?: RGZoomCenter): void;
    zoomCenter_of_newSize: {
        x: number;
        y: number;
    };
    getCanvasCoordinateByClientCoordinate(clientCoordinate: RGCoordinate): {
        x: number;
        y: number;
    };
    getClientCoordinateByCanvasCoordinate(canvasCoordinate: RGCoordinate): {
        x: number;
        y: number;
    };
    getViewPointByCanvasPoint(canvasCoordinate: RGCoordinate): {
        x: number;
        y: number;
    };
    getCanvasPointByViewPoint(canvasCoordinate: RGCoordinate): {
        x: number;
        y: number;
    };
    analysisByZoom(zoom: number, userZoomCenter?: RGZoomCenter): {
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
    showZoomCenter(userZoomCenter: RGZoomCenter | undefined, zoomBuff: number): {
        buff_x: number;
        buff_y: number;
    };
}
