import { RGLayouter, RGLayoutOptions, RGListeners, RGNode, RGOptions } from '../types';
import { RelationGraphWith5Zoom } from './RelationGraphWith5Zoom';
export declare class RelationGraphWith6Effect extends RelationGraphWith5Zoom {
    constructor(options: RGOptions, listeners: RGListeners);
    doLayout(): Promise<void>;
    refresh(doLayout?: boolean): Promise<void>;
    playShowEffect(): Promise<void>;
    moveToCenter(): void;
    zoomToFitWhenRefresh(): Promise<void>;
    private _mainGroupNodes;
    placeOtherNodes(): Promise<void>;
    placeSingleNodes(singleNodes: RGNode[]): void;
    placeOtherGroup(notPlacedNodes: RGNode[], placedNodes: RGNode[]): Promise<void>;
    zoomToFit(callback?: () => void): void;
    animateGoto(x: number, y: number, time: number): Promise<void>;
    animateToZoom(finalZoom: number, time: number): Promise<void>;
    animateStepAction(stepIndex: number, delay: number, allStepNum: number, stepCallback: (stepIndex: number, allStepNum: number) => void, finalCallback: () => void): void;
    toggleAutoLayout(): void;
    startAutoLayout(): void;
    stopAutoLayout(): void;
    sleep(time: number): Promise<void>;
    createLayout(layoutOptions: RGLayoutOptions): RGLayouter;
}
