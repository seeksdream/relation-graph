import { RGLine, RGLink, RGListeners, RGNode, RGOptions, RGUserEvent } from '../types';
import { RelationGraphWith91Editing } from "./RelationGraphWith91Editing";
export declare class RelationGraphWith92MiniView extends RelationGraphWith91Editing {
    $miniViewCanvas: HTMLCanvasElement;
    $mvCanvasCtx: CanvasRenderingContext2D;
    constructor(options: RGOptions, listeners: RGListeners);
    setMiniViewCanvas(canvas: HTMLCanvasElement): void;
    updateMiniView(): void;
    miniViewUpdating: boolean;
    private miniViewUpdateHasNext;
    private _updateMiniView;
    protected mvDosomethingBeforeDraw(): void;
    protected mvDrawMask(): void;
    protected miniViewBox: {
        visibleAreaStart: {
            x: number;
            y: number;
        };
        visibleAreaEnd: {
            x: number;
            y: number;
        };
        canvas_start_x: number;
        canvas_start_y: number;
        canvas_end_x: number;
        canvas_end_y: number;
        canvas_width: number;
        canvas_height: number;
        miniview_width: number;
        miniview_height: number;
    };
    protected visibleArea: {
        x: number;
        y: number;
    };
    protected mvDrawAllNodes(): void;
    protected mvDrawNode(node: RGNode): void;
    protected mvDrawNode4Rect(node: RGNode): void;
    protected mvDrawNode4Circle(node: RGNode): void;
    protected mvDrawAllLines(): void;
    protected mvDrawLine(link: RGLink, line: RGLine, lineIndex: number): void;
    protected mvDrawSvgPathOnCanvas(ctx: any, svgPath: any): void;
    private miniviewVisiableHandleMoveing;
    onVisiableViewHandleDragStart(e: RGUserEvent): void;
    resetByVisiableView(e: RGUserEvent): Promise<void>;
}
