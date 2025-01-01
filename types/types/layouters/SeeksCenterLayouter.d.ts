import SeeksForceLayouter from './SeeksForceLayouter';
import { NodesAnalyticResult } from '../utils/RGNodesAnalytic';
import { RGCenterLayoutOptions, RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksCenterLayouter extends SeeksForceLayouter {
    layoutOptions: RGCenterLayoutOptions;
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    refresh(): Promise<void>;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
    private getLevelDistanceArr;
    getLevelR(levelDistanceArr: number[], level: number): number;
    placeRelativePosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
}
export default SeeksCenterLayouter;
