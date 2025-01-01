import SeeksForceLayouter from "./SeeksForceLayouter";
import { RGLayoutOptions, RGNode, RGOptionsFull } from "../types";
export declare class SeeksCircleLayouter extends SeeksForceLayouter {
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    refresh(): Promise<void>;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): Promise<void>;
}
export default SeeksCircleLayouter;
