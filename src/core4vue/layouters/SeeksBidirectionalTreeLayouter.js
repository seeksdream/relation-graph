import SeeksGraphMath from '../SeeksGraphMath'

function SeeksBidirectionalTreeLayouter(layoutSetting, graphSetting) {
  this.graphSetting = graphSetting
  this.config = layoutSetting || {}
  console.log('new SeeksBidirectionalTreeLayouter:', this.config)
  if (!this.config.from) this.config.from = 'left'
  if (this.config.levelDistance && typeof this.config.levelDistance === 'string') {
    this.config.levelDistanceArr = this.config.levelDistance.split(',').map(thisNum => parseInt(thisNum))
  }
  this.rootNode = null
  this.allNodes = []
  this.__origin_nodes = []
  this.refresh = function() {
    console.log('SeeksBidirectionalTreeLayouter:refresh:nodes:', this.__origin_nodes.length)
    this.placeNodes(this.__origin_nodes, this.rootNode)
  }
  this.analysisNodes4Didirectional = function(willLayoutNodes, thisLevelNodes, thisDeep, analyticResult, levelDirect) {
    if (thisLevelNodes.length > analyticResult.max_length) {
      analyticResult.max_length = thisLevelNodes.length
    }
    if (thisDeep > analyticResult.max_deep) {
      analyticResult.max_deep = thisDeep
    }
    var __thisLOT_subling = {
      level: thisDeep,
      all_size: thisLevelNodes.length,
      all_strength: 0
    }
    var newLevelNodes = []
    thisLevelNodes.forEach(thisNode => {
      if (!thisNode.lot)thisNode.lot = {}
      thisNode.lot.eached = true
      thisNode.lot.subling = __thisLOT_subling
      thisNode.lot.level = thisDeep
      willLayoutNodes.push(thisNode)
    })
    var __thisLevel_index = 0
    // var __prev_node
    thisLevelNodes.forEach(thisNode => {
      var __thisNode_child_size = 0
      // console.log('Build node::', thisNode.text, thisNode.targetNodes.length)
      if (levelDirect === -1) {
        // console.log('Build node::from::', thisNode.text, thisNode.targetFrom.length)
        let __thisTargetIndex = 0
        thisNode.targetFrom.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false }
          if (!thisTarget.lot.eached) {
            if (SeeksGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_parent = __thisTargetIndex++
              // thisTarget.lot.prevNode = __prev_node
              // if (__prev_node)__prev_node.lot.nextNode = thisTarget
              // __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget)
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            } else {
              thisNode.lot.childs.push(thisTarget)
              // console.log('hide node:', thisTarget.name, 'from:', thisNode.text)
            }
          }
        })
      } else {
        // console.log('Build node::to::', thisNode.text, thisNode.targetTo.length)
        let __thisTargetIndex = 0
        thisNode.targetTo.forEach((thisTarget) => {
          if (!thisTarget.lot)thisTarget.lot = { eached: false }
          if (!thisTarget.lot.eached) {
            if (SeeksGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_parent = __thisTargetIndex++
              // thisTarget.lot.prevNode = __prev_node
              // if (__prev_node)__prev_node.lot.nextNode = thisTarget
              // __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget)
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            } else {
              thisNode.lot.childs.push(thisTarget)
              // console.log('hide node:', thisTarget.name, 'from:', thisNode.text)
            }
          }
        })
      }
      thisNode.lot.strength = __thisNode_child_size > 0 ? __thisNode_child_size : 1
      __thisLOT_subling.all_strength += thisNode.lot.strength
      thisNode.lot.strength_plus = __thisLOT_subling.all_strength
      thisNode.lot.index_of_level = __thisLevel_index
      thisNode.lot.childs_size = __thisNode_child_size
      __thisLevel_index++
    })
    if (__thisLOT_subling.all_strength > analyticResult.max_strength) {
      analyticResult.max_strength = __thisLOT_subling.all_strength
    }
    // console.log(thisDeep, 'next level nodes:', newLevelNodes.length)
    if (newLevelNodes.length > 0) {
      // console.log('thisLevelNodes.length:', thisLevelNodes, thisLevelNodes.length)
      this.analysisNodes4Didirectional(willLayoutNodes, newLevelNodes, thisDeep + levelDirect, analyticResult, levelDirect)
    } else {
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size > 0) {
          thisNode.lot.strengthWithChilds = 0
        }
      })
      willLayoutNodes.forEach(thisNode => {
        if (thisNode.lot.childs_size === 0) {
          thisNode.lot.strengthWithChilds = 1
          SeeksGraphMath.conductStrengthToParents(thisNode)
        }
      })
      SeeksGraphMath.analysisDataTree([willLayoutNodes[0]], 0, levelDirect)
      // willLayoutNodes.forEach(thisNode => {
      //   thisNode.text = thisNode.lot.strengthWithChilds_from + ':' + thisNode.lot.strengthWithChilds + '/' + thisNode.lot.strength
      // })
    }
  }
  this.placeNodes = function(allNodes, rootNode) {
    console.log('SeeksBidirectionalTreeLayouter:placeNodes')
    if (!rootNode) {
      console.error('root is null')
      return
    } else {
      console.log('layout by root:', rootNode)
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
      thisNode.lot.strengthWithChilds_from = 0
      thisNode.lot.strengthWithChilds = 0
      thisNode.lot.prevNode = undefined
      thisNode.lot.nextNode = undefined
      thisNode.lot.placed = false
    })
    // this.rootNode.fixed = true
    this.allNodes = []
    var analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    }
    this.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, -1)
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult)
    this.allNodes = []
    analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1
    }
    this.analysisNodes4Didirectional(this.allNodes, [this.rootNode], 0, analyticResult, 1)
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult)

    // console.log('根据数据调整画板高度')
    // if (this.config.from === 'left' || this.config.from === 'right') {
    //   let __suitableHeight = analyticResult.max_strength * 50 + 100
    //   if (__suitableHeight < this.graphSetting.viewSize.height + 300)__suitableHeight = this.graphSetting.viewSize.height + 300
    //   this.graphSetting.canvasSize.height = __suitableHeight
    //   let __suitableWidth = analyticResult.max_deep * 1000 + 600
    //   if (__suitableWidth < this.graphSetting.viewSize.width + 500)__suitableWidth = this.graphSetting.viewSize.width + 500
    //   this.graphSetting.canvasSize.width = __suitableWidth
    // } else {
    //   let __suitableWidth = analyticResult.max_strength * 320 + 1000
    //   if (__suitableWidth < this.graphSetting.viewSize.width + 500)__suitableWidth = this.graphSetting.viewSize.width + 500
    //   this.graphSetting.canvasSize.width = __suitableWidth
    //   let __suitableHeight = analyticResult.max_deep * 400 + 200
    //   if (__suitableHeight < this.graphSetting.viewSize.height + 300)__suitableHeight = this.graphSetting.viewSize.height + 300
    //   this.graphSetting.canvasSize.height = __suitableHeight
    // }
    // if (this.graphSetting.heightByContent) {
    //   console.log('根据数据调整视窗高度')
    //   if (this.config.from === 'left' || this.config.from === 'right') {
    //     this.graphSetting.viewSize.height = this.graphSetting.canvasSize.height
    //   } else {
    //     this.graphSetting.viewSize.height = analyticResult.max_deep * 500 + 300
    //   }
    // }
    // this.graphSetting.canvasOffset.x = this.graphSetting.viewNVInfo.width / 2 - 100
    // this.graphSetting.canvasOffset.y = this.graphSetting.viewNVInfo.height / 2 - 100
  }
  this.placeNodesPosition = function(rootNode, allNodes, analyticResult) {
    var __mapWidth = this.graphSetting.viewSize.width
    var __mapHeight = this.graphSetting.viewSize.height
    // console.log('analysisNodes:', analyticResult, allNodes)
    // this.graphSetting.canvasOffset.x = 0
    // this.graphSetting.canvasOffset.y = 0
    var __offsetX = rootNode.offset_x || 0
    var __offsetY = rootNode.offset_y || 0
    // console.log('#############Seeks graph viewSize:Tree layout:', this.graphSetting.viewSize.width, this.graphSetting.viewSize.height)
    // console.log('[layout canvasOffset]', __mapHeight, this.graphSetting, this.graphSetting.canvasSize, this.config)
    // console.log('[Layout:AnalyticResult]', analyticResult)
    if (rootNode.fixed !== true) {
      var _center_offset_x = parseInt(this.config.centerOffset_x) || 0
      var _center_offset_y = parseInt(this.config.centerOffset_y) || 0
      if (this.config.from === 'top') {
        rootNode.lot.x = (__mapWidth - rootNode.el.offsetWidth) / 2 + _center_offset_x
        rootNode.lot.y = parseInt(__mapHeight * 0.3 - rootNode.el.offsetHeight) + _center_offset_y
      } else if (this.config.from === 'bottom') {
        rootNode.lot.x = (__mapWidth - rootNode.el.offsetWidth) / 2 + _center_offset_x
        rootNode.lot.y = parseInt(__mapHeight * 0.7 - rootNode.el.offsetHeight) + _center_offset_y
      } else if (this.config.from === 'right') {
        rootNode.lot.x = parseInt(__mapWidth * 0.7 - rootNode.el.offsetWidth) / 2 + _center_offset_x
        rootNode.lot.y = parseInt(__mapHeight / 2 - rootNode.el.offsetHeight / 2) + _center_offset_y
      } else {
        rootNode.lot.x = parseInt(__mapWidth * 0.3 - rootNode.el.offsetWidth) / 2 + _center_offset_x
        rootNode.lot.y = parseInt(__mapHeight / 2 - rootNode.el.offsetHeight / 2) + _center_offset_y
      }
      console.log('设置根节点位置:', rootNode.text, rootNode.x, rootNode.y, this.graphSetting.canvasSize.width, this.graphSetting.canvasSize.height, this.graphSetting.canvasOffset.x, this.graphSetting.canvasOffset.y)
      rootNode.x = rootNode.lot.x + __offsetX
      rootNode.y = rootNode.lot.y + __offsetY
    } else {
      console.log('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y)
      if (rootNode.origin_x === undefined) {
        rootNode.origin_x = rootNode.x
        rootNode.origin_y = rootNode.y
      }
      rootNode.lot.x = rootNode.origin_x
      rootNode.lot.y = rootNode.origin_y
      rootNode.x = rootNode.lot.x + __offsetX
      rootNode.y = rootNode.lot.y + __offsetY
      console.log('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y)
    }
    rootNode.lot.placed = true
    var dynamicSizeConfig = {
      __mapWidth,
      __mapHeight
    }
    this.placeRelativePosition(rootNode, analyticResult, dynamicSizeConfig)
    allNodes.forEach(thisNode => {
      // if (rootNode === thisNode) {
      //   var _root_offset_x = this.config.root_offset_x || 0
      //   thisNode.x = thisNode.x + _root_offset_x
      //   return
      // }
      if (thisNode.fixed === true) {
        thisNode.lot.placed = true
        return
      }
      if (!SeeksGraphMath.isAllowShowNode(thisNode)) return
      // console.log(thisNode.text, thisNode.offset_x, thisNode.offset_y)
      var __offsetX = thisNode.offset_x || 0
      var __offsetY = thisNode.offset_y || 0
      thisNode.x = thisNode.offset_x + thisNode.lot.x + __offsetX
      thisNode.y = thisNode.offset_y + thisNode.lot.y + __offsetY
      thisNode.lot.placed = true
    })
  }
  this.placeRelativePosition = function(rootNode, analyticResult, dynamicSizeConfig) {
    if (this.config.from === 'left' || this.config.from === 'right') {
      const __min_per_height = this.config.min_per_height || 80
      const __max_per_height = this.config.max_per_height || 400
      const __min_per_width = this.config.min_per_width || 430
      const __max_per_width = this.config.max_per_width || 650
      let __per_width = parseInt((dynamicSizeConfig.__mapWidth - 10) / (analyticResult.max_deep + 2))
      if (__per_width < __min_per_width)__per_width = __min_per_width
      if (__per_width > __max_per_width)__per_width = __max_per_width
      let __per_height = parseInt(dynamicSizeConfig.__mapHeight / (analyticResult.max_strength + 1))
      if (__per_height < __min_per_height)__per_height = __min_per_height
      if (__per_height > __max_per_height)__per_height = __max_per_height
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.placed === true) return
        if (thisNode === rootNode) return
        // console.log('Place node:', thisNode.text, thisNode)
        // console.log('Place node lot:', thisNode.lot.subling.level, thisNode.lot.index_of_level, 'of', thisNode.lot.subling.all_size, thisNode.lot.subling.all_strength)
        if (this.config.from === 'right') {
          thisNode.lot.x = rootNode.lot.x - this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_width)
        } else {
          thisNode.lot.x = rootNode.lot.x + this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_width)
        }
      })
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.level !== 0) {
          thisNode.lot.y = rootNode.lot.y + __per_height * ((analyticResult.max_strength / -2) + thisNode.lot.strengthWithChilds_from + thisNode.lot.strengthWithChilds / 2)
        }
      })
      // this.allNodes.forEach(thisNode => {
      //   if (thisNode.fixed === true) return
      //   if (thisNode.lot.level === 1) {
      //     thisNode.lot.y = __per_height * (thisNode.lot.strength_plus - thisNode.lot.strength + (thisNode.lot.strength - 1) / 2)
      //   }
      // })
      // this.allNodes.forEach(thisNode => {
      //   if (thisNode.fixed === true) return
      //   if (thisNode.lot.level > 1) {
      //     // thisNode.lot.y = __per_height * (thisNode.lot.strength_plus - thisNode.lot.strength + (thisNode.lot.strength - 1) / 2)
      //     thisNode.lot.y = __per_height * (thisNode.lot.parent.lot.strength_plus - thisNode.lot.parent.lot.strength + thisNode.lot.index_of_parent)
      //     // thisNode.text = thisNode.lot.parent.lot.strength_plus + '-' + thisNode.lot.parent.lot.strength + '+' + thisNode.lot.index_of_parent
      //   }
      // })
    } else {
      const __min_per_height = this.config.min_per_height || 250
      const __max_per_height = this.config.max_per_height || 400
      const __min_per_width = this.config.min_per_width || 250
      const __max_per_width = this.config.max_per_width || 500
      var __per_width = parseInt((dynamicSizeConfig.__mapWidth - 10) / (analyticResult.max_strength + 2))
      if (__per_width < __min_per_width)__per_width = __min_per_width
      if (__per_width > __max_per_width)__per_width = __max_per_width
      var __per_height = parseInt((dynamicSizeConfig.__mapHeight - 10) / (analyticResult.max_deep + 2))
      if (__per_height < __min_per_height)__per_height = __min_per_height
      if (__per_height > __max_per_height)__per_height = __max_per_height
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.placed === true) return
        if (thisNode === rootNode) return
        // console.log('Place node:', thisNode.text, thisNode)
        // console.log('Place node lot:', thisNode.lot.subling.level, thisNode.lot.index_of_level, 'of', thisNode.lot.subling.all_size, thisNode.lot.subling.all_strength)
        if (this.config.from === 'bottom') {
          thisNode.lot.y = rootNode.lot.y - this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_height)
        } else {
          // console.log('Place node xxxx:', rootNode.lot.y, thisNode.lot.subling.level, __per_height)
          thisNode.lot.y = rootNode.lot.y + this.getLevelDistance(thisNode, thisNode.lot.subling.level, __per_height)
        }
      })
      this.allNodes.forEach(thisNode => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.level !== 0) {
          // console.log('Place node xxxx:', thisNode.lot.strengthWithChilds_from, thisNode.lot.strengthWithChilds, __per_width)
          thisNode.lot.x = -58 + rootNode.lot.x + __per_width * ((analyticResult.max_strength / -2) + thisNode.lot.strengthWithChilds_from + thisNode.lot.strengthWithChilds / 2)
          // thisNode.lot.x = rootNode.lot.x
        }
      })
      // this.allNodes.forEach(thisNode => {
      //   if (thisNode.fixed === true) return
      //   if (thisNode.lot.level === 1) {
      //     thisNode.lot.x = __per_width * (thisNode.lot.strength_plus - thisNode.lot.strength + thisNode.lot.strength / 2)
      //   }
      // })
      // this.allNodes.forEach(thisNode => {
      //   if (thisNode.fixed === true) return
      //   if (thisNode.lot.level > 1) {
      //     thisNode.lot.x = __per_width * (thisNode.lot.parent.lot.strength_plus - thisNode.lot.parent.lot.strength + thisNode.lot.index_of_parent)
      //   }
      // })
    }
  }
  this.getLevelDistance = function(node, level, perSize) {
    if (this.config.levelDistanceArr && this.config.levelDistanceArr.length > 0) {
      var _distance = 0
      for (let i = 0; i < level; i++) {
        var _thisLevelDistance = this.config.levelDistanceArr[i] || 100
        _distance += _thisLevelDistance
      }
      return _distance
    } else {
      return level * perSize
    }
  }
}

export default SeeksBidirectionalTreeLayouter
