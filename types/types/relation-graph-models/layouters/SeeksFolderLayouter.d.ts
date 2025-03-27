import { NodesAnalyticResult, RGLevelDirection } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import { RGNode, RGOptionsFull, RGTreeLayoutOptions } from '../types';
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksFolderLayouter extends SeeksBaseLayouter {
    constructor(layoutOptions: RGTreeLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    enableGatherNodes: boolean;
    layoutOptions: RGTreeLayoutOptions;
    levelDistanceArr: number[];
    refresh(): Promise<void>;
    analysisNodes4Didirectional(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult, levelDirect: RGLevelDirection): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
    placeNodesPosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    placeRelativePosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    gatherNodes(groupNodes: RGNode[], hv: 'h' | 'v', perSize: number): void;
    getBloomingNearByParent(node: RGNode, parentNode: RGNode, levelNodes: RGNode[], hv: 'h' | 'v'): RGNode | undefined;
    getLevelDistance(node: RGNode, level: number, perSize: number): number;
}
export default SeeksFolderLayouter;
