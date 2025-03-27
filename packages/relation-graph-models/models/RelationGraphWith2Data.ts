import { devLog, getColorId } from '../utils/RGCommon';
import { json2Node, transNodeToJson } from './RGNode';
import {json2Line, transLineToJson, transLinkToJson} from './RGLink';
import { createLayout } from './RGLayouter';
import {
  JsonLine,
  JsonNode, RGElementLine,
  RGGraphData,
  RGGraphReactiveData,
  RGJsonData,
  RGLayouter,
  RGLayoutOptions, RGLine, RGLineColorItem, RGLineTarget, RGLink,
  RGListeners, RGNode,
  RGOptions
} from '../types';
import { RelationGraphWith1Dom } from './RelationGraphWith1Dom';
import { newInstanceOptions } from './RGOptions';
import RGNodesAnalytic from '../utils/RGNodesAnalytic';
export class RelationGraphWith2Data extends RelationGraphWith1Dom {
  /**
   * All data managed in RelationGraph, including all nodes RGNode, all relationships RGLink, the current root node, and all element lines elementLines
   */
  graphData:RGGraphData = {
    rootNode: undefined,
    nodes: [],
    links: [],
    elementLines: []
  };
  protected seeksNodeIdIndex = 0;
  /**
   * [Used internally by relation-graph] All colors involved in the current lines
   */
  allLineColors:RGLineColorItem[] = [];
  userLayouerClass?:RGLayouter;
  /**
   * [Used internally by relation-graph] The current layouter
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  layouter:RGLayouter;
  /**
   * [Used internally by relation-graph] The reactive data object of the current RelationGraph component
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  reactiveData:RGGraphReactiveData;
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }

  /**
   * [Used internally by relation-graph] Set reactive data objects
   * @param graphData
   * @param reactiveData
   */
  setReactiveData(graphData:RGGraphData, reactiveData:RGGraphReactiveData) {
    this.reactiveData = reactiveData;
    this.graphData = graphData;
    this.allLineColors = reactiveData.allLineColors;
    Object.assign(reactiveData.options, this.options);
    // console.log(this.id, this.options.instanceId, 'xxxxxxxxxxxxxxxxx:', this.options.defaultNodeColor);
    this.options = reactiveData.options;
    // this.options.xxx = Math.random();
    // setInterval(() => {
    //   console.log(this.id, this.options.xxx, 'xxxxx###', this.options.instanceId, this.options.defaultNodeColor);
    // }, 3000);
  }
  /**
   * [Used internally by relation-graph] Set reactive data objects
   * @param graphData
   * @param reactiveData
   */
  setReactiveDataVue3(graphData:RGGraphData, reactiveData:RGGraphReactiveData) {
    this.reactiveData = reactiveData;
    this.graphData = graphData;
    this.allLineColors = reactiveData.allLineColors;
    // reactiveData.options = this.options;
    Object.assign(reactiveData.options, this.options);
    this.options = reactiveData.options;
  }
  disableNextLayoutAnimation = false;
  protected _setOptions(options:RGOptions) {
    const newOptions = newInstanceOptions(options);
    if (this.reactiveData) { // Vue
      Object.assign(this.reactiveData.options, newOptions);
    } else { // React
      Object.assign(this.options, newOptions);
    }
  }
  protected _initLayoutByLayoutOptions(layoutOptions:RGLayoutOptions) {
    this.options.layoutClassName = layoutOptions.layoutClassName;
    this.options.layoutLabel = layoutOptions.label;
    this.options.layoutName = layoutOptions.layoutName;
    this.options.layoutDirection = layoutOptions.layoutDirection;
    this.layouter = createLayout(layoutOptions, this.options, this);
  }
  protected initLayouter() {
    if (this.userLayouerClass) {
      devLog('Use user layouter:', this.userLayouerClass);
      this.layouter = this.userLayouerClass;
    } else {
      if (this.options.layouts && this.options.layouts.length > 0) {
        const _defaultLayoutSetting = this.options.layouts[0];
        devLog('[change layout]Create default layouter：', this.options.layoutName);
        this._initLayoutByLayoutOptions(_defaultLayoutSetting);
      } else {
        devLog('Not set option: layout/layouts！');
      }
    }
    devLog('Layouter instance:', this.layouter);
  }
  protected async _setJsonData(jsonData:RGJsonData, resetViewSize = false) {
    await this.clearGraph();
    devLog('set jsonData:', jsonData);
    // this.initLayouter();
    this.loadGraphJsonData(jsonData);
  }

