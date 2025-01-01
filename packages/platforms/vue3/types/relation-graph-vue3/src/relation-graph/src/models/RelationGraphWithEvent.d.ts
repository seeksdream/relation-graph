import { RelationGraphWithEffect } from './RelationGraphWithEffect';
import type { RGJunctionPoint, RGLine, RGLineShape, RGLink, RGListeners, RGNode, RGOptions } from '../RelationGraph';
export declare class RelationGraphWithEvent extends RelationGraphWithEffect {
    constructor(options: RGOptions, listeners: RGListeners);
    setDefaultLineShape(optionValue: RGLineShape): void;
    setDefaultJunctionPoint(optionValue: RGJunctionPoint): void;
    updateNodeOffsetSize(node: RGNode, nodeOffsetWidth: number, nodeOffsetHeight: number): void;
    onNodeClick(node: RGNode, e: MouseEvent | TouchEvent): void;
    onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent): void;
    expandOrCollapseNode(node: RGNode, e: MouseEvent | TouchEvent): void;
    expandNode(node: RGNode, e: MouseEvent | TouchEvent): void;
    collapseNode(node: RGNode, e: MouseEvent | TouchEvent): void;
    focusRootNode(): void;
    focusNodeById(nodeId: string): void;
    querySearchAsync(queryString: string, callback: (nodes: RGNode[]) => void): void;
    handleSelect(thisNode: RGNode): void;
}
