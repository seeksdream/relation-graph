import { RGJsonData, RGLayouter, RGLayoutOptions, RGListeners, RGOptions } from '../types';
import { RelationGraphWith7Event } from './RelationGraphWith7Event';
import { devLog, sleep } from '../utils/RGCommon';
import { applyDefaultOptionsByLayout } from './RGOptions';
export class RelationGraphWith8Update extends RelationGraphWith7Event {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  dataUpdated() {
    if (this.isReact) {
      this._dataUpdated();
    } else {
      this.zoom(1);
      this.zoom(-1);
    }
  }
  async setOptions(options:RGOptions, justUpdateOptionsValue = false) {
    this.disableNextLayoutAnimation = true;
    this._setOptions(options);
    if (justUpdateOptionsValue === true) {
      devLog('setOptions:justUpdateOptionsValue');
      return;
    }
    this.initLayouter();
    this.resetViewSize();
    await this.doLayout();
    this.resetViewSize();
  }
  setLayouter(userLayouerInstance:RGLayouter) {
    devLog('setLayouterClass::', userLayouerInstance);
    this.userLayouerClass = userLayouerInstance;
  }
  async switchLayout(newLayoutOptions:RGLayoutOptions, refreshGraph = true, useAnimation = false) {
    if (this.listeners.beforeChangeLayout) {
      const refresh = this.listeners.beforeChangeLayout(newLayoutOptions);
      if (refresh === false) refreshGraph = false;
    }
    const __origin_nodes = this.layouter ? this.layouter.allNodes : [];
    const __rootNode = this.layouter && this.layouter.rootNode;
    devLog('[change layout]switchLayout');
    this.stopAutoLayout();
    applyDefaultOptionsByLayout(newLayoutOptions, this.options);
    this._initLayoutByLayoutOptions(newLayoutOptions);
    this.layouter.allNodes = __origin_nodes;
    this.layouter.rootNode = __rootNode;
    if (refreshGraph) {
      await this.refresh();
    } else {
      if (!useAnimation) this.disableNextLayoutAnimation = true;
      await this.doLayout();
    }
  }
  async setJsonData(jsonData:RGJsonData, resetViewSize = false) {
    this._setJsonData(jsonData);
    const __root_id = jsonData.rootId;
    if (__root_id) {
      this.graphData.rootNode = this.graphData.nodes.find(n => n.id === __root_id);
    }
    if (!this.graphData.rootNode && this.graphData.nodes.length > 0) {
      this.graphData.rootNode = this.graphData.nodes[0];
    }
    if (this.graphData.rootNode) {
      if (this.options.defaultFocusRootNode) {
        this.setCheckedNode(this.graphData.rootNode.id);
        // this.options.checkedNodeId = this.graphData.rootNode.id;
      }
    } else {
      throw new Error('没有设置根节点[rootId]！也无法获取根节点!');
    }
    if (resetViewSize) {
      devLog('resetViewSize:', resetViewSize);
      this.resetViewSize();
    }
    await sleep(500);
    this.disableNextLayoutAnimation = true;
    await this.doLayout();
  }
  async appendJsonData(jsonData:RGJsonData, isRelayout = true) {
    devLog('appendData:', jsonData);
    this.loadGraphJsonData(jsonData);
    if (isRelayout) {
      this.disableNextLayoutAnimation = true;
      await this.doLayout();
    }
  }
}
