import type { RGLayoutOptions, RGLayouter, RGNode, RGOptionsFull } from '../RelationGraph';
import type { NodesAnalyticResult } from '../utils/RGGraphMath';
export declare class SeeksForceLayouter implements RGLayouter {
    graphOptions: RGOptionsFull;
    layoutOptions: RGLayoutOptions;
    rootNode: RGNode | undefined;
    allNodes: RGNode[];
    __origin_nodes: RGNode[];
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
    analysisNodes(): void;
    initNodesPosition(): void;
    placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult): void;
    layoutTimes: number;
    maxLayoutTimes: number;
    justLayoutSingleNode: boolean;
    byNode: boolean;
    byLine: boolean;
    autoLayout(forceLayout?: boolean): void;
    stop(): void;
    addElasticByLine(node1: RGNode, node2: RGNode): void;
    addGravityByNode(node1: RGNode, node2: RGNode): void;
    getNodeFWeight(node: RGNode): number;
    addFtoNode(node: RGNode, x: number, y: number): void;
    applyToNodePosition(node: RGNode): void;
}
export default SeeksForceLayouter;
