import { RelationGraphWithZoom } from './RelationGraphWithZoom';
import type { RGListeners, RGNode, RGOptions, RGRefreshCallback } from '../RelationGraph';
export declare class RelationGraphWithEffect extends RelationGraphWithZoom {
    constructor(options: RGOptions, listeners: RGListeners);
    doLayout(): void;
    refresh(callback: RGRefreshCallback): void;
    resetViewSize(): void;
    dataUpdated(): void;
    refreshNVAnalysisInfo(): void;
    getStuffSize(): {
        width: number;
        height: number;
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
    };
    getNodesCenter(): {
        x: number;
        y: number;
    };
    setCanvasCenter(x: number, y: number): void;
    setCanvasOffset(x: number, y: number): void;
    playShowEffect(callback: RGRefreshCallback): void;
    zoomToFitWhenRefresh(callback: RGRefreshCallback): void;
    findChilds(node: RGNode, childs: RGNode[]): void;
    placeSingleNode(): void;
    zoomToFit(callback: RGRefreshCallback): void;
    animateGoto(x: number, y: number, time: number, callback: RGRefreshCallback): void;
    animateToZoom(finalZoom: number, time: number, callback: RGRefreshCallback): void;
    animateStepAction(stepIndex: number, delay: number, allStepNum: number, stepCallback: (tepIndex: number, allStepNum: number) => void, finalCallback: () => void): void;
    startAutoLayout(): void;
    stopAutoLayout(): void;
}
