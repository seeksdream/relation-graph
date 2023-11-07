import { devLog } from '../utils/RGCommon';
import { NodesAnalyticResult, RGNodesAnalytic } from '../utils/RGNodesAnalytic';
import SeeksBaseLayouter from './SeeksBaseLayouter';
import { RGLayoutOptions, RGNode, RGOptionsFull } from '../types';

export class SeeksFixedLayouter extends SeeksBaseLayouter {
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull) {
    super(layoutOptions, graphOptions);
    this.layoutOptions = layoutOptions;
    this.graphOptions = graphOptions;
  }
  graphOptions;
  layoutOptions;
  allNodes = [];
  __origin_nodes:RGNode[] = [];
  refresh() {
    this.placeNodes(this.__origin_nodes, this.rootNode);
  }
  placeNodes(allNodes:RGNode[], rootNode?:RGNode) {
    if (!rootNode) {
      devLog('root is null:', rootNode);
      return;
    } else {
      devLog('layout by root:', rootNode);
    }
    devLog('allNodes:', allNodes.length);
    this.__origin_nodes = allNodes;
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
      if (!thisNode.x) thisNode.x = 0;
      if (!thisNode.y) thisNode.y = 0;
      if (Number.isNaN(thisNode.x)) thisNode.x = 0;
      if (Number.isNaN(thisNode.y)) thisNode.y = 0;
    });
    this.allNodes = [];
    const analyticResult:NodesAnalyticResult = {
      max_strength: 1,
      max_deep: 1,
      max_length: 1
    };
    RGNodesAnalytic.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, 0);
    devLog('[layout canvasOffset]', this.graphOptions.viewSize, this.graphOptions.canvasSize);
  }
}

export default SeeksFixedLayouter;
