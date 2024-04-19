import { RelationGraphBase } from './RelationGraphBase';
import type { JsonLine, JsonNode, RGJsonData, RGLayouter, RGLink, RGListeners, RGNode, RGOptions, RGRefreshCallback } from '../RelationGraph';
export declare class RelationGraphWithData extends RelationGraphBase {
    graphData: {
        rootNode: RGNode | undefined;
        nodes: RGNode[];
        links: RGLink[];
    };
    tmpData: {
        nodes_map: {
            [key: string]: RGNode;
        };
        links_map: {
            [key: string]: RGLink;
        };
    };
    seeksNodeIdIndex: number;
    allLineColors: {
        id: string;
        color: string;
    }[];
    userLayouerClass: RGLayouter | undefined;
    constructor(options: RGOptions, listeners: RGListeners);
    ready(): void;
    setOptions(options: RGOptions, callback: RGRefreshCallback): void;
    setLayouter(userLayouerInstance: RGLayouter): void;
    initLayouter(): void;
    setJsonData(jsonData: RGJsonData, resetViewSize?: boolean | RGRefreshCallback, callback?: RGRefreshCallback): void;
    applyNewDataToCanvas(): void;
    appendJsonData(jsonData: RGJsonData, isRelayout?: boolean | RGRefreshCallback, callback?: RGRefreshCallback): void;
    loadNodes(_nodes: JsonNode[]): void;
    loadLines(_lines: JsonLine[]): void;
    flatNodeData(orign_nodes: JsonNode[], parentNode: JsonNode | null, nodes_collect: JsonNode[], lines_collect: JsonLine[]): void;
    loadGraphJsonData(jsonData: RGJsonData): void;
    getLineArrow(_color: string | undefined, isStartArrow?: boolean, checked?: boolean): string;
    getNodes(): RGNode[];
    getLinks(): RGLink[];
    getGraphJsonData(): {
        rootId: string;
        nodes: JsonNode[];
        lines: JsonLine[];
    };
    getGraphJsonOptions(): {};
    printGraphJsonData(): void;
    setCheckedNode(nodeId: string): void;
    setCheckedLine(lineId: string): void;
    selectNode(node: RGNode, selected: boolean): void;
    getNodeById(nodeId: string): RGNode | undefined;
    addNodes(nodes: JsonNode[], isRelayout?: boolean): void;
    addLines(lines: JsonLine[], isRelayout?: boolean): void;
    removeNodeById(nodeId: string): void;
    removeLinkById(node1Id: string, node2Id: string): void;
    setNodePosition(node: RGNode, x: number, y: number): void;
}
