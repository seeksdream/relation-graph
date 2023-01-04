import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '@/utils/RGCommon';

export class SeeksCenterLayouter {
  constructor(layoutSetting, graphSetting) {
    this.config = layoutSetting;
    this.setting = graphSetting;
  }
  setting;
  config;
  rootNode = null;
  allNodes = [];
  __origin_nodes = [];
  __max_deep = 1;
  __max_length = 1;
  checkMaxDeepAndLength(thisLevelNodes, thisDeep) {
    if (thisLevelNodes.length > this.__max_length) {
      this.__max_length = thisLevelNodes.length;
    }
    if (thisDeep > this.__max_deep) {
      this.__max_deep = thisDeep;
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
      this.allNodes.push(thisNode);
    });
    let __thisLevel_index = 0;
    let __prev_node;
    thisLevelNodes.forEach(thisNode => {
      let __thisNode_child_size = 0;
      if (thisNode.targetNodes) {
        thisNode.targetNodes.forEach(thisTarget => {
          devLog('child node::', thisTarget.type, thisTarget.lot.eached);
          if (!thisTarget.lot)thisTarget.lot = { eached: false };
          if (thisTarget.type === 'node' && thisTarget.targetNodes.length <= 1) {
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_p_childs = __thisNode_child_size;
              thisTarget.lot.prevNode = __prev_node;
              if (__prev_node)__prev_node.lot.nextNode = thisTarget;
              __prev_node = thisTarget;
              thisNode.lot.childs.push(thisTarget);
              thisNode.lot.eached = true;
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            }
          } else {
            thisTarget.lot.notLeafNode = true;
          }
        });
        thisNode.targetNodes.forEach(thisTarget => {
          if (thisTarget.lot.notLeafNode) {
            if (!thisTarget.lot)thisTarget.lot = { eached: false };
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_p_childs = __thisNode_child_size;
              thisTarget.lot.prevNode = __prev_node;
              if (__prev_node)__prev_node.lot.nextNode = thisTarget;
              __prev_node = thisTarget;
              thisNode.lot.childs.push(thisTarget);
              thisNode.lot.eached = true;
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            }
          }
        });
      }
      thisNode.lot.strength = __thisNode_child_size > 0 ? __thisNode_child_size : 1;
      __thisLOT_subling.all_strength += thisNode.lot.strength;
      thisNode.lot.strength_plus = __thisLOT_subling.all_strength;
      thisNode.lot.level_index = __thisLevel_index;
      thisNode.lot.childs_size = __thisNode_child_size;
      __thisLevel_index++;
    });
    if (newLevelNodes.length > 0) {
      this.checkMaxDeepAndLength(newLevelNodes, thisDeep + 1);
    }
  }
  refresh() {
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }
  placeNodes(allNodes, rootNode) {
    if (!rootNode) {
      devLog('root is null:', rootNode);
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
      thisNode.lot.parent = undefined;
      thisNode.lot.index_of_p_childs = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.prevNode = undefined;
      thisNode.lot.nextNode = undefined;
    });
    this.allNodes = [];
    devLog('max before:', this.__max_deep, this.__max_length);
    this.checkMaxDeepAndLength([this.rootNode], 0);
    devLog('max after:', this.__max_deep, this.__max_length);
    this.setting.canvasSize.width = 4000;
    this.setting.canvasSize.height = 4000;
    if (this.setting.heightByContent) {
      devLog('根据数据调整视窗高度');
      this.setting.viewSize.height = 1600;
    }
    this.setting.resetViewSize(this.setting);
    const __mapWidth = this.setting.viewSize.width;
    const __mapHeight = this.setting.viewSize.height;
    const __offsetX = this.setting.canvasOffset.x;
    const __offsetY = this.setting.canvasOffset.y;
    const __center = {
      x: (__mapWidth) / 2 - __offsetX,
      y: (__mapHeight) / 2 - __offsetY
    };
    if (__center.y > 800 - __offsetY) {
      __center.y = 800 - __offsetY;
    }
    const __all_size = this.allNodes.length;
    let __circle_r = __all_size * 90 / Math.PI / 2;
    if (__circle_r < 200)__circle_r = 200;
    if (__circle_r > 800)__circle_r = 800;
    this.allNodes.forEach((thisNode, _index) => {
      const _point = RGGraphMath.getOvalPoint(__center.x, __center.y, __circle_r, _index, __all_size);
      thisNode.x = _point.x;
      thisNode.y = _point.y;
    });
    devLog('Start Auto Layout.....');
  }
  adjustLevel2Y(__mapHeight) {
    for (let i = 0; i < this.allNodes.length; i++) {
      const thisNode = this.allNodes[i];
      if (thisNode.lot.subling.level === 1 && thisNode.lot.childs_size === 0) {
        let __per_height = Math.round(__mapHeight / (thisNode.lot.subling.all_size + 1));
        if (__per_height > 70)__per_height = 70;
        devLog(__per_height, __mapHeight, thisNode.lot.subling.all_size, thisNode.lot.subling.all_strength, thisNode.lot.strength);
        for (let j = 0; j < this.allNodes.length; j++) {
          const thisLevel2Node = this.allNodes[j];
          if (thisLevel2Node.lot.subling.level === 1 && thisLevel2Node !== thisNode) {
            const __y_diff = Math.abs(thisNode.y - thisLevel2Node.y);
            if (__y_diff < __per_height - 2) {
              devLog('__y_diff', thisNode.name, thisLevel2Node.name, __y_diff);
              thisNode.y = thisLevel2Node.y + __per_height;
              i--;
              break;
            }
          }
        }
      }
    }
  }
  layoutTimes = 0;
  autoLayout(forceLayout) {
    if (forceLayout) {
      this.layoutTimes = 0;
    }
    devLog('this.layoutTimes:', this.layoutTimes);
    if (this.layoutTimes > 300) {
      this.setting.autoLayouting = false;
      return;
    }
    this.layoutTimes++;
    this.allNodes.forEach(thisNode => {
      thisNode.Fx = 0;
      thisNode.Fy = 0;
    });
    const __by_node = true; // parseInt(this.layoutTimes / 10) % 2 === 1
    const __by_line = true; // parseInt(this.layoutTimes / 10) % 2 === 0
    if (__by_node) {
      for (const i in this.allNodes) {
        // 循环点，综合点与其他所有点点斥力及方向
        for (const j in this.allNodes) {
          // 循环点，计算i点与j点点斥力及方向
          if (i !== j) {
            // if (this.allNodes[i].lot.subling.level === this.allNodes[j].lot.subling.level) {
            this.addGravityByNode(this.allNodes[i], this.allNodes[j]);
            // }
          }
        }
      }
    }
    if (__by_line) {
      for (const i in this.allNodes) {
        // 循环线,设置每个点承受点力及力点方向
        if (this.allNodes[i].lot.parent) {
          this.addElasticByLine(this.allNodes[i].lot.parent, this.allNodes[i]);
          // break
        }
      }
    }
    // if (this.layoutTimes % 1 === 0) { // 为提高布局效率，计算五次后更新位置
    for (const i in this.allNodes) {
      this.applyToNodePosition(this.allNodes[i]);
    }
    // }
    window.setTimeout(() => { this.autoLayout(); }, 30);
  }
  stop() {
    this.layoutTimes = 1000;
  }
  addElasticByLine(n1, n2) {
    const length = Math.sqrt(Math.pow((n1.y - n2.y), 2) + Math.pow((n1.x - n2.x), 2));
    const Kf = length < 30 ? 0 : ((length - 30) * 0.01);
    this.addFtoNode(n1, (n1.x - n2.x) * Kf * -1, (n1.y - n2.y) * Kf * -1);
    this.addFtoNode(n2, (n2.x - n1.x) * Kf * -1, (n2.y - n1.y) * Kf * -1);
  }
  addGravityByNode(node1, node2) {
    const length = Math.sqrt(Math.pow((node1.y - node2.y), 2) + Math.pow((node1.x - node2.x), 2));
    const Kf = length > 300 ? 0 : ((300 - length) * 0.02);
    // if (length < 100)Kf = Kf * 2
    let _buff_x = node1.x - node2.x;
    let _buff_y = node1.y - node2.y;
    if (_buff_x === 0)_buff_x = 1;
    if (_buff_y === 0)_buff_y = 1;
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf);
    this.addFtoNode(node2, _buff_x * -1 * Kf, _buff_y * -1 * Kf);
  }
  addFtoNode(node, x, y) {
    node.Fx += x;
    node.Fy += y;
  }
  applyToNodePosition(node) {
    // if (!node.lot.childs || node.lot.childs.length === 0) {
    //   return
    // }
    if (this.rootNode === node) {
      return;
    }
    if (node.Fx > 1000)node.Fx = 3000;
    if (node.Fy > 1000)node.Fy = 3000;
    if (node.Fx < -1000)node.Fx = -3000;
    if (node.Fy < -1000)node.Fy = -3000;
    const __buff_x = Math.round(node.Fx * 0.02);
    const __buff_y = Math.round(node.Fy * 0.02);
    node.x = node.x + __buff_x;
    node.y = node.y + __buff_y;
    node.Fx = 0;
    node.Fy = 0;
  }
}

export default SeeksCenterLayouter;