  /**
   * Clear all data in RelationGraph, including nodes, lines, element lines, and the root node
   */
  clearGraph() {
    this.graphData.nodes = [];
    this.graphData.links = [];
    this.graphData.elementLines = [];
    this.graphData.rootNode = undefined;
  }

  /**
   * Clear all element lines elementLines
   */
  async clearElementLines() {
    this.graphData.elementLines = [];
  }

  /**
   * Generate a unique Node id relative to the current existing nodes
   * @param idLength The minimum length of the id, default is 5
   */
  generateNewNodeId(idLength= 5):string {
    const newNodeId = this.generateNewUUID(idLength);
    if (this.getNodeById(newNodeId)) {
      return this.generateNewNodeId(idLength + 1);
    }
    return newNodeId;
  }
  /**
   * Generate a highly likely unique id, the probability of non-duplication depends on the parameter idLength (the length of the id)
   * @param idLength The length of the id, default is 5
   */
  generateNewUUID(idLength= 5) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let uuid = '';
    const maxLength = idLength > 30 ? 30 : idLength;
    for (let i = 0; i < maxLength; i++) {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    return uuid;
  }

  /**
   * Convert JsonNode to RGNode object and add it to the graph
   * @param _nodes
   * @protected
   */
  protected loadNodes(_nodes:JsonNode[]) {
    const nodeMap = {};
    this.graphData.nodes.forEach(n => {
      nodeMap[n.id] = n;
    });
    const newNodes = [];
    _nodes.forEach(thisNodeJson => {
      let thisNode = nodeMap[thisNodeJson.id];
      if (!thisNode) {
        thisNode = json2Node(thisNodeJson, this.options);
        if (thisNode) {
          thisNode.seeks_id = this.seeksNodeIdIndex++;
          nodeMap[thisNode.id] = thisNode;
          newNodes.push(thisNode);
        }
      }
    });
    this.graphData.nodes.push(...newNodes);
  }

