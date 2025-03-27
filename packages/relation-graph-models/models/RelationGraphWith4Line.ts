import RGGraphMath from '../utils/RGGraphMath';
import { devLog } from '../utils/RGCommon';
import { JUNCTION_POINT_STYLE } from './RGLink';
import { RelationGraphWith3Image } from './RelationGraphWith3Image';
import {
  RGElementLine,
  RGJunctionPoint,
  RGLine, RGLineTextPosition,
  RGLink,
  RGListeners,
  RGNode,
  RGOptions,
  RGPosition
} from '../types';
import RGNodesAnalytic from '../utils/RGNodesAnalytic';
import {createLine44PathData} from "../utils/RGLinePath44Generater";
export type CreateJunctionPointParams = [
  from_x: number,
  from_y: number,
  to_x: number,
  to_y: number,
  f_W: number,
  f_H: number,
  t_W: number,
  t_H: number,
  nodeShape: number,
  isReverse: boolean,
  allLineSize: number,
  ri: number,
  lineDistance: number
];
export class RelationGraphWith4Line extends RelationGraphWith3Image {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }

  createReturnValue(path:string, textPosition:RGLineTextPosition) {
    return { path, textPosition };
  }
  createLinePath(link: RGLink | RGElementLine, relationData:RGLine, ri:number, returnPathOnly = true) {
    // if (link && link?.relationData) {
    //   console.log('createLinePath:', relationData.id);
    //   const elementLine = link as RGElementLine;
    //   return this.createLinePathByTwoNode(elementLine.fromEl, elementLine.toEl, elementLine.relationData)
    // }
    let from:any = link.fromNode;
    if (!from) {
      from = {
        x: 0,
        y: 0,
        el: {
          offsetWidth: 10,
          offsetHeight: 10
        }
      };
    }
    const to = link.toNode;
    const allLineSize = link.relations.length;
    if (!ri) ri = 0;
    return this.createLinePathByTwoNode(from, to, relationData, ri, allLineSize, returnPathOnly);
  }
  private _getJunctionPoint(junctionPointStyle: RGJunctionPoint, createJunctionPointParams: CreateJunctionPointParams) {
    if (junctionPointStyle === JUNCTION_POINT_STYLE.border) {
      return RGGraphMath.getBorderPoint4MultiLine(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.ltrb) {
      return RGGraphMath.getRectJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.tb) {
      return RGGraphMath.getRectVJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.lr) {
      return RGGraphMath.getRectHJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.left) {
      return RGGraphMath.getRectLeftJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.right) {
      return RGGraphMath.getRectRightJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.top) {
      return RGGraphMath.getRectTopJoinPoint(...createJunctionPointParams);
    } else if (junctionPointStyle === JUNCTION_POINT_STYLE.bottom) {
      return RGGraphMath.getRectBottomJoinPoint(...createJunctionPointParams, this.options.defaultBottomJuctionPoint_X);
    } else {
      return RGGraphMath.getBorderPoint4MultiLine(...createJunctionPointParams);
    }
  }
  createLinePathByTwoNode(_from: RGNode, _to: RGNode, relationData:RGLine, ri = 0, allLineSize = 1, returnPathOnly = true) {
    let __lineShape =
      relationData.lineShape || this.options.defaultLineShape || 1;
    const __lineDirection =
      relationData.lineDirection || this.options.layoutDirection || 'h';
    const from = _from;
    const to = _to;
    const from_x = from.x;
    const from_y = from.y;
    const to_x = to.x;
    const to_y = to.y;
    const textPosition: RGLineTextPosition = { x: 0, y: 0, rotate: 0 };
    if (Number.isNaN(from_x) || Number.isNaN(from_y)) {
      devLog('error start node:', from.text, from.x, from.y);
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L -10 -10', textPosition);
    }
    if (Number.isNaN(to_x) || Number.isNaN(to_y)) {
      devLog('error end point:', to.text, to.x, to.y);
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L 10 -10', textPosition);
    }
    const f_W = from.el.offsetWidth || from.width || 60;
    const f_H = from.el.offsetHeight || from.height || 60;
    if (Number.isNaN(f_W) || Number.isNaN(f_H)) {
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L -10 10', textPosition);
    }
    const t_W = to.el.offsetWidth || to.width || 60;
    const t_H = to.el.offsetHeight || to.height || 60;
    if (Number.isNaN(t_W) || Number.isNaN(t_H)) {
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L 10 10', textPosition);
    }
    const viewFromNode = relationData.isReverse ? to : from;
    const viewToNode = relationData.isReverse ? from : to;
    const fromNodeShape = viewFromNode.nodeShape !== undefined && viewFromNode.nodeShape !== null ? viewFromNode.nodeShape : this.options.defaultNodeShape;
    const __params4start: CreateJunctionPointParams = <[from_x: number, from_y: number, to_x: number, to_y: number, f_W: number, f_H: number, t_W: number, t_H: number, nodeShape: number, isReverse: boolean, allLineSize: number, ri: number, lineDistance: number]>[
      from_x,
      from_y,
      to_x,
      to_y,
      f_W,
      f_H,
      t_W,
      t_H,
      fromNodeShape, // TODO from.nodeShape || this.options.defaultNodeShape,
      false,
      allLineSize,
      ri,
      this.options.multiLineDistance || 14
    ];
    const toNodeShape = viewToNode.nodeShape !== undefined && viewToNode.nodeShape !== null ? viewToNode.nodeShape : this.options.defaultNodeShape;
    const __params4end: CreateJunctionPointParams = <[from_x: number, from_y: number, to_x: number, to_y: number, f_W: number, f_H: number, t_W: number, t_H: number, nodeShape: number, isReverse: boolean, allLineSize: number, ri: number, lineDistance: number]>[
      to_x,
      to_y,
      from_x,
      from_y,
      t_W,
      t_H,
      f_W,
      f_H,
      toNodeShape, // TODO to.nodeShape || this.options.defaultNodeShape,
      false,
      allLineSize,
      (allLineSize - ri - 1),
      this.options.multiLineDistance || 14
    ];
    const defaultJunctionPointStyle: RGJunctionPoint = (this.options.defaultJunctionPoint || JUNCTION_POINT_STYLE.border) as RGJunctionPoint;

    let fromJunctionPoint: RGJunctionPoint = relationData.fromJunctionPoint || viewFromNode.junctionPoint || defaultJunctionPointStyle;
    let toJunctionPoint: RGJunctionPoint = relationData.toJunctionPoint || viewToNode.junctionPoint || defaultJunctionPointStyle;
    let fromJuctionPointOffsetX = relationData.fromJuctionPointOffsetX || 0;
    let fromJuctionPointOffsetY = relationData.fromJuctionPointOffsetY || 0;
    let toJuctionPointOffsetX = relationData.toJuctionPointOffsetX || 0;
    let toJuctionPointOffsetY = relationData.toJuctionPointOffsetY || 0;
    if (relationData.isReverse) {
      [fromJunctionPoint, toJunctionPoint] = [toJunctionPoint, fromJunctionPoint];
      [fromJuctionPointOffsetX, fromJuctionPointOffsetY] = [fromJuctionPointOffsetY, fromJuctionPointOffsetX];
      [toJuctionPointOffsetX, toJuctionPointOffsetY] = [toJuctionPointOffsetY, toJuctionPointOffsetX];
    }
    if (_from === _to) {
      if (fromJuctionPointOffsetX === 0 && fromJuctionPointOffsetY === 0 && toJuctionPointOffsetX === 0 && toJuctionPointOffsetY === 0) {
        if (__lineShape === 1 || __lineShape === 2 || __lineShape === 3 || __lineShape === 4 || __lineShape === 5 || __lineShape === 41) {
          __lineShape = 6;
        }
        // __lineShape = 41;
        // toJuctionPointOffsetX = 20;
        toJuctionPointOffsetY = 20;
        console.log('xxxxxxxxxxxxxxx');
      }
    }
    const __start = this._getJunctionPoint(fromJunctionPoint, __params4start);
    __start.x += fromJuctionPointOffsetX;
    __start.y += fromJuctionPointOffsetY;
    const __end = this._getJunctionPoint(toJunctionPoint, __params4end);
    __end.x += toJuctionPointOffsetX;
    __end.y += toJuctionPointOffsetY;
    if (!__start || !__end) {
      return this.createReturnValue(
        'Unable to calculate the starting point and ending point of the line.',
        textPosition
      );
    }
    const fx = __start.x;
    const fy = __start.y;
    const tx = __end.x;
    const ty = __end.y;
    // if (from === to) {
    //   return this.createSameVertexLine(fx, fy, from_x, from_y, f_W, f_H);
    // }
    if (Number.isNaN(fx) || Number.isNaN(fy)) {
      devLog('error start point:', from.text);
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L -10 0', textPosition);
    }
    if (Number.isNaN(tx) || Number.isNaN(ty)) {
      devLog('error end point:', to.text);
      textPosition.x = 50;
      textPosition.y = 50;
      textPosition.rotate = 0;
      return this.createReturnValue('M 0 0 L 10 0', textPosition);
    }

    const from_ct_x = from_x + f_W / 2;
    const from_ct_y = from_y + f_H / 2;
    const to_ct_x = to_x + t_W / 2;
    const to_ct_y = to_y + t_H / 2;
    const path = this.createLinePathData(
      relationData,
      textPosition,
      allLineSize,
      ri,
      __lineDirection,
      __lineShape,
      fx, fy, from_ct_x, from_ct_y, f_W, f_H,
      tx, ty, to_ct_x, to_ct_y, t_W, t_H,
      returnPathOnly
    );
    return this.createReturnValue(path, textPosition);
  }

  createLinePathData(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true): string {
    if (lineShape === 4) {
      return this.createLineFor4(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else if (lineShape === 41) {
      return this.createLineFor41(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else if (lineShape === 44) {
      return this.createLineFor44(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else if (lineShape === 49) {
      return this.createLineFor49(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else if (lineShape === 6) {
      return this.createLineForCurve6(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else if (lineShape === 2 || lineShape === 3 || lineShape === 5 || lineShape === 6 || lineShape === 7 || lineShape === 8) {
      return this.createLineForCurve(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    } else {
      return this.createLineFor1(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H, returnPathOnly);
    }
  }
  calcCurveCenter(P0: RGPosition, P1: RGPosition, P2: RGPosition, P3: RGPosition, t = 0.5) {
    // 计算中间位置的坐标
    // 第一级插值
    const A = { x: (1 - t) * P0.x + t * P1.x, y: (1 - t) * P0.y + t * P1.y };
    const B = { x: (1 - t) * P1.x + t * P2.x, y: (1 - t) * P1.y + t * P2.y };
    const C = { x: (1 - t) * P2.x + t * P3.x, y: (1 - t) * P2.y + t * P3.y };

    // 第二级插值
    const D = { x: (1 - t) * A.x + t * B.x, y: (1 - t) * A.y + t * B.y };
    const E = { x: (1 - t) * B.x + t * C.x, y: (1 - t) * B.y + t * C.y };

    // 第三级插值，即最终点
    return { x: (1 - t) * D.x + t * E.x, y: (1 - t) * D.y + t * E.y };
    // // 计算各个点相对起点的x,y值
    // const sx = start.x;
    // const sy = start.y;
    //
    // const cx1 = ctrl1.x - sx;
    // const cy1 = ctrl1.y - sy;
    //
    // const cx2 = ctrl2.x - sx;
    // const cy2 = ctrl2.y - sy;
    //
    // const ex = end.x - sx;
    // const ey = end.y - sy;
    //
    // // 使用贝塞尔曲线公式计算中心点坐标
    // const ax = (cx1 + 2*cx2 + cx1)/4;
    // const ay = (cy1 + 2*cy2 + cy1)/4;
    //
    // const center = {
    //   x: sx + ax,
    //   y: sy + ay
    // };

    // return center;
  }
  createCheckedLinePath() {
    const checkedLineId = this.options.checkedLineId;
    if (!checkedLineId) {
      return;
    }
    // const checkedLinkId = this.options.checkedLinkId;
    // if (!checkedLinkId) return null;
    try {
      const elementLine = this.getElementLineById(this.options.checkedLinkId as string);
      if (elementLine) {
        const { path } = this.createLinePath(
          elementLine,
          elementLine.relations[0],
          0
        );
        return path;
      }
      const link: RGLink = this.getLinkByLineId(checkedLineId);
      if (!link) {
        devLog('Can not find link by checkedLineId:', checkedLineId);
        return;
      }
      if (!RGNodesAnalytic.isAllowShowNode(link.fromNode)) {
        devLog('from hide:', checkedLineId);
        return;
      }
      if (!RGNodesAnalytic.isAllowShowNode(link.toNode)) {
        devLog('to hide:', checkedLineId);
        return;
      }
      const lineIndex: number = link.relations.findIndex(l => l.id === checkedLineId);
      if (lineIndex === -1) {
        devLog('Can not find checkedLineId:', checkedLineId);
        return;
      }
      const line: RGLine = link.relations[lineIndex];
      const { path } = this.createLinePath(
        link,
        line,
        lineIndex
      );
      return path;
    } catch (e) {
      devLog(e);
    }
  }
  createCheckedLineStrokeWidth() {
    const checkedLineId = this.options.checkedLineId;
    if (!checkedLineId) {
      return this.options.defaultLineWidth + 8;
    }
    try {
      const link: RGLink = this.getLinkByLineId(checkedLineId);
      if (!link) {
        return this.options.defaultLineWidth + 8;
      }
      const lineIndex: number = link.relations.findIndex(l => l.id === checkedLineId);
      if (lineIndex === -1) {
        return this.options.defaultLineWidth + 8;
      }
      const line: RGLine = link.relations[lineIndex];
      if (line.lineWidth) {
        return line.lineWidth + 8;
      }
      return this.options.defaultLineWidth + 8;
    } catch (e) {
      devLog(e);
    }
  }
  getTextTransform(thisRelation:RGLine, x:number, y:number, rotate:number) {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return 'translate(0,0)';
    }
    const __lineShape =
      thisRelation.lineShape === undefined
        ? this.options.defaultLineShape
        : thisRelation.lineShape;
    if (__lineShape === 1 || __lineShape === 4) {
      return `translate(${x},${y})rotate(${rotate || 0})`;
    } else {
      return `translate(${x},${y})`;
    }
  }
  getArrow(thisRelation:RGLine, link: RGLink | RGElementLine, isStartArrow = false) {
    let startArrowVisiale = thisRelation.showStartArrow === true;
    let endArrowVisiale = thisRelation.showEndArrow !== false;
    if (thisRelation.isReverse) {
      [startArrowVisiale, endArrowVisiale] = [endArrowVisiale, startArrowVisiale];
    }
    if (isStartArrow) {
      if (!startArrowVisiale) return undefined;
      if (thisRelation.startMarkerId) {
        return `url('#${thisRelation.startMarkerId}')`;
      }
    } else {
      if (!endArrowVisiale) return undefined;
      if (thisRelation.endMarkerId) {
        return `url('#${thisRelation.endMarkerId}')`;
      }
    }
    const checked = false; // link.seeks_id === this.options.checkedLineId;
    if (thisRelation.isHideArrow) {
      return 'none';
    } else {
      const _arrow = this.getLineArrow(
        thisRelation.color,
        isStartArrow,
        checked
      );
      return `url('#${_arrow}')`;
    }
  }
  getLineTextStyle(link: RGLink, relation: RGLine, relationIndex: number) {
    // console.log('lineData:', relation.id, relationIndex);
    let text = relation.text;
    if (!text) {
      return null;
    }
    let textRotate = 0;
    const fx = link.fromNode.x;
    const tx = link.toNode.x;
    if (text.length > this.options.lineTextMaxLength!) {
      text = text.substring(0, (this.options.lineTextMaxLength || 15)) + '...';
    }
    const useTextPath = relation.useTextPath !== undefined ? relation.useTextPath : this.options.lineUseTextPath;
    if (useTextPath && fx > tx) {
      textRotate = 180;
      text = text.split('').reverse().join('');
    }
    const x = relation.textOffset_x || this.options.defaultLineTextOffset_x || 0;
    const y = relation.textOffset_y || this.options.defaultLineTextOffset_y || -8;
    const textOffset = `translate(${x},${y})`;
    // const textOffset = `translate(${x},${y})rotate(${textRotate || 0})`
    let textAnchor = 'middle';
    const lineShape = relation.lineShape || this.options.defaultLineShape || 1;
    let textHPosition =  '50%';
    if (lineShape === 4) {
      if (relation.placeText === 'start') {
        textHPosition = '10%';
        textAnchor = 'start';
      } else if (relation.placeText === 'end') {
        textHPosition = '90%';
        textAnchor = 'end';
      } else if (relation.placeText) { // end
        textHPosition = relation.placeText;
        textAnchor = 'start';
      } else {
        if (this.options.layoutDirection === 'v') {
          const fx = link.fromNode.x;
          const tx = link.toNode.x;
          textHPosition = String(Math.abs(tx - fx) + 43);
        } else {
          const fy = link.fromNode.y;
          const ty = link.toNode.y;
          textHPosition = String(Math.abs(ty - fy) + 43);
        }
      }
    } else if (lineShape === 41) {
      textAnchor = 'start';
    } else {
      // relation.placeText = 'end'
      if (relation.placeText === 'start') {
        textHPosition = '10%';
        textAnchor = 'start';
      } else if (relation.placeText === 'end') {
        textHPosition = '90%';
        textAnchor = 'end';
      } else if (relation.placeText) { // end
        textHPosition = relation.placeText;
        textAnchor = 'start';
      } else {
        textHPosition = '50%';
        textAnchor = 'middle';
      }
    }
    if (relation.textAnchor) {
      textAnchor = relation.textAnchor;
    }
    return {
      text,
      textOffset,
      textAnchor,
      textHPosition,
      textRotate
    };
  }
  protected createLineFor4(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    const __buff_x = tx - fx;
    const __buff_y = ty - fy;
    const startDirection_x = fx - fcx;
    const startDirection_y = fy - fcy;
    const endDirection_x = tx - tcx;
    const endDirection_y = ty - tcy;
    const radius = relation.polyLineRadius || this.options.defaultPolyLineRadius || 0;
    const radiusX = Math.min(radius, Math.abs(__buff_x)) * (fx < tx ? 1 : -1);
    const radiusY = Math.min(radius, Math.abs(__buff_y)) * (fy < ty ? 1 : -1);
    const startDirection = relation.lineDirection || Math.abs(startDirection_x) >= f_W / 2 ? 'h' : 'v';
    const endDirection = relation.lineDirection || Math.abs(endDirection_x) >= t_W / 2 ? 'h' : 'v';
    const p = [];
    if (startDirection === 'v') {
      const force = relation.polyLineStartDistance || Math.max(Math.min(30, Math.abs(ty - fy) / 2), 15);
      const startMoveY = (startDirection_y > 0 ? force : -force);
      if (relation.placeText === 'start') {
        textPosition.x = fx;
        textPosition.y = fy + startMoveY - (startDirection_y > 0 ? 20 : -5);
      } else if (relation.placeText === 'middle') {
        textPosition.x = fx + (tx - fx) / 2;
        textPosition.y = fy + startMoveY;
      } else { // end
        textPosition.x = tx;
        textPosition.y = fy + startMoveY + (startDirection_y > 0 ? 20 : -5);
      }
      p.push(`M ${Math.round(fx)} ${Math.round(fy)}`);
      p.push(`v ${Math.round(startMoveY - radiusY) }`);
      if (endDirection === 'v') {
        p.push(`c ${0},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        p.push(`h ${Math.round((tx - fx) - radiusX * 2)}`);

        p.push(`c ${Math.round(radiusX)},${0},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        p.push(`v ${Math.round((ty - fy) - startMoveY - radiusY)}`);
      } else {
        p.push(`c ${0},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        const forceEnd = Math.min(30, Math.abs(tx - fx) / 2);
        const endMoveX = (endDirection_x > 0 ? -forceEnd : forceEnd);
        p.push(`h ${Math.round((tx - fx + endMoveX) - radiusX)}`);

        p.push(`c ${Math.round(radiusX)},${0},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        p.push(`v ${Math.round((ty - fy) - startMoveY - radiusY)}`);
        p.push(`h ${Math.round(endMoveX - radiusX)}`);
      }
    } else {
      const force = relation.polyLineStartDistance || Math.max(Math.min(30, Math.abs(tx - fx) / 2), 15);
      const startMoveX = (startDirection_x > 0 ? force : -force);
      // relation.placeText = 'middle';
      if (relation.placeText === 'start') {
        textPosition.x = fx + (startDirection_x > 0 ? 10 : -50);
        textPosition.y = fy - 5;
      } else if (relation.placeText === 'middle') {
        textPosition.x = fx + startMoveX;
        textPosition.y = fy + (ty - fy) / 2;
      } else { // end
        textPosition.x = fx + startMoveX + (startDirection_x > 0 ? 20 : -50);
        textPosition.y = ty - 5;
      }
      p.push(`M ${Math.round(fx)} ${Math.round(fy)}`);
      p.push(`h ${startMoveX - radiusX}`);
      if (endDirection === 'v') {
        const forceEnd = Math.min(30, Math.abs(ty - fy) / 2);
        const endMoveY = (endDirection_y > 0 ? -forceEnd : forceEnd);
        p.push(`c ${Math.round(radiusX)},${0},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        p.push(`v ${Math.round((ty - fy) + endMoveY - radiusY)}`);
        p.push(`h ${Math.round((tx - fx - startMoveX - radiusX))}`);
        p.push(`c ${0},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
        p.push(`v ${Math.round(endMoveY - radiusY)}`);
      } else {
        p.push(`c ${Math.round(radiusX)},${0},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);

        p.push(`v ${Math.round((ty - fy) - radiusY * 2)}`);

        p.push(`c ${0},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
        p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);

        p.push(`h ${Math.round((tx - fx - startMoveX - radiusX))}`);
      }
    }
    return p.join(' ');
  }
  protected createLineFor44(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    const pathInfo = createLine44PathData(relation, textPosition, allLineSize, indexOfAllLine, lineDirection, lineShape, fx, fy, fcx, fcy, f_W, f_H, tx, ty, tcx, tcy, t_W, t_H);
    if (returnPathOnly) {
      return pathInfo.pathData;
    } else {
      return pathInfo;
    }
  }
  protected createLineFor49(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    return '';
  }
  protected createLineFor41(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    const __buff_x = tx - fx;
    const __buff_y = ty - fy;
    const radius = this.options.defaultPolyLineRadius || 0;
    const radiusX = Math.min(radius, Math.abs(__buff_x)) * (fx < tx ? 1 : -1);
    const radiusY = Math.min(radius, Math.abs(__buff_y)) * (fy < ty ? 1 : -1);
    const p = [];
    textPosition.x = fx + 5;
    textPosition.y = ty - 13;
    p.push(`M ${Math.round(fx)} ${Math.round(fy)}`);
    p.push(`v ${Math.round(ty - fy - radiusY)}`);
    p.push(`c ${0},${Math.round(radiusY)},`);
    p.push(`${Math.round(radiusX)},${Math.round(radiusY)},`);
    p.push(`${Math.round(radiusX)},${Math.round(radiusY)}`);
    p.push(`h ${Math.round((tx - fx) - radiusX)}`);
    return p.join(' ');
  }
  protected createSameVertexLine(fx: number, fy: number, from_x: number, from_y: number, f_W: number, f_H: number) {
    const textPosition: RGLineTextPosition = { x: 0, y: 0, rotate: 0 };
    const from_ct_x = from_x + f_W / 2;
    const from_ct_y = from_y + f_H / 2;
    const angle = Math.atan2(fy - from_ct_y, fx - from_ct_x);
    const dx = Math.sin(angle + Math.PI) * 5;
    const dy = Math.cos(angle + Math.PI) * 5;
    const p1 = {x: fx - dx, y: fy - dy};
    const p2 = {x: dx, y: dy};

    const c1x = -dy * 5;
    const c1y = -dx * 5;

    const c2x = -dy * 5;
    const c2y = -dx * 5;

    // 构建路径
    const path = `M ${p1.x},${p1.y} c ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;

    textPosition.x = fx - (dy / (dy + dx)) * 20;
    textPosition.y = fy + (dx / (dy + dx)) * 20;
    textPosition.rotate = 0;
    return this.createReturnValue(path, textPosition);
  }
  protected createLineForCurve6(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    const __buff_x = tx - fx;
    const __buff_y = ty - fy;
    const startDirection_x = fx - fcx;
    const startDirection_y = fy - fcy;
    const endDirection_x = tx - tcx;
    const endDirection_y = ty - tcy;

    let ctrl1,ctrl2;
    const forceX = Math.min(200, Math.max(100, Math.abs(__buff_x / 2)));
    const forceY = Math.min(200, Math.max(100, Math.abs(__buff_y / 2)));
    const startForceX = startDirection_x / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceX;
    const startForceY = startDirection_y / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceY;
    ctrl1 = {x: startForceX , y: startForceY};
    const endForceX = endDirection_x / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceX + __buff_x;
    const endForceY = endDirection_y / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceY + __buff_y;
    ctrl2 = {x: endForceX, y: endForceY};
    if (relation.ctrlPoints && relation.ctrlPoints.length > 0) {
      if (relation.isReverse) {
        ctrl1.x += relation.ctrlPoints[1].x;
        ctrl1.y += relation.ctrlPoints[1].y;
        ctrl2.x += relation.ctrlPoints[0].x;
        ctrl2.y += relation.ctrlPoints[0].y;
      } else {
        ctrl1.x += relation.ctrlPoints[0].x;
        ctrl1.y += relation.ctrlPoints[0].y;
        ctrl2.x += relation.ctrlPoints[1].x;
        ctrl2.y += relation.ctrlPoints[1].y;
      }
    }
    const lineCenter = this.calcCurveCenter(
      {x: fx, y: fy},
      {x: fx + ctrl1.x, y: fy + ctrl1.y},
      {x: fx + ctrl2.x, y: fy + ctrl2.y},
      {x: fx + __buff_x, y: fy + __buff_y},
      lineShape < 6 ? 0.8 : 0.5
    );
    textPosition.x = lineCenter.x;
    textPosition.y = lineCenter.y;
    let path = `M ${Math.round(fx)},${Math.round(fy)} c ${Math.round(ctrl1.x)},${Math.round(ctrl1.y)} ${Math.round(ctrl2.x)},${Math.round(ctrl2.y)} ${Math.round(__buff_x)},${Math.round(__buff_y)}`; // 鱼尾
    if (lineShape === 8) {
      path = path + ' Z';
    }
    return path;
  }
  protected createLineForCurve(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    const __buff_x = tx - fx;
    const __buff_y = ty - fy;
    const __buff_type_x = tx > fx ? 1 : -1;
    const __buff_type_y = ty > fy ? 1 : -1;
    const __buff_type = lineDirection === 'v' ? __buff_type_y : __buff_type_x;
    const startDirection_x = fx - fcx;
    const startDirection_y = fy - fcy;
    const endDirection_x = tx - tcx;
    const endDirection_y = ty - tcy;

    const distanceRate = (1 / (allLineSize + 1)) * (indexOfAllLine + 1);
    let ctrl1,ctrl2;
    if (lineShape === 2) {
      // ctrl1 = {x: startDirection_x + __buff_type_x * 30, y: startDirection_y + __buff_type_y * 30};
      // ctrl2 = {x: endDirection_x + (__buff_x * distanceRate), y: endDirection_y + (__buff_y * distanceRate)};
      ctrl1 = lineDirection === 'v' ? {x: 0, y: __buff_type * 30}                         : {x: __buff_type * 30, y: 0};
      ctrl2 = lineDirection === 'v' ? {x: __buff_x * distanceRate, y: __buff_type * -10}  : {x: __buff_type * -10, y: __buff_y * distanceRate};
    }  else if (lineShape === 3) {
      // ctrl1 = {x: startDirection_x, y: startDirection_y + (__buff_y * distanceRate)};
      // ctrl2 = {x: endDirection_x + (__buff_type_x * 30), y: endDirection_y + (__buff_y * distanceRate)};
      ctrl1 = lineDirection === 'v' ? {x: 0, y: __buff_y * distanceRate}  : {x: __buff_type * 30, y: 0};
      ctrl2 = lineDirection === 'v' ? {x: 0, y: 0}                        : {x: __buff_type * -10, y: __buff_y * distanceRate};
    } else if (lineShape === 5) {
      // ctrl1 = {x: startDirection_x, y: startDirection_y};
      // ctrl2 = {x: endDirection_x + (__buff_x * distanceRate), y: endDirection_y + (__buff_y * distanceRate)};
      ctrl1 = lineDirection === 'v' ? {x: 0, y: 0}                        : {x: 0, y: 0};
      ctrl2 = lineDirection === 'v' ? {x: 0, y: __buff_y * distanceRate}  : {x: __buff_x * distanceRate, y: 0};
    } else if (lineShape === 7) {
      const forceX = 30;
      const forceY = 30;
      const startForceX = startDirection_x / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceX;
      const startForceY = startDirection_y / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceY;
      ctrl1 = {x: startForceX , y: startForceY};
      const endForceX = endDirection_x / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceX + __buff_x;
      const endForceY = endDirection_y / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceY + __buff_y;
      ctrl2 = {x: endForceX, y: endForceY};
    } else if (lineShape === 8) {
      const forceX = 30;
      const forceY = 30;
      const startForceX = startDirection_x / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceX;
      const startForceY = startDirection_y / (Math.abs(startDirection_x) + Math.abs(startDirection_y)) * forceY;
      ctrl1 = {x: startForceX , y: startForceY};
      const endForceX = endDirection_x / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceX + __buff_x;
      const endForceY = endDirection_y / (Math.abs(endDirection_x) + Math.abs(endDirection_y)) * forceY + __buff_y;
      ctrl2 = {x: endForceX, y: endForceY};
    }
    const lineCenter = this.calcCurveCenter(
      {x: fx, y: fy},
      {x: fx + ctrl1.x, y: fy + ctrl1.y},
      {x: fx + ctrl2.x, y: fy + ctrl2.y},
      {x: fx + __buff_x, y: fy + __buff_y},
      lineShape < 6 ? 0.8 : 0.5
    );
    textPosition.x = lineCenter.x;
    textPosition.y = lineCenter.y;
    let path = `M ${Math.round(fx)},${Math.round(fy)} c ${Math.round(ctrl1.x)},${Math.round(ctrl1.y)} ${Math.round(ctrl2.x)},${Math.round(ctrl2.y)} ${Math.round(__buff_x)},${Math.round(__buff_y)}`; // 鱼尾
    if (lineShape === 8) {
      path = path + ' Z';
    }
    return path;
  }
  protected createLineFor1(relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number, returnPathOnly = true) {
    textPosition.rotate = RGGraphMath.getTextAngle(fx, fy, tx, ty);
    textPosition.x = Math.round(fx + (tx - fx) / 2);
    textPosition.y = Math.round(fy + (ty - fy) / 2);
    if (Number.isNaN(textPosition.rotate)) {
      textPosition.rotate = 0;
    }
    return `M ${Math.round(fx)} ${Math.round(fy)} L ${Math.round(tx)} ${Math.round(ty)}`;
  }
}
