import { RGEventHandler, RGListeners, RGOptions, RGOptionsFull } from '../types';
export declare class RelationGraphBase {
    options: RGOptionsFull;
    listeners: RGListeners;
    isReact: boolean;
    constructor(options: RGOptions, listeners: RGListeners);
    enableDebugLog(enable: boolean): void;
    updateViewHook: () => void;
    setUpdateViewHook(hook: () => void): void;
    _dataUpdating: boolean;
    _dataUpdatingNext: boolean;
    protected _dataUpdated(): void;
    private _doSomethingAfterDataUpdated;
    eventHandlers: RGEventHandler[];
    addEventListener(handler: RGEventHandler): void;
    removeEventListener(handler: RGEventHandler): void;
    emitEvent(eventName: string, object: {
        [option: string]: any;
    }): void;
}