 /**
 * Convert JsonLine to RGLine object and add it to the graph
 * @param _lines
 * @protected
 */
  protected loadLines(_lines:JsonLine[]) {
    const nodeMap = {};
    this.graphData.nodes.forEach(node => {
      nodeMap[node.id] = node;
    });
    const linkMap = {};
    this.graphData.links.forEach(link => {
      linkMap[link.seeks_id] = link;
    });
    const newLines = [];
    _lines.forEach(thisLineJson => {
      let __isNew = false;
      let __from;
      let __to;
      if (typeof thisLineJson.from === 'object') {
        __from = thisLineJson.from;
      } else {
        __from = nodeMap[thisLineJson.from]; // this.graphData.nodes.find(n => n.id === thisLineJson.from);
      }
      if (typeof thisLineJson.to === 'object') {
        __to = thisLineJson.to;
      } else {
        __to = nodeMap[thisLineJson.to]; // this.graphData.nodes.find(n => n.id === thisLineJson.to);
      }
      if (!__from) {
        console.error('Can not found from node:', thisLineJson);
        return;
      }
      if (!__to) {
        console.error('Can not found to node:', thisLineJson);
        return;
      }
      // devLog('[add link]', __from.text, __to.text, __from.seeks_id, __to.seeks_id, thisLink)
      const linkId1 = `${__from.seeks_id}-${__to.seeks_id}`;
      const linkId2 = `${__to.seeks_id}-${__from.seeks_id}`;
      const thisLineData = json2Line(thisLineJson);
      let thisLink: RGLink = linkMap[linkId1]; // this.graphData.links.find(lk => lk.seeks_id === linkId1);
      let thisLinkIsReserve = false;
      if (!thisLink) {
        thisLink = linkMap[linkId2]; // this.graphData.links.find(lk => lk.seeks_id === linkId2);
        if (thisLink) {
          thisLinkIsReserve = true;
        } else {
          __isNew = true;
          thisLink = {
            seeks_id: linkId1,
            fromNode: __from,
            toNode: __to,
            appended: false,
            forDisplayOnly: true,
            invisiable: false,
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
      if (!thisLineData.forDisplayOnly ) {
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
        thisLink.forDisplayOnly = false;
      }
      let isDuplicate = false;
      for (let i = 0; i < thisLink.relations.length; i++) {
        if (thisLineData.id && thisLink.relations[i].id === thisLineData.id) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate === false) {
        if (!thisLineData.id) thisLineData.id = this.getNextLineId(thisLink);
        thisLineData.isReverse = thisLinkIsReserve;
        thisLineData.arrow = _arrow;
        thisLink.relations.push(thisLineData);
      }
      // devLog('addLine:', thisLine)
      if (__isNew) {
        newLines.push(thisLink);
        linkMap[thisLink.seeks_id] = thisLink;
        thisLink.appended = false;
      }
    });
    this.graphData.links.push(...newLines);
  }
  protected nextLineId = 0;
  protected getNextLineId(thisLink: RGLink):string {
    const nextId = this.nextLineId++;
    const lineId = `${thisLink.seeks_id}-${nextId}`;
    for (let i = 0; i < thisLink.relations.length; i++) {
      if (thisLink.relations[i].id === lineId) {
        return this.getNextLineId(thisLink);
        break;
      }
    }
    return lineId;
  }

  /**
   * Expand tree-structured data into flattened data
   * @param orign_nodes Tree-structured data, e.g., [{id:'a',children:[{id:'a-1'},{id:'a-1', children: [{id:'a-1-1'}]}]}]
   * @param parentNode Please pass null
   * @param nodes_collect All expanded nodes will be stored here
   * @param lines_collect All expanded lines will be stored here
   */
  flatNodeData(orign_nodes:JsonNode[], parentNode:JsonNode|null, nodes_collect:JsonNode[], lines_collect:JsonLine[]) {
    RGNodesAnalytic.flatNodeData(orign_nodes, parentNode, nodes_collect, lines_collect);
  }
  protected loadGraphJsonData(jsonData:RGJsonData) {
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
    this._dataUpdated();
    setTimeout(() => {
      jsonData.elementLines && this.addElementLines(jsonData.elementLines);
    }, 500);
  }
  protected getLineArrow(_color:string|undefined, isStartArrow = false, checked = false) {
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

 /**
 * Get all node objects
 */
  getNodes() {
    return this.graphData.nodes;
  }

  /**
   * Get all relationship objects, note that here Link is not a line.
   * Line: The lines refer to the connections between nodes, and the graph will generate lines based on these lines.
   * Relationship (Link): The graph will also generate a Link to summarize the associations between nodes based on the lines (there is only one Link between two directly related nodes, and all relationship lines (Line[]) between nodes will be placed in link.relations).
   * You can traverse and get all lines like this:
   * const allLines: RGLine[] = [];
   * for (const link of graphInstance.getLinks()) {
   *    for (const line of link.relations) {
   *         allLines.push(line);
   *    }
   * }
   * // The Line object has all the properties of JsonLine, you can change these properties. For example, change the color of all lines to red:
   * for (const line of allLines) {
   *    line.color = 'red';
   * }
   */
  getLinks() {
    return this.graphData.links;
  }

  getLines(): RGLine[] {
    const lines: RGLine[] = [];
    for (const link of this.graphData.links) {
      lines.push(...link.relations);
    }
    return lines;
  }
  getLinesByNode(node: RGNode): RGLine[] {
    const lines: RGLine[] = [];
    for (const link of this.graphData.links) {
      if (node === link.fromNode || node === link.toNode ) {
        lines.push(...link.relations);
      }
    }
    return lines;
  }

  /**
   * Convert an RGNode object to a JSON-serializable object
   * @param nodeJson: JsonNode
   */
  transRGNodeToJsonObject(node: RGNode): JsonNode {
    const jsonNode =  transNodeToJson(node)!;
    jsonNode.selected = false;
    return jsonNode;
  }
  /**
   * Convert an RGLink object to a JSON-serializable object
   * @param lines: JsonLine[]
   */
  transRGLinkToJsonObject(link: RGLink): JsonLine[] {
    const linesJson: JsonLine[] =  [];
    transLinkToJson(link, linesJson);
    return linesJson;
  }
  /**
  * Convert an RGLine object to a JSON-serializable object
  * @param lineJson: JsonLine
  */
  transRGLineToJsonObject(line: RGLine): JsonLine {
    return transLineToJson(line)!;
  }
  /**
   * Get all nodes and lines data in the current graph.
   * @param graphJsonData: RGJsonData
   */
  getGraphJsonData(): RGJsonData {
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

  /**
   * Get the configuration information of the current graph
   */
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

  /**
   * Print the current graph configuration and JSON data to the console
   */
  printGraphJsonData() {
    console.log('graph options:', JSON.stringify(this.getGraphJsonOptions()));
    console.log('graph json data:', JSON.stringify(this.getGraphJsonData()));
  }

  /**
   * Get the node object by node id
   * @param nodeId: RGNode
   */
  getNodeById(nodeId:string) {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        return this.graphData.nodes[i];
      }
    }
  }

  /**
   * Get the RGLink object by relationship id
   * @param linkId: string
   */
  getLinkById(linkId:string) {
    for (let i = 0; i < this.graphData.links.length; i++) {
      if (this.graphData.links[i].seeks_id === linkId) {
        return this.graphData.links[i];
      }
    }
  }
  /**
   * Get the RGLink object by line id
   * @param line: RGLine
   */
  getLinkByLineId(lineId:string) {
    for (let i = 0; i < this.graphData.links.length; i++) {
      if (this.graphData.links[i].relations.findIndex(l => l.id === lineId) !== -1) {
        return this.graphData.links[i];
      }
    }
  }
  /**
   * Get the RGLink object by line
   * @param line: RGLine
   */
  getLinkByLine(line: RGLine) {
    return this,this.getLinkByLineId(line.id!);
  }

  /**
   * Add multiple nodes
   * @param nodes: JsonNode[]
   */
  addNodes(nodes:JsonNode[]) {
    devLog('addNodes:', nodes);
    this.loadNodes(nodes);
    this._dataUpdated();
  }

  /**
   * Add multiple lines
   * @param lines: JsonLine[]
   */
  addLines(lines:JsonLine[]) {
    devLog('addLines:', lines);
    this.loadLines(lines);
    this._dataUpdated();
  }

  /**
   * Add multiple element lines
   * @param lines: JsonLine[]
   */
  addElementLines(lines:JsonLine[]) {
    devLog('addElementLines:', lines);
    lines.forEach(thisLineJson => {
      const __from = document.getElementById(thisLineJson.from);
      const __to = document.getElementById(thisLineJson.to);
      if (!__from) {
        console.error('Can not found from HTMLElement: #' + thisLineJson.from);
        // return;
      }
      if (!__to) {
        console.error('Can not found toHTMLElement: #' + thisLineJson.to);
        // return;
      }
      const thisLineData: RGLine = json2Line(thisLineJson);
      // devLog('new Line Color:', thisLine.color, thisLine.arrow)
      let _arrow = thisLineData.arrow;
      if (thisLineData.isHideArrow) {
        // do nothing
      } else {
        _arrow = this.getLineArrow(thisLineData.color);
      }
      thisLineData.arrow = _arrow;
      thisLineData.forDisplayOnly = true;
      let elLink: RGLink|undefined = undefined;
      for (const elementLink of this.graphData.elementLines) {
        if (
          (elementLink.fromNode.id === thisLineData.from && elementLink.toNode.id === thisLineData.to)
          || (elementLink.fromNode.id === thisLineData.to && elementLink.toNode.id === thisLineData.from)
        ) {
          elLink = elementLink;
        }
        if (elementLink.relations.some(line => thisLineData.id === line.id)) {
          // 忽略id重复的数据
          return;
        }
      }
      if (!elLink) {
        // if (!thisLineData.id) thisLineData.id = `rg-ell-${thisLineData.from}-${thisLineData.to}`;
        if (!thisLineData.id) thisLineData.id = this.generateNewUUID(6);
        const fromEl: RGNode = {
          id: thisLineData.from,
          type: 'el',
          nodeShape: 1,
          // junctionPoint: 'ltrb',
          junctionPoint: 'lr',
          x: 0,
          y: 0,
          el: {
            offsetWidth: 10,
            offsetHeight: 10
          }
        };
        const toEl: RGNode = {
          id: thisLineData.to,
          type: 'el',
          nodeShape: 1,
          // junctionPoint: 'ltrb',
          junctionPoint: 'lr',
          x: 0,
          y: 0,
          el: {
            offsetWidth: 10,
            offsetHeight: 10
          }
        };
        elLink = {
          seeks_id: 'ell-' + this.generateNewUUID(8),
          fromNode: fromEl as RGNode,
          toNode: toEl as RGNode,
          relations: [thisLineData],
          appended: true,
          forDisplayOnly: true
        };
        this._updateElementLinePosition(__from!, elLink.fromNode);
        this._updateElementLinePosition(__to!, elLink.toNode);
        this.graphData.elementLines.push(elLink);
      } else {
        elLink.relations.push(thisLineData);
      }
    });
    this.updateElementLines();
    this._dataUpdated();
  }

  /**
   * 根据元素连线id获取元素连线
   * @param elLink: RGLink
   */
  getElementLineById(elLineId:string) {
    for (const elLink of this.graphData.elementLines) {
      for (const elLine of elLink.relations) {
        if (elLine.id === elLineId) {
          return elLine;
        }
      }
    }
  }

  /**
   * Get all element lines
   */
  getElementLines(): RGLine[] {
    const elementLines: RGLine[] = [];
    this.graphData.elementLines.forEach(ell => {
      elementLines.push(...ell.relations);
    });
    return elementLines;
  }

  /**
  * Delete element line
  * @param elementLine: RGElementLine
  */
  removeElementLine(elementLine: RGElementLine | RGLink | RGLine) {
    devLog('removeElementLine:', elementLine);
    for (const elLink of this.graphData.elementLines) {
      if (elLink === elementLine) {
        this.graphData.elementLines.splice(this.graphData.elementLines.indexOf(elLink), 1);
        return;
      } else {
        for (const elLine of elLink.relations) {
          if (elLine === elementLine) {
            this.graphData.elementLines.splice(elLink.relations.indexOf(elLine), 1);
            return;
          }
        }
      }
    }
  }
  /**
  * Delete element line by element line id
  * @param elementLineId: string Element line id
  */
  removeELementLineById(elementLineId:string) {
    devLog('removeELementLineById:', elementLineId);
    for (const elLink of this.graphData.elementLines) {
      if (elLink.seeks_id === elementLineId) {
        this.removeElementLine(elLink);
        return;
      } else {
        for (const elLine of elLink.relations) {
          if (elLine.id === elementLineId) {
            this.removeElementLine(elLine);
            return;
          }
        }
      }
    }
  }
  private elLineUpdating = false;

 /**
 * Update the position information of all element lines
 */
  updateElementLines() {
    // console.error('xx');
    devLog('updateElementLines:', this.graphData.elementLines.length);
    if (this.graphData.elementLines.length === 0) {
      return;
    }
    if (this.elLineUpdating) {
      return;
    }
    this.elLineUpdating = true;
    setTimeout(() => {
      this.elLineUpdating = false;
      this._updateElementLines();
    }, 50);
  }
  private _updateElementLines() {
    // console.log('from be hidden:');
    this.graphData.elementLines.forEach(elLine => {
      const __from = document.getElementById(elLine.relations[0].from);
      const __to = document.getElementById(elLine.relations[0].to);
      if (!__from) {
        elLine.relations.forEach(line => {
          line.isHide = true;
        });
        return;
      }
      if (!__to) {
        elLine.relations.forEach(line => {
          line.isHide = true;
        });
        return;
      }
      // if (!this.isElementVisible(__from) || !!this.isElementVisible(__to)) {
      //   elLine.relations[0].hidden = true;
      //   return;
      // }
      this._updateElementLinePosition(__from, elLine.fromNode);
      this._updateElementLinePosition(__to, elLine.toNode);
      if (elLine.fromNode.el.offsetWidth === 0 && elLine.fromNode.el.offsetHeight === 0  ) {
        // console.log('from be hidden:', elLine.fromNode);
        elLine.relations.forEach(line => {
          line.isHide = true;
        });
        return;
      }
      if (elLine.toNode.el.offsetWidth === 0 && elLine.toNode.el.offsetHeight === 0  ) {
        // console.log('to be hidden:', elLine.toNode);
        elLine.relations.forEach(line => {
          line.isHide = true;
        });
        return;
      }
      elLine.relations.forEach(line => {
        line.isHide = false;
      });
      // console.log('update:!to:', elLine.relations[0].to);
    });
    this._dataUpdated();
  }
  // isElementVisible(element: HTMLElement, deep = 0) {
  //   if (element === document.body) {
  //     return true;
  //   }
  //   const computedStyle = getComputedStyle(element);
  //   const display = computedStyle.getPropertyValue('display');
  //   const visibility = computedStyle.getPropertyValue('visibility');
  //   if (display === 'none' || visibility === 'hidden') {
  //     return false;
  //   }
  //   if (deep > 10) return true;
  //   if (element.parentElement){
  //     return this.isElementVisible(element.parentElement, deep + 1);
  //   } else {
  //     return true;
  //   }
  // }
  private _updateElementLinePosition(el: HTMLElement, target: RGLineTarget): void {
    if (!el) {
      return;
    }
    const box = el.getBoundingClientRect();
    const canvasBox = this.$canvasDom.getBoundingClientRect();

    target.x = (box.x - canvasBox.x) / (this.options.canvasZoom / 100);
    target.y = (box.y - canvasBox.y) / (this.options.canvasZoom / 100);
    // console.log('updateElementLinePosition:', box.width, box.height);
    const newWidth = box.width / (this.options.canvasZoom / 100);
    const newHeight = box.height / (this.options.canvasZoom / 100);
    if (newWidth > 11 && Math.abs(newWidth - target.el.offsetWidth) > 2) {
      // console.log('xxxxxxxxxxxx:width', newWidth, Math.abs(newWidth - target.el.offsetWidth) > 2, target.el.offsetWidth, target.el.offsetHeight);
      target.el.offsetWidth = newWidth;
    }
    if (newHeight > 11 && Math.abs(newHeight - target.el.offsetHeight) > 2) {
      // console.log('xxxxxxxxxxxx:height', newHeight, Math.abs(newHeight - target.el.offsetHeight) > 2, target.el.offsetWidth, target.el.offsetHeight);
      target.el.offsetHeight = newHeight;
    }
  }
  getElementPosition(elementId: string) {
    const thisRootEl = document.getElementById(elementId);
    const box = thisRootEl.getBoundingClientRect();
    const canvasBox = this.$canvasDom.getBoundingClientRect();
    const x = (box.x - canvasBox.x) / (this.options.canvasZoom / 100);
    const y = (box.y - canvasBox.y) / (this.options.canvasZoom / 100);
    return {x, y};
  }

  /**
  * Remove a node from the graph
  * @param nodeId
  */
  removeNodeById(nodeId:string) {
    let __removed_links = 0;
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i];
      if (thisLink.fromNode.id === nodeId || thisLink.toNode.id === nodeId) {
        // devLog(this.graphData.links[i])
        this.removeLink(thisLink);
        // this.graphData.links.splice(i, 1);
        i--;
        __removed_links++;
        // devLog(this.graphData.links[i])
      }
    }
    devLog('Removed link：', nodeId, __removed_links);
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
    devLog('Removed node：', nodeId, __removed_nodes);
    this._dataUpdated();
  }

  /**
   * Remove a node from the graph
   * @param node
   */
  removeNode(node:RGNode) {
    this.removeNodeById(node.id);
    this._dataUpdated();
  }

/**
* Delete all links between two nodes by their IDs
* @param node1Id
* @param node2Id
*/
  removeLinkByTwoNode(node1Id:string, node2Id:string) {
    for (const link of this.getLinks()) {
      if ((link.fromNode.id === node1Id && link.toNode.id === node2Id) || (link.fromNode.id === node1Id && link.toNode.id === node2Id)) {
        this.removeLink(link);
        break;
      }
    }
    this._dataUpdated();
  }

/**
* Get all nodes that have a direct or indirect relationship with a given node
* @param node
* @param groupNodes Used to collect the found nodes
* @return All nodes that have a direct or indirect relationship with the node, including the node itself
*/
  getGroupNodesByNode(node:RGNode, groupNodes:RGNode[] = []) {
    if (!groupNodes.includes(node)) groupNodes.push(node);
    for (const thisNode of node.targetNodes) {
      if (!groupNodes.includes(thisNode)) {
        this.getGroupNodesByNode(thisNode, groupNodes);
      }
    }
    return groupNodes;
  }
  private _clearItem(nodes:RGNode[], targetNode:RGNode) {
    for (let i = 0; i < nodes.length; i++) {
      const target = nodes[i];
      if (target === targetNode) {
        nodes.splice(i, 1);
        i--;
      }
    }
  }

  /**
  * Remove the reference of node to refNode, this method is only used internally by the relation-graph component
  * @param node
  * @param refNode
  */
  removeNodeRef(node:RGNode, refNode:RGNode) {
    if (node) {
      if (node.targetNodes) {
        this._clearItem(node.targetNodes, refNode);
      }
      if (node.targetFrom) {
        this._clearItem(node.targetFrom, refNode);
      }
      if (node.targetTo) {
        this._clearItem(node.targetTo, refNode);
      }
    }
  }

 /**
 * Delete the Link object by its id, usually used to delete all lines and data relationships between two nodes
 * @param linkId
 */
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
    this._dataUpdated();
  }

