import { RGCoordinate, RGDirection, RGLine, RGLineTextPosition } from "../types";
export type LinePathInfo = {
    pathData: string;
    textPosition: RGCoordinate;
    points: RGCoordinate[];
    startDirection?: RGDirection;
    endDirection?: RGDirection;
};
export declare const createLine44PathData: (relation: RGLine, textPosition: RGLineTextPosition, allLineSize: number, indexOfAllLine: number, lineDirection: string, lineShape: number, fx: number, fy: number, fcx: number, fcy: number, f_W: number, f_H: number, tx: number, ty: number, tcx: number, tcy: number, t_W: number, t_H: number) => LinePathInfo;
