import { RelationGraphFinal } from '../../../relation-graph-models/models/RelationGraphFinal';
import BidirectionalTreeLayouter from '../../../relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from '../../../relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from '../../../relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from '../../../relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from '../../../relation-graph-models/layouters/SeeksForceLayouter';
import SeeksBaseLayouter from '../../../relation-graph-models/layouters/SeeksBaseLayouter';
import * as SeeksRGLink from '../../../relation-graph-models/models/RGLink';
import * as _RGEffectUtils from '../../../relation-graph-models/utils/RGEffectUtils';
import * as _RGNodesAnalytic from '../../../relation-graph-models/utils/RGNodesAnalytic';
import * as SeeksRGNode from '../../../relation-graph-models/models/RGNode';
import * as SeeksRGOptions from '../../../relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from '../../../relation-graph-models/models/RGLayouter';
export * from '../../../relation-graph-models/types';
export declare const RelationGraphCore: typeof RelationGraphFinal;
export declare const GraphToolBar: any;
export declare const RGMiniToolBar: any;
export declare const RGMiniView: any;
export declare const RGBackground: any;
export declare const RGWatermark: any;
export declare const RGEditingController: any;
export declare const RGEditingResize: any;
export declare const RGEditingNearNodeWidget: any;
export declare const RGEditingLineController: any;
export declare const RGEditingConnectController: any;
export declare const RGEditingCreateLineHandle: any;
export declare const RGEditingConnectPoints: any;
export declare const RGEditingReferenceLine: any;
export declare const Layout: {
    BaseLayouter: typeof SeeksBaseLayouter;
    BidirectionalTreeLayouter: typeof BidirectionalTreeLayouter;
    CenterLayouter: typeof CenterLayouter;
    CircleLayouter: typeof CircleLayouter;
    FixedLayouter: typeof FixedLayouter;
    ForceLayouter: typeof ForceLayouter;
};
export declare const RGLayouterUtils: typeof SeeksRGLayouter;
export declare const RGOptionsUtils: typeof SeeksRGOptions;
export declare const RGLinkUtils: typeof SeeksRGLink;
export declare const RGNodeUtils: typeof SeeksRGNode;
export declare const RGGraphMath: {
    getRectPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, isReserve?: boolean, allSize?: number, indexOfAll?: number, lineDistance?: number): any;
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
    getRectLeftJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number): {
        x: number;
        y: number;
    };
    getRectRightJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number): {
        x: number;
        y: number;
    };
    getRectTopJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number): {
        x: number;
        y: number;
    };
    getRectBottomJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, n1style: number, isReserve: boolean, allSize: number, indexOfAll: number, lineDistance?: number, defaultBottomJuctionPoint_X?: number): {
        x: number;
        y: number;
    };
    getRectVJoinPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        y: number;
        x: number;
    };
    getBorderPoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, n1style: number): any;
    getBorderPoint4MultiLine(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, n1style: number, isReserve: boolean, allSize: number, indexOfAll: number, lineDistance?: number): any;
    getCirclePoint(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number): {
        x: number;
        y: number;
    };
    getCirclePoint4MultiLine(x1: number, y1: number, x2: number, y2: number, n1w: number, n1h: number, n2w: number, n2h: number, isReserve: boolean, allSize: number, indexOfAll: number, lineDistance: number, tryTime?: number): {
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
    getOvalPoint(c_x: number, c_y: number, c_r: number, c_i: number, c_n: number, startAngle?: number): {
        x: number;
        y: number;
    };
    getAngleType(buffer_x: number, buffer_y: number): 1 | 2 | 3 | 4;
    getTextAngle(fx: number, fy: number, tx: number, ty: number): number;
    getTreePointFromTop(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: import("../../../relation-graph-models/utils/RGGraphMath").SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromRight(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: import("../../../relation-graph-models/utils/RGGraphMath").SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromBottom(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: import("../../../relation-graph-models/utils/RGGraphMath").SizeInfo): {
        x: number;
        y: number;
    };
    getTreePointFromLeft(c_x: number, c_y: number, c_height: number, c_i: number, c_n: number, sizehelper: import("../../../relation-graph-models/utils/RGGraphMath").SizeInfo): {
        x: number;
        y: number;
    };
};
export declare const RGNodesAnalyticUtils: typeof _RGNodesAnalytic;
export declare const RGEffectUtils: typeof _RGEffectUtils;
declare const _default: any;
export default _default;
