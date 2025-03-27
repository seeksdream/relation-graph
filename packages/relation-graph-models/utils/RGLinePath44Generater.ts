import {
  calculatePolylineCenter,
  clearSamePoint,
  createPathDataByPoints, getJunctionPointDirection,
  getPoints
} from './RGLinePathUtils';
import {RGCoordinate, RGDirection, RGLine, RGLineTextPosition} from "../types";

export type LinePathInfo = {
  pathData: string;
  textPosition: RGCoordinate,
  points: RGCoordinate[],
  startDirection?: RGDirection,
  endDirection?: RGDirection,
};

export const createLine44PathData = (relation: RGLine, textPosition: RGLineTextPosition, allLineSize:number, indexOfAllLine:number, lineDirection: string, lineShape:number, fx:number, fy:number, fcx:number, fcy:number, f_W:number, f_H:number, tx:number, ty:number, tcx:number, tcy:number, t_W:number, t_H:number): LinePathInfo => {
  const _startDirection_x = fx - fcx;
  const _startDirection_y = fy - fcy;
  let startDirectionX = _startDirection_x > 3 ? 1 : (_startDirection_x < -3 ? -1 : 0);
  let startDirectionY = _startDirection_y > 3 ? 1 : (_startDirection_y < -3 ? -1 : 0);
  if (Math.abs(startDirectionX) === 1 && Math.abs(startDirectionY) === 1) {
    if (Math.abs(_startDirection_x) > Math.abs(_startDirection_y)) {
      startDirectionY = 0;
    } else {
      startDirectionX = 0;
    }
  }
  if (startDirectionX === 0 && startDirectionY === 0) startDirectionX = 1;
  const _endDirection_x = tx - tcx;
  const _endDirection_y = ty - tcy;
  let endDirectionX = _endDirection_x > 3 ? 1 : (_endDirection_x < -3 ? -1 : 0);
  let endDirectionY = _endDirection_y > 3 ? 1 : (_endDirection_y < -3 ? -1 : 0);
  if (Math.abs(endDirectionX) === 1 && Math.abs(endDirectionY) === 1) {
    if (Math.abs(_endDirection_x) > Math.abs(_endDirection_y)) {
      endDirectionY = 0;
    } else {
      endDirectionX = 0;
    }
  }
  if (endDirectionX === 0 && endDirectionY === 0) startDirectionX = -1;
  const _startDirection = getJunctionPointDirection(relation.fromJunctionPoint, startDirectionX, startDirectionY);
  const _endDirection = getJunctionPointDirection(relation.toJunctionPoint, endDirectionX, endDirectionY);
  const startDirection = relation.isReverse ? _endDirection : _startDirection;
  const endDirection = relation.isReverse ? _startDirection : _endDirection;

  // console.log('xxxxxxxxxxxxxxxxx:', relation.text, startDirection, endDirection);
  const centerX = fx + (tx - fx) / 2;
  const centerY = fy + (ty - fy) / 2;
  let centerOffset = { x: 0, y: 0 };
  let sourceOffset = 30;
  let targetOffset = 30;
  if (relation.ctrlOptionsFor44) {
    centerOffset = { x: relation.ctrlOptionsFor44.cx, y: relation.ctrlOptionsFor44.cy };
    sourceOffset += relation.ctrlOptionsFor44.fd;
    targetOffset += relation.ctrlOptionsFor44.td;
  }
  const radius = relation.polyLineRadius || 5;
  const [points] = getPoints({
    source: { x: fx, y: fy },
    sourcePosition: startDirection,
    target: { x: tx, y: ty },
    targetPosition: endDirection,
    center: {
      x: centerX + centerOffset.x,
      y: centerY + centerOffset.y
    },
    sourceOffset,
    targetOffset
  });
  const simpleFullPoints = clearSamePoint(points);
  const pathData = createPathDataByPoints(simpleFullPoints, radius);
  const lineCenter = calculatePolylineCenter(points);
  textPosition.x = lineCenter.x;
  textPosition.y = lineCenter.y;
  return {
    pathData,
    textPosition,
    points: simpleFullPoints,
    startDirection,
    endDirection
  };
};
