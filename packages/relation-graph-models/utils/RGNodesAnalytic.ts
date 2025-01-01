import {JsonLine, JsonNode, RGNode, RGOptionsFull} from '../types';

export type NodesAnalyticResult = {
  max_deep: number
  max_length: number
  max_strength: number
};
export type RGLevelDirection = -1|0|1;
export const RGNodesAnalytic = {
  analysisNodes(eachedNodes:RGNode[], thisLevelNodes:RGNode[], thisDeep:number, analyticResult:NodesAnalyticResult) {
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
    if (thisDeep === 0) {
      thisLevelNodes.forEach(thisNode => {
        thisNode.lot.parent = undefined;
      });
    }
    const newLevelNodes:RGNode[] = [];
    thisLevelNodes.forEach(thisNode => {
      eachedNodes.push(thisNode);
      if (thisNode.targetNodes) {
        thisNode.targetNodes.forEach((thisTarget) => {
          if (!eachedNodes.includes(thisTarget)) {
            eachedNodes.push(thisTarget);
            thisTarget.lot.parent = thisNode;
            // thisNode.lot.childs.push(thisTarget);
            newLevelNodes.push(thisTarget);
          }
        });
      }
    });
    if (__thisLOT_subling.all_strength > analyticResult.max_strength) {
      analyticResult.max_strength = __thisLOT_subling.all_strength;
    }
    if (newLevelNodes.length > 0) {
      RGNodesAnalytic.analysisNodes(eachedNodes, newLevelNodes, thisDeep + 1, analyticResult);
    }
  },
  analysisNodes4Didirectional(willLayoutNodes:RGNode[], thisLevelNodes:RGNode[], thisDeep:number, analyticResult:NodesAnalyticResult, levelDirect:RGLevelDirection) {
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
    const newLevelNodes:RGNode[] = [];
    thisLevelNodes.forEach(thisNode => {
      if (!thisNode.lot)thisNode.lot = { childs: [] };
      thisNode.lot.eached = true;
      thisNode.lot.subling = __thisLOT_subling;
      thisNode.lot.level = thisDeep;
      willLayoutNodes.push(thisNode);
    });
    let __thisLevel_index = 0;
    // var __prev_node
    thisLevelNodes.forEach(thisNode => {
      let __thisNode_child_size = 0;
      if (levelDirect === 0) {
        let __thisTargetIndex = 0;
        thisNode.targetNodes.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false, childs: [] };
          if (!thisTarget.lot.eached) {
            if (RGNodesAnalytic.isAllowShowNode(thisTarget)) {
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
      } else if (levelDirect === -1) {
        let __thisTargetIndex = 0;
        thisNode.targetFrom.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false, childs: [] };
          if (!thisTarget.lot.eached) {
            if (RGNodesAnalytic.isAllowShowNode(thisTarget)) {
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
          if (!thisTarget.lot)thisTarget.lot = { eached: false, childs: [] };
          if (!thisTarget.lot.eached) {
            if (RGNodesAnalytic.isAllowShowNode(thisTarget)) {
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
      RGNodesAnalytic.analysisNodes4Didirectional(willLayoutNodes, newLevelNodes, thisDeep + (levelDirect === -1 ? -1 : 1), analyticResult, levelDirect);
    } else {
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size > 0) {
          thisNode.lot.strengthWithChilds = 0;
        }
      });
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size === 0) {
          thisNode.lot.strengthWithChilds = 1;
          RGNodesAnalytic.conductStrengthToParents(thisNode);
        }
      });
      RGNodesAnalytic.analysisDataTree([willLayoutNodes[0]], 0, levelDirect);
      // willLayoutNodes.forEach(thisNode => {
      //   thisNode.text = thisNode.lot.strengthWithChilds_from + ':' + thisNode.lot.strengthWithChilds + '/' + thisNode.lot.strength
      // })
    }
  },
  conductStrengthToParents(node:RGNode) {
    if (node.lot.parent) {
      if (Math.abs(node.lot.level) - 1 === Math.abs(node.lot.parent.lot.level)) {
        // console.log('[xxxxxxxx]', node.text, 'add to parent:', node.lot.parent.text, node.lot.parent.lot.strengthWithChilds);
        node.lot.parent.lot.strengthWithChilds += 1;
        RGNodesAnalytic.conductStrengthToParents(node.lot.parent);
      }
    }
  },
  analysisDataTree(thisLevelNodes:RGNode[], thisDeep:number, levelDirect:RGLevelDirection = 1) {
    const newLevelNodes:RGNode[] = [];
    let currentLevelStrengthWidthChilds = 0;
    thisLevelNodes.forEach(thisNode => {
      if (thisNode.lot.level === 0 || levelDirect === (thisNode.lot.level! < 0 ? -1 : 1)) {
        if (thisNode.lot.childs_size > 0) {
          thisNode.lot.childs.forEach((thisTarget) => {
            newLevelNodes.push(thisTarget);
          });
        }
        if (thisNode.lot.parent && currentLevelStrengthWidthChilds < thisNode.lot.parent.lot.strengthWithChilds_from!) {
          currentLevelStrengthWidthChilds = thisNode.lot.parent.lot.strengthWithChilds_from!;
        }
        thisNode.lot.strengthWithChilds_from = currentLevelStrengthWidthChilds;
        currentLevelStrengthWidthChilds += thisNode.lot.strengthWithChilds!;
      }
    });
    if (newLevelNodes.length > 0) {
      RGNodesAnalytic.analysisDataTree(newLevelNodes, thisDeep + levelDirect, levelDirect);
    }
  },
  conductStrengthToParents4Folder(node:RGNode) {
    if (node.lot.parent) {
      node.lot.parent.lot.strengthWithChilds += 1;
      // console.log('[xxxxxxxx]', node.text, 'add to parent:', node.lot.parent.text, node.lot.parent.lot.strengthWithChilds);
      RGNodesAnalytic.conductStrengthToParents4Folder(node.lot.parent);
    }
  },
  analysisDataFolder(thisLevelNodes:RGNode[], thisDeep:number, levelDirect:RGLevelDirection) {
    const newLevelNodes:RGNode[] = [];
    let currentLevelStrengthWidthChilds = 0;
    let parent = null;
    thisLevelNodes.forEach(thisNode => {
      if (thisNode.lot.level === 0 || levelDirect === (thisNode.lot.level! < 0 ? -1 : 1)) {
        if (thisNode.lot.childs_size > 0) {
          thisNode.lot.childs.forEach((thisTarget) => {
            newLevelNodes.push(thisTarget);
          });
        }
        let parentY = 0;
        if (thisNode.lot.parent) {
          if (!parent) {
            parentY = thisNode.lot.parent.lot.strengthWithChilds_from!;
            currentLevelStrengthWidthChilds = parentY;
            parent = thisNode.lot.parent;
          } else if (parent !== thisNode.lot.parent) {
            currentLevelStrengthWidthChilds += 1;
            parent = thisNode.lot.parent;
          }
        }
        thisNode.lot.strengthWithChilds_from = 1 + currentLevelStrengthWidthChilds;
        currentLevelStrengthWidthChilds += thisNode.lot.strengthWithChilds!;
      }
    });
    if (newLevelNodes.length > 0) {
      RGNodesAnalytic.analysisDataFolder(newLevelNodes, thisDeep + levelDirect, levelDirect);
    }
  },
  isAllowShowNode(thisNode:RGNode, deep = 0):boolean {
    if (deep > 15) return true;
    const parentShow = !thisNode.lot || !thisNode.lot.parent || (RGNodesAnalytic.isAllowShowNode(thisNode.lot.parent, deep + 1) && thisNode.lot.parent.expanded !== false);
    return parentShow && thisNode.isShow && thisNode.isHide !== true;
  },
  getNodeWidth(thisNode:RGNode, graphOptions?:RGOptionsFull):number {
    return thisNode.el.offsetWidth || thisNode.width || (graphOptions && graphOptions.defaultNodeWidth) || 50;
  },
  getNodeHeight(thisNode:RGNode, graphOptions?:RGOptionsFull):number {
    return thisNode.el.offsetHeight || thisNode.height || (graphOptions && graphOptions.defaultNodeHeight) || 50;
  },
  getNodeXByLotX(graphOptions:RGOptionsFull, thisNode:RGNode):number {
    const __offsetX = thisNode.offset_x || 0;
    return __offsetX + this.getNodeXByCenterX(graphOptions, thisNode, thisNode.lot.x || 0);
  },
  getNodeYByLotY(graphOptions:RGOptionsFull, thisNode:RGNode):number {
    const __offsetY = thisNode.offset_y || 0;
    return __offsetY + this.getNodeYByCenterY(graphOptions, thisNode, thisNode.lot.y || 0);
  },
  getNodeXByCenterX(graphOptions:RGOptionsFull, thisNode:RGNode, x:number):number {
    if (thisNode.alignItems === 'right') {
      return x - RGNodesAnalytic.getNodeWidth(thisNode, graphOptions);
    }
    if (thisNode.alignItems === 'left') {
      return x;
    }
    return x - RGNodesAnalytic.getNodeWidth(thisNode, graphOptions) / 2;
  },
  getNodeYByCenterY(graphOptions:RGOptionsFull, thisNode:RGNode, y:number):number {
    if (thisNode.alignItems === 'top') {
      return y;
    }
    if (thisNode.alignItems === 'bottom') {
      return y - RGNodesAnalytic.getNodeHeight(thisNode, graphOptions);
    }
    return y - RGNodesAnalytic.getNodeHeight(thisNode, graphOptions) / 2;
  },
  getCenterXByNodeX(graphOptions:RGOptionsFull, thisNode:RGNode, x:number):number {
    return x + RGNodesAnalytic.getNodeHeight(thisNode, graphOptions) / 2;
  },
  getCenterYByNodeY(graphOptions:RGOptionsFull, thisNode:RGNode, y:number):number {
    return y + RGNodesAnalytic.getNodeHeight(thisNode, graphOptions) / 2;
  },
  getLotXByNodeX(graphOptions:RGOptionsFull, thisNode:RGNode):number {
    const __offsetX = thisNode.offset_x || 0;
    return this.getCenterXByNodeX(graphOptions, thisNode, thisNode.x || 0) - __offsetX;
  },
  getLotYByNodeY(graphOptions:RGOptionsFull, thisNode:RGNode):number {
    const __offsetY = thisNode.offset_y || 0;
    return this.getCenterYByNodeY(graphOptions, thisNode, thisNode.y || 0) - __offsetY;
  },
  isRectangleOverlap(rectA, rectB) {
    const aX = rectA.x + NodePeelPadding;
    const bX = rectB.x + NodePeelPadding;
    const a_W = rectA.el.offsetWidth - NodePeelPadding * 2;
    const b_W = rectB.el.offsetWidth - NodePeelPadding * 2;
    const aY = rectA.y + NodePeelPadding;
    const bY = rectB.y + NodePeelPadding;
    const a_H = rectA.el.offsetHeight - NodePeelPadding * 2;
    const b_H = rectB.el.offsetHeight - NodePeelPadding * 2;
    return !(bX >= aX + a_W || bX + b_W <= aX || bY >= aY + a_H || bY + b_H <= aY);
  },
  isXOverlap(aX:number,bX:number,a_W:number,b_W:number) {
    return !(bX >= aX + a_W || bX + b_W <= aX);
  },
  isYOverlap(aY:number,bY:number,a_H:number,b_H:number) {
    return !(bY >= aY + a_H || bY + b_H <= aY);
  },
  // 检测两个形状是否重叠
  shapesOverlap(nodeA, nodeB, shapeA=1, shapeB=1) {
    return this.isRectangleOverlap(nodeA, nodeB);
  },
  getNoOverlapLimitedPosition(rectA, newX, newY, rectB) {
    const old_aX = rectA.x + NodePeelPadding;
    const old_aY = rectA.y + NodePeelPadding;
    const aX = newX + NodePeelPadding;
    const bX = rectB.x + NodePeelPadding;
    const a_W = rectA.el.offsetWidth - NodePeelPadding * 2;
    const b_W = rectB.el.offsetWidth - NodePeelPadding * 2;
    const aY = newY + NodePeelPadding;
    const bY = rectB.y + NodePeelPadding;
    const a_H = rectA.el.offsetHeight - NodePeelPadding * 2;
    const b_H = rectB.el.offsetHeight - NodePeelPadding * 2;
    let x = rectA.x;
    let y = rectA.y;
    const oX = this.isXOverlap(old_aX, bX, a_W, b_W);
    const oY = this.isYOverlap(old_aY, bY, a_H, b_H);
    if (oX) {
      if (aY < bY) {
        x = newX;
        y = bY - a_H - NodePeelPadding;
      } else if (aY > bY) {
        x = newX;
        y = bY + b_H - NodePeelPadding;
      }
    } else if (oY) {
      if (aX < bX) {
        x = bX - a_W - NodePeelPadding;
        y = newY;
      } else if (aX > bX) {
        x = bX + b_W - NodePeelPadding;
        y = newY;
      }
    }
    return {x, y};
  },
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
};

const NodePeelPadding = 8;
export default RGNodesAnalytic;
