import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import SeeksForceLayouter from './SeeksForceLayouter';
import type {
  RGCenterLayoutOptions,
  RGLayoutOptions,
  RGLayouter,
  RGNode,
  RGOptionsFull,
} from '../RelationGraph';
import type { NodesAnalyticResult } from '../utils/RGGraphMath';

export class SeeksCenterLayouter
  extends SeeksForceLayouter
  implements RGLayouter
{
  constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull) {
    super(layoutOptions, graphOptions);
    this.layoutOptions = layoutOptions as RGCenterLayoutOptions;
  }
  // graphOptions: RGOptionsFull
  layoutOptions: RGCenterLayoutOptions;
  // rootNode: RGNode | undefined = undefined
  // allNodes: RGNode[] = []
  // __origin_nodes: RGNode[] = []
  refresh() {
    devLog('SeeksCenterLayouter:refresh');
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }
  placeNodes(allNodes: RGNode[], rootNode?: RGNode) {
    devLog('SeeksCenterLayouter:placeNodes');
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    }
    devLog('layout by root:', rootNode);
    this.__origin_nodes = allNodes;
    this.rootNode = rootNode;
    allNodes.forEach((thisNode) => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.placed = false;
    });
    this.allNodes = [];
    const analyticResult: NodesAnalyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1,
    };
    RGGraphMath.analysisNodes4Didirectional(
      this.allNodes,
      [this.rootNode],
      0,
      analyticResult,
      0
    );
    rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width || 60) / 2;
    rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height || 60) / 2;
    devLog('root position:', rootNode.lot.x, rootNode.lot.y);
    // this.rootNode.lot.x = 0
    // this.rootNode.lot.y = 0
    // if (this.rootNode.lot.y > 400) {
    //   this.rootNode.lot.y = 400
    // }
    this.placeRelativePosition(this.rootNode, analyticResult);
    this.allNodes.forEach((thisNode) => {
      if (thisNode.fixed === true) return;
      if (!RGGraphMath.isAllowShowNode(thisNode)) return;
      const __offsetX = thisNode.offset_x || 0;
      const __offsetY = thisNode.offset_y || 0;
      thisNode.x = thisNode.lot.x! + __offsetX;
      thisNode.y = thisNode.lot.y! + __offsetY;
      thisNode.lot.placed = true;
    });
    devLog('Start Auto Layout.....');
  }
  placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult) {
    const distance_coefficient =
      this.layoutOptions.distance_coefficient === undefined
        ? 1
        : this.layoutOptions.distance_coefficient;
    let __leve1_min_r =
      Math.round(
        ((this.graphOptions.viewSize.height +
          this.graphOptions.viewSize.width) /
          analyticResult.max_deep) *
          0.2
      ) * distance_coefficient;
    devLog(
      'analyticResult:',
      analyticResult,
      __leve1_min_r,
      this.layoutOptions.distance_coefficient
    );
    if (__leve1_min_r < 150 * distance_coefficient)
      __leve1_min_r = 150 * distance_coefficient;
    let __level1_r = 0;
    this.allNodes.forEach((thisNode) => {
      if (thisNode.lot.subling && thisNode.lot.subling.level === 1) {
        __level1_r = Math.round(
          (thisNode.lot.subling.all_size * 50) / Math.PI / 2
        );
        if (__level1_r < __leve1_min_r) __level1_r = __leve1_min_r;
        // if (__level1_r > 500)__level1_r = 500
        const _point = RGGraphMath.getOvalPoint(
          rootNode.lot.x!,
          rootNode.lot.y!,
          thisNode.lot.subling.level * __level1_r,
          thisNode.lot.strength_plus! - thisNode.lot.strength! / 2,
          thisNode.lot.subling.all_strength
        );
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
    const __level_r = Math.round(300 * distance_coefficient);
    this.allNodes.forEach((thisNode) => {
      if (
        thisNode.lot.parent &&
        thisNode.lot.subling &&
        thisNode.lot.subling.level > 1
      ) {
        const __area_start =
          thisNode.lot.parent.lot.strength_plus! -
          thisNode.lot.parent.lot.strength!;
        const __area_end = thisNode.lot.parent.lot.strength_plus!;
        const __buff =
          ((__area_end - __area_start) /
            (thisNode.lot.parent.lot.childs_size! + 1)) *
          (thisNode.lot.index_of_parent! + 1);
        const _point = RGGraphMath.getOvalPoint(
          rootNode.lot.x!,
          rootNode.lot.y!,
          (thisNode.lot.subling.level - 1) * __level_r + __level1_r,
          __area_start + __buff,
          thisNode.lot.parent.lot.subling?.all_strength!
        );
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
  }
}

export default SeeksCenterLayouter;
