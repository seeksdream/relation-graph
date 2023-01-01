import RGGraphMath from '../utils/RGGraphMath';
import { JUNCTION_POINT_STYLE } from '../models/RGLink';
import { devLog } from '../utils/RGCommon';
import { RelationGraphWithImage } from '../models/RelationGraphWithImage';
export class RelationGraphWithLine extends RelationGraphWithImage {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }

  createLinePath(link, ri, relationData) {
    const from = link.fromNode;
    const to = link.toNode;
    if (!ri)ri = 0;
    const __lineShape = relationData.lineShape === undefined ? this.options.defaultLineShape : relationData.lineShape;
    const __lineDirection = relationData.lineDirection === undefined ? this.options.layoutDirection : relationData.lineDirection;
    let from_x = from.x;
    let from_y = from.y;
    let to_x = to.x;
    let to_y = to.y;
    if (isNaN(from_x) || isNaN(from_y)) {
      devLog('error start node:', from);
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    if (isNaN(to_x) || isNaN(to_y)) {
      devLog('error start point:', from);
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    let f_W = from.el.offsetWidth || from.width || from.w;
    let f_H = from.el.offsetHeight || from.height || from.h;
    if (isNaN(f_W) || isNaN(f_H)) {
      // console.log('error from node size:', f_W, f_H)
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    let t_W = to.el.offsetWidth || to.width || to.w;
    let t_H = to.el.offsetHeight || to.height || to.h;
    if (isNaN(t_W) || isNaN(t_H)) {
      // console.log('error to node size:', f_W, f_H)
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    if (relationData.isReverse) {
      [from_x, from_y, to_x, to_y, f_W, f_H, t_W, t_H] = [to_x, to_y, from_x, from_y, t_W, t_H, f_W, f_H];
    }
    const __params4start = [from_x, from_y, to_x, to_y, f_W, f_H, t_W, t_H, this.options.defaultNodeShape, relationData.isReverse, link.relations.length, ri];
    const __params4end = [to_x, to_y, from_x, from_y, t_W, t_H, f_W, f_H, this.options.defaultNodeShape, !relationData.isReverse, link.relations.length, ri];
    let __start, __end;
    let _junctionPointStyle = this.options.defaultJunctionPoint;
    if (!_junctionPointStyle) {
      _junctionPointStyle = JUNCTION_POINT_STYLE.border;
    }
    if (_junctionPointStyle === JUNCTION_POINT_STYLE.border) {
      __start = RGGraphMath.getBorderPoint4MultiLine(...__params4start);
      __end = RGGraphMath.getBorderPoint4MultiLine(...__params4end);
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
      __start = RGGraphMath.getRectJoinPoint(...__params4start);
      __end = RGGraphMath.getRectJoinPoint(...__params4end);
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
      __start = RGGraphMath.getRectVJoinPoint(...__params4start);
      __end = RGGraphMath.getRectVJoinPoint(...__params4end);
    } else if (_junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
      __start = RGGraphMath.getRectHJoinPoint(...__params4start);
      __end = RGGraphMath.getRectHJoinPoint(...__params4end);
    }
    const fx = __start.x;
    const fy = __start.y;
    const tx = __end.x;
    const ty = __end.y;
    if (isNaN(fx) || isNaN(fy)) {
      console.error('error start point:', from);
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    if (isNaN(tx) || isNaN(ty)) {
      console.error('error end point:', to);
      relationData.textPositon.x = 50;
      relationData.textPositon.y = 50;
      relationData.textPositon.rotate = 0;
      return 'M 0 0 L 100 100';
    }
    let __buff_x = (__end.x - __start.x);
    let __buff_y = (__end.y - __start.y);
    let __buff_type = __end.x > __start.x ? 1 : -1;
    if (__lineDirection === 'v') {
      __buff_type = __end.y > __start.y ? 1 : -1;
    }
    let __path = '';
    if (__lineShape === 4) {
      const distanceRate = ((60 / (link.relations.length + 1)) * (ri + 1)) - 30;
      if (__lineDirection === 'v') {
        __buff_y = __buff_y - (__buff_type * 33 + distanceRate);
        relationData.textPositon.x = fx + __buff_x + 5;
        relationData.textPositon.y = fy + __buff_type * 40 + distanceRate;
        relationData.textPositon.rotate = 90;
        __path = 'M ' + fx + ' ' + fy + ' v' + (__buff_type * 33 + distanceRate) + ' h' + (__buff_x + distanceRate) + ' v' + (__buff_y);
      } else {
        if (relationData.reverseText === true) {
          relationData.textPositon.x = fx + __buff_type * 10 - (__buff_type < 0 ? 30 : 0);
          relationData.textPositon.y = fy - 5;
          __buff_x = __buff_x - (__buff_type * 120);
          __path = 'M ' + fx + ' ' + fy + ' h' + (__buff_type * 120) + ' v' + (__buff_y) + ' h' + (__buff_x);
        } else {
          relationData.textPositon.x = fx + __buff_type * 50 - (__buff_type < 0 ? 30 : 0);
          relationData.textPositon.y = fy + __buff_y - 5 + distanceRate;
          __buff_x = __buff_x - (__buff_type * 33 + distanceRate);
          __buff_y = __buff_y + (__buff_type * distanceRate);
          __path = 'M ' + fx + ' ' + fy + ' h' + (__buff_type * 33 + distanceRate) + ' v' + (__buff_y) + ' h' + (__buff_x);
        }
      }
    } else if (__lineShape === 2) {
      // var __buff_type_x = __end.x > __start.x ? 1 : -1
      const __buff_type_y = __end.y > __start.y ? 1 : -1;
      const _base = Math.abs(__buff_x) + Math.abs(__buff_y);
      relationData.textPositon.x = parseInt(__end.x - ((__buff_x) / _base * 60) - 20);
      relationData.textPositon.y = parseInt(__end.y - ((__buff_y) / _base * 60) - 20 * __buff_type_y);
      const distanceRate = ((1 / (link.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
      if (__lineDirection === 'v') {
        __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_type * 30) + ' ' + (__buff_x * distanceRate) + ',' + (__buff_type * -10) + ' ' + __buff_x + ',' + __buff_y;
      } else {
        __path = 'M' + fx + ',' + fy + ' c' + (__buff_type * 30) + ',' + (0) + ' ' + (__buff_type * -10) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y;
      }
    } else if (__lineShape === 6) {
      // const __buff_type_x = __end.x > __start.x ? 1 : -1
      const __buff_type_y = __end.y > __start.y ? 1 : -1;
      const _base = Math.abs(__buff_x) + Math.abs(__buff_y);
      relationData.textPositon.x = parseInt(__end.x - ((__buff_x) / _base * 60) - 20);
      relationData.textPositon.y = parseInt(__end.y - ((__buff_y) / _base * 60) - 20 * __buff_type_y);
      if (__lineDirection === 'v') {
        __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_y / 2) + ' ' + (__buff_x) + ',' + (__buff_y / 2) + ' ' + __buff_x + ',' + __buff_y;
      } else {
        __path = 'M' + fx + ',' + fy + ' c' + (__buff_x / 2) + ',' + (0) + ' ' + (__buff_x / 2) + ',' + (__buff_y) + ' ' + __buff_x + ',' + __buff_y;
      }
    } else if (__lineShape === 3) {
      relationData.textPositon.x = __end.x - (__buff_type * 63);
      relationData.textPositon.y = __end.y + 3;
      const distanceRate = ((1 / (link.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
      if (__lineDirection === 'v') {
        __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (__buff_y * distanceRate) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y;
      } else {
        // console.log('start:', __start, __end, __buff_x, __buff_y)
        __path = 'M' + fx + ',' + fy + ' c' + (__buff_type * 30) + ',' + (0) + ' ' + (__buff_type * -10) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y;
      }
    } else if (__lineShape === 5) {
      // relationData.text.x = __start.x + __buff_x / 2 - 33
      // relationData.text.y = __start.y + __buff_y / 2 - 3
      relationData.textPositon.x = __end.x - (__buff_type * 63);
      relationData.textPositon.y = __end.y + 3;
      const distanceRate = ((1 / (link.relations.length + 1)) * (ri + 1)) - 0.5 + 0.5;
      if (__lineDirection === 'v') {
        __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (0) + ',' + (__buff_y * distanceRate) + ' ' + __buff_x + ',' + __buff_y; // 鱼尾
      } else {
        __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * distanceRate) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y; // 鱼尾
      }
      // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (0) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
      // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (-100) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
      // __path = 'M' + fx + ',' + fy + ' c' + (30) + ',' + (0) + ' ' + (-10) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
      // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (0) + ' ' + (-50) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
      // __path = 'M' + fx + ',' + fy + ' c' + (100) + ',' + (0) + ' ' + (10) + ',' + (__buff_y * 0.5) + ' ' + __buff_x + ',' + __buff_y
      // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * 0.5) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 类似鱼尾
      // __path = 'M' + fx + ',' + fy + ' c' + (__buff_x * 0.5) + ',' + (0) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 三角
      // __path = 'M' + fx + ',' + fy + ' c' + (0) + ',' + (0) + ' ' + (__buff_x * 0.5) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y // 鱼尾
      // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (__buff_y * 0.5) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y //
      // __path = 'M' + fx + ',' + fy + ' c' + (50) + ',' + (__buff_y * 0.5) + ' ' + (0) + ',' + (0) + ' ' + __buff_x + ',' + __buff_y
    } else {
      const _angle_type = RGGraphMath.getAngleType(__buff_x, __buff_y);
      relationData.textPositon.rotate = RGGraphMath.getTextAngle(fx, fy, tx, ty);
      const _xxx = (_angle_type === 2 || _angle_type === 4) ? -1 : 1;
      const _x = (__buff_y === 0 ? -50 : Math.sin(Math.atan(__buff_x / __buff_y)) * 10 / Math.sin(90)) * _xxx;
      const _y = (__buff_x === 0 ? -50 : Math.sin(Math.atan(__buff_y / __buff_x)) * 10 / Math.sin(90));
      relationData.textPositon.x = parseInt(__start.x + __buff_x / 2 - _x);
      relationData.textPositon.y = parseInt(__start.y + __buff_y / 2 - _y);
      if (isNaN(relationData.textPositon.rotate)) {
        relationData.textPositon.rotate = 0;
        // console.log('NaN rotate:', relationData);
      }
      // this.lineProps.text = relationData.text.rotate
      __path = 'M ' + fx + ' ' + fy + ' L ' + (tx) + ' ' + (ty);
    }
    return __path;
  }
  getTextTransform(thisRelation, x, y, rotate) {
    if (!x || !y) {
      return 'translate(0,0)';
    }
    const __lineShape = thisRelation.lineShape === undefined ? this.options.defaultLineShape : thisRelation.lineShape;
    if (__lineShape === 1 || __lineShape === 4) {
      return 'translate(' + x + ',' + y + ')rotate(' + (rotate || 0) + ')';
    } else {
      return 'translate(' + x + ',' + y + ')';
    }
  }
  getArrow(thisRelation, link, isStartArrow) {
    const checked = link.seeks_id === this.options.checkedLineId;
    // console.log('xxxxxxxxxxxx')
    if (thisRelation.isHideArrow) {
      return 'none';
    } else {
      const _arrow = this.getLineArrow(thisRelation.color, isStartArrow, checked);
      return 'url(\'#' + (_arrow) + '\')';
    }
  }
}
