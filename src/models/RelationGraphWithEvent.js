import { devLog } from '@/utils/RGCommon';
import { RelationGraphWithEffect } from '@/models/RelationGraphWithEffect';
export class RelationGraphWithEvent extends RelationGraphWithEffect {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }
  setDefaultLineShape(optionValue) {
    this.options.defaultLineShape = optionValue;
  }
  setDefaultJunctionPoint(optionValue) {
    this.options.defaultJunctionPoint = optionValue;
  }
  setCheckedNode(nodeId) {
    this.options.checkedNodeId = nodeId;
  }
  setCheckedLine(lineId) {
    this.options.checkedLineId = lineId;
  }
  selectNode(node, selected) {
    node.selected = selected;
  }
  updateNodeOffsetSize(node, nodeOffsetWidth, nodeOffsetHeight) {
    // devLog('[updateNodeOffsetSize]：', node.text, nodeOffsetWidth, nodeOffsetHeight);
    node.el.offsetWidth = nodeOffsetWidth;
    node.el.offsetHeight = nodeOffsetHeight;
  }
  onNodeClick(node, e) {
    devLog('onNodeClick:', node);
    if (this.options.disableNodeClickEffect !== true && node.disableDefaultClickEffect !== true) {
      this.setCheckedNode(node.id);
    }
    if (this.listeners.onNodeClick) {
      this.listeners.onNodeClick(node, e);
    }
  }
  onLineClick(line, link, e) {
    devLog('onLineClick:', 'line:', line, 'link:', link);
    if (this.options.disableLineClickEffect !== true && link.disableDefaultClickEffect !== true) {
      this.setCheckedLine(link.seeks_id);
      this.selectNode(link.fromNode, true);
      this.selectNode(link.toNode, true);
      // Velocity(this.$refs.seeksRGLink, { strokDashoffset: 50 }, { duration: 3000, loop: 5 })
      setTimeout(() => {
        this.selectNode(link.fromNode, false);
        this.selectNode(link.toNode, false);
      }, 2000);
    }
    if (this.listeners.onLineClick) {
      this.listeners.onLineClick(link, link, e);
    }
  }
  expandOrCollapseNode(node, e) {
    if (node.expanded === false) {
      this.expandNode(node, e);
    } else {
      this.collapseNode(node, e);
    }
  }
  expandNode(node, e) {
    devLog('onNodeExpand:', node);
    node.expanded = true;
    node.lot.childs.forEach(thisNode => {
      thisNode.isShow = true;
    });
    if (this.listeners.onNodeExpand) {
      this.listeners.onNodeExpand(node, e);
    }
  }
  collapseNode(node, e) {
    devLog('onNodeCollapse:', node);
    node.expanded = false;
    node.lot.childs.forEach(thisNode => {
      thisNode.isShow = false;
    });
    if (this.listeners.onNodeCollapse) {
      this.listeners.onNodeCollapse(node, e);
    }
  }
}
