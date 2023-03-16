import RGGraphMath from '../utils/RGGraphMath'
import { devLog } from '../utils/RGCommon'
import type {
  RGLayoutOptions,
  RGLayouter,
  RGNode,
  RGOptionsFull,
  RGTreeLayoutOptions,
} from '../RelationGraph'
import type { NodesAnalyticResult } from '../utils/RGGraphMath'

export class SeeksBidirectionalTreeLayouter implements RGLayouter {
  constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull) {
    this.layoutOptions = layoutOptions as RGTreeLayoutOptions
    this.graphOptions = graphOptions
    devLog('new SeeksBidirectionalTreeLayouter:', this.layoutOptions)
    if (!this.layoutOptions.from) this.layoutOptions.from = 'left'
    if (
      this.layoutOptions.levelDistance &&
      typeof this.layoutOptions.levelDistance === 'string'
    ) {
      this.levelDistanceArr = this.layoutOptions.levelDistance
        .split(',')
        .map((thisNum: string) => Number.parseInt(thisNum))
    }
  }
  levelDistanceArr: number[] = []
  graphOptions: RGOptionsFull
  layoutOptions: RGTreeLayoutOptions
  rootNode: RGNode | undefined = undefined
  allNodes: RGNode[] = []
  __origin_nodes: RGNode[] = []
  refresh() {
    devLog(
      'SeeksBidirectionalTreeLayouter:refresh:nodes:',
      this.__origin_nodes.length
    )
    this.placeNodes(this.__origin_nodes, this.rootNode)
  }
  analysisNodes4Didirectional(
    willLayoutNodes: RGNode[],
    thisLevelNodes: RGNode[],
    thisDeep: number,
    analyticResult: NodesAnalyticResult,
    levelDirect: 1 | 0 | -1
  ) {
    if (thisLevelNodes.length > analyticResult.max_length) {
      analyticResult.max_length = thisLevelNodes.length
    }
    if (thisDeep > analyticResult.max_deep) {
      analyticResult.max_deep = thisDeep
    }
    const __thisLOT_subling = {
      level: thisDeep,
      all_size: thisLevelNodes.length,
      all_strength: 0,
    }
    const newLevelNodes: RGNode[] = []
    thisLevelNodes.forEach((thisNode) => {
      if (!thisNode.lot) thisNode.lot = { childs: [] }
      thisNode.lot.eached = true
      thisNode.lot.subling = __thisLOT_subling
      thisNode.lot.level = thisDeep
      willLayoutNodes.push(thisNode)
    })
    let __thisLevel_index = 0
    // var __prev_node
    thisLevelNodes.forEach((thisNode) => {
      let __thisNode_child_size = 0
      if (levelDirect === -1) {
        let __thisTargetIndex = 0
        thisNode.targetFrom.forEach((thisTarget) => {
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false }
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_parent = __thisTargetIndex++
              thisNode.lot.childs.push(thisTarget)
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            } else {
              thisNode.lot.childs.push(thisTarget)
            }
          }
        })
      } else {
        let __thisTargetIndex = 0
        thisNode.targetTo.forEach((thisTarget) => {
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false }
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
              thisTarget.lot.eached = true
              thisTarget.lot.parent = thisNode
              thisTarget.lot.index_of_parent = __thisTargetIndex++
              thisNode.lot.childs.push(thisTarget)
              newLevelNodes.push(thisTarget)
              __thisNode_child_size++
            } else {
              thisNode.lot.childs.push(thisTarget)
            }
          }
        })
      }
      thisNode.lot.strength =
        __thisNode_child_size > 0 ? __thisNode_child_size : 1
      __thisLOT_subling.all_strength += thisNode.lot.strength
      thisNode.lot.strength_plus = __thisLOT_subling.all_strength
      thisNode.lot.index_of_level = __thisLevel_index
      thisNode.lot.childs_size = __thisNode_child_size
      __thisLevel_index++
    })
    if (__thisLOT_subling.all_strength > analyticResult.max_strength) {
      analyticResult.max_strength = __thisLOT_subling.all_strength
    }
    if (newLevelNodes.length > 0) {
      this.analysisNodes4Didirectional(
        willLayoutNodes,
        newLevelNodes,
        thisDeep + levelDirect,
        analyticResult,
        levelDirect
      )
    } else {
      willLayoutNodes.forEach((thisNode) => {
        if (thisNode.lot.childs_size && thisNode.lot.childs_size > 0) {
          thisNode.lot.strengthWithChilds = 0
        }
      })
      willLayoutNodes.forEach((thisNode) => {
        if (thisNode.lot.childs_size === 0) {
          thisNode.lot.strengthWithChilds = 1
          RGGraphMath.conductStrengthToParents(thisNode)
        }
      })
      RGGraphMath.analysisDataTree([willLayoutNodes[0]], 0, levelDirect)
      // willLayoutNodes.forEach(thisNode => {
      //   thisNode.text = thisNode.lot.strengthWithChilds_from + ':' + thisNode.lot.strengthWithChilds + '/' + thisNode.lot.strength
      // })
    }
  }
  placeNodes(allNodes: RGNode[], rootNode?: RGNode) {
    devLog('SeeksBidirectionalTreeLayouter:placeNodes')
    if (!rootNode) {
      console.error('root is null')
      return
    } else {
      devLog('layout by root:', rootNode)
    }
    this.__origin_nodes = allNodes
    this.rootNode = rootNode
    allNodes.forEach((thisNode) => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false
      thisNode.lot.notLeafNode = false
      thisNode.lot.childs = []
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0
      thisNode.lot.strength = 0
      thisNode.lot.strengthWithChilds_from = 0
      thisNode.lot.strengthWithChilds = 0
      thisNode.lot.placed = false
    })
    // this.rootNode.fixed = true
    this.allNodes = []
    let analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1,
    }
    this.analysisNodes4Didirectional(
      this.allNodes,
      [this.rootNode],
      0,
      analyticResult,
      -1
    )
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult)
    this.allNodes = []
    analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1,
    }
    this.analysisNodes4Didirectional(
      this.allNodes,
      [this.rootNode],
      0,
      analyticResult,
      1
    )
    this.placeNodesPosition(this.rootNode, this.allNodes, analyticResult)
  }
  placeNodesPosition(
    rootNode: RGNode,
    allNodes: RGNode[],
    analyticResult: NodesAnalyticResult
  ) {
    const __offsetX = 0
    const __offsetY = 0
    if (rootNode.fixed !== true) {
      const _center_offset_x = this.layoutOptions.centerOffset_x || 0
      const _center_offset_y = this.layoutOptions.centerOffset_y || 0
      const nodeWidth = rootNode.el.offsetWidth || rootNode.width || 60
      const nodeHeight = rootNode.el.offsetHeight || rootNode.height || 60
      rootNode.lot.x = -nodeWidth / 2 + _center_offset_x
      rootNode.lot.y = -nodeHeight / 2 + _center_offset_y
      // rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width) / 2;
      // rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height) / 2;
      if (this.layoutOptions.from === 'top') {
        rootNode.lot.y -=
          this.graphOptions.viewSize.height / 2 - nodeHeight - 100
      } else if (this.layoutOptions.from === 'bottom') {
        rootNode.lot.y +=
          this.graphOptions.viewSize.height / 2 - nodeHeight - 200
      } else if (this.layoutOptions.from === 'right') {
        rootNode.lot.x += this.graphOptions.viewSize.width / 2 - nodeWidth - 100
      } else {
        rootNode.lot.x -= this.graphOptions.viewSize.width / 2 - nodeWidth - 100
      }
      devLog('graph offset:', _center_offset_x, _center_offset_y)
      devLog('create rootNode coordinates:', rootNode.lot.x, rootNode.lot.y)
      // devLog('create rootNode coordinates:', rootNode.text, rootNode.x, rootNode.y, this.graphOptions.canvasSize.width, this.graphOptions.canvasSize.height, this.graphOptions.canvasOffset.x, this.graphOptions.canvasOffset.y);
      rootNode.x = rootNode.lot.x + __offsetX
      rootNode.y = rootNode.lot.y + __offsetY
    } else {
      devLog('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y)
      if (rootNode.origin_x === undefined) {
        rootNode.origin_x = rootNode.x
        rootNode.origin_y = rootNode.y
      }
      rootNode.lot.x = rootNode.origin_x
      rootNode.lot.y = rootNode.origin_y
      rootNode.x = rootNode.lot.x + __offsetX
      rootNode.y = rootNode.lot.y! + __offsetY
      devLog('固定位置的rootNode:', rootNode.text, rootNode.x, rootNode.y)
    }
    rootNode.lot.placed = true
    this.placeRelativePosition(rootNode, analyticResult)
    allNodes.forEach((thisNode) => {
      // if (rootNode === thisNode) {
      //   var _root_offset_x = this.layoutOptions.root_offset_x || 0
      //   thisNode.x = thisNode.x + _root_offset_x
      //   return
      // }
      if (thisNode.fixed === true) {
        thisNode.lot.placed = true
        return
      }
      if (!RGGraphMath.isAllowShowNode(thisNode)) return
      const __offsetX = thisNode.offset_x || 0
      const __offsetY = thisNode.offset_y || 0
      thisNode.x = thisNode.lot.x! + __offsetX
      thisNode.y = thisNode.lot.y! + __offsetY
      thisNode.lot.placed = true
    })
  }
  placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult) {
    const viewWidth = this.graphOptions.viewSize.width
    const viewHeight = this.graphOptions.viewSize.height
    if (
      this.layoutOptions.from === 'left' ||
      this.layoutOptions.from === 'right'
    ) {
      const __min_per_height = this.layoutOptions.min_per_height || 80
      const __max_per_height = this.layoutOptions.max_per_height || 400
      const __min_per_width = this.layoutOptions.min_per_width || 430
      const __max_per_width = this.layoutOptions.max_per_width || 650
      let __per_width = Math.round(
        (viewWidth - 10) / (analyticResult.max_deep + 2)
      )
      if (__per_width < __min_per_width) __per_width = __min_per_width
      if (__per_width > __max_per_width) __per_width = __max_per_width
      let __per_height = Math.round(
        viewHeight / (analyticResult.max_strength + 1)
      )
      if (__per_height < __min_per_height) __per_height = __min_per_height
      if (__per_height > __max_per_height) __per_height = __max_per_height
      this.allNodes.forEach((thisNode) => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.placed === true) return
        if (thisNode === rootNode) return
        if (this.layoutOptions.from === 'right') {
          thisNode.lot.x =
            rootNode.lot.x! -
            this.getLevelDistance(
              thisNode,
              thisNode.lot.subling!.level,
              __per_width
            )
        } else {
          thisNode.lot.x =
            rootNode.lot.x! +
            this.getLevelDistance(
              thisNode,
              thisNode.lot.subling!.level,
              __per_width
            )
        }
      })
      this.allNodes.forEach((thisNode) => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.level !== 0) {
          thisNode.lot.y =
            rootNode.lot.y! +
            __per_height *
              (analyticResult.max_strength / -2 +
                thisNode.lot.strengthWithChilds_from! +
                thisNode.lot.strengthWithChilds! / 2)
        }
      })
    } else {
      const __min_per_height = this.layoutOptions.min_per_height || 250
      const __max_per_height = this.layoutOptions.max_per_height || 400
      const __min_per_width = this.layoutOptions.min_per_width || 250
      const __max_per_width = this.layoutOptions.max_per_width || 500
      let __per_width = Math.round(
        (viewWidth - 10) / (analyticResult.max_strength + 2)
      )
      if (__per_width < __min_per_width) __per_width = __min_per_width
      if (__per_width > __max_per_width) __per_width = __max_per_width
      let __per_height = Math.round(
        (viewHeight - 10) / (analyticResult.max_deep + 2)
      )
      if (__per_height < __min_per_height) __per_height = __min_per_height
      if (__per_height > __max_per_height) __per_height = __max_per_height
      this.allNodes.forEach((thisNode) => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.placed === true) return
        if (thisNode === rootNode) return
        if (this.layoutOptions.from === 'bottom') {
          thisNode.lot.y =
            rootNode.lot.y! -
            this.getLevelDistance(
              thisNode,
              thisNode.lot.subling!.level,
              __per_height
            )
        } else {
          thisNode.lot.y =
            rootNode.lot.y! +
            this.getLevelDistance(
              thisNode,
              thisNode.lot.subling!.level,
              __per_height
            )
        }
      })
      this.allNodes.forEach((thisNode) => {
        if (thisNode.fixed === true) return
        if (thisNode.lot.level !== 0) {
          thisNode.lot.x =
            rootNode.lot.x! +
            __per_width *
              (analyticResult.max_strength / -2 +
                thisNode.lot.strengthWithChilds_from! +
                thisNode.lot.strengthWithChilds! / 2)
          // thisNode.lot.x = rootNode.lot.x
        }
      })
    }
  }
  getLevelDistance(node: RGNode, level: number, perSize: number) {
    const absLevel = Math.abs(level);
    if (this.levelDistanceArr && this.levelDistanceArr.length > 0) {
      let _distance = 0
      for (let i = 0; i < absLevel; i++) {
        const _thisLevelDistance = this.levelDistanceArr[i] || 100
        _distance += _thisLevelDistance
      }
      return level > 0 ? _distance : _distance * -1
    } else {
      return level * perSize
    }
  }
}

export default SeeksBidirectionalTreeLayouter
