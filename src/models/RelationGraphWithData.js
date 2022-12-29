// import RGOptions from '@/models/RGOptions';
import RGOptions from '@/models/RGOptions';
import { devLog } from '@/utils/RGCommon';
import { json2Node, transNodeToJson } from '@/models/RGNode';
import { json2Line, transLinkToJson } from '@/models/RGLink';
import { createLayout } from '@/models/RGLayouter';
import { RelationGraph } from '@/models/RelationGraph';
import RGEffectUtils from '@/utils/RGEffectUtils';
export class RelationGraphWithData extends RelationGraph {
  graphData = {
    nodes: [],
    lines: []
  };
  tmpData = {
    nodes: [],
    lines: []
  };
  seeksNodeIdIndex = 0;
  allLineColors = [];
  userLayouerClass = null;
  // graphSetting = null;
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }
  ready() {
    this.initLayouter();
    this.resetViewSize();
    this.refreshNVAnalysisInfo();
  }
  setOptions(options, callback) {
    this.options = new RGOptions(options);
    // this.graphSetting = this.options;
    this.initLayouter();
    this.resetViewSize();
    this.doLayout();
    this.resetViewSize();
    if (callback) callback(this);
  }
  setLayouterClass(userLayouerClass) {
    devLog('setLayouterClass::', userLayouerClass);
    this.userLayouerClass = userLayouerClass;
  }
  initLayouter() {
    if (this.userLayouerClass) {
      devLog('Use user layouter class:', this.userLayouerClass);
      const newLayouterInstance = Object.create(this.userLayouerClass.prototype);
      const layouterIns = this.userLayouerClass.apply(newLayouterInstance, [this.options.layouts[0], this.options]);
      devLog('[change layout]Use user layouter instance:', layouterIns);
      this.options.layouter = newLayouterInstance;
      // this.options.layouter = new CenterLayouter(this.options.layouts[0], this.options);
    } else {
      if (this.options.layouts && this.options.layouts.length > 0) {
        const _defaultLayoutSetting = this.options.layouts[0];
        devLog('[change layout]Create default layouter：', this.options.layoutName);
        if (_defaultLayoutSetting.layouter) {
          this.options.layouter = _defaultLayoutSetting.layouter;
        } else {
          this.options.layouter = createLayout(_defaultLayoutSetting, this.options);
        }
      } else {
        devLog('你需要设置layouts来指定当前图谱可以使用的布局器！');
      }
    }
    devLog('Layouter instance:', this.options.layouter);
  }
  resetViewSizeWhenSetData = true;
  setJsonData(jsonData, callback) {
    this.nodeViewList = [];
    this.lineViewList = [];
    this.graphData.nodes = [];
    this.graphData.links = [];
    this.tmpData.nodes_map = {};
    this.tmpData.lines_map = {};
    this.graphData.rootNode = null;
    devLog('set jsonData:', jsonData);
    // this.initLayouter();
    const __root_id = jsonData['rootId'];
    this.loadGraphJsonData(jsonData);
    // devLog('graphData:', this.graphData)
    if (__root_id) {
      this.graphData.rootNode = this.tmpData.nodes_map[__root_id];
    }
    if (!this.graphData.rootNode && this.graphData.nodes.length > 0) {
      this.graphData.rootNode = this.graphData.nodes[0];
    }
    this.applyNewDataToCanvas();
    if (this.resetViewSizeWhenSetData) {
      devLog('resetViewSizeWhenSetData:', this.resetViewSizeWhenSetData);
      this.resetViewSize();
    }
    setTimeout(() => {
      this.doLayout();
      if (callback)callback(this);
    }, 500);
  }

  applyNewDataToCanvas() {
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.appended === false) {
        thisNode.appended = true;
        this.nodeViewList.push(thisNode);
      }
    });
    this.graphData.links.forEach(thisLine => {
      if (thisLine.appended === false) {
        thisLine.appended = true;
        this.lineViewList.push(thisLine);
      }
    });
    if (this.graphData.rootNode) {
      if (this.options.defaultFocusRootNode) {
        this.setCheckedNode(this.graphData.rootNode.id);
        // this.options.checkedNodeId = this.graphData.rootNode.id;
      }
    } else {
      throw Error('没有设置根节点[rootId]！也无法获取根节点!');
    }
  }
  appendJsonData(jsonData, isRelayout, callback) {
    if (arguments.length === 2 && typeof isRelayout === 'function') {
      callback = isRelayout;
      isRelayout = true;
    }
    devLog('appendData:', jsonData);
    this.loadGraphJsonData(jsonData);
    this.applyNewDataToCanvas();
    // this.resetViewSize()
    if (isRelayout) this.doLayout();
    if (callback) callback(this);
  }
  loadNodes(_nodes) {
    _nodes.forEach(thisNodeJson => {
      let thisNode = json2Node(thisNodeJson);
      let __isNew = false;
      if (this.tmpData.nodes_map[thisNode.id]) {
        thisNode = this.tmpData.nodes_map[thisNode.id];
      } else {
        __isNew = true;
      }
      if (__isNew) {
        this.tmpData.nodes_map[thisNode.id] = thisNode;
        this.graphData.nodes.push(thisNode);
        thisNode.seeks_id = this.seeksNodeIdIndex++;
        thisNode.appended = false;
      }
    });
  }
  loadLines(_lines) {
    _lines.forEach(thisLineJson => {
      let __isNew = false;
      let __from;
      let __to;
      if (typeof thisLineJson.from === 'object') {
        __from = thisLineJson.from;
      } else {
        __from = this.tmpData.nodes_map[thisLineJson.from];
      }
      if (typeof thisLineJson.to === 'object') {
        __to = thisLineJson.to;
      } else {
        __to = this.tmpData.nodes_map[thisLineJson.to];
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
      const lineId1 = __from.seeks_id + '-' + __to.seeks_id;
      const lineId2 = __to.seeks_id + '-' + __from.seeks_id;
      const thisLineData = json2Line(thisLineJson);
      let thisLink;
      let thisLinkIsReserve = false;
      if (this.tmpData.lines_map[lineId1]) {
        thisLink = this.tmpData.lines_map[lineId1];
      } else {
        if (this.tmpData.lines_map[lineId2]) {
          thisLink = this.tmpData.lines_map[lineId2];
          thisLinkIsReserve = true;
        } else {
          __isNew = true;
          thisLink = {
            seeks_id: lineId1,
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
      if (__from.targetNodes.indexOf(__to) === -1) {
        __from.targetNodes.push(__to);
      }
      if (__to.targetNodes.indexOf(__from) === -1) {
        __to.targetNodes.push(__from);
      }
      if (__from.targetTo.indexOf(__to) === -1) {
        __from.targetTo.push(__to);
      }
      if (__to.targetFrom.indexOf(__from) === -1) {
        __to.targetFrom.push(__from);
      }
      let isDuplicate = false;
      for (let i = 0; i < thisLink.relations.length; i++) {
        if (thisLink.relations[i].id === thisLineData.id) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate === false) {
        if (!thisLineData.id) thisLineData.id = thisLink.seeks_id + '-' + thisLink.relations.length;
        thisLineData.isReverse = thisLinkIsReserve;
        thisLineData.arrow = _arrow;
        thisLineData.textPositon = { x: 0, y: 0 };
        thisLink.relations.push(thisLineData);
      }
      // devLog('addLine:', thisLine)
      if (__isNew) {
        this.graphData.links.push(thisLink);
        this.tmpData.lines_map[lineId1] = thisLink;
        thisLink.appended = false;
      }
    });
  }
  flatNodeData(orign_nodes, parentNode, nodes_collect, links_collect) {
    orign_nodes.forEach(thisOrignNode => {
      // if (!thisOrignNode.flated) {
      //   thisOrignNode.flated = true;
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
  loadGraphJsonData(jsonData, graphData) {
    // 兼容以前的配置
    if (!jsonData.lines) {
      jsonData.lines = jsonData.relations;
      console.warn('[relation-graph] For compatibility with older versionsm, Use jsonData.relations as jsonData.lines, It is recommended that you define your data using');
    }
    if (!jsonData.lines) {
      jsonData.lines = jsonData.links;
      console.warn('[relation-graph] For compatibility with older versionsm, Use jsonData.links as jsonData.lines, It is recommended that you define your data using');
    }
    const _orign_nodes = jsonData.nodes;
    const _nodes = [];
    const _lines = [];
    this.flatNodeData(_orign_nodes, null, _nodes, _lines);
    jsonData.lines.forEach(orign_link => {
      _lines.push(orign_link);
    });
    this.loadNodes(_nodes);
    devLog('节点预处理完毕');
    this.loadLines(_lines);
  }
  getLineArrow(_color) {
    if (_color) {
      const thisColorId = RGEffectUtils.getColorId(_color);
      if (this.allLineColors.map(thisColorObj => {
        return thisColorObj.id;
      }).indexOf(thisColorId) === -1) {
        this.allLineColors.push({ id: thisColorId, color: _color });
      }
      return this.options.instanceId + '-arrow-' + thisColorId;
    } else {
      return this.options.instanceId + '-arrow-default';
    }
  }
  getNodes() {
    return this.graphData.nodes;
  }
  getLinks() {
    return this.graphData.links;
  }
  getGraphJsonData() {
    const _nodes = [];
    const _links = [];
    this.graphData.nodes.forEach(thisNode => {
      const jsonNode = transNodeToJson(thisNode);
      if (jsonNode) {
        _nodes.push(jsonNode);
      }
    });
    this.graphData.links.forEach(thisLink => {
      transLinkToJson(thisLink, _links);
    });
    return {
      rootId: this.graphData.rootNode ? this.graphData.rootNode.id : '',
      nodes: _nodes,
      links: _links
    };
  }
  getGraphJsonOptions() {
    const _options = {};
    const _ignore = [
      'layouter', 'autoLayouting', 'canvasNVInfo', 'canvasOffset', 'canvasZoom', 'fullscreen', 'instanceId', 'layoutClassName', 'layoutDirection',
      'layoutLabel', 'layoutName', 'resetViewSize', 'viewELSize', 'viewNVInfo', 'viewSize', 'canvasSize'
    ];
    Object.keys(this.options).forEach(thisKey => {
      if (_ignore.indexOf(thisKey) === -1) {
        _options[thisKey] = this.options[thisKey];
      }
    });
    return _options;
  }
  printGraphJsonData() {
    devLog('graph options:', JSON.stringify(this.getGraphJsonOptions()));
    devLog('graph json data:', JSON.stringify(this.getGraphJsonData()));
  }
  getNodeById(nodeId) {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        return this.graphData.nodes[i];
      }
    }
  }
  addNodes(nodes, isRelayout) {
    this.loadNodes(nodes);
    if (isRelayout) this.doLayout();
  }
  addLines(lines, isRelayout) {
    this.loadLines(lines);
    if (isRelayout) this.doLayout();
  }
  removeNodeById(nodeId) {
    let __removed_lines = 0;
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i];
      if (thisLink.fromNode.id === nodeId || thisLink.toNode.id === nodeId) {
        // devLog(this.graphData.links[i])
        thisLink.hidden = true;
        this.graphData.links.splice(i, 1);
        i--;
        __removed_lines++;
        // devLog(this.graphData.links[i])
      }
    }
    devLog('删除对应的线个数：', nodeId, __removed_lines);
    let __removed_nodes = 0;
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      if (this.graphData.nodes[i].id === nodeId) {
        const thisNode = this.graphData.nodes[i];
        thisNode.targetNodes.forEach(thisTNode => {
          const t_i = thisTNode.targetNodes.indexOf(thisNode);
          if (t_i !== -1) {
            thisTNode.targetNodes.splice(t_i, 1);
          }
        });
        // thisNode.isShow = false
        this.graphData.nodes.splice(i, 1);
        delete this.tmpData.nodes_map[thisNode.id];
        __removed_nodes++;
        break;
      }
    }
    devLog('删除对应的节点个数：', nodeId, __removed_nodes);
  }
  removeLinkById(node1Id, node2Id) {
    for (let i = 0; i < this.graphData.links.length; i++) {
      const thisLink = this.graphData.links[i];
      if (thisLink.fromNode.id === node1Id || thisLink.toNode.id === node2Id) {
        this.graphData.links.splice(i, 1);
        i--;
      }
    }
  }
  focusRootNode() {
    devLog('relation-graph:focusRootNode');
    this.handleSelect(this.graphData.rootNode);
  }
  focusNodeById(nodeId) {
    this.graphData.nodes.forEach(thisNode => {
      if (thisNode.id === nodeId) {
        this.handleSelect(thisNode);
      }
    });
  }
  querySearchAsync(queryString, callback) {
    devLog('fetch-suggestions', queryString);
    queryString = queryString.trim();
    if (queryString === '') {
      return;
    }
    const rst = [];
    this.graphData.nodes.forEach(thisNode => {
      devLog('fetch:', thisNode.text);
      if (thisNode.text.indexOf(queryString) !== -1) {
        rst.push(thisNode);
      }
    });
    devLog('fetched:', rst.length);
    callback(rst);
  }
  handleSelect(thisNode) {
    devLog('checked:', thisNode);
    scrollTo({
      top: this.$dom.offsetTop
    });
    this.animateToZoom(100, 300, () => {
      const _n_width = thisNode.width || 50;
      const _n_height = thisNode.height || 50;
      const _final_x = thisNode.x * -1 + this.options.viewSize.width / 2 - _n_width / 2;
      const _final_y = thisNode.y * -1 + this.options.viewSize.height / 2 - _n_height / 2;
      this.animateGoto(_final_x, _final_y, 500, () => {
        this.options.checkedNodeId = thisNode.id;
        this.refreshNVAnalysisInfo();
      });
    });
  }
}
