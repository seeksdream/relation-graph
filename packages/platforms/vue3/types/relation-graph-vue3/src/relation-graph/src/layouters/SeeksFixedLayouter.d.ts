import type { RGLayoutOptions, RGLayouter, RGNode, RGOptionsFull } from '../RelationGraph';
export declare class SeeksFixedLayouter implements RGLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    graphOptions: RGOptionsFull;
    layoutOptions: RGLayoutOptions;
    rootNode: RGNode | undefined;
    allNodes: RGNode[];
    __origin_nodes: RGNode[];
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
}
export default SeeksFixedLayouter;
