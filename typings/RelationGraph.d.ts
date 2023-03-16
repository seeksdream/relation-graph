export declare interface RGOptions {
  debug?: boolean // UI
  showDebugPanel?: boolean // UI
  backgrounImage?: string // UI
  downloadImageFileName?: string // UI
  disableZoom?: boolean // UI
  disableDragNode?: boolean // UI
  moveToCenterWhenRefresh?: boolean // UI
  zoomToFitWhenRefresh?: boolean // UI
  useAnimationWhenRefresh?: boolean // UI
  defaultFocusRootNode?: boolean // UI
  disableNodeClickEffect?: boolean // UI
  disableLineClickEffect?: boolean // UI
  allowShowZoomMenu?: boolean // UI
  allowAutoLayoutIfSupport?: boolean // UI
  allowShowRefreshButton?: boolean // UI
  allowShowDownloadButton?: boolean // UI
  backgrounImageNoRepeat?: boolean // UI
  allowShowMiniToolBar?: boolean // UI
  allowSwitchLineShape?: boolean // UI
  allowSwitchJunctionPoint?: boolean // UI
  isMoveByParentNode?: boolean // UI
  defaultExpandHolderPosition?: 'hide' | 'left' | 'top' | 'right' | 'bottom' // UI
  defaultNodeColor?: string // UI
  checkedLineColor?: string //  // UI
  defaultNodeFontColor?: string // UI
  defaultNodeBorderColor?: string // UI
  defaultNodeBorderWidth?: number // UI
  defaultLineColor?: string // UI
  defaultLineWidth?: number // UI
  defaultLineShape?: RGLineShape // UI
  defaultNodeShape?: RGNodeShape // UI
  defaultNodeWidth?: number // UI
  defaultNodeHeight?: number // UI
  defaultShowLineLabel?: boolean // UI
  hideNodeContentByZoom?: boolean // UI
  defaultJunctionPoint?: RGJunctionPoint // UI
  disableDragCanvas?: boolean // UI
  placeSingleNode?: boolean
  lineUseTextPath?: boolean // UI
  defaultLineMarker?: {
    markerWidth: number
    markerHeight: number
    refX: number
    refY: number
    color?: string
    data: string
  }
  layouts?: RGLayoutOptions[]
}
export declare type RGJunctionPoint = 'border' | 'lr' | 'tb' | 'ltrb'
export declare type RGNodeShape = 0 | 1
export declare type RGLineShape = 1 | 2 | 3 | 4 | 5 | 6
export declare type RGLayoutOptionsCore = {
  layouter?: RGLayouter
  layoutName: string
  label?: string
  layoutClassName?: string
  layoutLabel?: string
  layoutDirection?: string
  centerOffset_x?: number
  centerOffset_y?: number
  allowAutoLayoutIfSupport?: boolean
  useLayoutStyleOptions?: boolean
}
export declare type RGCenterLayoutOptions = RGLayoutOptionsCore & {
  distance_coefficient?: number
}
export declare type RGTreeLayoutOptions = RGLayoutOptionsCore & {
  from?: string
  levelDistance?: string
  min_per_width?: number
  max_per_width?: number
  min_per_height?: number
  max_per_height?: number
}
export declare type RGLayoutOptions =
  | RGLayoutOptionsCore
  | RGCenterLayoutOptions
  | RGTreeLayoutOptions
