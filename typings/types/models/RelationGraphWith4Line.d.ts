import { RelationGraphWith3Image } from './RelationGraphWith3Image';
import { RGLine, RGLink, RGListeners, RGOptions } from '../types';
export type RGLineTextPosition = {
    x: number;
    y: number;
    rotate: number;
};
export declare class RelationGraphWith4Line extends RelationGraphWith3Image {
    constructor(options: RGOptions, listeners: RGListeners);
    createReturnValue(path: string, textPosition: RGLineTextPosition): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    createLinePath(link: RGLink, relationData: RGLine, ri: number): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number): string;
    getArrow(thisRelation: RGLine, link: RGLink, isStartArrow?: boolean): string;
}
