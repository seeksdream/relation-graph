import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import { NodesAnalyticResult, RGNodesAnalytic } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import {
  RGForceLayoutOptions,
  RGLayoutOptions,
  RGNode,
  RGOptionsFull
} from '../types';
import {RelationGraphFinal} from "../models/RelationGraphFinal";

type CalcNode = {
  rgNode: RGNode,
  Fx: number,
  Fy: number,
  x: number,
  y: number,
  ignoreForce: boolean,
  force_weight: number,
  forceCenterOffset_X: number,
  forceCenterOffset_Y: number,
  fixed: boolean
}
export class SeeksForceLayouter extends SeeksBaseLayouter {
  layoutOptions:RGForceLayoutOptions;
  fastStart = false;
  maxLayoutTimes = 300;
  byNode = true;
  byLine = true;
  lockX = false;
  lockY = false;
  force_node_repulsion = 1;
  force_line_elastic = 1;
  justLayoutSingleNode = false;
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull, graphInstance: RelationGraphFinal) {
    super(layoutOptions, graphOptions, graphInstance);
    this.layoutOptions = layoutOptions as RGForceLayoutOptions;
    if (this.layoutOptions.fastStart !== undefined) this.fastStart = this.layoutOptions.fastStart;
    if (this.layoutOptions.maxLayoutTimes !== undefined) this.maxLayoutTimes = this.layoutOptions.maxLayoutTimes;
    if (this.layoutOptions.byNode !== undefined) this.byNode = this.layoutOptions.byNode;
    if (this.layoutOptions.byLine !== undefined) this.byLine = this.layoutOptions.byLine;
    if (this.layoutOptions.force_node_repulsion !== undefined) this.force_node_repulsion = this.layoutOptions.force_node_repulsion;
    if (this.layoutOptions.force_line_elastic !== undefined) this.force_line_elastic = this.layoutOptions.force_line_elastic;
    if (this.layoutOptions.force_x_coefficient === undefined) this.layoutOptions.force_x_coefficient = 1;
    if (this.layoutOptions.force_y_coefficient === undefined) this.layoutOptions.force_y_coefficient = 1;
    if (this.layoutOptions.disableLiveChanges === undefined) this.layoutOptions.disableLiveChanges = false;
    this.requireLinks = true;
    graphInstance && this.setGraphInstance(graphInstance);
  }
  refresh() {
    this.placeNodes(this.allNodes, this.rootNode);
  }
  placeNodes(allNodes:RGNode[], rootNode?:RGNode) {
    devLog('!!!SeeksForceLayouter.placeNodes');
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    } else {
      devLog('layout by root:', rootNode);
    }
    this.allNodes = allNodes;
    this.rootNode = rootNode;
    if (this.layoutOptions.fixedRootNode) {
      if (!Number.isNaN(rootNode.x) || rootNode.x === undefined) {
        rootNode.lot.x = RGNodesAnalytic.getLotXByNodeX(this.graphOptions, rootNode);
        rootNode.lot.y = RGNodesAnalytic.getLotYByNodeY(this.graphOptions, rootNode);
      } else {
        const _center_offset_x = this.layoutOptions.centerOffset_x || 0;
        const _center_offset_y = this.layoutOptions.centerOffset_y || 0;
        rootNode.lot.x = 0 + _center_offset_x;
        rootNode.lot.y = 0 + _center_offset_y;
      }
      const groupNodes = this.easyAnalysisNodes(rootNode);
      this.easyPlaceRelativePosition(rootNode, groupNodes);
      groupNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (!RGNodesAnalytic.isAllowShowNode(thisNode)) return;
        const __offsetX = thisNode.offset_x || 0;
        const __offsetY = thisNode.offset_y || 0;
        thisNode.x = thisNode.lot.x! + __offsetX - RGNodesAnalytic.getNodeWidth(thisNode, this.graphOptions) / 2;
        thisNode.y = thisNode.lot.y! + __offsetY - RGNodesAnalytic.getNodeHeight(thisNode, this.graphOptions) / 2;
        thisNode.lot.placed = true;
      });
    } else if (this.fastStart) {
      devLog('!!!initNodesPosition fastStart');
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (!thisNode.lot.placed) {
          if (!thisNode.x) thisNode.x = Math.floor(Math.random() * 200) - 100;
          if (!thisNode.x) thisNode.y = Math.floor(Math.random() * 200) - 100;
          thisNode.lot.placed = true;
        }
      });
    } else {
      devLog('!!!initNodesPosition.....');
      const groupNodes = this.easyPlaceGroupNodes(this.rootNode);
      groupNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (!RGNodesAnalytic.isAllowShowNode(thisNode)) return;
        const __offsetX = thisNode.offset_x || 0;
        const __offsetY = thisNode.offset_y || 0;
        thisNode.x = thisNode.lot.x! + __offsetX - RGNodesAnalytic.getNodeWidth(thisNode, this.graphOptions) / 2;
        thisNode.y = thisNode.lot.y! + __offsetY - RGNodesAnalytic.getNodeHeight(thisNode, this.graphOptions) / 2;
        thisNode.lot.placed = true;
      });
    }
    devLog('Start Auto Layout.....');
    this.updateVisibleNodes();
    if (this.isMainLayouer && this.graphOptions.autoLayouting) {
      devLog('!!!autoLayouting.....');
      return;
    }
    this.autoLayout(true);
  }
  easyPlaceGroupNodes(rootNode:RGNode):RGNode[] {
    devLog('[layout canvasOffset]', this.graphOptions.viewSize, this.graphOptions.canvasSize);
    if (rootNode) {
      if (rootNode.fixed) {
        if (rootNode.origin_x === undefined) {
          rootNode.origin_x = rootNode.x;
          rootNode.origin_y = rootNode.y;
        }
        rootNode.lot.x = rootNode.origin_x;
        rootNode.lot.y = rootNode.origin_y;
        devLog('root fixed position:', rootNode.lot.x, rootNode.lot.y);
      } else {
        if (this.layoutOptions.fixedRootNode) {
          // console.error('xxxxxxxx');
          rootNode.lot.x = RGNodesAnalytic.getLotXByNodeX(this.graphOptions, rootNode);
          rootNode.lot.y = RGNodesAnalytic.getLotYByNodeY(this.graphOptions, rootNode);
        } else {
          rootNode.lot.x = 0;
          rootNode.lot.y = 0;
          devLog('root position:', rootNode.lot.x, rootNode.lot.y);
        }
      }
      const groupNodes = this.easyAnalysisNodes(rootNode);
      this.easyPlaceRelativePosition(rootNode, groupNodes);
      return groupNodes;
    }
    return [];
  }
  easyAnalysisNodes(rootNode:RGNode) {
    this.allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      thisNode.lot.parent = undefined;
      thisNode.lot.index_of_parent = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.placed = false;
    });
    const groupNodes:RGNode[] = [];
    const analyticResult:NodesAnalyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    RGNodesAnalytic.analysisNodes4Didirectional(groupNodes, [rootNode], 0, analyticResult, 0);
    return groupNodes;
  }
  easyPlaceRelativePosition(rootNode:RGNode, groupNodes: RGNode[]) {
    const __level1_r = 50;
    groupNodes.forEach(thisNode => {
      if (thisNode.lot.subling!.level === 1) {
        // __level1_r = thisNode.lot.subling!.all_size * 20 / Math.PI / 2;
        // if (__level1_r < 50)__level1_r = 50;
        const subling = thisNode.lot.subling;
        if (subling) {
          const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, subling.level * __level1_r, thisNode.lot.strength_plus! - (thisNode.lot.strength! / 2), subling.all_strength, this.layoutOptions.startAngle);
          // const _point = RGGraphMath.getOvalPoint(this.rootNode.x, this.rootNode.y, thisNode.lot.subling.level * __level1_r, thisNode.lot.index_of_level, thisNode.lot.subling.all_size)
          thisNode.lot.x = _point.x;
          thisNode.lot.y = _point.y;
        }
      }
    });
    groupNodes.forEach(thisNode => {
      const subling = thisNode.lot.subling;
      if (subling && subling.level > 1) {
        const __area_start = thisNode.lot.parent!.lot.strength_plus! - thisNode.lot.parent!.lot.strength!;
        const __area_end = thisNode.lot.parent!.lot.strength_plus!;
        const __buff = (__area_end - __area_start) / (thisNode.lot.parent!.lot.childs.length + 1) * (thisNode.lot.index_of_parent! + 1);
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, (subling.level - 1) * (100 + (subling.level - 1) * 60) + __level1_r, __area_start + __buff, thisNode.lot.parent!.lot.subling!.all_strength, this.layoutOptions.startAngle);
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
  }
  layoutTimes = 0;
  prev10:number[] = [];
  visibleNodes:RGNode[] = [];
  // var ___this = this
  updateVisibleNodes(allNode?:RGNode[]) {
    this.visibleNodes = [];
    if (allNode) this.allNodes = allNode;
    this.allNodes.forEach(thisNode => {
      if (RGNodesAnalytic.isAllowShowNode(thisNode)) {
        if (!thisNode.lot) {
          devLog('node miss lot:', thisNode.text);
          thisNode.lot = {
            placed: true,
            childs: []
          };
        } else {
          thisNode.lot.placed = true;
        }
        this.visibleNodes.push(thisNode);
      }
    });
    this.resetCalcNodes();
    devLog('visibleNodes:', this.visibleNodes.length);
  }
  viewUpdate: (() => void)|undefined|false;
  autoLayout(forceLayout = false) {
    this.layoutTimes = 0;
    this.updateVisibleNodes();
    devLog('Layout set viewUpdate:', this.viewUpdate);
    this.doForceLayout(0);
  }
  private layoutFinished() {
    this.isMainLayouer && (this.graphOptions.autoLayouting = false);
    devLog('Layout finished');
    if (this.layoutOptions.disableLiveChanges) {
      this.visibleNodes.forEach(thisNode => {
        const calcNode = this.calcNodeMap.get(thisNode);
        thisNode.x = calcNode.x;
        thisNode.y = calcNode.y;
      });
      this.viewUpdate && this.viewUpdate();
      devLog('Layout apply finished');
    }
  }
  protected resetCalcNodes() {
    devLog('resetCalcNodes:', this.visibleNodes.length)
    this.forCalcNodes = [];
    this.calcNodeMap = new WeakMap();
    this.visibleNodes.forEach(thisNode => {
      const calcNode: CalcNode = {
        rgNode: thisNode,
        Fx: 0,
        Fy: 0,
        x: thisNode.x,
        y: thisNode.y,
        ignoreForce: (thisNode.dragging || (this.justLayoutSingleNode && !thisNode.singleNode)),
        force_weight: thisNode.force_weight || 1,
        forceCenterOffset_X: (thisNode.width || thisNode.el.offsetWidth || 60) / 2,
        forceCenterOffset_Y: (thisNode.height || thisNode.el.offsetHeight || 60) / 2,
        fixed: thisNode.fixed || false
      };
      this.forCalcNodes.push(calcNode);
      this.calcNodeMap.set(thisNode, calcNode);
    });
  }
  private calcNodeMap = new WeakMap<RGNode, CalcNode>();
  private forCalcNodes: CalcNode[] = [];
  doForceLayout(useTime:number) {
    if (this.graphOptions.instanceDestroyed) {
      devLog('stop layout:instanceDestroyed');
      return;
    }
    let layoutHz = '0';
    if (useTime > 0) {
      if (this.prev10.length >= 10) {
        this.prev10.splice(0, 1);
        const prev10Time = this.prev10[this.prev10.length - 1] - this.prev10[0];
        layoutHz = (1000 / (prev10Time / 10)).toFixed(1);
      }
      this.prev10.push(useTime);
    } else { // 如果是第一次运行
      if (this.visibleNodes.length === 0) {
        this.updateVisibleNodes();
      }
    }
    devLog('this.layoutTimes:', this.layoutTimes, 'of',this.maxLayoutTimes, 'Current refresh rate:', layoutHz, 'Hz', this.visibleNodes.length);
    if (this.layoutTimes > this.maxLayoutTimes) {
      this.layoutFinished();
      return;
    }
    this.isMainLayouer && (this.graphOptions.autoLayouting = true);
    this.layoutTimes++;
    this.calcNodesPosition();
    // const apply = this.layoutTimes % 2 === 0;
    for (const node of this.forCalcNodes) {
      this.applyToNodePosition(node);
    }
    if (this.layoutOptions.disableLiveChanges) {
      // this.visibleNodes.forEach((thisNode, _xxxx) => {
      //   if (_xxxx % 10 === 0) {
      //     const calcNode = this.calcNodeMap.get(thisNode);
      //     thisNode.x = calcNode.x;
      //     thisNode.y = calcNode.y;
      //   }
      // });
      // this.viewUpdate && this.viewUpdate();
      requestAnimationFrame(this.doForceLayout.bind(this));
    } else {
      this.viewUpdate && this.viewUpdate();
      requestAnimationFrame(this.doForceLayout.bind(this));
    }
  }
  setGraphInstance(graphInstance: RelationGraphFinal) {
    this.viewUpdate = () => {graphInstance._dataUpdated();};
    graphInstance.addEventListener((eventName, object) => {
      if (eventName === 'node-drag-start') {
        const calcNode = this.calcNodeMap.get(object.node);
        if (calcNode) {
          calcNode.ignoreForce = true;
        }
      } else if (eventName === 'node-dragging') {
        const calcNode = this.calcNodeMap.get(object.node);
        if (calcNode) {
          calcNode.x = object.x;
          calcNode.y = object.y;
        }
      } else if (eventName === 'node-drag-end') {
        const calcNode = this.calcNodeMap.get(object.node);
        if (calcNode) {
          calcNode.ignoreForce = false;
        }
      }
    });
  }
  // calc4Parents(node: CalcNode, parentNode: RGNode | undefined) {
  //   if (!parentNode) return;
  //   const parentCalcNode = this.calcNodeMap.get(parentNode);
  //   this.addGravityByNode(node, parentCalcNode);
  //   this.calc4Parents(parentCalcNode, parentNode.lot.parent);
  // }
  calcNodesPosition() {
    if (this.byNode) {
      const fastLayout = false; // this.graphOptions.performanceMode && this.layoutTimes < 20;
      for (let i=0;i<this.forCalcNodes.length;i++) {
        const __node1 = this.forCalcNodes[i];
        if (__node1.ignoreForce) {
          continue;
        }
        if (__node1.fixed) {
          continue;
        }
        // for (const __rgNode2 of __node1.rgNode.targetNodes) {
        //   const __node2 = this.calcNodeMap.get(__rgNode2);
        //   this.addGravityByNode(__node1, __node2);
        // }
        // this.calc4Parents(__node1, __node1.rgNode.lot.parent);
        // 循环点，综合点与其他所有点点斥力及方向
        for (let j = 0; j < this.forCalcNodes.length;j++) {
          // 循环点，计算i点与j点点斥力及方向
          if (i !== j) {
            if (fastLayout && Math.random() < 0.5) {
              continue;
            }
            const __node2 = this.forCalcNodes[j];
            if (__node2.ignoreForce) {
              continue;
            }
            this.addGravityByNode(__node1, __node2);
          }
        }
      }
    }
    if (this.byLine) {
      if (this.allLinks && this.allLinks.length > 0) {
        for (const link of this.allLinks) {
          // console.log(this.byLine, this.allLinks.length, link.forDisplayOnly);
          if (!link.forDisplayOnly) {
            let force_elastic = 1;
            for (const line of link.relations) {
              if (line.force_elastic && line.force_elastic !== 1) {
                force_elastic = line.force_elastic;
              }
            }
            if (this.visibleNodes.includes(link.fromNode) && this.visibleNodes.includes(link.toNode)) {
              const _node1 = this.calcNodeMap.get(link.fromNode);
              const _node2 = this.calcNodeMap.get(link.toNode);
              this.addElasticByLine(
                _node1,
                _node2,
                force_elastic
              );
            }
          }
        }
      } else {
        for (const thisNode of this.visibleNodes) {
          // 循环线,设置每个点承受点力及力点方向
          if (thisNode.lot && thisNode.lot.parent) {
            const _node1 = this.calcNodeMap.get(thisNode.lot.parent);
            const _node2 = this.calcNodeMap.get(thisNode);
            this.addElasticByLine(
              _node1,
              _node2,
              1
            );
            // break
          }
        }
      }
    }
  }
  stop() {
    devLog('[SeeksForceLayouter]stop:', this.graphOptions.autoLayouting);
    this.layoutTimes = 1000000;
  }
  // getX(node:RGNode) {
  //   if (node.lot.fcalc_ing) {
  //     return node.lot.fcalc_x;
  //   }
  //   return node.x + (node.lot.forceCenterOffset_X || 30);
  // }
  // getY(node:RGNode) {
  //   if (node.lot.fcalc_ing) {
  //     return node.lot.fcalc_y;
  //   }
  //   return node.y + (node.lot.forceCenterOffset_Y || 30);
  // }
  addElasticByLine(node1:CalcNode, node2:CalcNode, force_elastic = 1) {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    let length = Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2);
    if (length < this.minVaildLineLength) {
      return;
    }
    if (length > this.maxVaildLineLength) {
      length = this.maxVaildLineLength;
    }
    const Kf = (length - this.minVaildLineLength) * 0.05 * this.force_line_elastic * force_elastic;
    const Kf_1 = Kf;
    const Kf_2 = Kf;
    // var Kf_1 = Kf / node1.lot.childs.length
    // var Kf_2 = Kf / node2.lot.childs.length
    const _buff_x = (x1 - x2) / length;
    const _buff_y = (y1 - y2) / length;
    this.addFtoNode(node1, _buff_x * Kf_1 * -1, _buff_y * Kf_1 * -1);
    this.addFtoNode(node2, _buff_x * Kf_2, _buff_y * Kf_2);
  }
  maxVaildLineLength = 300;
  minVaildLineLength = 30;
  zeroEffectNodeDistance = 400;
  minNodeDistance = 30;
  maxMoveSpeed = 100;
  addGravityByNode(node1:CalcNode, node2:CalcNode) {
    const x1 = node1.x;
    const y1 = node1.y;
    const x2 = node2.x;
    const y2 = node2.y;
    // const x1 = this.getX(node1);
    // const y1 = this.getY(node1);
    // const x2 = this.getX(node2);
    // const y2 = this.getY(node2);
    // const length = (Math.abs(y1 - y2) + Math.abs(x1 - x2)) / 1.5;
    if (Math.abs(x1 - x2) > this.zeroEffectNodeDistance || Math.abs(y1 - y2) > this.zeroEffectNodeDistance) {
      return;
    }
    const length = Math.sqrt((y1 - y2) ** 2 + (x1 - x2) ** 2);
    if (length > this.zeroEffectNodeDistance) {
      return;
    }
    let Kf = (this.zeroEffectNodeDistance - length) * 0.05 * this.force_node_repulsion;
    if (length < this.minNodeDistance) { // 如果离得太近，把斥力加倍
      Kf = Kf * 2;
    }
    // if (length < 100)Kf = Kf * 2
    const _buff_x = (x1 - x2) / length;
    const _buff_y = (y1 - y2) / length;
    // if (_buff_x < 30)_buff_x = 1
    // if (_buff_y < 30)_buff_y = 1
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf);
    // this.addFtoNode(node2, _buff_x * Kf * -1, _buff_y * Kf * -1);
  }
  addFtoNode(node:CalcNode, x:number, y:number) {
    if (node.ignoreForce) return;
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return;
    }
    if (x > 50)x = 50;
    if (y > 50)y = 50;
    if (x < -50)x = -50;
    if (y < -50)y = -50;
    const weight = node.force_weight || 1;
    if (!this.lockX) node.Fx += (x * (1 / weight));
    if (!this.lockY) node.Fy += (y * (1 / weight));
  }
  applyToNodePosition(node: CalcNode) {
    if (node.fixed) return;
    let __buff_x = node.Fx;
    let __buff_y = node.Fy;
    if (__buff_x > this.maxMoveSpeed)__buff_x = this.maxMoveSpeed;
    if (__buff_y > this.maxMoveSpeed)__buff_y = this.maxMoveSpeed;
    if (__buff_x < -this.maxMoveSpeed)__buff_x = -this.maxMoveSpeed;
    if (__buff_y < -this.maxMoveSpeed)__buff_y = -this.maxMoveSpeed;
    node.x = node.x + __buff_x * this.layoutOptions.force_x_coefficient;
    node.y = node.y + __buff_y * this.layoutOptions.force_y_coefficient;
    if (!this.layoutOptions.disableLiveChanges) {
      const rgNode:RGNode = node.rgNode;
      if (!node.ignoreForce) {
        rgNode.x = node.x;
        rgNode.y = node.y;
      }
    }
    // const rgNode:RGNode = node.rgNode;
    // rgNode.x = node.x;
    // rgNode.y = node.y;
    node.Fx = node.Fx * 0.7;
    node.Fy = node.Fy * 0.7;
  }
}

export default SeeksForceLayouter;
