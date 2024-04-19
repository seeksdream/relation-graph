import { RGLayouter, RGLayoutOptions, RGOptionsFull } from '../types';
import { RelationGraphFinal } from "./RelationGraphFinal";
export declare const createLayout: (layoutOptions: RGLayoutOptions, _options: RGOptionsFull, graphInstance: RelationGraphFinal) => RGLayouter;
export declare const appendDefaultOptions4Layout: (layoutOptions: RGLayoutOptions) => void;
declare const _default: {
    createLayout: (layoutOptions: RGLayoutOptions, _options: RGOptionsFull, graphInstance: RelationGraphFinal) => RGLayouter;
    appendDefaultOptions4Layout: (layoutOptions: RGLayoutOptions) => void;
};
export default _default;
