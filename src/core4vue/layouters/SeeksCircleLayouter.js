import SeeksGraphMath from '../SeeksGraphMath'

function SeeksCenterLayouter(layoutSetting, setting) {
  this.setting = setting
  this.config = layoutSetting || {}
  this.__max_deep = 1
  this.__max_length = 1
  this.checkMaxDeepAndLength = function(thisLevelNodes, thisDeep) {
    if (thisLevelNodes.length > this.__max_length) {
      this.__max_length = thisLevelNodes.length
    }
    if (thisDeep > this.__max_deep) {
      this.__max_deep = thisDeep
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
      this.allNodes.push(thisNode)
    })
    var __thisLevel_index = 0
    var __prev_node
    thisLevelNodes.forEach(thisNode => {
      // console.log('Build node::', thisNode.name, thisNode.targetNodes.length)
      var __thisNode_child_size = 0
      if (thisNode.targetNodes) {
        thisNode.targetNodes.forEach(thisTarget => {
          console.log('child node::', thisTarget.type, thisTarget.lot.eached)
          if (!thisTarget.lot)thisTarget.lot = { eached: false }
          if (thisTarget.type === 'node' && thisTarget.targetNodes.length <= 1) {
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_p_childs = __thisNode_child_size
              thisTarget.lot.prevNode = __prev_node
              if (__prev_node)__prev_node.lot.nextNode = thisTarget
              __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget)
              thisNode.lot.eached = true
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            }
          } else {
            thisTarget.lot.notLeafNode = true
          }
        })
        thisNode.targetNodes.forEach(thisTarget => {
          if (thisTarget.lot.notLeafNode) {
            if (!thisTarget.lot)thisTarget.lot = { eached: false }
            if (!thisTarget.lot.eached) {
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_p_childs = __thisNode_child_size
              thisTarget.lot.prevNode = __prev_node
              if (__prev_node)__prev_node.lot.nextNode = thisTarget
              __prev_node = thisTarget
              thisNode.lot.childs.push(thisTarget)
              thisNode.lot.eached = true
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            }
          }
        })
      }
      thisNode.lot.strength = __thisNode_child_size > 0 ? __thisNode_child_size : 1
      __thisLOT_subling.all_strength += thisNode.lot.strength
      thisNode.lot.strength_plus = __thisLOT_subling.all_strength
      thisNode.lot.level_index = __thisLevel_index
      thisNode.lot.childs_size = __thisNode_child_size
      __thisLevel_index++
    })
    // console.log('next level nodes:', newLevelNodes.length)
    if (newLevelNodes.length > 0) {
      // console.log('thisLevelNodes.length:', thisLevelNodes, thisLevelNodes.length)
      this.checkMaxDeepAndLength(newLevelNodes, thisDeep + 1)
    }
  }
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
      console.log('layout by root:', rootNode)
    }
    this.__origin_nodes = allNodes
    this.rootNode = rootNode
    allNodes.forEach(thisNode => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false
      thisNode.lot.notLeafNode = false
      thisNode.lot.childs = []
      thisNode.lot.parent = undefined
      thisNode.lot.index_of_p_childs = 0
      thisNode.lot.strength = 0
      thisNode.lot.prevNode = undefined
      thisNode.lot.nextNode = undefined
    })
    this.allNodes = []
    console.log('max before:', this.__max_deep, this.__max_length)
    this.checkMaxDeepAndLength([this.rootNode], 0)
    console.log('max after:', this.__max_deep, this.__max_length)
    // if (this.setting.heightByContent) {
    //   console.log('根据内容调整高度')
    //   var __suitableHeight = this.__max_length * 40 + 100
    //   if (__suitableHeight > this.setting.viewSize.height) {
    //     this.setting.viewSize.height = __suitableHeight
    //   }
    //   if (setting.viewSize.height > this.setting.canvasSize.height / 2) {
    //     this.setting.canvasSize.height = this.setting.viewSize.height * 2
    //   }
    // }
    this.setting.canvasSize.width = 4000
    this.setting.canvasSize.height = 4000
    if (this.setting.heightByContent) {
      console.log('根据数据调整视窗高度')
      this.setting.viewSize.height = 1600
    }
    this.setting.resetViewSize(this.setting)
    var __mapWidth = this.setting.viewSize.width
    var __mapHeight = this.setting.viewSize.height
    var __offsetX = this.setting.canvasOffset.x
    var __offsetY = this.setting.canvasOffset.y
    // var __per_width = parseInt((__mapWidth - 10) / (this.__max_deep + 2))
    // var __per_height = parseInt((__mapHeight - 10) / (this.__max_length + 1))
    // console.log('per:', __per_width, __per_height)
    // var __level2_current_length = 0
    // this.allNodes.forEach(thisNode => {
    //   if (thisNode.lot.subling.level === 1 && thisNode.lot.childs_size > 0) {
    //     __level2_current_length += thisNode.lot.childs_size
    //     var __thisNodeLength = __level2_current_length + parseInt((thisNode.lot.childs_size / 2).toFixed(0))
    //     thisNode.lot.strength_plus = __level2_current_length
    //     console.log('level2 parents:', thisNode.name, thisNode.lot.childs_size, { strength_plus: thisNode.lot.strength_plus, __thisNodeLength, strength: thisNode.lot.childs_size, __level2_current_length })
    //   }
    // })
    // var __currentLevel = 0
    var __center = {
      x: (__mapWidth) / 2 - __offsetX,
      y: (__mapHeight) / 2 - __offsetY
    }
    if (__center.y > 800 - __offsetY) {
      __center.y = 800 - __offsetY
    }
    var __all_size = this.allNodes.length
    var __circle_r = __all_size * 90 / Math.PI / 2
    if (__circle_r < 200)__circle_r = 200
    if (__circle_r > 800)__circle_r = 800
    this.allNodes.forEach((thisNode, _index) => {
      const _point = SeeksGraphMath.getOvalPoint(__center.x, __center.y, __circle_r, _index, __all_size)
      thisNode.x = _point.x
      thisNode.y = _point.y
      // console.log('Place node:', thisNode.name, thisNode.x, thisNode.y)
      // thisNode.name = (thisNode.lp_level_index + 1) + '/' + subling_size
    })
    // this.allNodes.forEach(thisNode => {
    //   if (thisNode.lot.subling.level === 1 && thisNode.lot.childs_size > 0) {
    //     var _c_first = thisNode.lot.childs[0]
    //     var _c_last = thisNode.lot.childs[thisNode.lot.childs.length - 1]
    //     var _new_y = parseInt((_c_first.y + _c_last.y) / 2)
    //     thisNode.y = _new_y
    //   }
    // })
    // this.adjustLevel2Y(__mapHeight)
    console.log('Start Auto Layout.....')
    // this.autoLayout(true)
    // console.log('layout from root:', this.__max_deep, this.__max_length)
    // rootNode.x = (this.setting.canvasSize.width - this.setting.nodeSize.width) / 2
    // rootNode.y = (this.setting.canvasSize.height - this.setting.nodeSize.height) / 2
    // rootNode.placed = true
    // // rootNode.name = rootNode.x + ',' + rootNode.y
    // var newLevelNodes = []
    // newLevelNodes.push(rootNode)
    // this.setPlace(newLevelNodes, 0, rootNode)
  }
  this.adjustLevel2Y = function(__mapHeight) {
    for (let i = 0; i < this.allNodes.length; i++) {
      var thisNode = this.allNodes[i]
      if (thisNode.lot.subling.level === 1 && thisNode.lot.childs_size === 0) {
        var __per_height = parseInt(__mapHeight / (thisNode.lot.subling.all_size + 1))
        if (__per_height > 70)__per_height = 70
        console.log(__per_height, __mapHeight, thisNode.lot.subling.all_size, thisNode.lot.subling.all_strength, thisNode.lot.strength)
        for (let j = 0; j < this.allNodes.length; j++) {
          var thisLevel2Node = this.allNodes[j]
          if (thisLevel2Node.lot.subling.level === 1 && thisLevel2Node !== thisNode) {
            var __y_diff = Math.abs(thisNode.y - thisLevel2Node.y)
            if (__y_diff < __per_height - 2) {
              console.log('__y_diff', thisNode.name, thisLevel2Node.name, __y_diff)
              // if (thisLevel2Node.lot.childs_size > 0 && i > 0) {
              //   thisLevel2Node.y = this.allNodes[i - 1].y + __per_height
              // }
              thisNode.y = thisLevel2Node.y + __per_height
              i--
              break
            }
          }
        }
      }
    }
  }
  this.layoutTimes = 0
  // var ___this = this
  this.autoLayout = function(forceLayout) {
    if (forceLayout) {
      this.layoutTimes = 0
    }
    console.log('this.layoutTimes:', this.layoutTimes)
    if (this.layoutTimes > 300) {
      setting.autoLayouting = false
      return
    }
    this.layoutTimes++
    this.allNodes.forEach(thisNode => {
      thisNode.Fx = 0
      thisNode.Fy = 0
    })
    var __by_node = true // parseInt(this.layoutTimes / 10) % 2 === 1
    var __by_line = true // parseInt(this.layoutTimes / 10) % 2 === 0
    if (__by_node) {
      for (const i in this.allNodes) {
        // 循环点，综合点与其他所有点点斥力及方向
        for (var j in this.allNodes) {
          // 循环点，计算i点与j点点斥力及方向
          if (i !== j) {
            // if (this.allNodes[i].lot.subling.level === this.allNodes[j].lot.subling.level) {
            this.addGravityByNode(this.allNodes[i], this.allNodes[j])
            // }
          }
        }
      }
    }
    if (__by_line) {
      for (const i in this.allNodes) {
        // 循环线,设置每个点承受点力及力点方向
        if (this.allNodes[i].lot.parent) {
          this.addElasticByLine(this.allNodes[i].lot.parent, this.allNodes[i])
          // break
        }
      }
    }
    // if (this.layoutTimes % 1 === 0) { // 为提高布局效率，计算五次后更新位置
    for (const i in this.allNodes) {
      this.applyToNodePosition(this.allNodes[i])
    }
    // }
    window.setTimeout(function() { this.autoLayout() }.bind(this), 30)
  }
  this.stop = function() {
    this.layoutTimes = 1000
  }
  this.addElasticByLine = function(n1, n2) {
    var length = Math.sqrt(Math.pow((n1.y - n2.y), 2) + Math.pow((n1.x - n2.x), 2))
    var Kf = length < 30 ? 0 : ((length - 30) * 0.01)
    this.addFtoNode(n1, (n1.x - n2.x) * Kf * -1, (n1.y - n2.y) * Kf * -1)
    this.addFtoNode(n2, (n2.x - n1.x) * Kf * -1, (n2.y - n1.y) * Kf * -1)
  }
  this.addGravityByNode = function(node1, node2) {
    var length = Math.sqrt(Math.pow((node1.y - node2.y), 2) + Math.pow((node1.x - node2.x), 2))
    var Kf = length > 300 ? 0 : ((300 - length) * 0.02)
    // if (length < 100)Kf = Kf * 2
    var _buff_x = node1.x - node2.x
    var _buff_y = node1.y - node2.y
    if (_buff_x === 0)_buff_x = 1
    if (_buff_y === 0)_buff_y = 1
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf)
    this.addFtoNode(node2, _buff_x * -1 * Kf, _buff_y * -1 * Kf)
  }
  this.addFtoNode = function(node, x, y) {
    node.Fx += x
    node.Fy += y
  }
  this.applyToNodePosition = function(node) {
    // if (!node.lot.childs || node.lot.childs.length === 0) {
    //   return
    // }
    if (this.rootNode === node) {
      return
    }
    // console.log('F add:', node.name, node.Fx, node.Fy)
    if (node.Fx > 1000)node.Fx = 3000
    if (node.Fy > 1000)node.Fy = 3000
    if (node.Fx < -1000)node.Fx = -3000
    if (node.Fy < -1000)node.Fy = -3000
    const __buff_x = parseInt(node.Fx * 0.02)
    const __buff_y = parseInt(node.Fy * 0.02)
    // console.log('F add:2:', node.name, __buff_x, __buff_y)
    node.x = node.x + __buff_x
    node.y = node.y + __buff_y
    // node.name = __buff_x + ',' + __buff_y
    // if (node.id === '8') {
    //   console.log(node.id, __buff_x, __buff_y)
    // // console.log(node.x, node.y)
    // }
    node.Fx = 0
    node.Fy = 0
  }
}

export default SeeksCenterLayouter
