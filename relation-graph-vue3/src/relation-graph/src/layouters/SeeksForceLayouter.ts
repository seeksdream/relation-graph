import RGGraphMath from '../utils/RGGraphMath'
import { devLog } from '../utils/RGCommon'
import type {
  RGLayoutOptions,
  RGLayouter,
  RGNode,
  RGOptionsFull,
} from '../RelationGraph'
import type { NodesAnalyticResult } from '../utils/RGGraphMath'

export class SeeksForceLayouter implements RGLayouter {
  graphOptions: RGOptionsFull
  layoutOptions: RGLayoutOptions
  rootNode: RGNode | undefined = undefined
  allNodes: RGNode[] = []
  __origin_nodes: RGNode[] = []
  constructor(layoutOptions: RGLayoutOptions, graphOptions: RGOptionsFull) {
    this.layoutOptions = layoutOptions
    this.graphOptions = graphOptions
  }
  refresh() {
    this.placeNodes(this.__origin_nodes, this.rootNode)
  }
  placeNodes(allNodes: RGNode[], rootNode?: RGNode) {
    if (!rootNode) {
      devLog('root is null:', rootNode)
      return
    }
    devLog('layout by root:', rootNode)
    this.__origin_nodes = allNodes
    this.rootNode = rootNode
    let placedCount = 0
    this.__origin_nodes.forEach((thisNode) => {
      if (thisNode.lot.placed) placedCount++
    })
    this.analysisNodes()
    if (placedCount === 0) {
      this.initNodesPosition()
    } else {
      this.__origin_nodes.forEach((thisNode) => {
        if (thisNode.fixed === true) return;
        if (!thisNode.lot.placed) {
          if (!thisNode.x) thisNode.x = Math.floor(Math.random() * 200) - 100
          if (!thisNode.x) thisNode.y = Math.floor(Math.random() * 200) - 100
          thisNode.lot.placed = true
        }
      })
    }
    devLog('Start Auto Layout.....')
    this.autoLayout(true)
  }
  analysisNodes() {
    this.__origin_nodes.forEach((thisNode) => {
      // thisNode.lot = { eached: false }
      thisNode.lot.eached = false
      thisNode.lot.notLeafNode = false
      thisNode.lot.childs = []
      // thisNode.lot.parent = undefined
      thisNode.lot.index_of_parent = 0
      thisNode.lot.strength = 0
      thisNode.lot.placed = false
    })
    this.allNodes = []
    const analyticResult = {
      max_deep: 1,
      max_length: 1,
      max_strength: 1,
    }
    RGGraphMath.analysisNodes4Didirectional(
      this.allNodes,
      [this.rootNode!],
      0,
      analyticResult,
      0
    )
  }
  initNodesPosition() {
    const rootNode = this.rootNode!
    rootNode.lot.x = -(rootNode.el.offsetWidth || rootNode.width || 60) / 2
    rootNode.lot.y = -(rootNode.el.offsetHeight || rootNode.height || 60) / 2
    devLog('root position:', rootNode.lot.x, rootNode.lot.y)
    // this.rootNode.lot.x = 0
    // this.rootNode.lot.y = 0
    // if (this.rootNode.lot.y > 400) {
    //   this.rootNode.lot.y = 400
    // }
    devLog(
      '[layout canvasOffset]',
      this.graphOptions.viewSize,
      this.graphOptions.canvasSize
    )
    this.placeRelativePosition(this.rootNode!, {
      max_deep: 1,
      max_length: 1,
      max_strength: 1,
    })
    this.allNodes.forEach((thisNode) => {
      if (thisNode.fixed === true) return
      if (!RGGraphMath.isAllowShowNode(thisNode)) return
      thisNode.x = thisNode.lot.x || 50
      thisNode.y = thisNode.lot.y || 50
      thisNode.lot.placed = true
    })
  }
  placeRelativePosition(rootNode: RGNode, analyticResult: NodesAnalyticResult) {
    let __level1_r = 80
    this.allNodes.forEach((thisNode) => {
      if (thisNode.lot.subling && thisNode.lot.subling.level === 1) {
        __level1_r = (thisNode.lot.subling.all_size * 20) / Math.PI / 2
        if (__level1_r < 80) __level1_r = 80
        // if (__level1_r > 500)__level1_r = 500
        const _point = RGGraphMath.getOvalPoint(
          rootNode.lot.x!,
          rootNode.lot.y!,
          thisNode.lot.subling.level * __level1_r,
          thisNode.lot.strength_plus! - thisNode.lot.strength! / 2,
          thisNode.lot.subling.all_strength
        )
        // const _point = RGGraphMath.getOvalPoint(this.rootNode.x, this.rootNode.y, thisNode.lot.subling.level * __level1_r, thisNode.lot.index_of_level, thisNode.lot.subling.all_size)
        thisNode.lot.x = _point.x
        thisNode.lot.y = _point.y
      }
    })
    this.allNodes.forEach((thisNode) => {
      if (thisNode.lot.subling && thisNode.lot.subling.level > 1) {
        // fix eslint error
        if (thisNode.lot.parent) {
          const __area_start =
            thisNode.lot.parent.lot.strength_plus! -
            thisNode.lot.parent.lot.strength!
          const __area_end = thisNode.lot.parent.lot.strength_plus!
          const __buff =
            ((__area_end - __area_start) /
              (thisNode.lot.parent.lot.childs_size! + 1)) *
            (thisNode.lot.index_of_parent! + 1)
          const _point = RGGraphMath.getOvalPoint(
            rootNode.lot.x!,
            rootNode.lot.y!,
            (thisNode.lot.subling.level - 1) * 80 + __level1_r,
            __area_start + __buff,
            thisNode.lot.parent.lot.subling!.all_strength
          )
          thisNode.lot.x = _point.x
          thisNode.lot.y = _point.y
        }
      }
    })
  }
  layoutTimes = 0
  maxLayoutTimes = 300
  justLayoutSingleNode = false
  byNode = true
  byLine = true
  // var ___this = this
  autoLayout(forceLayout?: boolean) {
    if (forceLayout) {
      this.layoutTimes = 0
    }
    devLog('this.layoutTimes:', this.layoutTimes)
    if (this.layoutTimes > this.maxLayoutTimes) {
      this.graphOptions.autoLayouting = false
      return
    }
    this.graphOptions.autoLayouting = true
    this.layoutTimes++
    this.__origin_nodes.forEach((thisNode) => {
      thisNode.Fx = 0
      thisNode.Fy = 0
    })
    if (this.byNode) {
      for (const i in this.__origin_nodes) {
        const __node1 = this.__origin_nodes[i]
        if (this.justLayoutSingleNode && !__node1.singleNode) {
          continue
        }
        if (__node1.fixed) {
          continue;
        }
        if (__node1.lot.placed === true) {
          // var __thisNode = this.__origin_nodes[i]
          // __thisNode.targetNodes.forEach(thisTN_level1 => {
          //   this.addGravityByNode(__thisNode, thisTN_level1)
          //   thisTN_level1.targetNodes.forEach(thisTN_level2 => {
          //     this.addGravityByNode(__thisNode, thisTN_level2)
          //   })
          // })
          // 循环点，综合点与其他所有点点斥力及方向
          for (const j in this.__origin_nodes) {
            const __node2 = this.__origin_nodes[j]
            if (__node2.lot.placed === true) {
              // 循环点，计算i点与j点点斥力及方向
              if (i !== j) {
                // if (this.allNodes[i].lot.level === this.allNodes[j].lot.level) {
                this.addGravityByNode(__node1, __node2)
                // }
              }
            }
          }
        }
      }
    }
    if (this.byLine) {
      for (const i in this.__origin_nodes) {
        if (this.__origin_nodes[i].fixed) {
          continue;
        }
        // 循环线,设置每个点承受点力及力点方向
        if (this.__origin_nodes[i].lot.parent) {
          this.addElasticByLine(
            this.__origin_nodes[i].lot.parent!,
            this.__origin_nodes[i]
          )
          // break
        }
      }
    }
    // if (this.layoutTimes % 5 === 0) { // 为提高布局效率，计算五次后更新位置
    for (const i in this.__origin_nodes) {
      this.applyToNodePosition(this.__origin_nodes[i])
    }
    // }
    // requestAnimationFrame(() => { this.autoLayout(); });
    window.setTimeout(() => {
      this.autoLayout()
    }, 30)
  }
  stop() {
    this.layoutTimes = 1000
  }
  addElasticByLine(node1: RGNode, node2: RGNode) {
    let length = Math.sqrt((node1.y - node2.y) ** 2 + (node1.x - node2.x) ** 2)
    if (length > 1000) {
      length = 1000
    }
    const Kf = length < 30 ? 0 : (length - 30) * 0.05
    const Kf_1 = Kf
    const Kf_2 = Kf
    // var Kf_1 = Kf / node1.lot.childs.length
    // var Kf_2 = Kf / node2.lot.childs.length
    const _buff_x = (node1.x - node2.x) / length
    const _buff_y = (node1.y - node2.y) / length
    this.addFtoNode(node1, _buff_x * Kf_1 * -1, _buff_y * Kf_1 * -1)
    this.addFtoNode(node2, _buff_x * Kf_2, _buff_y * Kf_2)
  }
  addGravityByNode(node1: RGNode, node2: RGNode) {
    const length = Math.sqrt(
      (node1.y - node2.y) ** 2 + (node1.x - node2.x) ** 2
    )
    const zero_length = 300
    let Kf = length > zero_length ? 0 : (zero_length - length) * 0.03
    if (zero_length < 30) {
      Kf = Kf * 100
    }
    // if (length < 100)Kf = Kf * 2
    const _buff_x = (node1.x - node2.x) / length
    const _buff_y = (node1.y - node2.y) / length
    // if (_buff_x < 30)_buff_x = 1
    // if (_buff_y < 30)_buff_y = 1
    this.addFtoNode(node1, _buff_x * Kf, _buff_y * Kf)
    this.addFtoNode(node2, _buff_x * Kf * -1, _buff_y * Kf * -1)
  }
  getNodeFWeight(node: RGNode) {
    let level = node.lot.level!
    if (level > 7) level = 7
    if (level < 0) level = 0
    return (8 - level) / 8
  }
  addFtoNode(node: RGNode, x: number, y: number) {
    if (this.justLayoutSingleNode && !node.singleNode) return
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return
    }
    x = x / (node.lot.strength || 1)
    y = y / (node.lot.strength || 1)
    if (x > 50) x = 50
    if (y > 50) y = 50
    if (x < -50) x = -50
    if (y < -50) y = -50
    node.Fx += x
    node.Fy += y
  }
  applyToNodePosition(node: RGNode) {
    if (node.fixed) return;
    const __buff_x = Math.round(node.Fx)
    const __buff_y = Math.round(node.Fy)
    node.x = node.x + __buff_x
    node.y = node.y + __buff_y
    node.Fx = 0
    node.Fy = 0
  }
}

export default SeeksForceLayouter
