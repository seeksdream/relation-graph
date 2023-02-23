import type { RGNode } from '../RelationGraph'

const STAITC_MAP_ANGLE = 0
export type SizeInfo = {
  canvas_width: number
  canvas_height: number
  node_width: number
  node_height: number
}
export type NodesAnalyticResult = {
  max_deep: number
  max_length: number
  max_strength: number
}
export const RGGraphMath = {
  getRectPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const fx = x1 + n1w / 2
    const fy = y1 + n1h / 2
    const tx = x2 + n2w / 2
    const ty = y2 + n2h / 2
    const _ar_x = fx < tx ? 1 : -1
    const _ar_y = fy < ty ? 1 : -1
    if (ty === fy) {
      return { x: fx + (_ar_x * n1w) / 2, y: fy }
    }
    const __tan = Math.abs((tx - fx) / (ty - fy))
    const rectAngle = n1w / n1h
    let __w = 0
    let __h = 0
    if (__tan < rectAngle) {
      __w = ((_ar_x * n1h) / 2) * __tan
      __h = (_ar_y * n1h) / 2
    } else {
      __w = (_ar_x * n1w) / 2
      __h = (_ar_y * n1w) / 2 / __tan
    }
    return { x: fx + __w, y: fy + __h }
  },
  getRectPointBasic(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const fx = x1 + n1w / 2
    const fy = y1 + n1h / 2
    const tx = x2 + n2w / 2
    const ty = y2 + n2h / 2
    // var x = fx - tx
    // var y = fy - ty
    // var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    // var cos = y / z
    // var radina = Math.acos(cos)// 用反三角函数求弧度
    // var angle = Math.floor(180 / (Math.PI / radina))// 将弧度转换成角度
    // n1h = n1h + 10
    // n1w = n1w + 10

    let __tanA = ty === fy ? 0 : (tx - fx) / (ty - fy)
    if (__tanA === 0) __tanA = (tx - fx) / (ty - fy + 1)
    const rectAngle = n1w / n2h
    let __w = 0
    let __h = 0
    let _case = '1'
    // var __A_angle = Math.atan(__tanA) / (Math.PI / 180)
    if (-1 * rectAngle < __tanA && __tanA < rectAngle) {
      _case = '2'
      if (fy < ty) {
        __w = (n1h / 2) * __tanA
        __h = n1h / 2
      } else {
        __w = ((-1 * n1h) / 2) * __tanA
        __h = (-1 * n1h) / 2
      }
    } else {
      if (fx < tx) {
        __w = (1 * n1w) / 2
        __h = (1 * n1w) / 2 / __tanA
      } else {
        __w = (-1 * n1w) / 2
        __h = (-1 * n1w) / 2 / __tanA
      }
      _case = '3'
    }
    // var __w = (n1h / 2) * Math.tan(__A_angle)
    // var __w = ty === fy ? parseInt(n1w / 2) : parseInt(((n1h / 2) * (tx - fx)) / (ty - fy))
    // var __h = tx === fx ? parseInt(n1h / 2) : parseInt((__w * (ty - fy)) / (tx - fx))
    return { x: fx + __w, y: fy + __h, _case }
  },
  getRectJoinPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const _from_c_x = x1 + n1w / 2
    const _from_c_y = y1 + n1h / 2
    const _to_c_x = x2 + n2w / 2
    const _to_c_y = y2 + n2h / 2
    const _atan2 =
      Math.round(
        (Math.atan2(_to_c_y - _from_c_y, _to_c_x - _from_c_x) * 180) / 3.14
      ) + 135
    if (_atan2 >= 0 && _atan2 < 90) {
      // top
      return { x: x1 + n1w / 2, y: y1 - 5 }
    } else if (_atan2 >= 90 && _atan2 < 180) {
      // right
      return { x: x1 + n1w + 5, y: y1 + n1h / 2 }
    } else if (_atan2 >= 180 && _atan2 < 270) {
      // bottom
      return { x: x1 + n1w / 2, y: y1 + n1h + 5 }
    } else {
      // left
      return { x: x1 - 5, y: y1 + n1h / 2 }
    }
  },
  getRectHJoinPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number
  ) {
    const _hH = n1h / 2
    // var _hW = n1w / 2
    if (x1 + n1w < x2) {
      return { x: x1 + n1w + 5, y: y1 + _hH }
    } else if (x1 + n1w < x2 + n2w) {
      return { x: x1 - 5, y: y1 + _hH }
    } else {
      return { x: x1 - 5, y: y1 + _hH }
    }
  },
  getRectVJoinPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const _hW = n1w / 2
    // var _hW = n1w / 2
    if (y1 + n1h < y2) {
      return { y: y1 + n1h + 5, x: x1 + _hW }
    } else if (y1 + n1h < y2 + n2h) {
      return { y: y1 - 5, x: x1 + _hW }
    } else {
      return { y: y1 - 5, x: x1 + _hW }
    }
  },
  getBorderPoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number,
    n1style: 0 | 1
  ) {
    if (n1style === 0) {
      return this.getCirclePoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h)
    } else {
      return this.getRectPoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h)
    }
  },
  getBorderPoint4MultiLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number,
    n1style: 0 | 1,
    isReserve: boolean,
    allSize: number,
    indexOfAll: number
  ) {
    if (n1style === 0) {
      return this.getCirclePoint4MultiLine(
        x1,
        y1,
        x2,
        y2,
        n1w,
        n1h,
        n2w,
        n2h,
        isReserve,
        allSize,
        indexOfAll
      )
    } else {
      return this.getRectPoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h)
    }
  },
  getCirclePoint(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const fx = x2 + n2w / 2
    const fy = y2 + n2h / 2
    const tx = x1 + n1w / 2
    const ty = y1 + n1h / 2
    const buff_h = fx - tx
    if (buff_h === 0) {
      return { x: tx, y: ty - (n1h / 2) * (fy < ty ? 1 : -1) }
    }
    const buff_v = fy - ty
    const k = buff_v / buff_h
    // var m = ty - tx * k
    const __x =
      Math.sqrt(1 / (1 / (n1w / 2) ** 2 + k ** 2 / (n1h / 2) ** 2)) *
      (fx < tx ? 1 : -1)
    const __y = k * __x
    // this.c = Math.sqrt(this.h * this.h + this.s * this.s)
    // // this.l = this.c - radius
    // this.v = (this.c - n1w / 2) * this.h / this.c * -1
    // this.t = (this.c - n1h / 2) * this.s / this.c * -1
    // alert(this.h+","+this.s+","+this.c+","+this.l+","+this.v+","+this.t);
    return { x: tx - __x, y: ty - __y }
  },
  getCirclePoint4MultiLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number,
    isReserve: boolean,
    allSize: number,
    indexOfAll: number
  ) {
    if (isReserve) {
      indexOfAll = allSize - indexOfAll - 1
    }
    const to_x = x2 + n2w / 2
    const to_y = y2 + n2h / 2
    const from_x = x1 + n1w / 2
    const from_y = y1 + n1h / 2
    const buff_h = to_x - from_x
    if (buff_h === 0) {
      return { x: from_x, y: from_y - (n1h / 2) * (to_y < from_y ? 1 : -1) }
    }
    const distance = (40 / (allSize + 1)) * (indexOfAll + 1) - 20
    const buff_v = to_y - from_y
    const b = (Math.sqrt(buff_h ** 2 + buff_v ** 2) * distance) / buff_h
    const k = buff_v / buff_h
    const m = n1w / 2
    const n = n1h / 2
    const __wow = to_x < from_x ? 1 : -1
    const __x =
      (-1 * m ** 2 * k * b +
        (m * n * Math.sqrt(n ** 2 + k ** 2 * m ** 2 - b ** 2)) / __wow) /
      (n ** 2 + m ** 2 * k ** 2)
    const __y = k * __x + b
    return { x: from_x - __x, y: from_y - __y }
  },
  getCirclePointBasic(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number,
    radius: number
  ) {
    const fx = x1 + n1w / 2
    const fy = y1 + n1h / 2
    const tx = x2 + n2w / 2
    const ty = y2 + n2h / 2
    const h = tx - fx
    const s = ty - fy
    const c = Math.sqrt(h * h + s * s)
    const l = c - radius
    const v = ((l * h) / c) * -1
    const t = ((l * s) / c) * -1
    // alert(this.h+","+this.s+","+this.c+","+this.l+","+this.v+","+this.t);
    return { x: tx + v, y: ty + t }
  },
  getCirclePointPlus(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    n1w: number,
    n1h: number,
    n2w: number,
    n2h: number
  ) {
    const fx = x1 + n1w / 2
    const fy = y1 + n1h / 2
    const tx = x2 + n2w / 2
    const ty = y2 + n2h / 2
    const h = tx - fx
    const s = ty - fy
    const c = Math.sqrt(h * h + s * s)
    // this.l = this.c - radius
    const v = (((c - n1w / 2) * h) / c) * -1
    const t = (((c - n1h / 2) * s) / c) * -1
    return { x: tx + v, y: ty + t }
  },
  getOvalPoint(
    c_x: number,
    c_y: number,
    c_r: number,
    c_i: number,
    c_n: number
  ) {
    return {
      x:
        c_x +
        c_r *
          Math.sin(
            ((STAITC_MAP_ANGLE + c_i * (360 / c_n) + 0) * Math.PI) / 180
          ),
      y:
        c_y +
        c_r *
          Math.cos(
            ((STAITC_MAP_ANGLE + c_i * (360 / c_n) + 0) * Math.PI) / 180
          ) *
          -1,
    }
  },
  getAngleType(buffer_x: number, buffer_y: number) {
    if (buffer_x >= 0 && buffer_y >= 0) {
      // 第一象限
      return 1
    } else if (buffer_x < 0 && buffer_y >= 0) {
      // 第二象限
      return 2
    } else if (buffer_x < 0 && buffer_y < 0) {
      // 第三象限
      return 3
    } else if (buffer_x >= 0 && buffer_y < 0) {
      // 第三象限
      return 4
    }
  },
  getTextAngle(fx: number, fy: number, tx: number, ty: number) {
    // 除数不能为0
    let tan = (Math.atan(Math.abs((ty - fy) / (tx - fx))) * 180) / Math.PI

    // return tan
    if (tx > fx && ty > fy) {
      // 第一象限
    } else if (tx > fx && ty < fy) {
      // 第二象限
      tan = -tan
    } else if (tx < fx && ty > fy) {
      // 第三象限
      tan = 180 - tan
    } else {
      tan = tan - 180
    }
    if (Math.abs(tan) > 90) {
      tan = tan + 180
    }
    // if (tan > 90 && tan < 270) {
    //   tan = 0
    // }
    return Math.round(tan)
  },
  getTreePointFromTop(
    c_x: number,
    c_y: number,
    c_height: number,
    c_i: number,
    c_n: number,
    sizehelper: SizeInfo
  ) {
    if (!c_x) {
      // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2 - 200,
      }
    }
    const sssss = {
      x: c_x - 300 + Math.max(600 / ((c_n === 1 ? 2 : c_n) - 1), 80) * c_i,
      y: c_y + c_height,
    }
    return sssss
  },
  getTreePointFromRight(
    c_x: number,
    c_y: number,
    c_height: number,
    c_i: number,
    c_n: number,
    sizehelper: SizeInfo
  ) {
    if (!c_x) {
      // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2 + 300,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2,
      }
    }
    return {
      x: c_x - c_height,
      y: c_y - 200 + Math.max(400 / ((c_n === 1 ? 2 : c_n) - 1), 80) * c_i,
    }
  },
  getTreePointFromBottom(
    c_x: number,
    c_y: number,
    c_height: number,
    c_i: number,
    c_n: number,
    sizehelper: SizeInfo
  ) {
    if (!c_x) {
      // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2 + 200,
      }
    }
    return {
      x: c_x - 300 + Math.max(600 / ((c_n === 1 ? 2 : c_n) - 1), 80) * c_i,
      y: c_y - c_height,
    }
  },
  getTreePointFromLeft(
    c_x: number,
    c_y: number,
    c_height: number,
    c_i: number,
    c_n: number,
    sizehelper: SizeInfo
  ) {
    if (!c_x) {
      // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2 - 300,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2,
      }
    }
    return {
      x: c_x + c_height,
      y: c_y - 200 + Math.max(400 / ((c_n === 1 ? 2 : c_n) - 1), 80) * c_i,
    }
  },
  analysisNodes(
    willLayoutNodes: RGNode[],
    thisLevelNodes: RGNode[],
    thisDeep: number,
    analyticResult: NodesAnalyticResult
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
      if (thisNode.targetNodes) {
        let __thisTargetIndex = 0
        thisNode.targetNodes.forEach((thisTarget) => {
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false }
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
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
      this.analysisNodes(
        willLayoutNodes,
        newLevelNodes,
        thisDeep + 1,
        analyticResult
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
          this.conductStrengthToParents(thisNode)
        }
      })
      this.analysisDataTree([willLayoutNodes[0]], 0)
      // willLayoutNodes.forEach(thisNode => {
      //   thisNode.text = thisNode.lot.strengthWithChilds_from + ':' + thisNode.lot.strengthWithChilds + '/' + thisNode.lot.strength
      // })
    }
  },
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
      if (levelDirect === 0) {
        let __thisTargetIndex = 0
        thisNode.targetNodes.forEach((thisTarget) => {
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false }
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
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
            }
          }
        })
      } else if (levelDirect === -1) {
        let __thisTargetIndex = 0
        thisNode.targetFrom.forEach((thisTarget) => {
          if (!thisTarget.lot) thisTarget.lot = { childs: [], eached: false }
          if (!thisTarget.lot.eached) {
            if (RGGraphMath.isAllowShowNode(thisTarget)) {
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
              // thisTarget.lot.prevNode = __prev_node
              // if (__prev_node)__prev_node.lot.nextNode = thisTarget
              // __prev_node = thisTarget
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
      RGGraphMath.analysisNodes4Didirectional(
        willLayoutNodes,
        newLevelNodes,
        thisDeep + (levelDirect === -1 ? -1 : 1),
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
  },
  conductStrengthToParents(node: RGNode) {
    if (node.lot.parent) {
      if (node.lot.parent.lot.strengthWithChilds === undefined) {
        node.lot.parent.lot.strengthWithChilds = 0
      }
      node.lot.parent.lot.strengthWithChilds += 1
      this.conductStrengthToParents(node.lot.parent)
    }
  },
  analysisDataTree(
    thisLevelNodes: RGNode[],
    thisDeep: number,
    levelDirect?: 1 | 0 | -1
  ) {
    if (levelDirect === undefined) levelDirect = 1
    const newLevelNodes: RGNode[] = []
    let currentLevelStrengthWidthChilds = 0
    thisLevelNodes.forEach((thisNode) => {
      if (
        thisNode.lot.level === 0 ||
        levelDirect === (thisNode.lot.level && thisNode.lot.level < 0 ? -1 : 1)
      ) {
        if (thisNode.lot.childs_size && thisNode.lot.childs_size > 0) {
          thisNode.lot.childs.forEach((thisTarget) => {
            newLevelNodes.push(thisTarget)
          })
        }
        if (
          thisNode.lot.parent &&
          thisNode.lot.parent.lot.strengthWithChilds_from &&
          currentLevelStrengthWidthChilds <
            thisNode.lot.parent.lot.strengthWithChilds_from
        ) {
          currentLevelStrengthWidthChilds =
            thisNode.lot.parent.lot.strengthWithChilds_from
        }
        thisNode.lot.strengthWithChilds_from = currentLevelStrengthWidthChilds
        currentLevelStrengthWidthChilds += thisNode.lot.strengthWithChilds || 0
      }
    })
    if (newLevelNodes.length > 0) {
      this.analysisDataTree(newLevelNodes, thisDeep + levelDirect, levelDirect)
    }
  },
  isAllowShowNode(thisNode: RGNode, deep = 0): boolean {
    // if (deep > 3) return true
    const _r =
      thisNode.isShow !== false &&
      thisNode.isHide !== true &&
      (!thisNode.lot.parent ||
        this.isAllowShowNode(thisNode.lot.parent, deep + 1) === true)
    return _r
  },
}
export const getNodeDistance = (
  fx: number,
  fy: number,
  tx: number,
  ty: number
) => {
  const buff_x = fx - tx
  const buff_y = fy - ty
  const bSquare = buff_x ** 2
  const pSquare = buff_y ** 2
  const sum = bSquare + pSquare
  const hypotenuse = Math.sqrt(sum)
  return hypotenuse
}
export default RGGraphMath
