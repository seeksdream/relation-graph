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
    devLog('[updateNodeOffsetSize]：', node.text, nodeOffsetWidth, nodeOffsetHeight);
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
  onLineClick(line, e) {
    devLog('onLineClick:', line);
    if (this.options.disableLineClickEffect !== true && line.disableDefaultClickEffect !== true) {
      this.setCheckedLine(line.seeks_id);
      this.selectNode(line.fromNode, true);
      this.selectNode(line.toNode, true);
      // Velocity(this.$refs.seeksRGLink, { strokDashoffset: 50 }, { duration: 3000, loop: 5 })
      setTimeout(() => {
        this.selectNode(line.fromNode, false);
        this.selectNode(line.toNode, false);
      }, 2000);
    }
    if (this.listeners.onLineClick) {
      this.listeners.onLineClick(line, e);
    }
  }
  expandOrCollapseNode(node, e) {
    if (node.expanded === false) {
      node.expanded = true;
      node.lot.childs.forEach(thisNode => {
        thisNode.isShow = true;
      });
      this.onNodeExpand(node, e);
    } else {
      node.expanded = false;
      node.lot.childs.forEach(thisNode => {
        thisNode.isShow = false;
      });
      this.onNodeCollapse(node, e);
    }
  }
  onNodeExpand(node, e) {
    devLog('onNodeExpand:', node);
    if (this.listeners.onNodeExpand) {
      this.listeners.onNodeExpand(node, e);
    }
  }
  onNodeCollapse(node, e) {
    devLog('onNodeCollapse:', node);
    if (this.listeners.onNodeCollapse) {
      this.listeners.onNodeCollapse(node, e);
    }
  }
}
