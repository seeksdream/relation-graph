import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith8Update } from "./RelationGraphWith8Update";
export declare class RelationGraphWith9EasyView extends RelationGraphWith8Update {
    $easyViewCanvas: HTMLCanvasElement;
    $canvasCtx: CanvasRenderingContext2D;
    constructor(options: RGOptions, listeners: RGListeners);
    setEasyViewCanvas(canvas: HTMLCanvasElement): void;
    startUpdateTask(): void;
    updateEasyView(): void;
    easyViewUpdating: boolean;
    private easyViewUpdateHasNext;
    private easyViewUpdateTimer;
    private _updateEasyView;
    private dosomethingBeforeDraw;
    easyViewOffset: {
        x: number;
        y: number;
    };
    private drawAllNodes;
    private drawNode;
    private getNodeColor;
    private drawNode4Rect;
    private drawNode4Circle;
    private drawAllLines;
    private drawLine;
    private getPointValue;
    private drawSvgPathOnCanvas;
}
