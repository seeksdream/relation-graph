import { RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
export declare class SeeksBaseLayouter {
    graphOptions: RGOptionsFull;
    layoutOptions: RGLayoutOptions;
    allNodes: RGNode[];
    isMainLayouer: boolean;
    constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull);
    rootNode: RGNode | undefined;
    refresh(): void;
    placeNodes(allNodes: RGNode[], rootNode?: RGNode): void;
    currentAnimationStep: number;
    allAnimationStep: number;
    snapshotBeforeAnimation(): void;
    animationLayout(resetNodeFromPosition?: boolean): Promise<void>;
    playAnimation(callback: () => void): void;
}
export default SeeksBaseLayouter;
