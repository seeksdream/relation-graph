import { RGNode } from '../types';
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
    analysisDataTree(thisLevelNodes: RGNode[], thisDeep: number, levelDirect: RGLevelDirection): void;
    isAllowShowNode(thisNode: RGNode): boolean;
};
export default RGNodesAnalytic;
