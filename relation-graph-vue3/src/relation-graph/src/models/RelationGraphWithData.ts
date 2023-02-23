// import RGOptions from '../models/RGOptions';
import { createDefaultOptions } from '../models/RGOptions'
import { devLog } from '../utils/RGCommon'
import { json2Node, transNodeToJson } from '../models/RGNode'
import { json2Line, transLinkToJson } from '../models/RGLink'
import { createLayout } from '../models/RGLayouter'
import { RelationGraphBase } from '../models/RelationGraphBase'
import RGEffectUtils from '../utils/RGEffectUtils'
import type {
  JsonLine,
  JsonNode,
  RGJsonData,
  RGLayouter,
  RGLine,
  RGLink,
  RGListeners,
  RGNode,
  RGOptions,
  RGRefreshCallback,
} from '../RelationGraph'
export class RelationGraphWithData extends RelationGraphBase {
  graphData: {
    rootNode: RGNode | undefined
    nodes: RGNode[]
    links: RGLink[]
  } = {
    rootNode: undefined,
    nodes: [],
    links: [],
  }
  tmpData: {
    nodes_map: { [key: string]: RGNode }
    links_map: { [key: string]: RGLink }
  } = {
    nodes_map: {},
    links_map: {},
  }
  seeksNodeIdIndex = 0
  allLineColors: {
    id: string
    color: string
  }[] = []
  userLayouerClass: RGLayouter | undefined
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners)
  }
  ready() {
    this.initLayouter()
    this.resetViewSize()
    this.refreshNVAnalysisInfo()
  }
  setOptions(options: RGOptions, callback: RGRefreshCallback) {
    this.options = createDefaultOptions(options)
    this.enableDebugLog(this.options.debug)
    this.options.instanceId = this.instanceId
    // this.graphSetting = this.options;
    this.initLayouter()
    this.resetViewSize()
    this.doLayout()
    this.resetViewSize()
    if (callback) {
      // @ts-ignore
      callback(this)
    }
  }
  setLayouter(userLayouerInstance: RGLayouter) {
    devLog('setLayouterClass::', userLayouerInstance)
    this.userLayouerClass = userLayouerInstance
  }
  initLayouter() {
    if (this.userLayouerClass) {
      devLog('Use user layouter:', this.userLayouerClass)
      // const newLayouterInstance = Object.create(this.userLayouerClass.prototype);
      // const layouterIns = this.userLayouerClass.apply(newLayouterInstance, [this.options.layouts[0], this.options]);
      // devLog('[change layout]Use user layouter instance:', layouterIns);
      this.options.layouter = this.userLayouerClass
      // this.options.layouter = new CenterLayouter(this.options.layouts[0], this.options);
    } else {
      if (this.options.layouts && this.options.layouts.length > 0) {
        const _defaultLayoutSetting = this.options.layouts[0]
        devLog(
          '[change layout]Create default layouter：',
          this.options.layoutName
        )
        if (_defaultLayoutSetting.layouter) {
          this.options.layouter = _defaultLayoutSetting.layouter
        } else {
          this.options.layouter = createLayout(
            _defaultLayoutSetting,
            this.options
          )
        }
      } else {
        devLog('你需要设置layouts来指定当前图谱可以使用的布局器！')
      }
    }
    devLog('Layouter instance:', this.options.layouter)
  }
  setJsonData(
    jsonData: RGJsonData,
    resetViewSize?: boolean | RGRefreshCallback,
    callback?: RGRefreshCallback
  ) {
    if (arguments.length === 2 && typeof resetViewSize === 'function') {
      callback = resetViewSize
      resetViewSize = true
    }
    this.graphData.nodes = []
    this.graphData.links = []
    this.tmpData.nodes_map = {}
    this.tmpData.links_map = {}
    this.graphData.rootNode = undefined
    devLog('set jsonData:', jsonData)
    // this.initLayouter();
    const __root_id = jsonData['rootId']
    this.loadGraphJsonData(jsonData)
    // devLog('graphData:', this.graphData)
    if (__root_id) {
      this.graphData.rootNode = this.tmpData.nodes_map[__root_id]
    }
    if (!this.graphData.rootNode && this.graphData.nodes.length > 0) {
      this.graphData.rootNode = this.graphData.nodes[0]
    }
    this.applyNewDataToCanvas()
    if (resetViewSize) {
      devLog('resetViewSize:', resetViewSize)
      this.resetViewSize()
    }
    setTimeout(() => {
      this.doLayout()
      if (callback) {
        // @ts-ignore
        callback(this)
      }
    }, 500)
  }

  applyNewDataToCanvas() {
    // this.graphData.nodes.forEach((thisNode) => {
    //   if (thisNode.appended === false) {
    //     thisNode.appended = true
    //   }
    // })
    // this.graphData.links.forEach((thisLine) => {
    //   if (thisLine.appended === false) {
    //     thisLine.appended = true
    //   }
    // })
    if (this.graphData.rootNode) {
      if (this.options.defaultFocusRootNode) {
        this.setCheckedNode(this.graphData.rootNode.id)
        // this.options.checkedNodeId = this.graphData.rootNode.id;
      }
    } else {
      throw new Error('没有设置根节点[rootId]！也无法获取根节点!')
    }
  }
  appendJsonData(
    jsonData: RGJsonData,
    isRelayout?: boolean | RGRefreshCallback,
    callback?: RGRefreshCallback
  ) {
    if (arguments.length === 2 && typeof isRelayout === 'function') {
      callback = isRelayout
      isRelayout = true
    }
    devLog('appendData:', jsonData)
    this.loadGraphJsonData(jsonData)
    this.applyNewDataToCanvas()
    // this.resetViewSize()
    if (isRelayout) this.doLayout()
    if (callback) {
      // @ts-ignore
      callback(this)
    }
  }
  loadNodes(_nodes: JsonNode[]) {
    _nodes.forEach((thisNodeJson) => {
      let thisNode = json2Node(thisNodeJson)
      let __isNew = false
      if (this.tmpData.nodes_map[thisNode.id]) {
        thisNode = this.tmpData.nodes_map[thisNode.id]
      } else {
        __isNew = true
      }
      if (__isNew) {
        this.tmpData.nodes_map[thisNode.id] = thisNode
        this.graphData.nodes.push(thisNode)
        thisNode.seeks_id = this.seeksNodeIdIndex++
      }
    })
  }
  loadLines(_lines: JsonLine[]) {
    _lines.forEach((thisLineJson) => {
      let __isNew = false
      let __from
      let __to
      if (typeof thisLineJson.from === 'object') {
        __from = thisLineJson.from
      } else {
        __from = this.tmpData.nodes_map[thisLineJson.from]
      }
      if (typeof thisLineJson.to === 'object') {
        __to = thisLineJson.to
      } else {
        __to = this.tmpData.nodes_map[thisLineJson.to]
      }
      if (!__from) {
        console.error('找不到from:', thisLineJson)
        return
      }
      if (!__to) {
        console.error('找不到to:', thisLineJson)
        return
      }
      // devLog('[add link]', __from.text, __to.text, __from.seeks_id, __to.seeks_id, thisLink)
      const lineId1 = `${__from.seeks_id}-${__to.seeks_id}`
      const lineId2 = `${__to.seeks_id}-${__from.seeks_id}`
      const thisLineData: RGLine = json2Line(thisLineJson)
      let thisLink: RGLink
      let thisLinkIsReserve = false
      if (this.tmpData.links_map[lineId1]) {
        thisLink = this.tmpData.links_map[lineId1]
      } else {
        if (this.tmpData.links_map[lineId2]) {
          thisLink = this.tmpData.links_map[lineId2]
          thisLinkIsReserve = true
        } else {
          __isNew = true
          thisLink = {
            seeks_id: lineId1,
            fromNode: __from,
            toNode: __to,
            appended: false,
            relations: [],
          }
        }
      }
      // devLog('new Line Color:', thisLine.color, thisLine.arrow)
      let _arrow = thisLineData.arrow
      if (thisLineData.isHideArrow) {
        // do nothing
      } else {
        _arrow = this.getLineArrow(thisLineData.color)
      }
      if (!__from.targetNodes) __from.targetNodes = []
      if (!__to.targetNodes) __to.targetNodes = []
      if (!__from.targetNodes.includes(__to)) {
        __from.targetNodes.push(__to)
      }
      if (!__to.targetNodes.includes(__from)) {
        __to.targetNodes.push(__from)
      }
      if (!__from.targetTo.includes(__to)) {
        __from.targetTo.push(__to)
      }
      if (!__to.targetFrom.includes(__from)) {
        __to.targetFrom.push(__from)
      }
      const isDuplicate = false
      // for (let i = 0; i < thisLink.relations.length; i++) {
      //   if (thisLink.relations[i].id === thisLineData.id) {
      //     isDuplicate = true
      //     break
      //   }
      // }
      if (isDuplicate === false) {
        thisLineData.seeks_id = `${thisLink.seeks_id}-${thisLink.relations.length}`
        thisLineData.isReverse = thisLinkIsReserve
        thisLineData.arrow = _arrow
        thisLink.relations.push(thisLineData)
      }
      // devLog('addLine:', thisLine)
      if (__isNew) {
        this.graphData.links.push(thisLink)
        this.tmpData.links_map[lineId1] = thisLink
        thisLink.appended = false
      }
    })
  }
  flatNodeData(
    orign_nodes: JsonNode[],
    parentNode: JsonNode | null,
    nodes_collect: JsonNode[],
    lines_collect: JsonLine[]
  ) {
    orign_nodes.forEach((thisOrignNode) => {
      // if (!thisOrignNode.flated) {
      //   thisOrignNode.flated = true;
      nodes_collect.push(thisOrignNode)
      if (parentNode) {
        lines_collect.push({
          from: parentNode.id,
          to: thisOrignNode.id,
        })
      }
      const _childs = thisOrignNode.children
      if (_childs && _childs.length > 0) {
        this.flatNodeData(_childs, thisOrignNode, nodes_collect, lines_collect)
      }
      // }
    })
  }
  loadGraphJsonData(jsonData: RGJsonData) {
    // 兼容以前的配置
    if (!jsonData.lines) {
      console.error(
        '[relation-graph] For compatibility with older versionsm, Use jsonData.relations as jsonData.lines, It is recommended that you define your data using'
      )
      return
    }
    const _nodes: JsonNode[] = []
    const _lines: JsonLine[] = []
    this.flatNodeData(jsonData.nodes, null, _nodes, _lines)
    jsonData.lines.forEach((orign_link) => {
      _lines.push(orign_link)
    })
    this.loadNodes(_nodes)
    devLog('Nodes is initialized')
    this.loadLines(_lines)
  }
  getLineArrow(
    _color: string | undefined,
    isStartArrow = false,
    checked = false
  ) {
    const arrowType = isStartArrow ? 'start-' : ''
    if (checked) {
      return `${this.options.instanceId}-${arrowType}arrow-checked`
    }
    if (_color) {
      const thisColorId = RGEffectUtils.getColorId(_color)
      if (
        !this.allLineColors
          .map((thisColorObj) => {
            return thisColorObj.id
          })
          .includes(thisColorId)
      ) {
        this.allLineColors.push({ id: thisColorId, color: _color })
      }
      return `${this.options.instanceId}-${arrowType}arrow-${thisColorId}`
    } else {
      return `${this.options.instanceId}-${arrowType}arrow-default`
    }
  }
  getNodes() {
    return this.graphData.nodes
  }
  getLinks() {
    return this.graphData.links
  }
  getGraphJsonData() {
    const _nodes: JsonNode[] = []
    const _lines: JsonLine[] = []
    this.graphData.nodes.forEach((thisNode) => {
      const jsonNode = transNodeToJson(thisNode)
      if (jsonNode) {
        _nodes.push(jsonNode)
      }
    })
    this.graphData.links.forEach((thisLink) => {
      transLinkToJson(thisLink, _lines)
    })
    return {
      rootId: this.graphData.rootNode ? this.graphData.rootNode.id : '',
      nodes: _nodes,
      lines: _lines,
    }
  }
  getGraphJsonOptions() {
    const _options = {}
    const _ignore = [
      'layouter',
      'autoLayouting',
      'canvasNVInfo',
      'canvasOffset',
      'canvasZoom',
      'fullscreen',
      'instanceId',
      'layoutClassName',
      'layoutDirection',
      'layoutLabel',
      'layoutName',
      'resetViewSize',
      'viewELSize',
      'viewNVInfo',
      'viewSize',
      'canvasSize',
    ]
    Object.keys(this.options).forEach((thisKey) => {
      if (!_ignore.includes(thisKey)) {
        // @ts-ignore
        _options[thisKey] = this.options[thisKey]
      }
    })
    return _options
  }
  printGraphJsonData() {
    devLog('graph options:', JSON.stringify(this.getGraphJsonOptions()))
    devLog('graph json data:', JSON.stringify(this.getGraphJsonData()))
  }
  setCheckedNode(nodeId: string) {
    this.options.checkedNodeId = nodeId
  }
  setCheckedLine(lineId: string) {
    this.options.checkedLineId = lineId
  }
  selectNode(node: RGNode, selected: boolean) {
    node.selected = selected
  }
  getNodeById(nodeId: string) {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        return this.graphData.nodes[i]
      }
    }
  }
  addNodes(nodes: JsonNode[], isRelayout = false) {
    this.loadNodes(nodes)
    if (isRelayout) this.doLayout()
  }
  addLines(lines: JsonLine[], isRelayout = false) {
    this.loadLines(lines)
    if (isRelayout) this.doLayout()
  }
  removeNodeById(nodeId: string) {
    let __removed_lines = 0
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i]
      if (thisLink.fromNode.id === nodeId || thisLink.toNode.id === nodeId) {
        this.graphData.links.splice(i, 1)
        i--
        __removed_lines++
      }
    }
    devLog('删除对应的线个数：', nodeId, __removed_lines)
    let __removed_nodes = 0
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        const thisNode = this.graphData.nodes[i]
        thisNode.targetNodes.forEach((thisTNode) => {
          const t_i = thisTNode.targetNodes.indexOf(thisNode)
          if (t_i !== -1) {
            thisTNode.targetNodes.splice(t_i, 1)
          }
        })
        // thisNode.isShow = false
        this.graphData.nodes.splice(i, 1)
        delete this.tmpData.nodes_map[thisNode.id]
        __removed_nodes++
        break
      }
    }
    devLog('删除对应的节点个数：', nodeId, __removed_nodes)
  }
  removeLinkById(node1Id: string, node2Id: string) {
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i]
      if (thisLink.fromNode.id === node1Id || thisLink.toNode.id === node2Id) {
        this.graphData.links.splice(i, 1)
        i--
      }
    }
  }
  setNodePosition(node: RGNode, x: number, y: number) {
    node.x = x
    node.y = y
  }
}
