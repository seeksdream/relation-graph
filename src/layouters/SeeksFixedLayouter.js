import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '@/utils/RGCommon';

export class SeeksFixedLayouter {
  constructor(layoutSetting, graphSetting) {
    this.config = layoutSetting;
    this.setting = graphSetting;
  }
  setting;
  config;
  rootNode = null;
  allNodes = [];
  __origin_nodes = [];
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
    devLog('[layout canvasOffset]', this.setting.viewSize, this.setting.canvasSize);
  }
}

export default SeeksFixedLayouter;
