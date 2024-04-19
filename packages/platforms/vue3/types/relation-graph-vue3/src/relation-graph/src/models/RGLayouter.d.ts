import type { RGLayoutOptions, RGLayouter, RGOptionsFull } from '../RelationGraph';
export declare const createLayout: (layoutOptions: RGLayoutOptions, options: RGOptionsFull) => RGLayouter;
export declare const switchLayout: (layoutLabelOrLayoutOptions: RGLayoutOptions | string, options: RGOptionsFull) => void;
