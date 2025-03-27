export type RGDataModelWithPosition = {
    x: number;
    y: number;
};
export type RGPositionInfo = {
    x: number;
    y: number;
};
export type RGDragedCallback = (buff_x: number, buff_y: number, e: MouseEvent | TouchEvent) => void;
export type RGDraggingCallback = (offsetX: number, offsetY: number, startNodeInfo: RGPositionInfo, startEventInfo: RGPositionInfo, event: MouseEvent | TouchEvent) => void;
export type RGDragging = (ex: number, ey: number, event: MouseEvent | TouchEvent) => void;
declare const RGEffectUtils: {
    startDrag(e: MouseEvent | TouchEvent, startPositionModel: RGDataModelWithPosition, ondraged: RGDragedCallback, ondragging: RGDraggingCallback | undefined): void;
    onNodeMove(e: MouseEvent | TouchEvent): void;
    onNodeDragend(e: MouseEvent | TouchEvent): void;
};
export default RGEffectUtils;
