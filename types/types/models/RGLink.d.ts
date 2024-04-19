import { JsonLine, RGLine, RGLink } from '../types';
export declare const json2Line: (originData: JsonLine) => RGLine;
export declare const transLinkToJson: (link: RGLink, relations: JsonLine[]) => void;
export declare const JUNCTION_POINT_STYLE: {
    border: string;
    ltrb: string;
    tb: string;
    lr: string;
    left: string;
    right: string;
    top: string;
    bottom: string;
};
declare const _default: {
    json2Line: (originData: JsonLine) => RGLine;
    transLinkToJson: (link: RGLink, relations: JsonLine[]) => void;
};
export default _default;