  /**
  * Remove the RGLink object from the graph
  * @param link
  */
  removeLink(link:RGLink) {
    devLog('removeLink:', link);
    this.removeLinkById(link.seeks_id);
    this._dataUpdated();
  }

  /**
  * Remove the specified RGLine object
  * @param line
  */
  removeLine(line:RGLine) {
    const link = this.getLinkByLine(line);
    if (!link) {
      devLog('Can not find link by line:', line);
      return;
    }
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
    this._dataUpdated();
  }
  /**
   * Remove the specified RGLine object by line id
   * @param lineId
   */
  removeLineById(lineId: string) {
    devLog('removeLineById:', lineId);
    for (const link of this.graphData.links) {
      for (let i = 0; i < link.relations.length; i++) {
        const thisLine = link.relations[i];
        if (thisLine.id === lineId) {
          link.relations.splice(i, 1);
          i--;
        }
      }
      if (link.relations.length === 0) {
        this.removeLink(link);
      }
    }

    this._dataUpdated();
  }

  /**
  * Set the coordinates of a node. Generally, you do not need to call this method; you can directly modify the x and y properties of the node.
  * @param node
  * @param x
  * @param y
  */
  setNodePosition(node:RGNode, x:number, y:number) {
    // devLog('debug0910: setNodePosition:', node.text, x, y)
    node.x = x;
    node.y = y;
  }
  getGraphOffet() {
    const _center_offset_x = this.options.graphOffset_x || 0;
    const _center_offset_y = this.options.graphOffset_y || 0;
    return {
      offset_x: _center_offset_x,
      offset_y: _center_offset_y
    };
  }

