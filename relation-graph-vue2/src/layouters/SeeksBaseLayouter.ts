import { RGLayoutOptions, RGNode, RGOptionsFull } from '../types';
import { devLog } from '../utils/RGCommon';
import RGNodesAnalytic from '../utils/RGNodesAnalytic';

export class SeeksBaseLayouter {
  graphOptions:RGOptionsFull;
  layoutOptions:RGLayoutOptions;
  allNodes:RGNode[] = [];
  isMainLayouer = true;
  constructor(layoutOptions:RGLayoutOptions, graphOptions:RGOptionsFull) {
    this.layoutOptions = layoutOptions;
    this.graphOptions = graphOptions;
  }
  rootNode:RGNode|undefined;
  refresh() {
    this.placeNodes(this.allNodes, this.rootNode);
  }
  placeNodes(allNodes:RGNode[], rootNode?:RGNode) {
    // do nothing
    this.allNodes = allNodes;
    this.rootNode = rootNode;
  }
  currentAnimationStep = 1;
  allAnimationStep = 30;
  snapshotBeforeAnimation() {
    this.allNodes.forEach(thisNode => {
      // if (thisNode.fixed === true) {
      //   thisNode.lot.placed = true;
      //   return;
      // }
      if (!RGNodesAnalytic.isAllowShowNode(thisNode)) return;
      const __offsetX = thisNode.offset_x || 0;
      const __offsetY = thisNode.offset_y || 0;
      const boxOffsetX = -(thisNode.width || this.graphOptions.defaultNodeWidth || thisNode.el.offsetWidth || 50) / 2;
      const boxOffsetY = -(thisNode.height || this.graphOptions.defaultNodeHeight || thisNode.el.offsetHeight || 50) / 2;
      thisNode.lot.to_x = thisNode.lot.x! + __offsetX + boxOffsetX;
      thisNode.lot.to_y = thisNode.lot.y! + __offsetY + boxOffsetY;
      thisNode.lot.from_x = thisNode.x || 0;
      thisNode.lot.from_y = thisNode.y || 0;
      thisNode.lot.placed = true;
    });
  }
  async animationLayout(resetNodeFromPosition = true) {
    if (resetNodeFromPosition) this.snapshotBeforeAnimation();
    const rootNode = this.rootNode;
    rootNode && devLog('debug0910:create rootNode coordinates:2.1', rootNode.x, rootNode.y);

    this.currentAnimationStep = 1;
    this.allAnimationStep = 10;
    devLog('[LayoutAnimationEffect]start play...');
    let called = false;
    return new Promise<void>((resolve, reject) => {
      this.playAnimation(() => {
        if (called) {
          return;
        }
        called = true;
        devLog('[LayoutAnimationEffect]played!');
        this.allNodes.forEach(thisNode => {
          // thisNode.isShow = false;
          if (!RGNodesAnalytic.isAllowShowNode(thisNode)) return;
          thisNode.lot.from_x = thisNode.x;
          thisNode.lot.from_y = thisNode.y;
          // const {to_x,to_y} = thisNode.lot;
          // thisNode.lot.to_x = thisNode.x;
          // thisNode.lot.to_y = thisNode.y;
          thisNode.x = thisNode.lot.to_x!;
          thisNode.y = thisNode.lot.to_y!;
        });
        resolve();
      });
    });
  }
  playAnimation(callback:()=>void) {
    devLog('[LayoutAnimationEffect]', this.currentAnimationStep, this.allAnimationStep);
    if (this.currentAnimationStep > this.allAnimationStep) {
      callback();
      return;
    }
    this.allNodes.forEach(thisNode => {
      if (!thisNode.lot.placed) return;
      const { from_x, from_y, to_x, to_y } = thisNode.lot;
      if (from_x !== undefined && from_y !== undefined && to_x !== undefined && to_y !== undefined) {
        const stepBuff_x = (to_x - from_x) / this.allAnimationStep;
        const stepBuff_y = (to_y - from_y) / this.allAnimationStep;
        const x = Math.floor(from_x + this.currentAnimationStep * stepBuff_x);
        const y = Math.floor(from_y + this.currentAnimationStep * stepBuff_y);
        // devLog('animation error : from ', thisNode.text, {from_x, from_y, to_x, to_y, stepBuff_x, stepBuff_y, x: thisNode.lot.x, y: thisNode.lot.y}, thisNode.lot);
        // if (Number.isNaN(x) || Number.isNaN(y)) {
        //     devLog('animation error : from ', thisNode.text, {from_x, from_y, to_x, to_y, stepBuff_x, stepBuff_y, x: thisNode.lot.x, y: thisNode.lot.y}, thisNode.lot);
        //     return;
        // }
        if (thisNode.x !== x || thisNode.y !== y) {
          thisNode.x = x;
          thisNode.y = y;
        }
      }
    });
    this.currentAnimationStep++;
    requestAnimationFrame(this.playAnimation.bind(this, callback));
  }
}

export default SeeksBaseLayouter;
