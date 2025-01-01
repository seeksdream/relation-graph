import type { RGDragedCallback, RGDraggingCallback } from '../RelationGraph';
export declare type RGDraggingFn = (offsetX: number, offsetY: number, event: MouseEvent | TouchEvent) => void;
declare const RGEffectUtils: {
    startDrag(e: MouseEvent | TouchEvent, startPositionModel: {
        x: number;
        y: number;
    }, ondraged?: RGDragedCallback, ondragging?: RGDraggingCallback): void;
    onNodeMove(e: MouseEvent | TouchEvent): void;
    onNodeDragend(e: MouseEvent | TouchEvent): void;
    getColorId(color: string): string;
};
export default RGEffectUtils;
