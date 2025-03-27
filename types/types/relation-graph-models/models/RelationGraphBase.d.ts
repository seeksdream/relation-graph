import { RGEventEmitHook, RGEventHandler, RGEventNames, RGListeners, RGOptions, RGOptionsFull } from '../types';
export declare class RelationGraphBase {
    options: RGOptionsFull;
    listeners: RGListeners;
    isReact: boolean;
    constructor(options: RGOptions, listeners: RGListeners);
    /**
     * 开启或关闭日志打印功能
     * @param enable
     */
    enableDebugLog(enable: boolean): void;
    /**
     * 用于触发更新视图的外部函数（目前仅用于React）
     */
    protected updateViewHook: () => void;
    /**
     * 用于触发更新视图的外部函数（目前仅用于React）
     * @param hook
     */
    setUpdateViewHook(hook: () => void): void;
    protected _dataUpdating: boolean;
    protected _dataUpdatingNext: boolean;
    protected _dataUpdated(): void;
    private _doSomethingAfterDataUpdated;
    protected eventHandlers: RGEventHandler[];
    /**
     * 注册事件处理函数
     * @param handler: RGEventHandler
     */
    addEventListener(handler: RGEventHandler): void;
    /**
     * 移除事件处理函数
     * @param handler: RGEventHandler
     */
    removeEventListener(handler: RGEventHandler): void;
    protected _hook: RGEventEmitHook;
    setEventEmitHook(hook: RGEventEmitHook): void;
    /**
     * 触发事件
     * @param eventName 事件名称
     * @param object 传递给事件处理函数的参数
     */
    emitEvent(eventName: RGEventNames, ...args: any[]): any;
    protected defaultEventHandler(eventName: RGEventNames, ...args: any[]): boolean | void | {
        result: any;
        handled: boolean;
    };
}
