import SeeksForceLayouter from './SeeksForceLayouter';
import type { RGCenterLayoutOptions, RGLayoutOptions, RGLayouter, RGNode, RGOptionsFull } from '../RelationGraph';
import type { NodesAnalyticResult } from '../utils/RGGraphMath';
export declare class SeeksCenterLayouter extends SeeksForceLayouter implements RGLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    layoutOptions: RGCenterLayoutOptions;
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
    placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult): void;
}
export default SeeksCenterLayouter;
