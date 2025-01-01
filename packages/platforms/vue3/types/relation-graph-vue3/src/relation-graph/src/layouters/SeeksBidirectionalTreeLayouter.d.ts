import type { RGLayoutOptions, RGLayouter, RGNode, RGOptionsFull, RGTreeLayoutOptions } from '../RelationGraph';
import type { NodesAnalyticResult } from '../utils/RGGraphMath';
export declare class SeeksBidirectionalTreeLayouter implements RGLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    levelDistanceArr: number[];
    graphOptions: RGOptionsFull;
    layoutOptions: RGTreeLayoutOptions;
    rootNode: RGNode | undefined;
    allNodes: RGNode[];
    __origin_nodes: RGNode[];
    refresh(): void;
    analysisNodes4Didirectional(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult, levelDirect: 1 | 0 | -1): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
    placeNodesPosition(rootNode: RGNode, allNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult): void;
    getLevelDistance(node: RGNode, level: number, perSize: number): number;
}
export default SeeksBidirectionalTreeLayouter;
