import { devLog } from '../utils/RGCommon'
import { RelationGraphWithEffect } from '../models/RelationGraphWithEffect'
import type {
  RGJunctionPoint,
  RGLine,
  RGLineShape,
  RGLink,
  RGListeners,
  RGNode,
  RGOptions,
} from '../RelationGraph'
export class RelationGraphWithEvent extends RelationGraphWithEffect {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners)
  }
  setDefaultLineShape(optionValue: RGLineShape) {
    this.options.defaultLineShape = optionValue
  }
  setDefaultJunctionPoint(optionValue: RGJunctionPoint) {
    this.options.defaultJunctionPoint = optionValue
  }
  updateNodeOffsetSize(
    node: RGNode,
    nodeOffsetWidth: number,
    nodeOffsetHeight: number
  ) {
    // devLog('[updateNodeOffsetSize]：', node.text, nodeOffsetWidth, nodeOffsetHeight);
    node.el.offsetWidth = nodeOffsetWidth
    node.el.offsetHeight = nodeOffsetHeight
  }
  onNodeClick(node: RGNode, e: MouseEvent | TouchEvent) {
    devLog('onNodeClick:', node)
    if (
      this.options.disableNodeClickEffect !== true &&
      node.disableDefaultClickEffect !== true
    ) {
      this.setCheckedNode(node.id)
    }
    if (this.listeners['on-node-click']) {
      this.listeners['on-node-click'](node, e)
    }
  }
  onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent) {
    devLog('onLineClick:', 'line:', line, 'link:', link)
    if (
      this.options.disableLineClickEffect !== true &&
      line.disableDefaultClickEffect !== true
    ) {
      this.setCheckedLine(link.seeks_id)
      this.selectNode(link.fromNode, true)
      this.selectNode(link.toNode, true)
      // Velocity(this.$refs.seeksRGLink, { strokDashoffset: 50 }, { duration: 3000, loop: 5 })
      setTimeout(() => {
        this.selectNode(link.fromNode, false)
        this.selectNode(link.toNode, false)
      }, 2000)
    }
    if (this.listeners['on-line-click']) {
      this.listeners['on-line-click'](line, link, e)
    }
  }
  expandOrCollapseNode(node: RGNode, e: MouseEvent | TouchEvent) {
    if (node.expanded === false) {
      this.expandNode(node, e)
    } else {
      this.collapseNode(node, e)
    }
  }
  expandNode(node: RGNode, e: MouseEvent | TouchEvent) {
    devLog('onNodeExpand:', node)
    node.expanded = true
    node.lot.childs.forEach((thisNode) => {
      thisNode.isShow = true
    })
    if (this.listeners['on-node-expand']) {
      this.listeners['on-node-expand'](node, e)
    }
  }
  collapseNode(node: RGNode, e: MouseEvent | TouchEvent) {
    devLog('onNodeCollapse:', node)
    node.expanded = false
    node.lot.childs.forEach((thisNode) => {
      thisNode.isShow = false
    })
    if (this.listeners['on-node-collapse']) {
      this.listeners['on-node-collapse'](node, e)
    }
  }
  focusRootNode() {
    devLog('relation-graph:focusRootNode')
    this.graphData.rootNode && this.handleSelect(this.graphData.rootNode)
  }
  focusNodeById(nodeId: string) {
    this.graphData.nodes.forEach((thisNode) => {
      if (thisNode.id === nodeId) {
        this.handleSelect(thisNode)
      }
    })
  }
  querySearchAsync(queryString: string, callback: (nodes: RGNode[]) => void) {
    devLog('fetch-suggestions', queryString)
    queryString = queryString.trim()
    if (queryString === '') {
      return
    }
    const nodes: RGNode[] = []
    this.graphData.nodes.forEach((thisNode) => {
      devLog('fetch:', thisNode.text)
      if (thisNode.text.includes(queryString)) {
        nodes.push(thisNode)
      }
    })
    devLog('fetched:', nodes.length)
    callback(nodes)
  }
  handleSelect(thisNode: RGNode) {
    devLog('checked:', thisNode)
    scrollTo({
      top: this.$dom!.offsetTop,
    })
    this.animateToZoom(100, 300, () => {
      const _n_width = thisNode.width || 50
      const _n_height = thisNode.height || 50
      const _final_x =
        thisNode.x * -1 + this.options.viewSize.width / 2 - _n_width / 2
      const _final_y =
        thisNode.y * -1 + this.options.viewSize.height / 2 - _n_height / 2
      this.animateGoto(_final_x, _final_y, 500, () => {
        this.options.checkedNodeId = thisNode.id
        this.refreshNVAnalysisInfo()
      })
    })
  }
}