export declare interface RGOptionsFull extends RGOptions {
  debug: boolean // UI
  defaultNodeShape: RGNodeShape // UI
  instanceId: string
  viewSize: { width: number; height: number }
  viewELSize: { width: number; height: number; left: number; top: number }
  viewNVInfo: { width: number; height: number; x: number; y: number }
  canvasNVInfo: { width: number; height: number; x: number; y: number }
  // NMViewCenter: { x: 0, y: 0 },
  // NMCanvasCenter: { x: 0, y: 0 },
  allowShowMiniView: boolean // private
  allowShowSettingPanel: boolean // private
  allowShowMiniNameFilter: boolean // private
  fullscreen: boolean // private
  checkedNodeId: string // private
  checkedLineId: string // private
  layoutLabel?: string // private
  layoutName?: string // private
  label?: string // private
  layoutClassName?: string // private
  layoutDirection?: string // private
  autoLayouting: boolean // private
  layouter: RGLayouter | undefined // private
  isNeedShowAutoLayoutButton: boolean // private
  canvasZoom: number // private
  showSingleNode: boolean // private
  showNodeLabel: boolean // private
  showNodeShortLabel: boolean // private
  canvasSize: {
    width: number
    height: number
  }
  canvasOffset: {
    x: number
    y: number
    zoom_buff_x: number
    zoom_buff_y: number
  }
}
export declare type JsonNode = {
  id: string
  text: string
  type?: string
  isHide?: boolean
  expanded?: boolean
  junctionPoint?: boolean
  selected?: boolean
  disableDefaultClickEffect?: boolean
  disableDrag?: boolean
  singleNode?: boolean
  styleClass?: string
  nodeShape?: RGNodeShape
  borderWidth?: number
  borderColor?: string
  fontColor?: string
  color?: string
  opacity?: number
  fixed?: boolean
  width?: number
  height?: number
  x?: number
  y?: number
  offset_x?: number
  offset_y?: number
  expandHolderPosition?: string
  innerHTML?: string
  html?: string
  data?: { [key: string]: any }
  children?: JsonNode[]
}
export declare type JsonLine = {
  from: string
  to: string
  text?: string
  color?: string
  fontColor?: string
  lineWidth?: number
  opacity?: number
  lineShape?: RGLineShape
  styleClass?: string
  isHide?: boolean
  arrow?: string
  showStartArrow?: boolean
  showEndArrow?: boolean
  useTextPath?: boolean
  isHideArrow?: boolean
  lineDirection?: string
  disableDefaultClickEffect?: boolean
  data?: { [key: string]: any }
}
export declare type RGNode = JsonNode & {
  seeks_id: number
  x: number
  y: number
  Fx: number
  Fy: number
  isShow: boolean
  targetNodes: RGNode[]
  targetFrom: RGNode[]
  targetTo: RGNode[]
  lot: {
    childs: RGNode[]
    parent?: RGNode | undefined
    eached?: boolean
    strength?: number
    subling?: {
      level: number
      all_size: number
      all_strength: number
    }
    level?: number
    index_of_parent?: number
    strength_plus?: number
    index_of_level?: number
    childs_size?: number
    index_of_p_childs?: number
    level_index?: number
    strengthWithChilds?: number
    strengthWithChilds_from?: number
    placed?: boolean
    notLeafNode?: boolean
    x?: number
    y?: number
  }
  origin_x?: number
  origin_y?: number
  el: { offsetWidth: number; offsetHeight: number }
}
export declare type RGLine = JsonLine & {
  seeks_id: string
  reverseText?: boolean
  isReverse: boolean // 自动计算，无需设置
  hidden?: boolean
  disableDefaultClickEffect: boolean
}
export declare type RGLink = {
  seeks_id: string
  fromNode: RGNode
  toNode: RGNode
  appended: boolean
  relations: RGLine[]
}
export declare type RGJsonData = {
  rootId?: string
  nodes: JsonNode[]
  lines: JsonLine[]
}
export declare interface RGLayouter {
  __origin_nodes: RGNode[]
  rootNode?: RGNode
  refresh: () => void
  placeNodes: (allNodes: RGNode[], rootNode: RGNode) => void
  autoLayout?: (forceLayout: boolean) => void
  stop?: () => void
}
export declare type RGDraggingCallback = (
  offsetX: number,
  offsetY: number,
  startElPosition: { x: number; y: number },
  startEventPosition: { x: number; y: number },
  event: MouseEvent | TouchEvent
) => void
export declare type RGDragedCallback = (
  buffX: number,
  buffY: number,
  event: MouseEvent | TouchEvent
) => void
export declare type RGListeners = {
  'on-node-click'?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  'on-node-expand'?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  'on-node-collapse'?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  'on-line-click'?: (
    line: RGLine,
    link: RGLink,
    e: MouseEvent | TouchEvent
  ) => boolean
  'on-image-download'?: (dom: HTMLElement, format: string) => boolean
}
export declare interface RelationGraphInstance {
  // (options: RGOptions, listeners: RGListeners)
  options: RGOptionsFull
  allLineColors: any[]
  graphData: {
    rootNode: RGNode | undefined
    nodes: RGNode[]
    links: RGLink[]
  }
  enableDebugLog(enable: boolean)
  ready()
  setDom(relationGraphDom: HTMLElement)
  setCanvasDom(canvasDom: HTMLElement)
  fullscreen(newValue?: boolean)
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  setLayouter(userLayouerInstance: RGLayouter)
  initLayouter()
  setJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  getNodes()
  getLinks()
  getGraphJsonData()
  getGraphJsonOptions()
  getNodeById(nodeId: string)
  addNodes(nodes: JsonNode[])
  addLines(lines: JsonLine[])
  removeNodeById(nodeId: string)
  removeLinkById(node1Id: string, node2Id: string)
  focusRootNode()
  focusNodeById(nodeId: string)
  setNodePosition(node: RGNode, x: number, y: number)
  doLayout()
  refresh(callback?: RGRefreshCallback)
  refreshNVAnalysisInfo()
  resetViewSize()
  dataUpdated()
  getNodesCenter()
  setCanvasCenter(x: number, y: number)
  setCanvasOffset(x: number, y: number)
  placeSingleNode()
  zoomToFit(callback?: RGRefreshCallback)
  animateGoto(x: number, y: number, time: number, callback?: RGRefreshCallback)
  animateToZoom(finalZoom: number, time: number, callback?: RGRefreshCallback)
  startAutoLayout()
  stopAutoLayout()
  setCheckedNode(nodeId: string)
  setCheckedLine(lineId: string)
  selectNode(node: RGNode, selected: boolean)
  expandOrCollapseNode(node: RGNode, e: MouseEvent)
  expandNode(node: RGNode, e: MouseEvent)
  collapseNode(node: RGNode, e: MouseEvent)
  downloadAsImage(fileName: string, format?: string)
  zoom(buff: number, userZoomCenter?: RGPosition)
  setZoom(finalZoom: number)
  playShowEffect(callback: RGRefreshCallback)
  updateNodeOffsetSize(
    node: RGNode,
    nodeOffsetWidth: number,
    nodeOffsetHeight: number
  )
  onNodeClick(node: RGNode, e: MouseEvent | TouchEvent)
  onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent)
  getArrow(thisRelation: RGLine, link: RGLink, isStartArrow: boolean)
  getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number)
  createLinePath(link: RGLink, relationData: RGLine, ri: number)
  printGraphJsonData()
}
export declare type RGRefreshCallback = (graphInstance: RelationGraphInstance) => void
export declare type RGPosition = {
  x: number
  y: number
}
export declare interface RelationGraphExpose{
  getInstance(): RelationGraphInstance
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  setJsonData(
    jsonData: RGJsonData,
    reLayoutOrCallback?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  setLayouter(layouterInstance: RGLayouter)
  onGraphResize()
  refresh(callback?: RGRefreshCallback)
  focusRootNode()
  focusNodeById(nodeId: string)
  getNodeById(nodeId: string)
  removeNodeById(nodeId: string)
  getNodes()
  getLinks()
  getGraphJsonData()
  getGraphJsonOptions()
  updateView()
}
export interface RGNodeSlotProps {
  node: RGNode
  relationGraph: RelationGraphInstance
}
export interface RGLineSlotProps {
  link: RGLink
  relation: RGLine
  relationIndex: number
  relationGraph: RelationGraphInstance
}
