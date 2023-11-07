export type SizeInfo = {
    canvas_width: number;
    canvas_height: number;
    node_width: number;
    node_height: number;
};
export declare const RGGraphMath: {
    getRectPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
    };
    getRectPointBasic(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
        _case: string;
    };
    getRectJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
    };
    getRectHJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number): {
        x: number;
        y: number;
    };
    getRectVJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        y: number;
        x: number;
    };
    getBorderPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, n1style: number): any;
    getBorderPoint4MultiLine(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, n1style: number, isReserve: number, allSize: number, indexOfAll: number): any;
    getCirclePoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
    };
    getCirclePoint4MultiLine(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, isReserve: number, allSize: number, indexOfAll: number): {
        x: number;
        y: number;
    };
    getCirclePointBasic(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, radius: number): {
        x: number;
        y: number;
    };
    getCirclePointPlus(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
    };
    getOvalPoint(c_x: number, c_y: number, c_r: number, c_i: number, c_n: number): {
        x: number;
        y: number;
    };
    getAngleType(buffer_x: number, buffer_y: number): 1 | 2 | 3 | 4;
    getTextAngle(fx: number, fy: number, tx: number, ty: number): number;
    getTreePointFromTop(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromRight(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromBottom(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromLeft(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: SizeInfo): {
        x: number;
        y: number;
    };
};
export declare const getNodeDistance: (fx: number, fy: number, tx: number, ty: number) => number;
export default RGGraphMath;
