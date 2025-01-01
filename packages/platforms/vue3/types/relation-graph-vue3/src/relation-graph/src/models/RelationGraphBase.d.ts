import type { RGListeners, RGOptions, RGOptionsFull } from '../RelationGraph';
export declare class RelationGraphBase {
    instanceId: string;
    options: RGOptionsFull;
    listeners: RGListeners;
    constructor(options: RGOptions, listeners: RGListeners);
    enableDebugLog(enable: boolean): void;
    refreshNVAnalysisInfo(): void;
    resetViewSize(): void;
    doLayout(): void;
}
