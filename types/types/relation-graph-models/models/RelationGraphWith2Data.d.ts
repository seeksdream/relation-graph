import { JsonLine, JsonNode, RGElementLine, RGGraphData, RGGraphReactiveData, RGJsonData, RGLayouter, RGLayoutOptions, RGLine, RGLineColorItem, RGLink, RGListeners, RGNode, RGOptions } from '../types';
import { RelationGraphWith1Dom } from './RelationGraphWith1Dom';
export declare class RelationGraphWith2Data extends RelationGraphWith1Dom {
    /**
     * RelationGraph 中管理的所有数据，包括所有节点RGNode、所有关系RGLink、当前的根节点、所有的元素连线elementLines
     */
    graphData: RGGraphData;
    protected seeksNodeIdIndex: number;
    /**
     * [relation-graph内部使用]当前所有线条涉及的颜色
     */
    allLineColors: RGLineColorItem[];
    userLayouerClass?: RGLayouter;
    /**
     * [relation-graph内部使用]当前的布局器
     */
    layouter: RGLayouter;
    /**
     * [relation-graph内部使用]当前RelationGraph组件的响应式数据对象
     */
    reactiveData: RGGraphReactiveData;
    constructor(options: RGOptions, listeners: RGListeners);
    /**
     * [relation-graph内部使用]设置响应式数据对象
     * @param graphData
     * @param reactiveData
     */
    setReactiveData(graphData: RGGraphData, reactiveData: RGGraphReactiveData): void;
    /**
     * [relation-graph内部使用]设置响应式数据对象
     * @param graphData
     * @param reactiveData
     */
    setReactiveDataVue3(graphData: RGGraphData, reactiveData: RGGraphReactiveData): void;
    disableNextLayoutAnimation: boolean;
    protected _setOptions(options: RGOptions): void;
    protected _initLayoutByLayoutOptions(layoutOptions: RGLayoutOptions): void;
    protected initLayouter(): void;
    protected _setJsonData(jsonData: RGJsonData, resetViewSize?: boolean): Promise<void>;
    /**
     * 清空RelationGraph中的所有数据，包括节点、线条、元素连线、根节点
     */
    clearGraph(): void;
    /**
     * 清空所有元素连线elementLines
     */
    clearElementLines(): Promise<void>;
    /**
     * 生成一个相对于当前已有节点不重复的Node id
     * @param idLength id的最小长度 默认为5
     */
    generateNewNodeId(idLength?: number): string;
    /**
     * 生成一个大概率不重复的 id，不重复的概率取决于参数idLength(id的长度)
     * @param idLength id的长度 默认为5
     */
    generateNewUUID(idLength?: number): string;
    protected loadNodes(_nodes: JsonNode[]): void;
    protected loadLines(_lines: JsonLine[]): void;
    protected nextLineId: number;
    protected getNextLineId(thisLink: RGLink): string;
    /**
     * 将树状结构的数据展开为扁平化的数据
     * @param orign_nodes 树状结构数据，如：[{id:'a',children:[{id:'a-1'},{id:'a-1', children: [{id:'a-1-1'}]}]}]
     * @param parentNode 请传递null
     * @param nodes_collect 被展开的所有节点将会被存到这里
     * @param lines_collect 被展开的所有线条将会被存到这里
     */
    flatNodeData(orign_nodes: JsonNode[], parentNode: JsonNode | null, nodes_collect: JsonNode[], lines_collect: JsonLine[]): void;
    protected loadGraphJsonData(jsonData: RGJsonData): void;
    protected getLineArrow(_color: string | undefined, isStartArrow?: boolean, checked?: boolean): string;
    /**
     * 获取所有节点对象
     */
    getNodes(): RGNode[];
    /**
     * 获取所有关系对象，注意这里的Link不是线条
     * 线条(Line)：其中的lines是指节点之间的连线，图谱会根据这些line来生成线条。
     * 关系(Link)：同时图谱会根据line来生成用于总结节点之间的关联的Link(两个有直接关联的节点之间有且只有一个Link，节点之间的所有关系线(Line[])，都会被放在link.relations中)。
     * 你可以这样来遍历并获取所有线条Line:
     * const allLines: RGLine[] = [];
     * for (const link of graphInstance.getLinks()) {
     *    for (const line of link.relations) {
     *         allLines.push(line);
     *    }
     * }
     * // Line对象拥有JsonLine的所有属性，你可以更改这些属性。如：更改所有线条颜色为红色：
     * for (const line of allLines) {
     *    line.color = 'red';
     * }
     */
    getLinks(): RGLink[];
    getLines(): RGLine[];
    getLinesByNode(node: RGNode): RGLine[];
    /**
     * 将一个节点对象RGNode转换为可被Json序列化的对象
     * @param nodeJson:JsonNode
     */
    transRGNodeToJsonObject(node: RGNode): JsonNode;
    /**
     * 将一个关系对象RGLink转换为可被Json序列化的对象
     * @param lines: JsonLine[]
     */
    transRGLinkToJsonObject(link: RGLink): JsonLine[];
    /**
     * 将一个线条对象RGLine转换为可被Json序列化的对象
     * @param lineJson: JsonLine
     */
    transRGLineToJsonObject(line: RGLine): JsonLine;
    /**
     * 获取当前图谱中的所有节点和线条数据。
     * @param graphJsonData: RGJsonData
     */
    getGraphJsonData(): RGJsonData;
    /**
     * 获取当前图谱的配置信息
     */
    getGraphJsonOptions(): {};
    /**
     * 将当前图谱的配置信息和json数据打印到控制台
     */
    printGraphJsonData(): void;
    /**
     * 根据节点id获取节点对象
     * @param nodeId: RGNode
     */
    getNodeById(nodeId: string): RGNode;
    /**
     * 根据关系id获取关系RGLink对象
     * @param link: RGLink
     */
    getLinkById(linkId: string): RGLink;
    /**
     * 根据线条id获取线条RGLink对象
     * @param line: RGLine
     */
    getLinkByLineId(lineId: string): RGLink;
    /**
     * 根据线条获取线条RGLink对象
     * @param line: RGLine
     */
    getLinkByLine(line: RGLine): RGLink;
    /**
     * 新增多个节点
     * @param nodes: JsonNode[]
     */
    addNodes(nodes: JsonNode[]): void;
    /**
     * 新增多个线条
     * @param lines: JsonLine[]
     */
    addLines(lines: JsonLine[]): void;
    /**
     * 新增多个元素连线
     * @param lines:JsonLine[]
     */
    addElementLines(lines: JsonLine[]): void;
    /**
     * 根据元素连线id获取元素连线
     * @param elLink: RGLink
     */
    getElementLineById(elLineId: string): RGLine;
    /**
     * 获取所有元素连线的线条
     */
    getElementLines(): RGLine[];
    /**
     * 删除元素连线
     * @param elementLine: RGElementLine
     */
    removeElementLine(elementLine: RGElementLine | RGLink | RGLine): void;
    /**
     * 根据删除元素连线id删除元素连线
     * @param elementLineId: string 元素连线id
     */
    removeELementLineById(elementLineId: string): void;
    private elLineUpdating;
    /**
     * 跟新所有元素连线的位置信息
     */
    updateElementLines(): void;
    private _updateElementLines;
    private _updateElementLinePosition;
    getElementPosition(elementId: string): {
        x: number;
        y: number;
    };
    removeNodeById(nodeId: string): void;
    removeNode(node: RGNode): void;
    removeLinkByTwoNode(node1Id: string, node2Id: string): void;
    getGroupNodesByNode(node: RGNode, groupNodes?: RGNode[]): RGNode[];
    private _clearItem;
    removeNodeRef(node: RGNode, refNode: RGNode): void;
    removeLinkById(linkId: string): void;
    removeLink(link: RGLink): void;
    removeLine(line: RGLine): void;
    removeLineById(lineId: string): void;
    setNodePosition(node: RGNode, x: number, y: number): void;
    getGraphOffet(): {
        offset_x: number;
        offset_y: number;
    };
    setCanvasCenter(x: number, y: number): void;
    setCanvasOffset(x: number, y: number): void;
    findGroupNodes(node: RGNode, childs: RGNode[]): void;
    protected resetViewSize(zoomTo100?: boolean): void;
    refreshNVAnalysisInfo(): void;
    getStuffSize(nodes?: RGNode[]): {
        width: number;
        height: number;
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
    getNodesCenter(): {
        x: number;
        y: number;
    };
    querySearchAsync(queryString: string): RGNode[];
    printOptions(): void;
    printData(): void;
    loading(graphLoadingText?: string): void;
    clearLoading(): void;
    updateVisbleViewNodes(force?: boolean): void;
    private _updateVisbleViewNodes;
}
