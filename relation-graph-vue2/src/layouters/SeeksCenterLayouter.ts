import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import SeeksForceLayouter from './SeeksForceLayouter';
import { NodesAnalyticResult, RGNodesAnalytic } from '../utils/RGNodesAnalytic';
import { RGCenterLayoutOptions, RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
export class SeeksCenterLayouter extends SeeksForceLayouter {
  layoutOptions:RGCenterLayoutOptions;
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull) {
    super(layoutOptions, graphOptions);
    this.layoutOptions = layoutOptions as RGCenterLayoutOptions;
  }
  async refresh() {
    devLog('SeeksCenterLayouter:refresh');
    await this.placeNodes(this.allNodes, this.rootNode);
  }
  async placeNodes(allNodes:RGNode[], rootNode?:RGNode) {
    devLog('SeeksCenterLayouter:placeNodes');
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    }
    devLog('layout by root:', rootNode);
    this.allNodes = allNodes;
    this.rootNode = rootNode;
    allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      thisNode.lot.parent = undefined;
      thisNode.lot.index_of_parent = 0;
      thisNode.lot.strength = 0;
      thisNode.lot.placed = false;
    });
    let groupNodes:RGNode[] = [];
    let analyticResult:NodesAnalyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    RGNodesAnalytic.analysisNodes(groupNodes, [this.rootNode], 0, analyticResult);
    groupNodes = [];
    analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    };
    RGNodesAnalytic.analysisNodes4Didirectional(groupNodes, [this.rootNode], 0, analyticResult, 0);
    if (rootNode.fixed) {
      if (rootNode.origin_x === undefined) {
        rootNode.origin_x = rootNode.x;
        rootNode.origin_y = rootNode.y;
      }
      rootNode.lot.x = rootNode.origin_x;
      rootNode.lot.y = rootNode.origin_y;
      devLog('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y);
    } else {
      if (this.layoutOptions.fixedRootNode) {
        rootNode.lot.x = RGNodesAnalytic.getLotXByNodeX(this.graphOptions, rootNode);
        rootNode.lot.y = RGNodesAnalytic.getLotYByNodeY(this.graphOptions, rootNode);
      } else {
        const _center_offset_x = this.layoutOptions.centerOffset_x || 0;
        const _center_offset_y = this.layoutOptions.centerOffset_y || 0;
        rootNode.lot.x = 0 + _center_offset_x;
        rootNode.lot.y = 0 + _center_offset_y;
      }
    }

    devLog('root position:', rootNode.lot.x, rootNode.lot.y);
    // this.rootNode.lot.x = 0
    // this.rootNode.lot.y = 0
    // if (this.rootNode.lot.y > 400) {
    //   this.rootNode.lot.y = 400
    // }
    this.placeRelativePosition(this.rootNode, groupNodes, analyticResult);
    if (!this.graphOptions.useAnimationWhenExpanded) {
      groupNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return;
        if (!RGNodesAnalytic.isAllowShowNode(thisNode)) return;
        const __offsetX = thisNode.offset_x || 0;
        const __offsetY = thisNode.offset_y || 0;
        const boxOffsetX = -(thisNode.width || this.graphOptions.defaultNodeWidth || thisNode.el.offsetWidth || 50) / 2;
        const boxOffsetY = -(thisNode.height || this.graphOptions.defaultNodeHeight || thisNode.el.offsetHeight || 50) / 2;
        thisNode.x = thisNode.lot.x! + __offsetX + boxOffsetX;
        thisNode.y = thisNode.lot.y! + __offsetY + boxOffsetY;
        thisNode.lot.placed = true;
      });
    } else {
      devLog('Play layout animation.....');
      await this.animationLayout();
    }
  }
  placeRelativePosition(rootNode:RGNode, groupNodes:RGNode[], analyticResult:NodesAnalyticResult) {
    const distance_coefficient = this.layoutOptions.distance_coefficient === undefined ? 1 : this.layoutOptions.distance_coefficient;
    let __leve1_min_r = Math.round(((this.graphOptions.viewSize.height + this.graphOptions.viewSize.width) / analyticResult.max_deep * 0.2)) * distance_coefficient;
    devLog('analyticResult:', analyticResult, __leve1_min_r, this.layoutOptions.distance_coefficient);
    if (__leve1_min_r < 150 * distance_coefficient) __leve1_min_r = 150 * distance_coefficient;
    let __level1_r = 0;
    groupNodes.forEach(thisNode => {
      const subling = thisNode.lot.subling;
      if (subling && subling.level === 1) {
        __level1_r = Math.round(subling.all_size * 50 / Math.PI / 2);
        if (__level1_r < __leve1_min_r)__level1_r = __leve1_min_r;
        // if (__level1_r > 500)__level1_r = 500
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, subling.level * __level1_r, thisNode.lot.strength_plus! - (thisNode.lot.strength! / 2), subling.all_strength);
        // const _point = RGGraphMath.getOvalPoint(this.rootNode.x, this.rootNode.y, thisNode.lot.subling.level * __level1_r, thisNode.lot.index_of_level, thisNode.lot.subling.all_size)
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
    const __level_r = Math.round(300 * distance_coefficient);
    groupNodes.forEach(thisNode => {
      const subling = thisNode.lot.subling;
      if (subling && subling.level > 1) {
        const __area_start = thisNode.lot.parent!.lot.strength_plus! - thisNode.lot.parent!.lot.strength!;
        const __area_end = thisNode.lot.parent!.lot.strength_plus!;
        const __buff = (__area_end - __area_start) / (thisNode.lot.parent!.lot.childs_size! + 1) * (thisNode.lot.index_of_parent! + 1);
        const _point = RGGraphMath.getOvalPoint(rootNode.lot.x!, rootNode.lot.y!, (subling.level - 1) * __level_r + __level1_r, __area_start + __buff, thisNode.lot.parent!.lot.subling!.all_strength);
        thisNode.lot.x = _point.x;
        thisNode.lot.y = _point.y;
      }
    });
  }
}
// mixinProps(SeeksCenterLayouter.prototype, LayoutAnimationEffect.prototype);
export default SeeksCenterLayouter;
