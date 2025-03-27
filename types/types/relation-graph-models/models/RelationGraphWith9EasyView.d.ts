import { RGLine, RGLink, RGListeners, RGNode, RGOptions } from '../types';
import { RelationGraphWith8Update } from "./RelationGraphWith8Update";
export declare class RelationGraphWith9EasyView extends RelationGraphWith8Update {
    protected $easyViewCanvas: HTMLCanvasElement;
    protected $evCanvasCtx: CanvasRenderingContext2D;
    constructor(options: RGOptions, listeners: RGListeners);
    setEasyViewCanvas(canvas: HTMLCanvasElement): void;
    startUpdateTask(): void;
    updateEasyView(): void;
    easyViewUpdating: boolean;
    protected easyViewUpdateHasNext: boolean;
    protected easyViewUpdateTimer: any;
    protected _updateEasyView(): void;
    protected evDosomethingBeforeDraw(): void;
    easyViewOffset: {
        x: number;
        y: number;
    };
    protected evDrawAllNodes(): void;
    protected evDrawNode(node: RGNode): void;
    getNodeColor(node: RGNode): string;
    setNodePeelPadding(nodePeelPadding: number): void;
    nodePeelPadding: number;
    protected evDrawNode4Rect(node: RGNode): void;
    protected evDrawNode4Circle(node: RGNode): void;
    protected evDrawAllLines(): void;
    protected evDrawLine(link: RGLink, line: RGLine, lineIndex: number): void;
    protected getPointValue(currentX: number, xOrBuffX: string, isRelative: boolean): number;
    protected evDrawSvgPathOnCanvas(ctx: any, svgPath: any): void;
}
