/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 */
import { RelationGraphFinal } from './models/RelationGraphFinal';
export type RGJunctionPoint = 'border' | 'lr' | 'tb' | 'ltrb' | 'left' | 'top' | 'right' | 'bottom';
export type RGResizeHandlePosition = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br';
export type RGWidgetPosition = 'top' | 'right' | 'bottom' | 'left' | 'tl' | 'tr' | 'bl' | 'br';
export type RGPositionPoint = 'left' | 'top' | 'right' | 'bottom';
export type RGLineEditPoint = 'start' | 'end';
export type RGNodeShape = 0 | 1 | undefined;
export type RGLineShape = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 41 | undefined;
export type RGUserEvent = MouseEvent | TouchEvent;
export interface JsonNode {
    id: string;
    text?: string;
    type?: string;
    isHide?: boolean;
    expanded?: boolean;
    junctionPoint?: RGJunctionPoint;
    alignItems?: RGPositionPoint;
    selected?: boolean;
    disableDefaultClickEffect?: boolean;
    disableDrag?: boolean;
    singleNode?: boolean;
    styleClass?: string;
    className?: string;
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
    alwaysRender?: boolean;
}
export interface JsonLine {
    id?: string;
    from: string;
    to: string;
    text?: string;
    type?: string;
    color?: string;
    fontColor?: string;
    lineWidth?: number;
    opacity?: number;
    lineShape?: RGLineShape;
    styleClass?: string;
    className?: string;
    isHide?: boolean;
    arrow?: string;
    showStartArrow?: boolean;
    showEndArrow?: boolean;
    startMarkerId?: string;
    endMarkerId?: string;
    useTextPath?: boolean;
    placeText?: string;
    textAnchor?: string;
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
    polyLineRadius?: number;
    forDisplayOnly?: boolean;
    fromJunctionPoint?: RGJunctionPoint;
    toJunctionPoint?: RGJunctionPoint;
    fromJuctionPointOffsetX?: number;
    fromJuctionPointOffsetY?: number;
    toJuctionPointOffsetX?: number;
    toJuctionPointOffsetY?: number;
}
export interface RGNode extends JsonNode {
    seeks_id: number;
    x: number;
    y: number;
    Fx: number;
    Fy: number;
    isShow: boolean;
    invisiable?: boolean;
    zIndex?: number;
    flashing?: boolean;
    dragging?: boolean;
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
}
export interface RGLine extends JsonLine {
    seeks_id: string;
    reverseText?: boolean;
    isReverse?: boolean;
    hidden?: boolean;
    polyLineStartDistance?: number;
    disableDefaultClickEffect?: boolean;
}
export type RGLineTarget = {
    x: number;
    y: number;
    el: {
        offsetWidth: number;
        offsetHeight: number;
    };
    nodeShape: RGNodeShape;
    type: 'node' | 'point' | '';
    rotate?: number;
};
export type RGLink = {
    seeks_id: string;
    fromNode: RGNode;
    toNode: RGNode;
    appended: boolean;
    forDisplayOnly: boolean;
    invisiable?: boolean;
    relations: RGLine[];
};
export type RGElementLine = RGLink;
export type RGJsonData = {
    rootId?: string;
    nodes: JsonNode[];
    lines: JsonLine[];
    [key: string]: any;
};
export type RGGraphData = {
    rootNode?: RGNode;
    nodes: RGNode[];
    links: RGLink[];
    elementLines: RGElementLine[];
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
    startAngle?: number;
};
export type RGCenterLayoutOptions = RGForceLayoutOptions & {
    distance_coefficient?: number;
    levelDistance?: string;
};
export type RGTreeLayoutOptions = RGLayoutOptionsCore & {
    from?: string;
    levelDistance?: string;
    min_per_width?: number;
    max_per_width?: number;
    min_per_height?: number;
    max_per_height?: number;
    vGap?: number;
    hGap?: number;
};
export type RGLayoutOptions = RGLayoutOptionsCore | RGForceLayoutOptions | RGCenterLayoutOptions | RGTreeLayoutOptions;
export interface RGLayouter {
    isMainLayouer: boolean;
    requireLinks: boolean;
    allNodes: RGNode[];
    rootNode?: RGNode;
    layoutOptions: RGLayoutOptions;
    refresh: () => void;
    setLinks: (links: RGLink[]) => void;
    placeNodes: (allNodes: RGNode[], rootNode: RGNode) => void;
    snapshotBeforeAnimation: () => void;
    animationLayout: (resetNodeFromPosition?: boolean) => void;
    autoLayout?: (forceLayout?: boolean, viewUpdate?: (() => void) | false) => void;
    stop?: () => void;
}
export interface RGOptions {
    debug?: boolean;
    showDebugPanel?: boolean;
    backgroundImageNoRepeat?: boolean;
    backgroundColor?: string;
    backgroundImage?: string;
    downloadImageFileName?: string;
    disableZoom?: boolean;
    disableDragNode?: boolean;
    disableDragLine?: boolean;
    selectionMode?: boolean;
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
    defaultBottomJuctionPoint_X?: number;
    disableDragCanvas?: boolean;
    placeSingleNode?: boolean;
    placeOtherNodes?: boolean;
    lineUseTextPath?: boolean;
    lineTextMaxLength?: number;
    multiLineDistance?: number;
    checkedNodeId?: string;
    checkedLineId?: string;
    checkedLinkId?: string;
    performanceMode?: boolean;
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
    graphOffset_x?: number;
    graphOffset_y?: number;
    canvasZoom?: number;
    mouseWheelSpeed?: number;
    minCanvasZoom?: number;
    showSingleNode?: boolean;
    showNodeLabel?: boolean;
    placeOtherGroup?: boolean;
    defaultPolyLineRadius?: number;
    reLayoutWhenExpandedOrCollapsed?: boolean;
}
export type RGLineColorItem = {
    id: string;
    color: string;
};
export type RGGraphReactiveData = {
    instance: RelationGraphFinal | undefined;
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
    onNodeClick?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>;
    onNodeExpand?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>;
    onNodeCollapse?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>;
    onLineClick?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean | void | Promise<boolean | void>;
    onImageDownload?: (dom: HTMLElement, format: string) => boolean | void;
    onImageSaveAsFile?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean | void;
    beforeChangeLayout?: (newLayoutOptions: RGLayoutOptions) => boolean | void;
    onNodeDragStart?: (node: RGNode, e: RGUserEvent) => void;
    onNodeDragEnd?: (node: RGNode, e: RGUserEvent, x_buff?: number, y_buff?: number) => void;
    onNodeDragging?: (node: RGNode, newX: number, newY: number, e: RGUserEvent) => void | RGPosition | undefined;
    onCanvasDragging?: (newX: number, newY: number, buffX: number, buffY: number) => void | RGPosition | undefined;
    onCanvasDragEnd?: (e: RGUserEvent) => void;
    onContextmenu?: (e: RGUserEvent, objectType: RGEventTargetType, object: RGNode | RGLink | undefined) => void;
    onFullscreen?: (newValue: boolean, defaultFullscreen: () => Promise<void>) => void;
    onCanvasClick?: (e: RGUserEvent) => void;
    onCanvasSelectionEnd?: (selectionView: RGSelectionView, e: RGUserEvent) => void;
    beforeNodeResize?: (node: RGNode, newX: number, newY: number, newW: number, newH: number) => void | false;
    onZoomEnd?: () => void;
}
export declare enum RGEventNames {
    onNodeClick = "onNodeClick",
    onNodeExpand = "onNodeExpand",
    onNodeCollapse = "onNodeCollapse",
    onLineClick = "onLineClick",
    onImageDownload = "onImageDownload",
    onImageSaveAsFile = "onImageSaveAsFile",
    onNodeDragStart = "onNodeDragStart",
    onNodeDragEnd = "onNodeDragEnd",
    onNodeDragging = "onNodeDragging",
    onCanvasDragEnd = "onCanvasDragEnd",
    onCanvasDragging = "onCanvasDragging",
    onContextmenu = "onContextmenu",
    onFullscreen = "onFullscreen",
    onCanvasClick = "onCanvasClick",
    onCanvasSelectionEnd = "onCanvasSelectionEnd",
    beforeZoomStart = "beforeZoomStart",
    onZoomEnd = "onZoomEnd",
    viewResize = "viewResize",
    nodeDragStart = "nodeDragStart",
    nodeDragging = "nodeDragging",
    nodeDragEnd = "nodeDragEnd",
    fullscreen = "fullscreen",
    onResizeStart = "onResizeStart",
    onResizeEnd = "onResizeEnd",
    onLineVertexDropped = "onLineVertexDropped",
    beforeCreateLine = "beforeCreateLine",
    onLineBeCreated = "onLineBeCreated",
    beforeChangeLayout = "beforeChangeLayout"
}
export type RGEventHandler = (eventName: RGEventNames, ...args: any[]) => void | any;
export type RGEventEmitHook = (eventName: RGEventNames, ...args: any[]) => void | any;
export interface RGV2Options extends RGOptions {
    useHorizontalView?: boolean;
    ovUseNodeSlot?: boolean;
    ovUseLineSlot?: boolean;
    ovUseToolbarSlot?: boolean;
    ovUseNodeExpandHolderSlot?: boolean;
    creatingSelection?: boolean;
    selectionView?: any;
    creatingNodePlot?: boolean;
    showTemplateNode?: boolean;
    newNodeTemplate?: any;
    creatingLinePlot?: boolean;
    newLineTemplate?: any;
    newLinkTemplate?: any;
}
export declare enum RGDirection {
    Left = "left",
    Top = "top",
    Right = "right",
    Bottom = "bottom"
}
export type RGCtrlPointForLine44 = {
    pIndex: number;
    optionName: string;
    direction: 'v' | 'h';
    x: number;
    y: number;
    startDirection: RGDirection;
    endDirection: RGDirection;
    hide?: boolean;
};
export interface RGOptionsFull extends RGV2Options {
    debug?: boolean;
    snapshotting?: boolean;
    graphLoading?: boolean;
    graphLoadingText?: string;
    showMaskWhenLayouting: boolean;
    instanceDestroyed: boolean;
    oldVueVersion: boolean;
    editingLineController: {
        show: boolean;
        link: RGLink | null;
        line: RGLine | null;
        startPoint: RGPosition;
        endPoint: RGPosition;
        text: {
            show: boolean;
            x: number;
            y: number;
            width: number;
            height: number;
        };
        ctrlPoints: RGPosition[];
        selectedLines: string[];
        line44Splits: RGCtrlPointForLine44[];
        line49Points: RGPosition[];
        ctrlPoint1: RGPosition;
        ctrlPoint2: RGPosition;
        toolbar: RGPosition;
    };
    editingController: {
        show: boolean;
        nodes: RGNode[];
        x: number;
        y: number;
        width: number;
        height: number;
    };
    nodeConnectController: {
        show: boolean;
        node: RGNode;
        x: number;
        y: number;
        width: number;
        height: number;
    };
    showReferenceLine: boolean;
    editingReferenceLine: {
        show: boolean;
        directionV: boolean;
        directionH: boolean;
        v_x: number;
        v_y: number;
        v_height: number;
        h_x: number;
        h_y: number;
        h_width: number;
    };
    showMiniView: boolean;
    miniViewVisibleHandle: {
        x: number;
        y: number;
        width: number;
        height: number;
        emptyContent: boolean;
    };
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
    allowShowSettingPanel: boolean;
    allowShowMiniNameFilter: boolean;
    fullscreen: boolean;
    layoutLabel?: string;
    layoutName?: string;
    label?: string;
    layoutClassName?: string;
    layoutDirection?: string;
    autoLayouting: boolean;
    layouter: RGLayouter | undefined;
    isNeedShowAutoLayoutButton: boolean;
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
    showEasyView?: boolean;
    canvasOpacity?: number;
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
    expandOrCollapseNode(node: RGNode, e?: MouseEvent): Promise<void>;
    expandNode(node: RGNode, e?: MouseEvent): Promise<void>;
    collapseNode(node: RGNode, e?: MouseEvent): Promise<void>;
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
    setJsonData(jsonData: RGJsonData, reLayoutOrCallback?: boolean | RGRefreshCallback, callback?: (graphInstance: RelationGraphInstance) => void): void;
    appendJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: (graphInstance: RelationGraphInstance) => void): void;
}
export type RelationGraphComponent = RelationGraphExpose;
export interface RGNodeSlotProps {
    node: RGNode;
    relationGraph: RelationGraphInstance;
}
export interface RGLineSlotProps {
    link: RGLink;
    line: RGLine;
    lineIndex: number;
    relationGraph: RelationGraphInstance;
}
export type RelationGraphProps = RGListeners & {
    options: RGOptions;
    relationGraphCore?: any;
};
export interface RGToolBarProps {
    direction?: 'v' | 'h';
    positionH?: 'left' | 'center' | 'right';
    positionV?: 'top' | 'center' | 'bottom';
}
export interface RGMiniViewProps {
    position?: RGWidgetPosition;
    width?: string;
    height?: string;
}
export interface RGWidgetProps {
    position?: RGWidgetPosition;
}
export type RGOnCreateLineCallback = (from: RGNode, to: RGNode | RGPosition, lineTemplate?: JsonLine) => void;
export interface JsonLineTemplate extends JsonLine {
    from?: string;
    to?: string;
}
export interface JsonNodeTemplate extends JsonNode {
    id?: string;
}
export type JsonLineLike = JsonLineTemplate;
export type CreatingLinePlotOptions = {
    onCreateLine: RGOnCreateLineCallback | undefined;
    template?: JsonLineTemplate;
    fromNode?: JsonNodeTemplate;
};
export type RGOnCreateNodeCallback = (from: RGNode, to: RGNode | RGPosition, lineTemplate: JsonLine) => void;
export type CreatingNodePlotOptions = {
    disableClickCreate?: boolean;
    templateText?: string;
    templateStyleClass?: string;
    templateNode?: JsonNodeTemplate;
    templateMove?: (x: number, y: number) => void;
    onCreateNode: (x: number, y: number, nodeTemplate?: JsonNodeTemplate) => void;
};
export interface RGCreateLineHandleProps {
    lineTemplate?: JsonLineLike;
}
export interface RGWatermarkProps {
    forImage?: boolean;
    forDisplay?: boolean;
    position?: RGWidgetPosition;
    width?: string;
    height?: string;
}
export interface RGBackgroundProps {
    forImage?: boolean;
    forDisplay?: boolean;
}
export type RGLineTextPosition = {
    x: number;
    y: number;
    rotate: number;
};
export type RGCoordinate = {
    x: number;
    y: number;
};