  /**
  * Display the specified canvas coordinates in the center of the visible area
  * @param x
  * @param y
  */
  setCanvasCenter(x:number, y:number) {
    const viewX = this.options.viewSize.width / 2;
    const viewY = this.options.viewSize.height / 2;
    const centerOffset = this.getGraphOffet();
    // console.log('setCanvasCenter:3:', viewX, viewY, centerOffset.offset_x, centerOffset.offset_y);
    this.setCanvasOffset(viewX - x + centerOffset.offset_x, viewY - y + centerOffset.offset_y);
    this._dataUpdated();
  }

  /**
   * Set the canvas offset, used when dragging the canvas
   * @param x
   * @param y
   */
  setCanvasOffset(x:number, y:number) {
    // console.log('resetViewSize:8:', x, y);
    this.options.canvasOffset.x = x;
    this.options.canvasOffset.y = y;
    // Object.defineProperty(this.options.canvasOffset, 'y', {
    //   set(newValue) {
    //     const oldValue = this._y;
    //     console.log('resetViewSize:9:', newValue, oldValue);
    //     this._y = newValue;
    //     throw new Error('xxxxx')
    //   },
    // });
    this._dataUpdated();
  }

  /**
  * Oh my, this seems to be a duplicate method, it seems to have the same effect as the getGroupNodesByNode method
  * @param node
  * @param childs
  */
  findGroupNodes(node:RGNode, childs:RGNode[]) {
    childs.push(node);
    node.targetNodes.forEach((thisNode) => {
      if (!childs.includes(thisNode)) this.findGroupNodes(thisNode, childs);
    });
  }

/**
* When the size of the parent element of the relation-graph component changes, you can call this method to recalculate the view size
* @param zoomTo100
* @protected
*/
  protected resetViewSize(zoomTo100=false) {
    if (!this.options) {
      return;
    }
    // devLog('resetViewSize');
    this.options.viewSize.width = this.$dom.getBoundingClientRect().width;
    this.options.viewSize.height = this.$dom.getBoundingClientRect().height;
    if (zoomTo100) {
      this.options.canvasZoom = 100;
      this.setCanvasCenter(0, 0);
    }
    devLog('resetViewSize:1:', this.options.viewSize.width, this.options.viewSize.height, this.options.canvasOffset.x, this.options.canvasOffset.y);
    this.refreshNVAnalysisInfo();
    this._dataUpdated();
  }

