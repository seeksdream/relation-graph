import SeeksBaseLayouter from './SeeksBaseLayouter';
import { RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksFixedLayouter extends SeeksBaseLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    graphOptions: any;
    layoutOptions: any;
    allNodes: any[];
    __origin_nodes: RGNode[];
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
}
export default SeeksFixedLayouter;
