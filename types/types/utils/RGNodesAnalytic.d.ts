import { JsonLine, JsonNode, RGNode, RGOptionsFull } from '../types';
export type NodesAnalyticResult = {
    max_deep: number;
    max_length: number;
    max_strength: number;
};
export type RGLevelDirection = -1 | 0 | 1;
export declare const RGNodesAnalytic: {
    analysisNodes(eachedNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult): void;
    analysisNodes4Didirectional(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult, levelDirect: RGLevelDirection): void;
    conductStrengthToParents(node: RGNode): void;
    analysisDataTree(thisLevelNodes: RGNode[], thisDeep: number, levelDirect?: RGLevelDirection): void;
    conductStrengthToParents4Folder(node: RGNode): void;
    analysisDataFolder(thisLevelNodes: RGNode[], thisDeep: number, levelDirect: RGLevelDirection): void;
    isAllowShowNode(thisNode: RGNode, deep?: number): boolean;
    getNodeWidth(thisNode: RGNode, graphOptions?: RGOptionsFull): number;
    getNodeHeight(thisNode: RGNode, graphOptions?: RGOptionsFull): number;
    getNodeXByLotX(graphOptions: RGOptionsFull, thisNode: RGNode): number;
    getNodeYByLotY(graphOptions: RGOptionsFull, thisNode: RGNode): number;
    getNodeXByCenterX(graphOptions: RGOptionsFull, thisNode: RGNode, x: number): number;
    getNodeYByCenterY(graphOptions: RGOptionsFull, thisNode: RGNode, y: number): number;
    getCenterXByNodeX(graphOptions: RGOptionsFull, thisNode: RGNode, x: number): number;
    getCenterYByNodeY(graphOptions: RGOptionsFull, thisNode: RGNode, y: number): number;
    getLotXByNodeX(graphOptions: RGOptionsFull, thisNode: RGNode): number;
    getLotYByNodeY(graphOptions: RGOptionsFull, thisNode: RGNode): number;
    isRectangleOverlap(rectA: any, rectB: any): boolean;
    isXOverlap(aX: number, bX: number, a_W: number, b_W: number): boolean;
    isYOverlap(aY: number, bY: number, a_H: number, b_H: number): boolean;
    shapesOverlap(nodeA: any, nodeB: any, shapeA?: number, shapeB?: number): any;
    getNoOverlapLimitedPosition(rectA: any, newX: any, newY: any, rectB: any): {
        x: any;
        y: any;
    };
    flatNodeData(orign_nodes: JsonNode[], parentNode: JsonNode | null, nodes_collect: JsonNode[], links_collect: JsonLine[]): void;
};
export default RGNodesAnalytic;
