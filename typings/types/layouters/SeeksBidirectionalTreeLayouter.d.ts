import { NodesAnalyticResult, RGLevelDirection } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import { RGNode, RGOptionsFull, RGTreeLayoutOptions } from '../types';
export declare class SeeksBidirectionalTreeLayouter extends SeeksBaseLayouter {
    constructor(layoutOptions: RGTreeLayoutOptions, graphOptions: RGOptionsFull);
    layoutOptions: RGTreeLayoutOptions;
    levelDistanceArr: number[];
    refresh(): Promise<void>;
    analysisNodes4Didirectional(willLayoutNodes: RGNode[], thisLevelNodes: RGNode[], thisDeep: number, analyticResult: NodesAnalyticResult, levelDirect: RGLevelDirection): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
    placeNodesPosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    placeRelativePosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
    getLevelDistance(node: RGNode, level: number, perSize: number): number;
}
export default SeeksBidirectionalTreeLayouter;
