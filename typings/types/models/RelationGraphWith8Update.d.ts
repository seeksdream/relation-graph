import { RGJsonData, RGLayouter, RGLayoutOptions, RGListeners, RGOptions } from '../types';
import { RelationGraphWith7Event } from './RelationGraphWith7Event';
export declare class RelationGraphWith8Update extends RelationGraphWith7Event {
    constructor(options: RGOptions, listeners: RGListeners);
    dataUpdated(): void;
    setOptions(options: RGOptions, justUpdateOptionsValue?: boolean): Promise<void>;
    setLayouter(userLayouerInstance: RGLayouter): void;
    switchLayout(newLayoutOptions: RGLayoutOptions, refreshGraph?: boolean, useAnimation?: boolean): Promise<void>;
    setJsonData(jsonData: RGJsonData, resetViewSize?: boolean): Promise<void>;
    appendJsonData(jsonData: RGJsonData, isRelayout?: boolean): Promise<void>;
}
