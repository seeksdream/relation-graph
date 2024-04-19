import { RelationGraphWithImage } from './RelationGraphWithImage';
import type { RGLine, RGLink, RGListeners, RGOptions } from '../RelationGraph';
export declare class RelationGraphWithLine extends RelationGraphWithImage {
    constructor(options: RGOptions, listeners: RGListeners);
    createReturnValue(path: string, textPosition: {
        x: number;
        y: number;
        rotate: number;
    }): {
        path: string;
        textPosition: {
            x: number;
            y: number;
            rotate: number;
        };
    };
    createLinePath(link: RGLink, relationData: RGLine, ri: number): {
        path: string;
        textPosition: {
            x: number;
            y: number;
            rotate: number;
        };
    };
    getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number): string;
    getArrow(thisRelation: RGLine, link: RGLink, isStartArrow?: boolean): string;
}
