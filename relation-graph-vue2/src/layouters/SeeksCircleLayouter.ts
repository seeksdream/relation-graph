import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import {RGNodesAnalytic} from "../utils/RGNodesAnalytic";
import SeeksForceLayouter from "./SeeksForceLayouter";
import {RGLayoutOptions, RGNode, RGOptionsFull} from "../types";

export class SeeksCircleLayouter extends SeeksForceLayouter{
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull) {
    super(layoutOptions, graphOptions);
  }
  async refresh() {
    await this.placeNodes(this.allNodes, this.rootNode);
  }
  async placeNodes(allNodes:RGNode[], rootNode?:RGNode) {
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    } else {
      devLog('layout by root:', rootNode);
    }
    this.allNodes = allNodes;
    this.rootNode = rootNode;
    allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false;
      thisNode.lot.notLeafNode = false;
      thisNode.lot.childs = [];
      thisNode.lot.parent = undefined;
      thisNode.lot.index_of_p_childs = 0;
      thisNode.lot.strength = 0;
    });

    const _center_offset_x = this.layoutOptions.centerOffset_x || 0;
    const _center_offset_y = this.layoutOptions.centerOffset_y || 0;

    const __center = {
      x: _center_offset_x,
      y: _center_offset_y
    };
    const __all_size = this.allNodes.length;
    let __circle_r = __all_size * 90 / Math.PI / 2;
    if (__circle_r < 200)__circle_r = 200;
    if (__circle_r > 800)__circle_r = 800;
    this.allNodes.forEach((thisNode, _index) => {
      const _point = RGGraphMath.getOvalPoint(__center.x, __center.y, __circle_r, _index, __all_size);
      thisNode.lot.x = _point.x;
      thisNode.lot.y = _point.y;
    });
    if (!this.graphOptions.useAnimationWhenExpanded) {
      this.allNodes.forEach(thisNode => {
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
}

export default SeeksCircleLayouter;
