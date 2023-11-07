import { devLog, getColorId } from '../utils/RGCommon';
import { json2Node, transNodeToJson } from './RGNode';
import { json2Line, transLinkToJson } from './RGLink';
import { createLayout } from './RGLayouter';
import {
  JsonLine,
  JsonNode,
  RGGraphData,
  RGGraphReactiveData,
  RGJsonData,
  RGLayouter,
  RGLayoutOptions, RGLine, RGLineColorItem, RGLink,
  RGListeners, RGNode,
  RGOptions
} from '../types';
import { RelationGraphWith1Dom } from './RelationGraphWith1Dom';
import { newInstanceOptions } from './RGOptions';
export class RelationGraphWith2Data extends RelationGraphWith1Dom {
  graphData:RGGraphData = {
    rootNode: undefined,
    nodes: [],
    links: []
  };
  seeksNodeIdIndex = 0;
  allLineColors:RGLineColorItem[] = [];
  userLayouerClass?:RGLayouter;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  layouter:RGLayouter;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  reactiveData:RGGraphReactiveData;
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  setReactiveData(graphData:RGGraphData, reactiveData:RGGraphReactiveData) {
    this.graphData = graphData;
    this.allLineColors = reactiveData.allLineColors;
    reactiveData.options = this.options;
    this.reactiveData = reactiveData;
  }
  setReactiveDataVue3(graphData:RGGraphData, reactiveData:RGGraphReactiveData) {
    this.graphData = graphData;
    this.allLineColors = reactiveData.allLineColors;
    reactiveData.options = this.options;
    this.reactiveData = reactiveData;
  }
  disableNextLayoutAnimation = false;
  protected _setOptions(options:RGOptions) {
    const newOptions = newInstanceOptions(options);
    this.reactiveData.options = newOptions;
    this.options = this.reactiveData.options;
  }
  protected _initLayoutByLayoutOptions(layoutOptions:RGLayoutOptions) {
    this.options.layoutClassName = layoutOptions.layoutClassName;
    this.options.layoutLabel = layoutOptions.label;
    this.options.layoutName = layoutOptions.layoutName;
    this.options.layoutDirection = layoutOptions.layoutDirection;
    this.layouter = createLayout(layoutOptions, this.options);
  }
  initLayouter() {
    if (this.userLayouerClass) {
      devLog('Use user layouter:', this.userLayouerClass);
      this.layouter = this.userLayouerClass;
    } else {
      if (this.options.layouts && this.options.layouts.length > 0) {
        const _defaultLayoutSetting = this.options.layouts[0];
        devLog('[change layout]Create default layouter：', this.options.layoutName);
        this._initLayoutByLayoutOptions(_defaultLayoutSetting);
      } else {
        devLog('你需要设置layouts来指定当前图谱可以使用的布局器！');
      }
    }
    devLog('Layouter instance:', this.layouter);
  }
  protected async _setJsonData(jsonData:RGJsonData, resetViewSize = false) {
    this.graphData.nodes = [];
    this.graphData.links = [];
    this.graphData.rootNode = undefined;
    devLog('set jsonData:', jsonData);
    // this.initLayouter();
    this.loadGraphJsonData(jsonData);
  }
  generateNewNodeId(addIndex = 1):string {
    const newNodeId = 'N' + (this.graphData.nodes.length + addIndex);
    if (this.getNodeById(newNodeId)) {
      return this.generateNewNodeId(addIndex + 1);
    }
    devLog('generateNewNodeId:', addIndex, newNodeId);
    return newNodeId;
  }
  loadNodes(_nodes:JsonNode[]) {
    _nodes.forEach(thisNodeJson => {
      let thisNode = this.graphData.nodes.find(n => n.id === thisNodeJson.id);
      if (!thisNode) {
        thisNode = json2Node(thisNodeJson);
        if (thisNode) {
          thisNode.seeks_id = this.seeksNodeIdIndex++;
          this.graphData.nodes.push(thisNode);
        }
      }
    });
  }
  loadLines(_lines:JsonLine[]) {
    _lines.forEach(thisLineJson => {
      let __isNew = false;
      let __from;
      let __to;
      if (typeof thisLineJson.from === 'object') {
        __from = thisLineJson.from;
      } else {
        __from = this.graphData.nodes.find(n => n.id === thisLineJson.from);
      }
      if (typeof thisLineJson.to === 'object') {
        __to = thisLineJson.to;
      } else {
        __to = this.graphData.nodes.find(n => n.id === thisLineJson.to);
      }
      if (!__from) {
        console.error('找不到from:', thisLineJson);
        return;
      }
      if (!__to) {
        console.error('找不到to:', thisLineJson);
        return;
      }
      // devLog('[add link]', __from.text, __to.text, __from.seeks_id, __to.seeks_id, thisLink)
      const linkId1 = `${__from.seeks_id}-${__to.seeks_id}`;
      const linkId2 = `${__to.seeks_id}-${__from.seeks_id}`;
      const thisLineData = json2Line(thisLineJson);
      let thisLink = this.graphData.links.find(lk => lk.seeks_id === linkId1);
      let thisLinkIsReserve = false;
      if (!thisLink) {
        thisLink = this.graphData.links.find(lk => lk.seeks_id === linkId2);
        if (thisLink) {
          thisLinkIsReserve = true;
        } else {
          __isNew = true;
          thisLink = {
            seeks_id: linkId1,
            fromNode: __from,
            toNode: __to,
            appended: false,
            relations: []
          };
        }
      }
      // devLog('new Line Color:', thisLine.color, thisLine.arrow)
      let _arrow = thisLineData.arrow;
      if (thisLineData.isHideArrow) {
        // do nothing
      } else {
        _arrow = this.getLineArrow(thisLineData.color);
      }
      if (!__from.targetNodes)__from.targetNodes = [];
      if (!__to.targetNodes)__to.targetNodes = [];
      if (!__from.targetNodes.includes(__to)) {
        __from.targetNodes.push(__to);
      }
      if (!__to.targetNodes.includes(__from)) {
        __to.targetNodes.push(__from);
      }
      if (!__from.targetTo.includes(__to)) {
        __from.targetTo.push(__to);
      }
      if (!__to.targetFrom.includes(__from)) {
        __to.targetFrom.push(__from);
      }
      let isDuplicate = false;
      for (let i = 0; i < thisLink.relations.length; i++) {
        if ((thisLink.relations[i].id || thisLineData.id) && thisLink.relations[i].id === thisLineData.id) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate === false) {
        if (!thisLineData.id) thisLineData.id = `${thisLink.seeks_id}-${thisLink.relations.length}`;
        thisLineData.isReverse = thisLinkIsReserve;
        thisLineData.arrow = _arrow;
        thisLink.relations.push(thisLineData);
      }
      // devLog('addLine:', thisLine)
      if (__isNew) {
        this.graphData.links.push(thisLink);
        thisLink.appended = false;
      }
    });
  }
  flatNodeData(orign_nodes:JsonNode[], parentNode:JsonNode|null, nodes_collect:JsonNode[], links_collect:JsonLine[]) {
    orign_nodes.forEach(thisOrignNode => {
      nodes_collect.push(thisOrignNode);
      if (parentNode) {
        links_collect.push({
          from: parentNode.id,
          to: thisOrignNode.id
        });
      }
      const _childs = thisOrignNode.childs || thisOrignNode.children;
      if (_childs && _childs.length > 0) {
        this.flatNodeData(_childs, thisOrignNode, nodes_collect, links_collect);
      }
      // }
    });
  }
  loadGraphJsonData(jsonData:RGJsonData) {
    // 兼容以前的配置
    if (!jsonData.lines) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jsonData.lines = jsonData.relations;
      console.warn('[relation-graph] For compatibility with older versionsm, Use jsonData.relations as jsonData.lines, It is recommended that you define your data using');
    }
    if (!jsonData.lines) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jsonData.lines = jsonData.links;
      console.warn('[relation-graph] For compatibility with older versionsm, Use jsonData.links as jsonData.lines, It is recommended that you define your data using');
    }
    const _orign_nodes = jsonData.nodes;
    const _nodes:JsonNode[] = [];
    const _lines:JsonLine[] = [];
    // 自动转换tree data
    this.flatNodeData(_orign_nodes, null, _nodes, _lines);
    jsonData.lines.forEach(orign_link => {
      _lines.push(orign_link);
    });
    this.loadNodes(_nodes);
    devLog('Nodes is initialized');
    this.loadLines(_lines);
  }
  getLineArrow(_color:string|undefined, isStartArrow = false, checked = false) {
    const arrowType = (isStartArrow ? 'start-' : '');
    if (checked) {
      return `${this.options.instanceId}-${arrowType}arrow-checked`;
    }
    if (_color) {
      const thisColorId = getColorId(_color);
      if (!this.allLineColors.map(thisColorObj => {
        return thisColorObj.id;
      }).includes(thisColorId)) {
        this.allLineColors.push({ id: thisColorId, color: _color });
      }
      return `${this.options.instanceId}-${arrowType}arrow-${thisColorId}`;
    } else {
      return `${this.options.instanceId}-${arrowType}arrow-default`;
    }
  }
  getNodes() {
    return this.graphData.nodes;
  }
  getLinks() {
    return this.graphData.links;
  }
  getGraphJsonData() {
    const _nodes:JsonNode[] = [];
    const _lines:JsonLine[] = [];
    this.graphData.nodes.forEach(thisNode => {
      const jsonNode = transNodeToJson(thisNode);
      if (jsonNode) {
        _nodes.push(jsonNode);
      }
    });
    this.graphData.links.forEach(thisLink => {
      transLinkToJson(thisLink, _lines);
    });
    return {
      rootId: this.graphData.rootNode ? this.graphData.rootNode.id : '',
      nodes: _nodes,
      lines: _lines
    };
  }
  getGraphJsonOptions() {
    const _options = {};
    const _ignore = [
      'layouter', 'autoLayouting', 'canvasNVInfo', 'canvasOffset', 'canvasZoom', 'fullscreen', 'instanceId', 'layoutClassName', 'layoutDirection',
      'layoutLabel', 'layoutName', 'resetViewSize', 'viewELSize', 'viewNVInfo', 'viewSize', 'canvasSize',
      'newLinkTemplate', 'newLineTemplate', 'newNodeTemplate'
    ];
    Object.keys(this.options).forEach(thisKey => {
      if (!_ignore.includes(thisKey)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _options[thisKey] = this.options[thisKey];
      }
    });
    return _options;
  }
  printGraphJsonData() {
    devLog('graph options:', JSON.stringify(this.getGraphJsonOptions()));
    devLog('graph json data:', JSON.stringify(this.getGraphJsonData()));
  }
  getNodeById(nodeId:string) {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        return this.graphData.nodes[i];
      }
    }
  }
  getLinkById(linkId:string) {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.links[i].seeks_id === linkId) {
        return this.graphData.links[i];
      }
    }
  }
  addNodes(nodes:JsonNode[]) {
    devLog('addNodes:', nodes);
    this.loadNodes(nodes);
  }
  addLines(lines:JsonLine[]) {
    devLog('addLines:', lines);
    this.loadLines(lines);
  }
  removeNodeById(nodeId:string) {
    let __removed_lines = 0;
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i];
      if (thisLink.fromNode.id === nodeId || thisLink.toNode.id === nodeId) {
        // devLog(this.graphData.links[i])
        this.removeLink(thisLink);
        // this.graphData.links.splice(i, 1);
        i--;
        __removed_lines++;
        // devLog(this.graphData.links[i])
      }
    }
    devLog('删除对应的线个数：', nodeId, __removed_lines);
    let __removed_nodes = 0;
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        // const thisNode = this.graphData.nodes[i];
        // thisNode.targetNodes.forEach(thisTNode => {
        //   const t_i = thisTNode.targetNodes.indexOf(thisNode);
        //   if (t_i !== -1) {
        //     thisTNode.targetNodes.splice(t_i, 1);
        //   }
        // });
        // thisNode.isShow = false
        this.graphData.nodes.splice(i, 1);
        __removed_nodes++;
        break;
      }
    }
    devLog('删除对应的节点个数：', nodeId, __removed_nodes);
  }
  removeNode(node:RGNode) {
    this.removeNodeById(node.id);
  }
  removeLinkByTwoNode(node1Id:string, node2Id:string) {
    for (const link of this.getLinks()) {
      if ((link.fromNode.id === node1Id && link.toNode.id === node2Id) || (link.fromNode.id === node1Id && link.toNode.id === node2Id)) {
        this.removeLink(link);
        break;
      }
    }
  }
  getGroupByNode(node:RGNode, groupNodes:RGNode[] = []) {
    if (!groupNodes.includes(node)) groupNodes.push(node);
    for (const thisNode of node.targetNodes) {
      if (!groupNodes.includes(thisNode)) {
        this.getGroupByNode(thisNode, groupNodes);
      }
    }
    return groupNodes;
  }
  clearItem(nodes:RGNode[], targetNode:RGNode) {
    for (let i = 0; i < nodes.length; i++) {
      const target = nodes[i];
      if (target === targetNode) {
        nodes.splice(i, 1);
        i--;
      }
    }
  }
  removeNodeRef(node:RGNode, refNode:RGNode) {
    if (node) {
      if (node.targetNodes) {
        this.clearItem(node.targetNodes, refNode);
      }
      if (node.targetFrom) {
        this.clearItem(node.targetFrom, refNode);
      }
      if (node.targetTo) {
        this.clearItem(node.targetTo, refNode);
      }
    }
  }
  removeLinkById(linkId:string) {
    devLog('removeLinkById:', linkId);
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i];
      if (thisLink.seeks_id === linkId) {
        this.removeNodeRef(thisLink.fromNode, thisLink.toNode);
        this.removeNodeRef(thisLink.toNode, thisLink.fromNode);
        this.graphData.links.splice(i, 1);
        i--;
      }
    }
  }
  removeLink(link:RGLink) {
    devLog('removeLink:', link);
    this.removeLinkById(link.seeks_id);
  }
  removeLine(link:RGLink, line:RGLine) {
    devLog('removeLine:', link, line);
    for (let i = 0; i < link.relations.length; i++) {
      const thisLine = link.relations[i];
      if (thisLine === line) {
        link.relations.splice(i, 1);
      }
    }
    if (link.relations.length === 0) {
      this.removeLink(link);
    }
  }
  setNodePosition(node:RGNode, x:number, y:number) {
    // devLog('debug0910: setNodePosition:', node.text, x, y)
    node.x = x;
    node.y = y;
  }
  setCanvasCenter(x:number, y:number) {
    const viewX = this.options.viewSize.width / 2;
    const viewY = this.options.viewSize.height / 2;
    this.setCanvasOffset(viewX - x, viewY - y);
  }
  setCanvasOffset(x:number, y:number) {
    this.options.canvasOffset.x = x;
    this.options.canvasOffset.y = y;
  }
  findGroupNodes(node:RGNode, childs:RGNode[]) {
    childs.push(node);
    node.targetNodes.forEach((thisNode) => {
      if (!childs.includes(thisNode)) this.findGroupNodes(thisNode, childs);
    });
  }
  resetViewSize() {
    if (!this.options) {
      return;
    }
    devLog('resetViewSize');
    this.options.viewSize.width = this.$dom.getBoundingClientRect().width;
    this.options.viewSize.height = this.$dom.getBoundingClientRect().height;
    this.options.canvasZoom = 100;
    this.options.canvasOffset.x = this.options.viewNVInfo.width / 2;
    this.options.canvasOffset.y = this.options.viewNVInfo.height / 2;
    this.refreshNVAnalysisInfo();
  }
  refreshNVAnalysisInfo() {
    // devLog('[refreshNVAnalysisInfo]');
    if (!this.$dom) {
      console.error('cannot get view size !');
      return;
    }
    // devLog('reanalysis NV info...')
    const result = {
      NMCanvasCenter: { x: 0, y: 0 }
    };
    const _view_info = this.$dom.getBoundingClientRect();
    this.options.viewNVInfo.x = _view_info.left;
    this.options.viewNVInfo.y = _view_info.top;
    this.options.viewNVInfo.width = _view_info.width;
    this.options.viewNVInfo.height = _view_info.height;
    const _NM_canvas_width = this.options.canvasSize.width * (this.options.canvasZoom / 100);
    const _NM_canvas_height = this.options.canvasSize.height * (this.options.canvasZoom / 100);
    result.NMCanvasCenter.x = this.options.canvasOffset.x + (this.options.canvasSize.width / 2);
    result.NMCanvasCenter.y = this.options.canvasOffset.y + (this.options.canvasSize.height / 2);
    this.options.canvasNVInfo.x = result.NMCanvasCenter.x - _NM_canvas_width / 2;
    this.options.canvasNVInfo.y = result.NMCanvasCenter.y - _NM_canvas_height / 2;
    this.options.canvasNVInfo.width = _NM_canvas_width;
    this.options.canvasNVInfo.height = _NM_canvas_height;
    this.options.viewELSize.width = _view_info.width;
    this.options.viewELSize.height = _view_info.height;
    this.options.viewELSize.left = _view_info.left;
    this.options.viewELSize.top = _view_info.top;
  }
  getStuffSize(nodes?:RGNode[]) {
    const nodesForCalc = nodes || this.graphData.nodes;
    let minX = 9999999;
    let minY = 9999999;
    let maxX = 0;
    let maxY = 0;
    nodesForCalc.forEach(thisNode => {
      if (thisNode.x < minX) {
        minX = thisNode.x;
      }
      if (thisNode.x > maxX) {
        maxX = thisNode.x + thisNode.el.offsetWidth;
      }
      if (thisNode.y < minY) {
        minY = thisNode.y;
      }
      if (thisNode.y > maxY) {
        maxY = thisNode.y + thisNode.el.offsetHeight;
      }
    });
    const padding = 100;
    const _stuff_width = maxX - minX + padding;
    const _stuff_height = maxY - minY + padding;
    return {
      width: _stuff_width,
      height: _stuff_height,
      minX,
      maxX,
      minY,
      maxY
    };
  }
  getNodesCenter() {
    const stuffSize = this.getStuffSize();
    devLog('getStuffSize:', stuffSize);
    // const x = (stuffSize.width - this.options.viewSize.width) / 2;
    // const y = (stuffSize.height - this.options.viewSize.height) / 2;
    const x = stuffSize.minX + (stuffSize.width - 100) / 2;
    const y = stuffSize.minY + (stuffSize.height - 100) / 2;
    return {
      x,
      y
    };
  }
  querySearchAsync(queryString:string) {
    devLog('fetch-suggestions', queryString);
    queryString = queryString.trim();
    if (queryString === '') {
      return;
    }
    const rst:RGNode[] = [];
    this.graphData.nodes.forEach(thisNode => {
      devLog('fetch:', thisNode.text);
      if (thisNode.text.includes(queryString)) {
        rst.push(thisNode);
      }
    });
    devLog('fetched:', rst.length);
    return rst;
  }
  printOptions() {
    const objectData = this.getGraphJsonOptions();
    console.log('options:', objectData);
    console.log('options-json-string:');
    console.log(JSON.stringify(objectData));
  }
  printData() {
    const objectData = this.getGraphJsonData();
    console.log('data:', objectData);
    console.log('data-json-string:');
    console.log(JSON.stringify(objectData));
  }
}