  /**
   * This is an internal method, generally not needed to be called
   */
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
    devLog('resetViewSize:', _view_info.width, _view_info.height, _view_info.left, _view_info.top);
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

  /**
   * Calculate the plane space information occupied by all nodes
   * @param nodes Optional, if not specified, it will be calculated based on all nodes
   */
  getStuffSize(nodes?:RGNode[]) {
    const nodesForCalc = nodes || this.graphData.nodes;
    const visiableNodes = nodesForCalc.filter(node => {
      return node.opacity! > 0 && RGNodesAnalytic.isAllowShowNode(node);
    });
    if (visiableNodes.length === 0) {
      return {
        width: 10,
        height: 10,
        minX: 0,
        minY: 0,
        maxX: 0,
        maxY: 0
      };
    }
    let minX = 9999999;
    let minY = 9999999;
    let maxX = -9999999;
    let maxY = -9999999;
    visiableNodes.forEach(thisNode => {
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
      width: _stuff_width < 0 ? 0 : _stuff_width,
      height: _stuff_height < 0 ? 0 : _stuff_height,
      minX: minX === 9999999 ? 0 : minX,
      minY: minY === 9999999 ? 0 : minY,
      maxX: maxX === -9999999 ? 0 : maxX,
      maxY: maxY === -9999999 ? 0 : maxY
    };
  }

  /**
   * Get the center coordinates of the plane space occupied by the node collection
   * @param nodes Optional, if not specified, it will be calculated based on all nodes
   */
  getNodesCenter(nodes?:RGNode[]) {
    const stuffSize = this.getStuffSize(nodes);
    devLog('getStuffSize:', stuffSize);
    // const x = (stuffSize.width - this.options.viewSize.width) / 2;
    // const y = (stuffSize.height - this.options.viewSize.height) / 2;
    const x = (stuffSize.minX + (stuffSize.maxX - stuffSize.minX) / 2);
    const y = (stuffSize.minY + (stuffSize.maxY - stuffSize.minY) / 2);
    return {
      x,
      y
    };
  }

 /**
   * Print the current graph configuration information to the console
   */
  printOptions() {
    const objectData = this.getGraphJsonOptions();
    console.log('options:', objectData);
    console.log('options-json-string:');
    console.log(JSON.stringify(objectData));
  }
  /**
   * Print all data of the current graph to the console
   */
  printData() {
    const objectData = this.getGraphJsonData();
    console.log('data:', objectData);
    console.log('data-json-string:');
    console.log(JSON.stringify(objectData));
  }

  /**
  * Lock the graph component screen and display a piece of text
  * @param graphLoadingText The text to display
  */
  loading(graphLoadingText = '') {
    this.options.graphLoading = true;
    this.options.graphLoadingText = graphLoadingText;
  }

  /**
  * Clear the lock on the graph component screen
  */
  clearLoading() {
    // console.log('debug:clearLoading');
    this.options.graphLoading = false;
    this.options.graphLoadingText = '';
  }

  /**
  * Recalculate all visible nodes
  * @param force
  */
  updateVisbleViewNodes(force = false) {
    // console.log('updateVisbleViewNodes:');
    if (!force) {
      if (!this.options.performanceMode) {
        return;
      }
      if (this.options.showEasyView) {
        return;
      }
    }
    this._updateVisbleViewNodes();
    // requestAnimationFrame(this._updateVisbleViewNodes.bind(this));
  }
  private _updateVisbleViewNodes() {
    // this.refreshNVAnalysisInfo();
    const viewRect = this.getBoundingClientRect();
    // devLog('updateVisbleViewNodes:', viewRect.x, viewRect.y, this.options.viewELSize.width, this.options.viewELSize.height);
    const startCoordinateOnCanvas = this.getCanvasCoordinateByClientCoordinate({
      x: viewRect.x,
      y: viewRect.y
    });
    const endCoordinateOnCanvas = this.getCanvasCoordinateByClientCoordinate({
      x: viewRect.x + this.options.viewELSize.width,
      y: viewRect.y + this.options.viewELSize.height
    });
    const snapshotting = this.options.snapshotting;
    let visibleNodeSize = 0;
    for (const node of this.graphData.nodes) {
      let isRenderNode = true;
      if (snapshotting) {
        isRenderNode = true;
      } else if (node.alwaysRender) {
        isRenderNode = true;
      } else {
        if (node.x > endCoordinateOnCanvas.x || node.y > endCoordinateOnCanvas.y) {
          isRenderNode = false;
        }
        if ((node.x + node.el.offsetWidth) < startCoordinateOnCanvas.x || (node.y + node.el.offsetHeight) < startCoordinateOnCanvas.y) {
          isRenderNode = false;
        }
      }
      node.invisiable = !isRenderNode;
      !isRenderNode && visibleNodeSize++;
    }
    for (const link of this.graphData.links) {
      if (snapshotting) {
        link.invisiable = false;
        continue;
      }
      let invisible = false;
      if (link.fromNode.invisiable && link.toNode.invisiable) {
        invisible = true;
      }
      link.invisiable = invisible;
    }
    devLog('updateVisbleViewNodes:', this.options.showEasyView, endCoordinateOnCanvas.x, visibleNodeSize);
  }
}
