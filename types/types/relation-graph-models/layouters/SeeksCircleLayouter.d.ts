import SeeksForceLayouter from "./SeeksForceLayouter";
import { RGLayoutOptions, RGNode, RGOptionsFull } from "../types";
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksCircleLayouter extends SeeksForceLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    refresh(): Promise<void>;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
}
export default SeeksCircleLayouter;
