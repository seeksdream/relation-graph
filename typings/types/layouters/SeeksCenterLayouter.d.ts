import SeeksForceLayouter from './SeeksForceLayouter';
import { NodesAnalyticResult } from '../utils/RGNodesAnalytic';
import { RGCenterLayoutOptions, RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
export declare class SeeksCenterLayouter extends SeeksForceLayouter {
    layoutOptions: RGCenterLayoutOptions;
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    refresh(): Promise<void>;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
    placeRelativePosition(rootNode: RGNode, groupNodes: RGNode[], analyticResult: NodesAnalyticResult): void;
}
export default SeeksCenterLayouter;
