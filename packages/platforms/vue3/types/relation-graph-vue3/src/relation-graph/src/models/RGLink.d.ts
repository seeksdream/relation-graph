import type { JsonLine, RGJunctionPoint, RGLine, RGLink } from '../RelationGraph';
export declare const json2Line: (originData: JsonLine) => RGLine;
export declare const transLinkToJson: (link: RGLink, relations: JsonLine[]) => void;
export declare const JUNCTION_POINT_STYLE: {
    border: RGJunctionPoint;
    ltrb: RGJunctionPoint;
    tb: RGJunctionPoint;
    lr: RGJunctionPoint;
};
declare const _default: {
    json2Line: (originData: JsonLine) => RGLine;
    transLinkToJson: (link: RGLink, relations: JsonLine[]) => void;
};
export default _default;
