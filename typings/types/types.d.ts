/**
 * relation-graph
 * Website: https://ssl.relation-graph.com/
 *          http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import { RelationGraphFinal } from "./models/RelationGraphFinal";
export type RGJunctionPoint = 'border' | 'lr' | 'tb' | 'ltrb';
export type RGNodeShape = 0 | 1 | undefined;
export type RGLineShape = 1 | 2 | 3 | 4 | 5 | 6 | undefined;
export type RGUserEvent = MouseEvent | TouchEvent;
export type JsonNode = {
    id: string;
    text: string;
    type?: string;
    isHide?: boolean;
    expanded?: boolean;
    junctionPoint?: boolean;
    selected?: boolean;
    disableDefaultClickEffect?: boolean;
    disableDrag?: boolean;
    singleNode?: boolean;
    styleClass?: string;
    nodeShape?: RGNodeShape;
    borderWidth?: number;
    borderColor?: string;
    fontColor?: string;
    color?: string;
    opacity?: number;
    fixed?: boolean;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    offset_x?: number;
    offset_y?: number;
    expandHolderPosition?: string;
    innerHTML?: string;
    html?: string;
    data?: {
        [key: string]: any;
    };
    children?: JsonNode[];
    childs?: JsonNode[];
    force_weight?: number;
};
export type JsonLine = {
    id?: string;
    from: string;
    to: string;
    text?: string;
    color?: string;
    fontColor?: string;
    lineWidth?: number;
    opacity?: number;
    lineShape?: RGLineShape;
    styleClass?: string;
    isHide?: boolean;
    arrow?: string;
    showStartArrow?: boolean;
    showEndArrow?: boolean;
    useTextPath?: boolean;
    isHideArrow?: boolean;
    reverseText?: boolean;
    lineDirection?: string;
    disableDefaultClickEffect?: boolean;
    data?: {
        [key: string]: any;
    };
    force_elastic?: number;
    textOffset_x?: number;
    textOffset_y?: number;
    animation?: number;
    dashType?: number;
};
export type RGNode = JsonNode & {
    seeks_id: number;
    x: number;
    y: number;
    Fx: number;
    Fy: number;
    isShow: boolean;
    flashing?: boolean;
    targetNodes: RGNode[];
    targetFrom: RGNode[];
    targetTo: RGNode[];
    lot: {
        childs: RGNode[];
        parent?: RGNode | undefined;
        eached?: boolean;
        strength?: number;
        subling?: {
            level: number;
            all_size: number;
            all_strength: number;
        };
        level?: number;
        index_of_parent?: number;
        strength_plus?: number;
        index_of_level?: number;
        childs_size?: number;
        index_of_p_childs?: number;
        level_index?: number;
        strengthWithChilds?: number;
        strengthWithChilds_from?: number;
        placed?: boolean;
        notLeafNode?: boolean;
        x?: number;
        y?: number;
        to_x?: number;
        to_y?: number;
        from_x?: number;
        from_y?: number;
    };
    origin_x?: number;
    origin_y?: number;
    el: {
        offsetWidth: number;
        offsetHeight: number;
    };
};
export type RGLine = JsonLine & {
    seeks_id: string;
    reverseText?: boolean;
    isReverse: boolean;
    hidden?: boolean;
    disableDefaultClickEffect: boolean;
};
export type RGLink = {
    seeks_id: string;
    fromNode: RGNode;
    toNode: RGNode;
    appended: boolean;
    relations: RGLine[];
};
export type RGJsonData = {
    rootId?: string;
    nodes: JsonNode[];
    lines: JsonLine[];
};
export type RGGraphData = {
    rootNode?: RGNode;
    nodes: RGNode[];
    links: RGLink[];
};
export type RGPosition = {
    x: number;
    y: number;
};
export type RGDraggingCallback = (offsetX: number, offsetY: number, startElPosition: {
    x: number;
    y: number;
}, startEventPosition: {
    x: number;
    y: number;
}, event: MouseEvent | TouchEvent) => void;
export type RGDragedCallback = (buffX: number, buffY: number, event: MouseEvent | TouchEvent) => void;
export type RGLayoutOptionsCore = {
    layoutName: string;
    label?: string;
    layoutClassName?: string;
    layoutLabel?: string;
    layoutDirection?: string;
    centerOffset_x?: number;
    centerOffset_y?: number;
    allowAutoLayoutIfSupport?: boolean;
    useLayoutStyleOptions?: boolean;
    fixedRootNode?: boolean;
};
export type RGForceLayoutOptions = RGLayoutOptionsCore & {
    fastStart?: boolean;
    maxLayoutTimes?: number;
    byNode?: boolean;
    byLine?: boolean;
    force_node_repulsion?: number;
    force_line_elastic?: number;
};
export type RGCenterLayoutOptions = RGForceLayoutOptions & {
    distance_coefficient?: number;
};
export type RGTreeLayoutOptions = RGLayoutOptionsCore & {
    from?: string;
    levelDistance?: string;
    min_per_width?: number;
    max_per_width?: number;
    min_per_height?: number;
    max_per_height?: number;
};
export type RGLayoutOptions = RGLayoutOptionsCore | RGForceLayoutOptions | RGCenterLayoutOptions | RGTreeLayoutOptions;
export interface RGLayouter {
    isMainLayouer: boolean;
    allNodes: RGNode[];
    rootNode?: RGNode;
    layoutOptions: RGLayoutOptions;
    refresh: () => void;
    placeNodes: (allNodes: RGNode[], rootNode: RGNode) => void;
    snapshotBeforeAnimation: () => void;
    animationLayout: (resetNodeFromPosition?: boolean) => void;
    autoLayout?: (forceLayout: boolean, viewUpdate?: (() => void) | false) => void;
    stop?: () => void;
}
export interface RGOptions {
    debug?: boolean;
    showDebugPanel?: boolean;
    backgroundImageNoRepeat?: boolean;
    backgroundColor?: string;
    backgroundImage?: string;
    backgrounImage?: string;
    downloadImageFileName?: string;
    disableZoom?: boolean;
    disableDragNode?: boolean;
    moveToCenterWhenRefresh?: boolean;
    zoomToFitWhenRefresh?: boolean;
    useAnimationWhenRefresh?: boolean;
    useAnimationWhenExpanded?: boolean;
    defaultFocusRootNode?: boolean;
    disableNodeClickEffect?: boolean;
    disableLineClickEffect?: boolean;
    allowShowZoomMenu?: boolean;
    allowAutoLayoutIfSupport?: boolean;
    allowShowRefreshButton?: boolean;
    allowShowDownloadButton?: boolean;
    allowShowFullscreenMenu?: boolean;
    backgrounImageNoRepeat?: boolean;
    allowShowMiniToolBar?: boolean;
    toolBarVersion?: string;
    toolBarDirection?: string;
    toolBarPositionH?: string;
    toolBarPositionV?: string;
    allowSwitchLineShape?: boolean;
    allowSwitchJunctionPoint?: boolean;
    isMoveByParentNode?: boolean;
    defaultExpandHolderPosition?: 'hide' | 'left' | 'top' | 'right' | 'bottom';
    defaultExpandHolderColor?: string;
    defaultNodeColor?: string;
    checkedLineColor?: string;
    defaultLineFontColor?: string;
    defaultLineTextOffset_x?: number;
    defaultLineTextOffset_y?: number;
    defaultNodeFontColor?: string;
    defaultNodeBorderColor?: string;
    defaultNodeBorderWidth?: number;
    defaultLineColor?: string;
    defaultLineWidth?: number;
    defaultLineShape?: RGLineShape;
    defaultNodeShape?: RGNodeShape;
    defaultNodeWidth?: number;
    defaultNodeHeight?: number;
    defaultShowLineLabel?: boolean;
    hideNodeContentByZoom?: boolean;
    defaultJunctionPoint?: RGJunctionPoint;
    disableDragCanvas?: boolean;
    placeSingleNode?: boolean;
    lineUseTextPath?: boolean;
    data?: any;
    defaultLineMarker?: {
        markerWidth: number;
        markerHeight: number;
        refX: number;
        refY: number;
        color?: string;
        data: string;
    };
    layouts?: RGLayoutOptions[];
    layout?: RGLayoutOptions;
}
export type RGLineColorItem = {
    id: string;
    color: string;
};
export type RGGraphReactiveData = {
    options: RGOptions | undefined;
    allLineColors: RGLineColorItem[];
};
export type RGSelectionView = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type RGEventTargetType = 'canvas' | 'node' | 'link';
export interface RGListeners {
    'onNodeClick'?: (node: RGNode, e: RGUserEvent) => boolean;
    'onNodeExpand'?: (node: RGNode, e: RGUserEvent) => boolean;
    'onNodeCollapse'?: (node: RGNode, e: RGUserEvent) => boolean;
    'onLineClick'?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean;
    'onImageDownload'?: (dom: HTMLElement, format: string) => boolean;
    'onImageSaveAsFile'?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean;
    'beforeChangeLayout'?: (newLayoutOptions: RGLayoutOptions) => boolean;
    'onNodeDragEnd'?: (node: RGNode, e: RGUserEvent) => void;
    'onCanvasDragEnd'?: (e: RGUserEvent) => void;
    'onContextmenu'?: (e: RGUserEvent, objectType: RGEventTargetType, object: RGNode | RGLink | undefined) => void;
    'onCanvasClick'?: (e: RGUserEvent) => void;
    'onCanvasSelectionEnd'?: (selectionView: RGSelectionView, e: RGUserEvent) => void;
}
export interface RGV2Options extends RGOptions {
    placeOtherGroup?: boolean;
    defaultPloyLineRadius?: number;
    useHorizontalView?: boolean;
    ovUseNodeSlot?: boolean;
    ovUseLineSlot?: boolean;
    ovUseToolbarSlot?: boolean;
    ovUseNodeExpandHolderSlot?: boolean;
    reLayoutWhenExpandedOrCollapsed?: boolean;
    creatingSelection?: boolean;
    selectionView?: any;
    creatingNodePlot?: boolean;
    showTemplateNode?: boolean;
    newNodeTemplate?: any;
    creatingLinePlot?: boolean;
    newLineTemplate?: any;
    newLinkTemplate?: any;
}
export interface RGOptionsFull extends RGV2Options {
    debug: boolean;
    oldVueVersion: boolean;
    defaultNodeShape: RGNodeShape;
    instanceId: string;
    viewSize: {
        width: number;
        height: number;
    };
    viewELSize: {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    viewNVInfo: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    canvasNVInfo: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    allowShowMiniView: boolean;
    allowShowSettingPanel: boolean;
    allowShowMiniNameFilter: boolean;
    fullscreen: boolean;
    checkedNodeId: string;
    checkedLineId: string;
    layoutLabel?: string;
    layoutName?: string;
    label?: string;
    layoutClassName?: string;
    layoutDirection?: string;
    autoLayouting: boolean;
    layouter: RGLayouter | undefined;
    isNeedShowAutoLayoutButton: boolean;
    canvasZoom: number;
    showSingleNode: boolean;
    showNodeLabel: boolean;
    showNodeShortLabel: boolean;
    canvasSize: {
        width: number;
        height: number;
    };
    canvasOffset: {
        x: number;
        y: number;
        zoom_buff_x: number;
        zoom_buff_y: number;
    };
}
export type RGRefreshCallback = (graphInstance: any) => void;
export type RelationGraphInstance = RelationGraphFinal;
export interface RelationGraphInstance2 {
    options: RGOptions;
    enableDebugLog(enable: boolean): void;
    ready(): void;
    setDom(relationGraphDom: HTMLElement): void;
    setCanvasDom(canvasDom: HTMLElement): void;
    fullscreen(newValue?: boolean): void;
    setOptions(options: RGOptions, callback?: (graphInstance: this) => void): void;
    setLayouter(userLayouerInstance: RGLayouter): void;
    initLayouter(): void;
    setJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: (graphInstance: this) => void): void;
    appendJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: (graphInstance: this) => void): void;
    getNodes(): RGNode[];
    getLinks(): RGLink[];
    getGraphJsonData(): RGJsonData;
    getGraphJsonOptions(): RGOptions;
    getNodeById(nodeId: string): RGNode;
    addNodes(nodes: JsonNode[]): void;
    addLines(lines: JsonLine[]): void;
    removeNodeById(nodeId: string): void;
    removeLinkById(node1Id: string, node2Id: string): void;
    focusRootNode(): void;
    focusNodeById(nodeId: string): void;
    setNodePosition(node: RGNode, x: number, y: number): void;
    doLayout(): void;
    refresh(callback?: RGRefreshCallback): void;
    dataUpdated(): void;
    getNodesCenter(): void;
    setCanvasCenter(x: number, y: number): void;
    setCanvasOffset(x: number, y: number): void;
    placeSingleNode(): void;
    zoomToFit(): Promise<void>;
    animateGoto(x: number, y: number, time: number, callback?: RGRefreshCallback): Promise<void>;
    animateToZoom(finalZoom: number, time: number, callback?: RGRefreshCallback): Promise<void>;
    startAutoLayout(): void;
    stopAutoLayout(): void;
    setCheckedNode(nodeId: string): void;
    setCheckedLine(lineId: string): void;
    selectNode(node: RGNode, selected: boolean): void;
    expandOrCollapseNode(node: RGNode, e: MouseEvent): Promise<void>;
    expandNode(node: RGNode, e: MouseEvent): Promise<void>;
    collapseNode(node: RGNode, e: MouseEvent): Promise<void>;
    downloadAsImage(fileName: string, format?: string): Promise<void>;
    zoom(buff: number, userZoomCenter?: RGPosition): Promise<void>;
    setZoom(finalZoom: number): Promise<void>;
    playShowEffect(callback: RGRefreshCallback): Promise<void>;
    updateNodeOffsetSize(node: RGNode, nodeOffsetWidth: number, nodeOffsetHeight: number): void;
    onNodeClick(node: RGNode, e: MouseEvent | TouchEvent): Promise<void>;
    onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent): Promise<void>;
    printGraphJsonData(): void;
}
export interface RelationGraphExpose {
    getInstance(): RelationGraphInstance;
    setOptions(options: RGOptions, callback?: (graphInstance: RelationGraphInstance) => void): void;
    setJsonData(jsonData: RGJsonData, reLayoutOrCallback?: boolean | RGRefreshCallback, callback?: (graphInstance: RelationGraphInstance) => void): void;
    appendJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: (graphInstance: RelationGraphInstance) => void): void;
    setLayouter(layouterInstance: RGLayouter): void;
    onGraphResize(): void;
    refresh(callback?: RGRefreshCallback): void;
    focusRootNode(): void;
    focusNodeById(nodeId: string): void;
    getNodeById(nodeId: string): RGNode | undefined;
    removeNodeById(nodeId: string): void;
    getNodes(): RGNode[];
    getLinks(): RGLink[];
    getGraphJsonData(): RGJsonData;
    getGraphJsonOptions(): RGOptions;
    updateView(): void;
}
export interface RGNodeSlotProps {
    node: RGNode;
    relationGraph: RelationGraphInstance;
}
export interface RGLineSlotProps {
    link: RGLink;
    relation: RGLine;
    relationIndex: number;
    relationGraph: RelationGraphInstance;
}
export type RelationGraphProps = RGListeners & {
    options: RGOptions;
    relationGraphCore?: any;
};
