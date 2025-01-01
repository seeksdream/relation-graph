import { JsonNode, RGNode } from '../types';
export declare const json2Node: (originData: JsonNode) => RGNode;
export declare const transNodeToJson: (node: RGNode) => JsonNode | undefined;
declare const _default: {
    json2Node: (originData: JsonNode) => RGNode;
    transNodeToJson: (node: RGNode) => JsonNode;
};
export default _default;
