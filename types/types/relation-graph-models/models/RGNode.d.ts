import { JsonNode, RGNode, RGOptions } from '../types';
export declare const json2Node: (originData: JsonNode, graphOptions?: RGOptions) => RGNode;
export declare const transNodeToJson: (node: RGNode) => JsonNode | undefined;
declare const _default: {
    json2Node: (originData: JsonNode, graphOptions?: RGOptions) => RGNode;
    transNodeToJson: (node: RGNode) => JsonNode | undefined;
};
export default _default;
