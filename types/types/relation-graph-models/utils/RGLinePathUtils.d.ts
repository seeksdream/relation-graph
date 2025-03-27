import { RGCoordinate, RGJunctionPoint } from "../types";
export declare enum RGDirection {
    Left = "left",
    Top = "top",
    Right = "right",
    Bottom = "bottom"
}
export declare const handleDirections: {
    [key: string]: RGCoordinate;
};
export declare function getPoints({ source, sourcePosition, target, targetPosition, center, sourceOffset, targetOffset }: {
    source: RGCoordinate;
    sourcePosition: RGDirection;
    target: RGCoordinate;
    targetPosition: RGDirection;
    center: RGCoordinate;
    sourceOffset: number;
    targetOffset: number;
}): [RGCoordinate[], number, number, number, number, number];
export declare const getEasyPoints: ({ source, sourcePosition, target, targetPosition, center, sourceOffset, targetOffset }: {
    source: RGCoordinate;
    sourcePosition: RGDirection;
    target: RGCoordinate;
    targetPosition: RGDirection;
    center: RGCoordinate;
    sourceOffset: number;
    targetOffset: number;
}) => [RGCoordinate[], number, number, number, number, number];
export declare const toIntPoints: (allPoints: RGCoordinate[]) => void;
export declare const clearSamePoint: (allPoints: RGCoordinate[]) => any[];
export declare function getBend(a: RGCoordinate, b: RGCoordinate, c: RGCoordinate, size: number): string;
export declare const createPathDataByPoints: (points: RGCoordinate[], borderRadius: number) => string;
export declare enum LVLineJunctionPoint {
    border = "border",
    ltrb = "ltrb",
    tb = "tb",
    lr = "lr",
    left = "left",
    right = "right",
    top = "top",
    bottom = "bottom"
}
export declare const getJunctionPointDirection: (junctionPoint: RGJunctionPoint | undefined, x: number, y: number) => RGDirection;
export declare const getReverseJPDirection: (dir: RGDirection) => RGDirection;
export declare const getJPDirectionByPoint: (point1: RGCoordinate, point2: RGCoordinate) => RGDirection;
export type SvgPathPoints = {
    startPoint: RGCoordinate;
    ctrl1: RGCoordinate;
    ctrl2: RGCoordinate;
    endPoint: RGCoordinate;
    lines: RGCoordinate[];
};
export declare const calculatePolylineCenter: (points: RGCoordinate[]) => RGCoordinate;
