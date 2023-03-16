import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import SeeksForceLayouter from './SeeksForceLayouter';
import type {
  RGLayoutOptions,
  RGLayouter,
  RGNode,
  RGOptionsFull,
} from '../RelationGraph';

export class SeeksCircleLayouter
  extends SeeksForceLayouter
  implements RGLayouter
{
  constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull) {
    super(layoutOptions, graphOptions);
  }
  // graphOptions: RGOptionsFull
  // layoutOptions: RGLayoutOptions
  // rootNode: RGNode | undefined = undefined
  // allNodes: RGNode[] = []
  // __origin_nodes: RGNode[] = []
  __max_deep = 1;
  __max_length = 1;
  checkMaxDeepAndLength(thisLevelNodes: RGNode[], thisDeep: number) {
    if (thisLevelNodes.length > this.__max_length) {
      this.__max_length = thisLevelNodes.length;
    }
    if (thisDeep > this.__max_deep) {
      this.__max_deep = thisDeep;
    }
    const __thisLOT_subling = {
      level: thisDeep,
      all_size: thisLevelNodes.length,
      all_strength: 0,
    };
    const newLevelNodes: RGNode[] = [];
    thisLevelNodes.forEach((thisNode) => {
      if (!thisNode.lot) thisNode.lot = { childs: [] };
      thisNode.lot.eached = true;
      thisNode.lot.subling = __thisLOT_subling;
      this.allNodes.push(thisNode);
    });
    let __thisLevel_index = 0;
    thisLevelNodes.forEach((thisNode) => {
      let __thisNode_child_size = 0;
      if (thisNode.targetNodes) {
        thisNode.targetNodes.forEach((thisTarget) => {
          devLog('child node::', thisTarget.type, thisTarget.lot.eached);
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false };
          if (
            thisTarget.type === 'node' &&
            thisTarget.targetNodes.length <= 1
          ) {
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_p_childs = __thisNode_child_size;
              thisNode.lot.childs.push(thisTarget);
              thisNode.lot.eached = true;
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            }
          } else {
            thisTarget.lot.notLeafNode = true;
          }
        });
        thisNode.targetNodes.forEach((thisTarget) => {
          if (thisTarget.lot.notLeafNode) {
            if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false };
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode;
              thisTarget.lot.index_of_p_childs = __thisNode_child_size;
              thisNode.lot.childs.push(thisTarget);
              thisNode.lot.eached = true;
              newLevelNodes.push(thisTarget);
              __thisNode_child_size++;
            }
          }
        });
      }
      thisNode.lot.strength =
        __thisNode_child_size > 0 ? __thisNode_child_size : 1;
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
  placeNodes(allNodes: RGNode[], rootNode?: RGNode) {
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    } else {
      devLog('layout by root:', rootNode);
    }
    this.__origin_nodes = allNodes;
    this.rootNode = rootNode;
    allNodes.forEach((thisNode) => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      thisNode.lot.parent = undefined;
      thisNode.lot.index_of_p_childs = 0;
      thisNode.lot.strength = 0;
    });
    this.allNodes = allNodes;
    devLog('max before:', this.__max_deep, this.__max_length);
    // this.checkMaxDeepAndLength([this.rootNode], 0);
    devLog('max after:', this.__max_deep, this.__max_length);
    const __center = {
      x: 0,
      y: 0
    };
    const __all_size = this.allNodes.length;
    let __circle_r = (__all_size * 90) / Math.PI / 2;
    if (__circle_r < 200) __circle_r = 200;
    if (__circle_r > 800) __circle_r = 800;
    this.allNodes.forEach((thisNode, _index) => {
      const _point = RGGraphMath.getOvalPoint(
        __center.x,
        __center.y,
        __circle_r,
        _index,
        __all_size
      );
      thisNode.x = _point.x;
      thisNode.y = _point.y;
    });
    devLog('Start Auto Layout.....');
  }
}
export default SeeksCircleLayouter;
