import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import { NodesAnalyticResult, RGNodesAnalytic } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import {
  RGForceLayoutOptions,
  RGLayoutOptions,
  RGLink,
  RGNode,
  RGOptionsFull
} from '../types';

export class SeeksForceLayouter extends SeeksBaseLayouter {
  layoutOptions:RGForceLayoutOptions;
  fastStart = false;
  maxLayoutTimes = 300;
  byNode = true;
  byLine = true;
  force_node_repulsion = 1;
  force_line_elastic = 1;
  justLayoutSingleNode = false;
  allLinks:RGLink[] = [];
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull) {
    super(layoutOptions, graphOptions);
    this.layoutOptions = layoutOptions as RGForceLayoutOptions;
    if (this.layoutOptions.fastStart !== undefined) this.fastStart = this.layoutOptions.fastStart;
    if (this.layoutOptions.maxLayoutTimes !== undefined) this.maxLayoutTimes = this.layoutOptions.maxLayoutTimes;
    if (this.layoutOptions.byNode !== undefined) this.byNode = this.layoutOptions.byNode;
    if (this.layoutOptions.byLine !== undefined) this.byLine = this.layoutOptions.byLine;
    if (this.layoutOptions.force_node_repulsion !== undefined) this.force_node_repulsion = this.layoutOptions.force_node_repulsion;
    if (this.layoutOptions.force_line_elastic !== undefined) this.force_line_elastic = this.layoutOptions.force_line_elastic;
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
      if (!Number.isNaN(rootNode.x) && rootNode.x) {
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
        thisNode.x = thisNode.lot.x! + __offsetX - (thisNode.width || thisNode.el.offsetWidth || 60) / 2;
        thisNode.y = thisNode.lot.y! + __offsetY - (thisNode.height || thisNode.el.offsetHeight || 60) / 2;
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
        thisNode.x = thisNode.lot.x! + __offsetX - (thisNode.width || thisNode.el.offsetWidth || 60) / 2;
        thisNode.y = thisNode.lot.y! + __offsetY - (thisNode.height || thisNode.el.offsetHeight || 60) / 2;
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
          console.error('xxxxxxxx');
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
    let __level1_r = 50;
    groupNodes.forEach(thisNode => {
      if (thisNode.lot.subling!.level === 1) {
        // __level1_r = thisNode.lot.subling!.all_size * 20 / Math.PI / 2;
        // if (__level1_r < 50)__level1_r = 50;
        const subling = thisNode.lot.subling;
        if (subling) {
          const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, subling.level * __level1_r, thisNode.lot.strength_plus! - (thisNode.lot.strength! / 2), subling.all_strength);
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
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, (subling.level - 1) * 40 + __level1_r, __area_start + __buff, thisNode.lot.parent!.lot.subling!.all_strength);
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
        thisNode.Fx = 0;
        thisNode.Fy = 0;
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
    devLog('visibleNodes:', this.visibleNodes.length);
  }
  setLinks(links:RGLink[]) {
    this.allLinks = links;
  }
  viewUpdate: (() => void)|undefined|false;
  autoLayout(forceLayout?:boolean, viewUpdate?: (() => void)|false) {
    this.layoutTimes = 0;
    this.updateVisibleNodes();
    this.viewUpdate = viewUpdate;
    this.doLayout(0);
  }
  private doLayout(useTime:number) {
    if (this.graphOptions.instanceDestroyed) {
      devLog('stop layout:instanceDestroyed');
      return;
    }
    let layoutHz = 0;
    if (useTime > 0) {
      if (this.prev10.length >= 10) {
        this.prev10.splice(0, 1);
        const prev10Time = this.prev10[this.prev10.length - 1] - this.prev10[0];
        layoutHz = Math.round(1000 / (prev10Time / 10));
      }
      this.prev10.push(useTime);
    }
    devLog('this.layoutTimes:', this.layoutTimes, 'of',this.maxLayoutTimes, '当前刷新率:', layoutHz, 'Hz');
    if (this.layoutTimes > this.maxLayoutTimes) {
      this.isMainLayouer && (this.graphOptions.autoLayouting = false);
      return;
    }
    this.isMainLayouer && (this.graphOptions.autoLayouting = true);
    this.layoutTimes++;
    this.visibleNodes.forEach(thisNode => {
      thisNode.Fx = 0;
      thisNode.Fy = 0;
    });
    if (this.byNode) {
      for (const i in this.visibleNodes) {
        const __node1 = this.visibleNodes[i];
        if (this.justLayoutSingleNode && !__node1.singleNode) {
          continue;
        }
        if (__node1.fixed) {
          continue;
        }
        if (__node1.lot.placed === true) {
          // var __thisNode = this.__origin_nodes[i]
          // __thisNode.targetNodes.forEach(thisTN_level1 => {
          //   this.addGravityByNode(__thisNode, thisTN_level1)
          //   thisTN_level1.targetNodes.forEach(thisTN_level2 => {
          //     this.addGravityByNode(__thisNode, thisTN_level2)
          //   })
          // })
          // 循环点，综合点与其他所有点点斥力及方向
          for (const j in this.visibleNodes) {
            const __node2 = this.visibleNodes[j];
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
    if (this.byLine) {
      if (this.allLinks && this.allLinks.length > 0) {
        for (const link of this.allLinks) {
          const force_elastic = link.relations.reduce((sum_force_elastic, line) => sum_force_elastic + (line.force_elastic || 1), 0);
          this.addElasticByLine(
            link.fromNode,
            link.toNode,
            force_elastic
          );
        }
      } else {
        for (const thisNode of this.allNodes) {
          // 循环线,设置每个点承受点力及力点方向
          if (thisNode.lot.parent) {
            this.addElasticByLine(
              thisNode.lot.parent,
              thisNode
            );
            // break
          }
        }
      }
    }
    for (const i in this.visibleNodes) {
      this.applyToNodePosition(this.visibleNodes[i]);
    }
    this.viewUpdate && this.viewUpdate();
    requestAnimationFrame(this.doLayout.bind(this));
  }
  stop() {
    devLog('[SeeksForceLayouter]stop:', this.graphOptions.autoLayouting);
    this.layoutTimes = 1000000;
  }
  getX(node:RGNode) {
    const forceCenterOffset_X = (node.width || node.el.offsetWidth || 60) / 2;
    return node.x + forceCenterOffset_X;
  }
  getY(node:RGNode) {
    const forceCenterOffset_Y = (node.height || node.el.offsetHeight || 60) / 2;
    return node.y + forceCenterOffset_Y;
  }
  addElasticByLine(node1:RGNode, node2:RGNode, force_elastic = 1) {
    let length = Math.sqrt((this.getY(node1) - this.getY(node2)) ** 2 + (this.getX(node1) - this.getX(node2)) ** 2);
    if (length > 1000) {
      length = 1000;
    }
    const Kf = length < 30 ? 0 : (length - 30) * 0.1 * this.force_line_elastic * force_elastic;
    const Kf_1 = Kf;
    const Kf_2 = Kf;
    // var Kf_1 = Kf / node1.lot.childs.length
    // var Kf_2 = Kf / node2.lot.childs.length
    const _buff_x = (this.getX(node1) - this.getX(node2)) / length;
    const _buff_y = (this.getY(node1) - this.getY(node2)) / length;
    this.addFtoNode(node1, _buff_x * Kf_1 * -1, _buff_y * Kf_1 * -1);
    this.addFtoNode(node2, _buff_x * Kf_2, _buff_y * Kf_2);
  }
  addGravityByNode(node1:RGNode, node2:RGNode) {
    const length = Math.sqrt(
      (this.getY(node1) - this.getY(node2)) ** 2 + (this.getX(node1) - this.getX(node2)) ** 2
    );
    const zero_length = 400;
    let Kf = length > zero_length ? 0 : (zero_length - length) * 0.05 * this.force_node_repulsion;
    if (zero_length < 30) {
      Kf = Kf * 100;
    }
    // if (length < 100)Kf = Kf * 2
    const _buff_x = (this.getX(node1) - this.getX(node2)) / length;
    const _buff_y = (this.getY(node1) - this.getY(node2)) / length;
    // if (_buff_x < 30)_buff_x = 1
    // if (_buff_y < 30)_buff_y = 1
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf);
    this.addFtoNode(node2, _buff_x * Kf * -1, _buff_y * Kf * -1);
  }
  addFtoNode(node:RGNode, x:number, y:number) {
    if (this.justLayoutSingleNode && !node.singleNode) return;
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return;
    }
    x = x / (node.lot.strength || 1);
    y = y / (node.lot.strength || 1);
    if (x > 50)x = 50;
    if (y > 50)y = 50;
    if (x < -50)x = -50;
    if (y < -50)y = -50;
    const weight = node.force_weight || 1;
    node.Fx += (x * (1 / weight));
    node.Fy += (y * (1 / weight));
  }
  applyToNodePosition(node:RGNode) {
    if (node.fixed) return;
    const __buff_x = Math.round(node.Fx);
    const __buff_y = Math.round(node.Fy);
    node.x = node.x + __buff_x;
    node.y = node.y + __buff_y;
    node.Fx = 0;
    node.Fy = 0;
  }
}

export default SeeksForceLayouter;
