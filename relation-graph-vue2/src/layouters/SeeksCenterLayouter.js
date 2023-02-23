import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '@/utils/RGCommon';

export class SeeksCenterLayouter {
  constructor(layoutSetting, graphSetting) {
    this.config = layoutSetting;
    this.graphSetting = graphSetting;
  }
  graphSetting;
  config;
  rootNode = null;
  allNodes = [];
  __origin_nodes = [];
  refresh() {
    devLog('SeeksCenterLayouter:refresh');
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }
  placeNodes(allNodes, rootNode) {
    devLog('SeeksCenterLayouter:placeNodes');
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    }
    devLog('layout by root:', rootNode);
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
      thisNode.lot.prevNode = undefined;
      thisNode.lot.nextNode = undefined;
      thisNode.lot.placed = false;
    });
    this.allNodes = [];
    const analyticResult = {
      max_deep: 1,
      max_length: 1
    };
    RGGraphMath.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, 0);
    rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width) / 2;
    rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height) / 2;
    devLog('root position:', rootNode.lot.x, rootNode.lot.y);
    // this.rootNode.lot.x = 0
    // this.rootNode.lot.y = 0
    // if (this.rootNode.lot.y > 400) {
    //   this.rootNode.lot.y = 400
    // }
    this.placeRelativePosition(this.rootNode, analyticResult);
    this.allNodes.forEach(thisNode => {
      if (thisNode.fixed === true) return;
      if (!RGGraphMath.isAllowShowNode(thisNode)) return;
      const __offsetX = thisNode.offset_x || 0;
      const __offsetY = thisNode.offset_y || 0;
      thisNode.x = thisNode.lot.x + __offsetX;
      thisNode.y = thisNode.lot.y + __offsetY;
      thisNode.lot.placed = true;
    });
    devLog('Start Auto Layout.....');
  }
  placeRelativePosition(rootNode, analyticResult) {
    const distance_coefficient = this.config.distance_coefficient === undefined ? 1 : this.config.distance_coefficient;
    let __leve1_min_r = Math.round(((this.graphSetting.viewSize.height + this.graphSetting.viewSize.width) / analyticResult.max_deep * 0.2)) * distance_coefficient;
    devLog('analyticResult:', analyticResult, __leve1_min_r, this.config.distance_coefficient);
    if (__leve1_min_r < 150 * distance_coefficient) __leve1_min_r = 150 * distance_coefficient;
    let __level1_r = 0;
    this.allNodes.forEach(thisNode => {
      if (thisNode.lot.subling.level === 1) {
        __level1_r = Math.round(thisNode.lot.subling.all_size * 50 / Math.PI / 2);
        if (__level1_r < __leve1_min_r)__level1_r = __leve1_min_r;
        // if (__level1_r > 500)__level1_r = 500
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x, rootNode.lot.y, thisNode.lot.subling.level * __level1_r, thisNode.lot.strength_plus - (thisNode.lot.strength / 2), thisNode.lot.subling.all_strength);
        // const _point = RGGraphMath.getOvalPoint(this.rootNode.x, this.rootNode.y, thisNode.lot.subling.level * __level1_r, thisNode.lot.index_of_level, thisNode.lot.subling.all_size)
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
    const __level_r = Math.round(300 * distance_coefficient);
    this.allNodes.forEach(thisNode => {
      if (thisNode.lot.subling.level > 1) {
        const __area_start = thisNode.lot.parent.lot.strength_plus - thisNode.lot.parent.lot.strength;
        const __area_end = thisNode.lot.parent.lot.strength_plus;
        const __buff = (__area_end - __area_start) / (thisNode.lot.parent.lot.childs_size + 1) * (thisNode.lot.index_of_parent + 1);
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x, rootNode.lot.y, (thisNode.lot.subling.level - 1) * __level_r + __level1_r, __area_start + __buff, thisNode.lot.parent.lot.subling.all_strength);
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
  }
  layoutTimes = 0;
  // var ___this = this
  autoLayout(forceLayout) {
    if (forceLayout) {
      this.layoutTimes = 0;
    }
    devLog('this.layoutTimes:', this.layoutTimes);
    if (this.layoutTimes > 300) {
      this.graphSetting.autoLayouting = false;
      return;
    }
    this.layoutTimes++;
    this.__origin_nodes.forEach(thisNode => {
      thisNode.Fx = 0;
      thisNode.Fy = 0;
    });
    const __by_node = true; // parseInt(this.layoutTimes / 10) % 2 === 1
    const __by_line = true; // parseInt(this.layoutTimes / 10) % 2 === 0
    if (__by_node) {
      for (const i in this.__origin_nodes) {
        const __node1 = this.__origin_nodes[i];
        if (__node1.lot.placed === true) {
          // var __thisNode = this.__origin_nodes[i]
          // __thisNode.targetNodes.forEach(thisTN_level1 => {
          //   this.addGravityByNode(__thisNode, thisTN_level1)
          //   thisTN_level1.targetNodes.forEach(thisTN_level2 => {
          //     this.addGravityByNode(__thisNode, thisTN_level2)
          //   })
          // })
          // 循环点，综合点与其他所有点点斥力及方向
          for (const j in this.__origin_nodes) {
            const __node2 = this.__origin_nodes[j];
            if (__node2.lot.placed === true) {
              // 循环点，计算i点与j点点斥力及方向
              if (i !== j) {
                // if (this.allNodes[i].lot.level === this.allNodes[j].lot.level) {
                this.addGravityByNode(__node1, __node2);
                // }
              }
            }
          }
        }
      }
    }
    if (__by_line) {
      for (const i in this.__origin_nodes) {
        // 循环线,设置每个点承受点力及力点方向
        if (this.__origin_nodes[i].lot.parent) {
          this.addElasticByLine(this.__origin_nodes[i].lot.parent, this.__origin_nodes[i]);
          // break
        }
      }
    }
    // if (this.layoutTimes % 5 === 0) { // 为提高布局效率，计算五次后更新位置
    for (const i in this.__origin_nodes) {
      this.applyToNodePosition(this.__origin_nodes[i]);
    }
    // }
    window.setTimeout(() => { this.autoLayout(); }, 30);
  }
  stop() {
    this.layoutTimes = 1000;
  }
  addElasticByLine(node1, node2) {
    let length = Math.sqrt((node1.y - node2.y)**2 + (node1.x - node2.x)**2);
    if (length > 1000) {
      length = 1000;
    }
    const Kf = length < 30 ? 0 : ((length - 30) * 0.05);
    const Kf_1 = Kf;
    const Kf_2 = Kf;
    // var Kf_1 = Kf / node1.lot.childs.length
    // var Kf_2 = Kf / node2.lot.childs.length
    const _buff_x = (node1.x - node2.x) / length;
    const _buff_y = (node1.y - node2.y) / length;
    this.addFtoNode(node1, _buff_x * Kf_1 * -1, _buff_y * Kf_1 * -1, 1);
    this.addFtoNode(node2, _buff_x * Kf_2, _buff_y * Kf_2, 1);
  }
  addGravityByNode(node1, node2) {
    const length = Math.sqrt((node1.y - node2.y)**2 + (node1.x - node2.x)**2);
    const zero_length = 300;
    let Kf = length > zero_length ? 0 : ((zero_length - length) * 0.03);
    if (zero_length < 30) {
      Kf = Kf * 100;
    }
    // if (length < 100)Kf = Kf * 2
    const _buff_x = (node1.x - node2.x) / length;
    const _buff_y = (node1.y - node2.y) / length;
    // if (_buff_x < 30)_buff_x = 1
    // if (_buff_y < 30)_buff_y = 1
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf, 0);
    this.addFtoNode(node2, _buff_x * Kf * -1, _buff_y * Kf * -1, 0);
  }
  getNodeFWeight(node) {
    let level = node.lot.level;
    if (level > 7)level = 7;
    if (level < 0)level = 0;
    return (8 - level) / 8;
  }
  addFtoNode(node, x, y) {
    if (isNaN(x) || isNaN(y)) {
      return;
    }
    x = x / node.lot.strength;
    y = y / node.lot.strength;
    if (x > 50)x = 50;
    if (y > 50)y = 50;
    if (x < -50)x = -50;
    if (y < -50)y = -50;
    node.Fx += x;
    node.Fy += y;
  }
  applyToNodePosition(node) {
    const __buff_x = Math.round(node.Fx);
    const __buff_y = Math.round(node.Fy);
    node.x = node.x + __buff_x;
    node.y = node.y + __buff_y;
    node.Fx = 0;
    node.Fy = 0;
  }
}

export default SeeksCenterLayouter;
