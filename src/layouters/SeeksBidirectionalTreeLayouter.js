import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '@/utils/RGCommon';

export class SeeksBidirectionalTreeLayouter {
  constructor(layoutSetting, graphSetting) {
    this.config = layoutSetting;
    this.graphSetting = graphSetting;
    devLog('new SeeksBidirectionalTreeLayouter:', this.config);
    if (!this.config.from) this.config.from = 'left';
    if (this.config.levelDistance && typeof this.config.levelDistance === 'string') {
      this.config.levelDistanceArr = this.config.levelDistance.split(',').map(thisNum => parseInt(thisNum));
    }
  }
  graphSetting;
  config;
  rootNode = null;
  allNodes = [];
  __origin_nodes = [];
  refresh() {
    devLog('SeeksBidirectionalTreeLayouter:refresh:nodes:', this.__origin_nodes.length);
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }
  analysisNodes4Didirectional(willLayoutNodes, thisLevelNodes, thisDeep, analyticResult, levelDirect) {
    if (thisLevelNodes.length > analyticResult.max_length) {
      analyticResult.max_length = thisLevelNodes.length;
    }
    if (thisDeep > analyticResult.max_deep) {
      analyticResult.max_deep = thisDeep;
    }
    const __thisLOT_subling = {
      level: thisDeep,
      all_size: thisLevelNodes.length,
      all_strength: 0
    };
    const newLevelNodes = [];
    thisLevelNodes.forEach(thisNode => {
      if (!thisNode.lot)thisNode.lot = {};
      thisNode.lot.eached = true;
      thisNode.lot.subling = __thisLOT_subling;
      thisNode.lot.level = thisDeep;
      willLayoutNodes.push(thisNode);
    });
    let __thisLevel_index = 0;
    // var __prev_node
    thisLevelNodes.forEach(thisNode => {
      let __thisNode_child_size = 0;
      if (levelDirect === -1) {
        let __thisTargetIndex = 0;
        thisNode.targetFrom.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false };
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true;
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_parent = __thisTargetIndex++;
              // thisTarget.lot.prevNode = __prev_node
              // if (__prev_node)__prev_node.lot.nextNode = thisTarget
              // __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget);
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            } else {
              thisNode.lot.childs.push(thisTarget);
            }
          }
        });
      } else {
        let __thisTargetIndex = 0;
        thisNode.targetTo.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false };
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true;
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_parent = __thisTargetIndex++;
              // thisTarget.lot.prevNode = __prev_node
              // if (__prev_node)__prev_node.lot.nextNode = thisTarget
              // __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget);
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            } else {
              thisNode.lot.childs.push(thisTarget);
            }
          }
        });
      }
      thisNode.lot.strength = __thisNode_child_size > 0 ? __thisNode_child_size : 1;
      __thisLOT_subling.all_strength += thisNode.lot.strength;
      thisNode.lot.strength_plus = __thisLOT_subling.all_strength;
      thisNode.lot.index_of_level = __thisLevel_index;
      thisNode.lot.childs_size = __thisNode_child_size;
      __thisLevel_index++;
    });
    if (__thisLOT_subling.all_strength > analyticResult.max_strength) {
      analyticResult.max_strength = __thisLOT_subling.all_strength;
    }
    if (newLevelNodes.length > 0) {
      this.analysisNodes4Didirectional(willLayoutNodes, newLevelNodes, thisDeep + levelDirect, analyticResult, levelDirect);
    } else {
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size > 0) {
          thisNode.lot.strengthWithChilds = 0;
        }
      });
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size === 0) {
          thisNode.lot.strengthWithChilds = 1;
          RGGraphMath.conductStrengthToParents(thisNode);
        }
      });
      RGGraphMath.analysisDataTree([willLayoutNodes[0]], 0, levelDirect);
      // willLayoutNodes.forEach(thisNode => {
      //   thisNode.text = thisNode.lot.strengthWithChilds_from + ':' + thisNode.lot.strengthWithChilds + '/' + thisNode.lot.strength
      // })
    }
  }
  placeNodes(allNodes, rootNode) {
    devLog('SeeksBidirectionalTreeLayouter:placeNodes');
    if (!rootNode) {
      console.error('root is null');
      return;
    } else {
      devLog('layout by root:', rootNode);
    }
    this.__origin_nodes = allNodes;
    this.rootNode = rootNode;
    allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.strengthWithChilds_from = 0;
      thisNode.lot.strengthWithChilds = 0;
      thisNode.lot.prevNode = undefined;
      thisNode.lot.nextNode = undefined;
      thisNode.lot.placed = false;
    });
    // this.rootNode.fixed = true
    this.allNodes = [];
    let analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    this.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, -1);
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult);
    this.allNodes = [];
    analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    this.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, 1);
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult);
  }
  placeNodesPosition(rootNode, allNodes, analyticResult) {
    const __mapWidth = this.graphSetting.viewSize.width;
    const __mapHeight = this.graphSetting.viewSize.height;
    const __offsetX = 0;
    const __offsetY = 0;
    if (rootNode.fixed !== true) {
      const _center_offset_x = parseInt(this.config.centerOffset_x) || 0;
      const _center_offset_y = parseInt(this.config.centerOffset_y) || 0;
      rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width) / 2 + _center_offset_x;
      rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height) / 2 + _center_offset_y;
      // rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width) / 2;
      // rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height) / 2;
      if (this.config.from === 'top') {
        rootNode.lot.y -= (this.graphSetting.viewSize.height / 2 - (rootNode.el.offsetHeight || rootNode.height)) - 100;
      } else if (this.config.from === 'bottom') {
        rootNode.lot.y += (this.graphSetting.viewSize.height / 2 - (rootNode.el.offsetHeight || rootNode.height)) - 200;
      } else if (this.config.from === 'right') {
        rootNode.lot.x += (this.graphSetting.viewSize.width / 2 - (rootNode.el.offsetWidth || rootNode.width)) - 100;
      } else {
        rootNode.lot.x -= (this.graphSetting.viewSize.width / 2 - (rootNode.el.offsetWidth || rootNode.width)) - 100;
      }
      devLog('graph offset:', _center_offset_x, _center_offset_y);
      devLog('create rootNode coordinates:', rootNode.lot.x, rootNode.lot.y);
      // devLog('create rootNode coordinates:', rootNode.text, rootNode.x, rootNode.y, this.graphSetting.canvasSize.width, this.graphSetting.canvasSize.height, this.graphSetting.canvasOffset.x, this.graphSetting.canvasOffset.y);
      rootNode.x = rootNode.lot.x + __offsetX;
      rootNode.y = rootNode.lot.y + __offsetY;
    } else {
      devLog('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y);
      if (rootNode.origin_x === undefined) {
        rootNode.origin_x = rootNode.x;
        rootNode.origin_y = rootNode.y;
      }
      rootNode.lot.x = rootNode.origin_x;
      rootNode.lot.y = rootNode.origin_y;
      rootNode.x = rootNode.lot.x + __offsetX;
      rootNode.y = rootNode.lot.y + __offsetY;
      devLog('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y);
    }
    rootNode.lot.placed = true;
    const dynamicSizeConfig = {
      __mapWidth,
      __mapHeight
    };
    this.placeRelativePosition(rootNode, analyticResult, dynamicSizeConfig);
    allNodes.forEach(thisNode => {
      // if (rootNode === thisNode) {
      //   var _root_offset_x = this.config.root_offset_x || 0
      //   thisNode.x = thisNode.x + _root_offset_x
      //   return
      // }
      if (thisNode.fixed === true) {
        thisNode.lot.placed = true;
        return;
      }
      if (!RGGraphMath.isAllowShowNode(thisNode)) return;
      const __offsetX = thisNode.offset_x || 0;
      const __offsetY = thisNode.offset_y || 0;
      thisNode.x = thisNode.offset_x + thisNode.lot.x + __offsetX;
      thisNode.y = thisNode.offset_y + thisNode.lot.y + __offsetY;
      thisNode.lot.placed = true;
    });
  }
  placeRelativePosition(rootNode, analyticResult, dynamicSizeConfig) {
    if (this.config.from === 'left' || this.config.from === 'right') {
      const __min_per_height = this.config.min_per_height || 80;
      const __max_per_height = this.config.max_per_height || 400;
      const __min_per_width = this.config.min_per_width || 430;
      const __max_per_width = this.config.max_per_width || 650;
      let __per_width = Math.round((dynamicSizeConfig.__mapWidth - 10) / (analyticResult.max_deep + 2));
      if (__per_width < __min_per_width)__per_width = __min_per_width;
      if (__per_width > __max_per_width)__per_width = __max_per_width;
      let __per_height = Math.round(dynamicSizeConfig.__mapHeight / (analyticResult.max_strength + 1));
      if (__per_height < __min_per_height)__per_height = __min_per_height;
      if (__per_height > __max_per_height)__per_height = __max_per_height;
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (thisNode.lot.placed === true) return;
        if (thisNode === rootNode) return;
        if (this.config.from === 'right') {
          thisNode.lot.x = rootNode.lot.x - this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_width);
        } else {
          thisNode.lot.x = rootNode.lot.x + this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_width);
        }
      });
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (thisNode.lot.level !== 0) {
          thisNode.lot.y = rootNode.lot.y + __per_height * ((analyticResult.max_strength / -2) + thisNode.lot.strengthWithChilds_from + thisNode.lot.strengthWithChilds / 2);
        }
      });
    } else {
      const __min_per_height = this.config.min_per_height || 250;
      const __max_per_height = this.config.max_per_height || 400;
      const __min_per_width = this.config.min_per_width || 250;
      const __max_per_width = this.config.max_per_width || 500;
      let __per_width = Math.round((dynamicSizeConfig.__mapWidth - 10) / (analyticResult.max_strength + 2));
      if (__per_width < __min_per_width)__per_width = __min_per_width;
      if (__per_width > __max_per_width)__per_width = __max_per_width;
      let __per_height = Math.round((dynamicSizeConfig.__mapHeight - 10) / (analyticResult.max_deep + 2));
      if (__per_height < __min_per_height)__per_height = __min_per_height;
      if (__per_height > __max_per_height)__per_height = __max_per_height;
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (thisNode.lot.placed === true) return;
        if (thisNode === rootNode) return;
        if (this.config.from === 'bottom') {
          thisNode.lot.y = rootNode.lot.y - this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_height);
        } else {
          thisNode.lot.y = rootNode.lot.y + this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_height);
        }
      });
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (thisNode.lot.level !== 0) {
          thisNode.lot.x = rootNode.lot.x + __per_width * ((analyticResult.max_strength / -2) + thisNode.lot.strengthWithChilds_from + thisNode.lot.strengthWithChilds / 2);
          // thisNode.lot.x = rootNode.lot.x
        }
      });
    }
  }
  getLevelDistance(node, level, perSize) {
    if (this.config.levelDistanceArr && this.config.levelDistanceArr.length > 0) {
      let _distance = 0;
      for (let i = 0; i < level; i++) {
        const _thisLevelDistance = this.config.levelDistanceArr[i] || 100;
        _distance += _thisLevelDistance;
      }
      return _distance;
    } else {
      return level * perSize;
    }
  }
}

export default SeeksBidirectionalTreeLayouter;
