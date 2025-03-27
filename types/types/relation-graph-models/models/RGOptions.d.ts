import { RGLayoutOptions, RGOptions, RGOptionsFull, RGV2Options } from '../types';
export declare const newNodeTemplate: {
    id: string;
    x: number;
    y: number;
    text: string;
    styleClass: string;
};
export declare const createDefaultConfig: (userOptions: RGV2Options) => RGOptionsFull;
export declare const applyDefaultOptionsByLayout: (thisLayout: RGLayoutOptions, _options: RGOptionsFull) => void;
export declare const newInstanceOptions: (options: RGOptions) => RGOptionsFull;
declare const _default: {
    newInstanceOptions: (options: RGOptions) => RGOptionsFull;
    createDefaultConfig: (userOptions: RGV2Options) => RGOptionsFull;
    applyDefaultOptionsByLayout: (thisLayout: RGLayoutOptions, _options: RGOptionsFull) => void;
};
export default _default;
