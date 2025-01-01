import {devLog, sleep} from '../utils/RGCommon';
import SeeksForceLayouter from '../layouters/SeeksForceLayouter';
import { createLayout } from './RGLayouter';
import { RGListeners, RGNode, RGOptions } from '../types';
import { RelationGraphWith5Zoom } from './RelationGraphWith5Zoom';
export class RelationGraphWith6Effect extends RelationGraphWith5Zoom {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  async doLayout() {
    if (!this.layouter) {
      devLog('no layouter');
      return;
    }
    if (!this.graphData.rootNode) {
      devLog('Cant find rootNode!');
      return;
    }
    if (this.options.showMaskWhenLayouting) this.loading();
    await sleep(300); // 有些节点是自适应宽度的，需要等一会儿才能获取节点真实宽高，这个机制对于alignItems非常重要
    this.options.canvasOpacity = 1;
    this._dataUpdated();
    if (this.options.showMaskWhenLayouting) this.clearLoading();
    devLog('node size：', this.graphData.nodes.length);
    const _useAnimationWhenExpanded = this.options.useAnimationWhenExpanded;
    if (this.disableNextLayoutAnimation) {
      this.options.useAnimationWhenExpanded = false;
    }
    if (this.layouter.requireLinks) {
      this.layouter.setLinks(this.getLinks());
    }
    this.layouter.viewUpdate = () => {this._dataUpdated();}
    await this.layouter.placeNodes(this.graphData.nodes, this.graphData.rootNode);
    this.options.useAnimationWhenExpanded = _useAnimationWhenExpanded;
    this.disableNextLayoutAnimation = false;
    this.updateElementLines();
    this._dataUpdated();
  }
  async refresh(doLayout = true) {
    this.resetViewSize();
    this.disableNextLayoutAnimation = true;
    this._dataUpdated();
    if (doLayout) await this.doLayout();
    devLog('placeOtherNodes');
    await this.placeOtherNodes();
    devLog('placeOtherNodes ok!');
    await this.playShowEffect();
    this.updateElementLines();
    this._dataUpdated();
  }
  async playShowEffect() {
    if (this.graphData.nodes.length === 0) {
      devLog('relation-graph:move to center: data not ready!');
      return;
    }
    devLog('playShowEffect:', this.options.moveToCenterWhenRefresh, this.options.zoomToFitWhenRefresh);
    if (this.graphData.rootNode && Number.isNaN(this.graphData.rootNode.x)) {
      devLog('rootNode.x is NaN, graph is currently hidden?');
      return;
    }
    if (this.options.moveToCenterWhenRefresh) {
      await this.moveToCenter();
    } else {
      this.setCanvasCenter(0, 0);
      this._dataUpdated();
    }
    await this.zoomToFitWhenRefresh();
  }
  async moveToCenter() {
    if (this.options.useAnimationWhenRefresh) {
      const center = this.getNodesCenter();
      devLog('center:', center.x, center.y);
      const centerOffset = this.getGraphOffet();
      devLog('centerOffset:', centerOffset.offset_x, centerOffset.offset_y);
      const x = this.options.viewSize.width / 2 - (center.x) + centerOffset.offset_x;
      const y = this.options.viewSize.height / 2 - (center.y) + centerOffset.offset_y;
      await this.animateGoto(x, y, 500);
      this._dataUpdated();
    } else {
      const center = this.getNodesCenter();
      devLog('center:', center.x, center.y);
      this.setCanvasCenter(center.x, center.y);
      this._dataUpdated();
    }
  }
  async zoomToFitWhenRefresh() {
    if (this.options.zoomToFitWhenRefresh) {
      await this.zoomToFit();
    }
  }
  async placeOtherNodes() {
    // let singleNodeSize = 0;
    const defaultGroupNodes:RGNode[] = [];
    if (this.graphData.rootNode) this.findGroupNodes(this.graphData.rootNode, defaultGroupNodes);
    const notInMainGroupNodes:RGNode[] = [];
    const singleNodes:RGNode[] = [];
    this.graphData.nodes.forEach((thisNode) => {
      if (defaultGroupNodes.includes(thisNode)) {
        return;
      }
      if (this.options.placeSingleNode && (!thisNode.targetNodes || thisNode.targetNodes.length === 0) && thisNode.fixed !== true) {
      // if (thisNode.fixed !== true) {
        thisNode.x = Math.floor(Math.random() * 200) - 100;
        thisNode.y = Math.floor(Math.random() * 200) - 100;
        // thisNode.singleNode = true
        if (!thisNode.lot) {
          thisNode.lot = { childs: [] };
        }
        thisNode.lot.placed = true;
        thisNode.singleNode = true;
        singleNodes.push(thisNode);
      } else {
        notInMainGroupNodes.push(thisNode);
      }
    });
    if (this.options.placeSingleNode && this.layouter.layoutOptions.layoutName !== 'fixed') {
      this.placeSingleNodes(singleNodes);
    }
    if (this.options.placeOtherGroup && this.layouter.layoutOptions.layoutName !== 'fixed') {
      await this.placeOtherGroup(notInMainGroupNodes, defaultGroupNodes);
      this._dataUpdated();
      if (this.layouter.layoutOptions.layoutName === 'force') {
        this.stopAutoLayout();
        setTimeout(() => {
          this.startAutoLayout();
        }, 500);
      }
    }
  }
  placeSingleNodes(singleNodes:RGNode[]) {
    if (singleNodes.length > 0) {
      devLog('sigle nodes:', singleNodes.length);
      const forceLayout = new SeeksForceLayouter({ layoutName: 'force' }, this.options, this);
      forceLayout.allNodes = this.graphData.nodes;
      forceLayout.fastStart = true;
      forceLayout.justLayoutSingleNode = true;
      forceLayout.maxLayoutTimes = 100;
      forceLayout.byLine = false;
      forceLayout.autoLayout(true);
    }
  }
  async placeOtherGroup(notPlacedNodes:RGNode[], placedNodes:RGNode[]) {
    if (notPlacedNodes.length > 0) {
      devLog('[placeOtherGroup]notPlacedNodes nodes:', notPlacedNodes.length);
      const currentLayoutOptionsClone = JSON.parse(JSON.stringify(this.layouter.layoutOptions));
      const newRootNode = notPlacedNodes[0];
      // if (this.layouter.layoutOptions.layoutName === 'force') {
      //   currentLayoutOptionsClone.layoutName = 'center';
      // }
      const currentLayoutClone = createLayout(currentLayoutOptionsClone, this.options, this);
      currentLayoutClone.isMainLayouer = false;
      const stuffSize = this.getStuffSize(placedNodes);
      devLog('[placeOtherGroup]placeOtherGroup:', currentLayoutClone.layoutOptions.layoutName, 'root:', newRootNode.text);
      let marginLeft = this.layouter.layoutOptions.layoutName.includes('tree') ? 300 : 600;
      if (currentLayoutClone.layoutOptions.layoutName === 'force') {
        const forceLayout = currentLayoutClone as SeeksForceLayouter;
        // forceLayout.force_node_repulsion = 0.2;
        // forceLayout.force_line_elastic = 1.5;
        forceLayout.maxLayoutTimes = 0;
        marginLeft = 100;
      }
      newRootNode.x = stuffSize.maxX + marginLeft;
      newRootNode.y = 0;
      // currentLayoutClone.layoutOptions.centerOffset_x = stuffSize.maxX + marginLeft;
      // currentLayoutClone.layoutOptions.centerOffset_y = 0;
      currentLayoutClone.layoutOptions.fixedRootNode = true;
      const thisGroupNodes:RGNode[] = [];
      this.findGroupNodes(newRootNode, thisGroupNodes);
      devLog('[placeOtherGroup]thisGroupNodes:', notPlacedNodes.length);
      if (this.layouter.requireLinks) {
        this.layouter.setLinks(this.getLinks());
      }
      await currentLayoutClone.placeNodes(thisGroupNodes, newRootNode);
      placedNodes.push(...thisGroupNodes);
      const nextGroup:RGNode[] = [];
      notPlacedNodes.forEach((thisNode) => {
        if (placedNodes.includes(thisNode)) {
          return;
        }
        nextGroup.push(thisNode);
      });
      await this.placeOtherGroup(nextGroup, placedNodes);
      this._dataUpdated();
    } else {
      devLog('[placeOtherGroup]thisGroupNodes:all is OK!');
    }
  }
  async zoomToFit(callback?:()=>void) {
    const stuffSize = this.getStuffSize();
    const zoomPercentX = this.options.viewSize.width / stuffSize.width;
    const zoomPercentY = this.options.viewSize.height / stuffSize.height;
    const zoomPercent = Math.min(zoomPercentX, zoomPercentY, 1);
    devLog('zoomToFit:', { stuffSize, zoomPercent, zoomPercentX, zoomPercentY, viewSize: this.options.viewSize });
    if (this.options.useAnimationWhenRefresh) {
      await this.animateToZoom(zoomPercent * 100, 300);
      this._dataUpdated();
      if (callback) callback();
    } else {
      this.setZoom(zoomPercent * 100);
      this._dataUpdated();
      if (callback) callback();
    }
  }
  async animateGoto(x:number, y:number, time:number) {
    return new Promise<void>((resolve, reject) => {
      devLog('animateGoto:', x, y);
      const _distance_x = x - this.options.canvasOffset.x;
      const _distance_y = y - this.options.canvasOffset.y;
      const _allTime = time;
      const _allStepNum = 5;
      const _speed_x = Math.round(_distance_x / _allStepNum);
      const _speed_y = Math.round(_distance_y / _allStepNum);
      const _perDelay = _allTime / _allStepNum;
      this.animateStepAction(0, _perDelay, _allStepNum, () => {
        this.options.canvasOffset.x += _speed_x;
        this.options.canvasOffset.y += _speed_y;
        this._dataUpdated();
      }, () => {
        // devLog('分解完毕....')
        resolve();
      });
    });
  }
  async animateToZoom(finalZoom:number, time:number) {
    return new Promise<void>((resolve, reject) => {
      const _zoom_distance = finalZoom - this.options.canvasZoom;
      const _allTime = time;
      const _allStepNum = 5;
      const _speed = Math.round(_zoom_distance / _allStepNum);
      const _perDelay = _allTime / _allStepNum;
      devLog('animateToZoom:', _zoom_distance, _speed);
      this.animateStepAction(0, _perDelay, _allStepNum, () => {
        this.zoom(_speed);
        this._dataUpdated();
      }, () => {
        // devLog('分解完毕....')
        this.setZoom(finalZoom);
        this._dataUpdated();
        resolve();
      });
    });
  }
  animateStepAction(stepIndex:number, delay:number, allStepNum:number, stepCallback:(stepIndex:number, allStepNum:number)=>void, finalCallback:()=>void) {
    // devLog(Date.now() + '步骤[' + stepIndex + ']')
    if (stepIndex < allStepNum) {
      stepCallback(stepIndex, allStepNum);
      setTimeout(() => {
        this.animateStepAction(stepIndex + 1, delay, allStepNum, stepCallback, finalCallback);
      }, delay);
    } else {
      finalCallback();
    }
  }
  toggleAutoLayout() {
    this.options.autoLayouting = !this.options.autoLayouting;
    devLog('toggleAutoLayout:to:', this.options.autoLayouting);
    if (this.options.autoLayouting) {
      this.startAutoLayout();
    } else {
      this.stopAutoLayout();
    }
  }
  startAutoLayout() {
    this.options.autoLayouting = true;
    if (!this.layouter.autoLayout) {
      devLog('Current layout not support autoLayout()');
    } else {
      // this.layouter.viewUpdate = () => {this._dataUpdated();};
      devLog('startAutoLayout:');
      this.layouter.autoLayout(true);
    }
  }
  stopAutoLayout() {
    this.options.autoLayouting = false;
    if (!this.layouter.stop) {
      devLog('Current layout not support stop()');
    } else {
      this.layouter.stop();
    }
  }
  async sleep(time:number) {
    await sleep(time);
  }
  // updateGraphNodesFromPosition() {
  //   const layoutEffectInstance = new LayoutAnimationEffect();
  //   layoutEffectInstance.allNodes = this.graphData.nodes;
  //   layoutEffectInstance.snapshotBeforeAnimation();
  // }
}
