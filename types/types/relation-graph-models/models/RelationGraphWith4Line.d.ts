import { RelationGraphWith3Image } from './RelationGraphWith3Image';
import { RGElementLine, RGLine, RGLineTextPosition, RGLink, RGListeners, RGNode, RGOptions, RGPosition } from '../types';
export type CreateJunctionPointParams = [
    from_x: number,
    from_y: number,
    to_x: number,
    to_y: number,
    f_W: number,
    f_H: number,
    t_W: number,
    t_H: number,
    nodeShape: number,
    isReverse: boolean,
    allLineSize: number,
    ri: number,
    lineDistance: number
];
export declare class RelationGraphWith4Line extends RelationGraphWith3Image {
    constructor(options: RGOptions, listeners: RGListeners);
    createReturnValue(path: string, textPosition: RGLineTextPosition): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    createLinePath(link: RGLink | RGElementLine, relationData: RGLine, ri: number, returnPathOnly?: boolean): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    private _getJunctionPoint;
    createLinePathByTwoNode(_from: RGNode, _to: RGNode, relationData: RGLine, ri?: number, allLineSize?: number, returnPathOnly?: boolean): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    createLinePathData(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    calcCurveCenter(P0: RGPosition, P1: RGPosition, P2: RGPosition, P3: RGPosition, t?: number): {
        x: number;
        y: number;
    };
    createCheckedLinePath(): string;
    createCheckedLineStrokeWidth(): number;
    getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number): string;
    getArrow(thisRelation: RGLine, link: RGLink | RGElementLine, isStartArrow?: boolean): string;
    getLineTextStyle(link: RGLink, relation: RGLine, relationIndex: number): {
        text: string;
        textOffset: string;
        textAnchor: string;
        textHPosition: string;
        textRotate: number;
    };
    protected createLineFor4(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    protected createLineFor44(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string | import("../utils/RGLinePath44Generater").LinePathInfo;
    protected createLineFor49(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    protected createLineFor41(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    protected createSameVertexLine(fx: number, fy: number, from_x: number, from_y: number, f_W: number, f_H: number): {
        path: string;
        textPosition: RGLineTextPosition;
    };
    protected createLineForCurve6(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    protected createLineForCurve(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
    protected createLineFor1(relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number, returnPathOnly?: boolean): string;
}
