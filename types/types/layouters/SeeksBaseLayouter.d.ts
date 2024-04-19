import { RGLayoutOptions, RGLink, RGNode, RGOptionsFull } from '../types';
import { RelationGraphFinal } from "../models/RelationGraphFinal";
export declare class SeeksBaseLayouter {
    graphOptions: RGOptionsFull;
    layoutOptions: RGLayoutOptions;
    graphInstance: RelationGraphFinal;
    allNodes: RGNode[];
    isMainLayouer: boolean;
    requireLinks: boolean;
    allLinks: RGLink[];
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull, graphInstance: RelationGraphFinal);
    rootNode: RGNode | undefined;
    setLinks(links: RGLink[]): void;
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
    currentAnimationStep: number;
    allAnimationStep: number;
    snapshotBeforeAnimation(): void;
    animationLayout(resetNodeFromPosition?: boolean): Promise<void>;
    playAnimation(callback: () => void): void;
}
export default SeeksBaseLayouter;
