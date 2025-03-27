import { NodesAnalyticResult } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import { RGNode, RGOptionsFull, RGTreeLayoutOptions } from '../types';
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksSmartTreeLayouter extends SeeksBaseLayouter {
    constructor(layoutOptions: RGTreeLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    graphInstance: RelationGraphFinal;
    layoutOptions: RGTreeLayoutOptions;
    levelDistanceArr: number[];
    refresh(): Promise<void>;
    analysisNodes4Didirectional(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult): void;
    analysisBothWay(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
    placeNodesPosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    placeRelativePosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    getLevelDistance(node: RGNode, level: number, perSize: number): number;
}
export default SeeksSmartTreeLayouter;
