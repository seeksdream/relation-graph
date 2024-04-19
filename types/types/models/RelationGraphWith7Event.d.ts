import { JsonLine, JsonNode, RGJunctionPoint, RGLine, RGLineShape, RGLink, RGListeners, RGNode, RGOptions, RGPosition, RGSelectionView, RGUserEvent } from '../types';
import { RelationGraphWith6Effect } from './RelationGraphWith6Effect';
export type RGOnCreateLineCallback = (from: RGNode, to: RGNode | RGPosition, lineTemplate?: JsonLine) => void;
export interface JsonLineTemplate extends JsonLine {
    from?: string;
    to?: string;
}
export interface JsonNodeTemplate extends JsonNode {
    id?: string;
}
export type CreatingLinePlotOptions = {
    onCreateLine: RGOnCreateLineCallback | undefined;
    template?: JsonLineTemplate;
    fromNode?: JsonNodeTemplate;
};
export type RGOnCreateNodeCallback = (from: RGNode, to: RGNode | RGPosition, lineTemplate: JsonLine) => void;
export type CreatingNodePlotOptions = {
    disableClickCreate?: boolean;
    templateText?: string;
    templateStyleClass?: string;
    templateNode?: JsonNode;
    templateMove?: (x: number, y: number) => void;
    onCreateNode: (x: number, y: number) => void;
};
export declare class RelationGraphWith7Event extends RelationGraphWith6Effect {
    constructor(options: RGOptions, listeners: RGListeners);
    setDefaultLineShape(optionValue: RGLineShape): void;
    setDefaultJunctionPoint(optionValue: RGJunctionPoint): void;
    setCheckedNode(nodeId: string): void;
    setCheckedLinkAndLine(link: RGLink, line: RGLine): void;
    clearChecked(): void;
    selectNode(node: RGNode, selected: boolean): void;
    flashNode(node: RGNode, selected: boolean): void;
    updateNodeOffsetSize(node: RGNode, nodeOffsetWidth: number, nodeOffsetHeight: number): void;
    prevClickTime: number;
    onNodeClick(node: RGNode, e: RGUserEvent): Promise<void>;
    onNodeDragStart(node: RGNode, e: RGUserEvent): void;
    onNodeDraged(node: RGNode, x_buff: number, y_buff: number, e: RGUserEvent): void;
    onNodeDragEnd(node: RGNode, e: RGUserEvent): void;
    onLineClick(line: RGLine, link: RGLink, e: RGUserEvent): Promise<void>;
    expandOrCollapseNode(node: RGNode, e: RGUserEvent): Promise<void>;
    setChildsFromPosition(node: RGNode, pnode: RGNode): void;
    expandNode(node: RGNode, e: RGUserEvent): Promise<void>;
    setChildsToPosition(node: RGNode, pnode: RGNode): void;
    collapseNode(node: RGNode, e: RGUserEvent): Promise<void>;
    onCanvasDragEnd(e: RGUserEvent): void;
    onCanvasClick(e: RGUserEvent): void;
    clickGraphMask(e: RGUserEvent): void;
    onCanvasSelectionEnd(selectionView: RGSelectionView, e: RGUserEvent): void;
    startCreatingNodePlot(e: RGUserEvent, setting: CreatingNodePlotOptions): void;
    startCreatingLinePlot(e: RGUserEvent, setting: CreatingLinePlotOptions): void;
    movingListener: any;
    stopCreatingLinePlot(): void;
    onMovingWhenCreatingLinePlot($event: MouseEvent): void;
    onCanvasClickWhenCreatingLinePlot($event: RGUserEvent): void;
    step1EventTime: number;
    onNodeClickWhenCreatingLinePlot(node: RGNode): void;
    onCreateLineCallback: RGOnCreateLineCallback | undefined;
    onCreateLine(from: RGNode, to: RGNode | RGPosition): void;
    isNode(el: HTMLElement): RGNode | undefined;
    isLink(el: HTMLElement): RGLink | undefined;
    onContextmenu(e: RGUserEvent): void;
    fullscreen(newValue?: boolean): Promise<void>;
    focusNodeById(nodeId: string): Promise<void>;
    focusRootNode(): Promise<void>;
    handleSelect(thisNode: RGNode): Promise<void>;
    onMouseWheel(e: WheelEvent): boolean;
    onLineDragStart(link: RGLink, e: RGUserEvent): void;
    onLineDragEnd(x_buff: number, y_buff: number, e: RGUserEvent): void;
    onCanvasDragStart(e: RGUserEvent): void;
    onCanvasDragStop(x_buff: number, y_buff: number, e: RGUserEvent): void;
    startCreateSelection(e: RGUserEvent): void;
}
