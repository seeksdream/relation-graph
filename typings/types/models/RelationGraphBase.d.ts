import { RGListeners, RGOptions, RGOptionsFull } from '../types';
export declare class RelationGraphBase {
    options: RGOptionsFull;
    listeners: RGListeners;
    isReact: boolean;
    constructor(options: RGOptions, listeners: RGListeners);
    enableDebugLog(enable: boolean): void;
    updateViewHook: () => void;
    setUpdateViewHook(hook: () => void): void;
    protected _dataUpdated(): void;
}
