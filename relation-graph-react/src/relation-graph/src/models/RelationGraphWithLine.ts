import RGGraphMath from '../utils/RGGraphMath'
import { JUNCTION_POINT_STYLE } from '../models/RGLink'
import { devLog } from '../utils/RGCommon'
import { RelationGraphWithImage } from '../models/RelationGraphWithImage'
import type { RGLine, RGLink, RGListeners, RGOptions } from '../RelationGraph'
export class RelationGraphWithLine extends RelationGraphWithImage {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners)
  }
  createReturnValue(
    path: string,
    textPosition: { x: number; y: number; rotate: number }
  ) {
    return { path, textPosition }
  }
  createLinePath(
    link: RGLink,
    relationData: RGLine,
    ri: number
  ): {
    path: string
    textPosition: { x: number; y: number; rotate: number }
  } {
    const from = link.fromNode
    const to = link.toNode
    if (!ri) ri = 0
    const __lineShape =
      relationData.lineShape || this.options.defaultLineShape || 1
    const __lineDirection =
      relationData.lineDirection || this.options.layoutDirection || 'h'
    let from_x = from.x
    let from_y = from.y
    let to_x = to.x
    let to_y = to.y
    const textPosition = { x: 0, y: 0, rotate: 0 }
    if (Number.isNaN(from_x) || Number.isNaN(from_y)) {
      devLog('error start node:', from)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(to_x) || Number.isNaN(to_y)) {
      devLog('error start point:', from)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let f_W = from.el.offsetWidth || from.width || 60
    let f_H = from.el.offsetHeight || from.height || 60
    if (Number.isNaN(f_W) || Number.isNaN(f_H)) {
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let t_W = to.el.offsetWidth || to.width || 60
    let t_H = to.el.offsetHeight || to.height || 60
    if (Number.isNaN(t_W) || Number.isNaN(t_H)) {
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (relationData.isReverse) {
      ;[from_x, from_y, to_x, to_y, f_W, f_H, t_W, t_H] = [
        to_x,
        to_y,
        from_x,
        from_y,
        t_W,
        t_H,
        f_W,
        f_H,
      ]
    }
    const __params4start = [
      from_x,
      from_y,
      to_x,
      to_y,
      f_W,
      f_H,
      t_W,
      t_H,
      this.options.defaultNodeShape,
      relationData.isReverse,
      link.relations.length,
      ri,
    ]
    const __params4end = [
      to_x,
      to_y,
      from_x,
      from_y,
      t_W,
      t_H,
      f_W,
      f_H,
      this.options.defaultNodeShape,
      !relationData.isReverse,
      link.relations.length,
      ri,
    ]
    let __start, __end
    let _junctionPointStyle = this.options.defaultJunctionPoint
    if (!_junctionPointStyle) {
      _junctionPointStyle = JUNCTION_POINT_STYLE.border
    }
    if (_junctionPointStyle === JUNCTION_POINT_STYLE.border) {
      // @ts-ignore
      __start = RGGraphMath.getBorderPoint4MultiLine(...__params4start)
      // @ts-ignore
      __end = RGGraphMath.getBorderPoint4MultiLine(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
      // @ts-ignore
      __start = RGGraphMath.getRectJoinPoint(...__params4start)
      // @ts-ignore
      __end = RGGraphMath.getRectJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
      // @ts-ignore
      __start = RGGraphMath.getRectVJoinPoint(...__params4start)
      // @ts-ignore
      __end = RGGraphMath.getRectVJoinPoint(...__params4end)
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
      // @ts-ignore
      __start = RGGraphMath.getRectHJoinPoint(...__params4start)
      // @ts-ignore
      __end = RGGraphMath.getRectHJoinPoint(...__params4end)
    }
    if (!__start || !__end) {
      return this.createReturnValue(
        'Can not create start and end!',
        textPosition
      )
    }
    const fx = __start.x
    const fy = __start.y
    const tx = __end.x
    const ty = __end.y
    if (Number.isNaN(fx) || Number.isNaN(fy)) {
      console.error('error start point:', from)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    if (Number.isNaN(tx) || Number.isNaN(ty)) {
      console.error('error end point:', to)
      textPosition.x = 50
      textPosition.y = 50
      textPosition.rotate = 0
      return this.createReturnValue('M 0 0 L 100 100', textPosition)
    }
    let __buff_x = __end.x - __start.x
    let __buff_y = __end.y - __start.y
    let __buff_type = __end.x > __start.x ? 1 : -1
    if (__lineDirection === 'v') {
      __buff_type = __end.y > __start.y ? 1 : -1
    }
    let __path = ''
    if (__lineShape === 4) {
      const distanceRate = (60 / (link.relations.length + 1)) * (ri + 1) - 30
      if (__lineDirection === 'v') {
        __buff_y = __buff_y - (__buff_type * 33 + distanceRate)
        textPosition.x = fx + __buff_x + 5
        textPosition.y = fy + __buff_type * 40 + distanceRate
        textPosition.rotate = 90
        __path = `M ${fx} ${fy} v${__buff_type * 33 + distanceRate} h${
          __buff_x + distanceRate
        } v${__buff_y}`
      } else {
        if (relationData.reverseText === true) {
          textPosition.x = fx + __buff_type * 10 - (__buff_type < 0 ? 30 : 0)
          textPosition.y = fy - 5
          __buff_x = __buff_x - __buff_type * 120
          __path = `M ${fx} ${fy} h${
            __buff_type * 120
          } v${__buff_y} h${__buff_x}`
        } else {
          textPosition.x = fx + __buff_type * 50 - (__buff_type < 0 ? 30 : 0)
          textPosition.y = fy + __buff_y - 5 + distanceRate
          __buff_x = __buff_x - (__buff_type * 33 + distanceRate)
          __buff_y = __buff_y + __buff_type * distanceRate
          __path = `M ${fx} ${fy} h${
            __buff_type * 33 + distanceRate
          } v${__buff_y} h${__buff_x}`
        }
      }
    } else if (__lineShape === 2) {
      // var __buff_type_x = __end.x > __start.x ? 1 : -1
      const __buff_type_y = __end.y > __start.y ? 1 : -1
      const _base = Math.abs(__buff_x) + Math.abs(__buff_y)
      textPosition.x = Math.round(__end.x - (__buff_x / _base) * 60 - 20)
      textPosition.y = Math.round(
        __end.y - (__buff_y / _base) * 60 - 20 * __buff_type_y
      )
      const distanceRate =
        (1 / (link.relations.length + 1)) * (ri + 1) - 0.5 + 0.5
      if (__lineDirection === 'v') {
        __path = `M${fx},${fy} c${0},${__buff_type * 30} ${
          __buff_x * distanceRate
        },${__buff_type * -10} ${__buff_x},${__buff_y}`
      } else {
        __path = `M${fx},${fy} c${__buff_type * 30},${0} ${__buff_type * -10},${
          __buff_y * distanceRate
        } ${__buff_x},${__buff_y}`
      }
    } else if (__lineShape === 6) {
      // const __buff_type_x = __end.x > __start.x ? 1 : -1
      const __buff_type_y = __end.y > __start.y ? 1 : -1
      const _base = Math.abs(__buff_x) + Math.abs(__buff_y)
      textPosition.x = Math.round(__end.x - (__buff_x / _base) * 60 - 20)
      textPosition.y = Math.round(
        __end.y - (__buff_y / _base) * 60 - 20 * __buff_type_y
      )
      if (__lineDirection === 'v') {
        __path = `M${fx},${fy} c${0},${__buff_y / 2} ${__buff_x},${
          __buff_y / 2
        } ${__buff_x},${__buff_y}`
      } else {
        __path = `M${fx},${fy} c${__buff_x / 2},${0} ${
          __buff_x / 2
        },${__buff_y} ${__buff_x},${__buff_y}`
      }
    } else if (__lineShape === 3) {
      textPosition.x = __end.x - __buff_type * 63
      textPosition.y = __end.y + 3
      const distanceRate =
        (1 / (link.relations.length + 1)) * (ri + 1) - 0.5 + 0.5
      if (__lineDirection === 'v') {
        __path = `M${fx},${fy} c${0},${
          __buff_y * distanceRate
        } ${0},${0} ${__buff_x},${__buff_y}`
      } else {
        __path = `M${fx},${fy} c${__buff_type * 30},${0} ${__buff_type * -10},${
          __buff_y * distanceRate
        } ${__buff_x},${__buff_y}`
      }
    } else if (__lineShape === 5) {
      // relationData.text.x = __start.x + __buff_x / 2 - 33
      // relationData.text.y = __start.y + __buff_y / 2 - 3
      textPosition.x = __end.x - __buff_type * 63
      textPosition.y = __end.y + 3
      const distanceRate =
        (1 / (link.relations.length + 1)) * (ri + 1) - 0.5 + 0.5
      if (__lineDirection === 'v') {
        __path = `M${fx},${fy} c${0},${0} ${0},${
          __buff_y * distanceRate
        } ${__buff_x},${__buff_y}` // 鱼尾
      } else {
        __path = `M${fx},${fy} c${0},${0} ${
          __buff_x * distanceRate
        },${0} ${__buff_x},${__buff_y}` // 鱼尾
      }
    } else {
      const _angle_type = RGGraphMath.getAngleType(__buff_x, __buff_y)
      textPosition.rotate = RGGraphMath.getTextAngle(fx, fy, tx, ty)
      const _xxx = _angle_type === 2 || _angle_type === 4 ? -1 : 1
      const _x =
        (__buff_y === 0
          ? -50
          : (Math.sin(Math.atan(__buff_x / __buff_y)) * 10) / Math.sin(90)) *
        _xxx
      const _y =
        __buff_x === 0
          ? -50
          : (Math.sin(Math.atan(__buff_y / __buff_x)) * 10) / Math.sin(90)
      textPosition.x = Math.round(__start.x + __buff_x / 2 - _x)
      textPosition.y = Math.round(__start.y + __buff_y / 2 - _y)
      if (Number.isNaN(textPosition.rotate)) {
        textPosition.rotate = 0
      }
      // this.lineProps.text = relationData.text.rotate
      __path = `M ${fx} ${fy} L ${tx} ${ty}`
    }
    return this.createReturnValue(__path, textPosition)
  }
  getTextTransform(thisRelation: RGLine, x: number, y: number, rotate: number) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return 'translate(0,0)'
    }
    const __lineShape =
      thisRelation.lineShape === undefined
        ? this.options.defaultLineShape
        : thisRelation.lineShape
    if (__lineShape === 1 || __lineShape === 4) {
      return `translate(${x},${y})rotate(${rotate || 0})`
    } else {
      return `translate(${x},${y})`
    }
  }
  getArrow(thisRelation: RGLine, link: RGLink, isStartArrow = false) {
    const checked = link.seeks_id === this.options.checkedLineId
    if (thisRelation.isHideArrow) {
      return 'none'
    } else {
      const _arrow = this.getLineArrow(
        thisRelation.color,
        isStartArrow,
        checked
      )
      return `url('#${_arrow}')`
    }
  }
}
