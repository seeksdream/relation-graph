
// 节点
type RGNode = {
  x: number // 节点的x坐标
  y: number // 节点的y坐标
  childrens: RGNode[] // 与当前节点相关的所有节点
};

/**
 * 布局器，调用它的方法placeNodes可以为所有节点分配位置
 */
export class SeeksBaseLayouter {
  // 所有节点
  allNodes: RGNode[] = [];
  // 根节点
  rootNode: RGNode;
  constructor(allNodes: RGNode[], rootNode: RGNode) {
    this.allNodes = allNodes;
    this.rootNode = rootNode;
  }
  /**
   * 为allNodes中的所有节点分配位置
   */
  placeNodes() {
    // TODO 这个方法中需要为节点分配位置，期望的效果是：从根节点rootNode出发，设置他的位置为[0, 0], 将它的子节点作为level-1,即"第一层节点"，横向依次排列在在根节点下方，将level-1中的子节点垂直排在在各自节点的下方。
  }
}
