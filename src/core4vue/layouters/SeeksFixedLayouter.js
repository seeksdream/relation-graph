import SeeksGraphMath from '../SeeksGraphMath'

function SeeksFixedLayouter(layoutSetting, graphSetting) {
  this.graphSetting = graphSetting
  this.config = layoutSetting || {}
  this.rootNode = null
  this.allNodes = []
  this.__origin_nodes = []
  this.refresh = function() {
    this.placeNodes(this.__origin_nodes, this.rootNode)
  }
  this.placeNodes = function(allNodes, rootNode) {
    if (!rootNode) {
      console.log('root is null:', rootNode)
      return
    } else {
      if (window.SeeksGraphDebug) console.log('layout by root:', rootNode)
    }
    this.__origin_nodes = allNodes
    this.rootNode = rootNode
    allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false
      thisNode.lot.notLeafNode = false
      thisNode.lot.childs = []
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0
      thisNode.lot.strength = 0
      thisNode.lot.prevNode = undefined
      thisNode.lot.nextNode = undefined
      thisNode.lot.placed = false
    })
    this.allNodes = []
    var analyticResult = {
      max_deep: 1,
      max_length: 1
    }
    SeeksGraphMath.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, 0)
    if (window.SeeksGraphDebug) console.log('[layout canvasOffset]', this.graphSetting.viewSize, this.graphSetting.canvasSize)
  }
}

export default SeeksFixedLayouter
