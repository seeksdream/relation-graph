import SeeksForceLayouter from './SeeksForceLayouter';
import type { RGLayoutOptions, RGLayouter, RGNode, RGOptionsFull } from '../RelationGraph';
export declare class SeeksCircleLayouter extends SeeksForceLayouter implements RGLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    __max_deep: number;
    __max_length: number;
    checkMaxDeepAndLength(thisLevelNodes: RGNode[], thisDeep: number): void;
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
}
export default SeeksCircleLayouter;
