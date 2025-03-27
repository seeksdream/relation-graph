import {RGCoordinate, RGJunctionPoint} from "../types";

export enum RGDirection {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}
export const handleDirections: {[key:string]:RGCoordinate} = {
  [RGDirection.Left]: { x: -1, y: 0 },
  [RGDirection.Right]: { x: 1, y: 0 },
  [RGDirection.Top]: { x: 0, y: -1 },
  [RGDirection.Bottom]: { x: 0, y: 1 }
};

const getDirection = ({
  source,
  sourcePosition = RGDirection.Bottom,
  target
}: {
  source: RGCoordinate;
  sourcePosition: RGDirection;
  target: RGCoordinate;
}): RGCoordinate => {
  if (sourcePosition === RGDirection.Left || sourcePosition === RGDirection.Right) {
    return source.x < target.x ? { x: 1, y: 0 } : { x: -1, y: 0 };
  }
  return source.y < target.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
};

const distance = (a: RGCoordinate, b: RGCoordinate) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));

// ith this function we try to mimic a orthogonal edge routing behaviour
// It's not as good as a real orthogonal edge routing but it's faster and good enough as a default for step and smooth step edges
export function getPoints({
  source,
  sourcePosition = RGDirection.Bottom,
  target,
  targetPosition = RGDirection.Top,
  center,
  sourceOffset,
  targetOffset
}: {
  source: RGCoordinate;
  sourcePosition: RGDirection;
  target: RGCoordinate;
  targetPosition: RGDirection;
  center: RGCoordinate;
  sourceOffset: number;
  targetOffset: number;
}): [RGCoordinate[], number, number, number, number, number] {
  const sourceDir = handleDirections[sourcePosition];
  const targetDir = handleDirections[targetPosition];
  const sourceGapped: RGCoordinate = { x: source.x + sourceDir.x * sourceOffset, y: source.y + sourceDir.y * sourceOffset };
  const targetGapped: RGCoordinate = { x: target.x + targetDir.x * targetOffset, y: target.y + targetDir.y * targetOffset };
  const dir = getDirection({
    source: sourceGapped,
    sourcePosition,
    target: targetGapped
  });
  const dirAccessor = dir.x !== 0 ? 'x' : 'y';
  const currDir = dir[dirAccessor];

  let points: RGCoordinate[] = [];
  let centerX, centerY;
  const sourceGapOffset = { x: 0, y: 0 };
  const targetGapOffset = { x: 0, y: 0 };
  let ctrlType = 0;

  // opposite handle positions, default case
  if (sourceDir[dirAccessor] * targetDir[dirAccessor] === -1) {
    centerX = center.x;
    centerY = center.y;
    //    --->
    //    |
    // >---
    const verticalSplit: RGCoordinate[] = [
      { x: centerX, y: sourceGapped.y },
      { x: centerX, y: targetGapped.y }
    ];
    //    |
    //  ---
    //  |
    const horizontalSplit: RGCoordinate[] = [
      { x: sourceGapped.x, y: centerY },
      { x: targetGapped.x, y: centerY }
    ];

    if (sourceDir[dirAccessor] === currDir) {
      ctrlType = 1.1;
      points = dirAccessor === 'x' ? verticalSplit : horizontalSplit;
    } else {
      ctrlType = 1.2;
      points = dirAccessor === 'x' ? horizontalSplit : verticalSplit;
    }
  } else {
    // sourceTarget means we take x from source and y from target, targetSource is the opposite
    const sourceTarget: RGCoordinate[] = [{ x: sourceGapped.x, y: targetGapped.y }];
    const targetSource: RGCoordinate[] = [{ x: targetGapped.x, y: sourceGapped.y }];
    // this handles edges with same handle positions
    if (dirAccessor === 'x') {
      points = sourceDir.x === currDir ? targetSource : sourceTarget;
    } else {
      points = sourceDir.y === currDir ? sourceTarget : targetSource;
    }

    if (sourcePosition === targetPosition) {
      ctrlType = 2.1;
      const diff = Math.abs(source[dirAccessor] - target[dirAccessor]);
      const offset = sourceDir[dirAccessor] === currDir ? sourceOffset : targetOffset;
      // if an edge goes from right to right for example (sourcePosition === targetPosition) and the distance between source.x and target.x is less than the offset, the added point and the gapped source/target will overlap. This leads to a weird edge path. To avoid this we add a gapOffset to the source/target
      if (diff <= offset) {
        const gapOffset = Math.min(offset - 1, offset - diff);
        if (sourceDir[dirAccessor] === currDir) {
          sourceGapOffset[dirAccessor] = (sourceGapped[dirAccessor] > source[dirAccessor] ? -1 : 1) * gapOffset;
        } else {
          targetGapOffset[dirAccessor] = (targetGapped[dirAccessor] > target[dirAccessor] ? -1 : 1) * gapOffset;
        }
      }
    }

    // these are conditions for handling mixed handle positions like Right -> Bottom for example
    if (sourcePosition !== targetPosition) {
      ctrlType = 2.2;
      const dirAccessorOpposite = dirAccessor === 'x' ? 'y' : 'x';
      const isSameDir = sourceDir[dirAccessor] === targetDir[dirAccessorOpposite];
      const sourceGtTargetOppo = sourceGapped[dirAccessorOpposite] > targetGapped[dirAccessorOpposite];
      const sourceLtTargetOppo = sourceGapped[dirAccessorOpposite] < targetGapped[dirAccessorOpposite];
      const flipSourceTarget =
        (sourceDir[dirAccessor] === 1 && ((!isSameDir && sourceGtTargetOppo) || (isSameDir && sourceLtTargetOppo))) ||
        (sourceDir[dirAccessor] !== 1 && ((!isSameDir && sourceLtTargetOppo) || (isSameDir && sourceGtTargetOppo)));

      if (flipSourceTarget) {
        points = dirAccessor === 'x' ? sourceTarget : targetSource;
      }
    }

    const sourceGapPoint = { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y };
    const targetGapPoint = { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y };
    const maxXDistance = Math.max(Math.abs(sourceGapPoint.x - points[0].x), Math.abs(targetGapPoint.x - points[0].x));
    const maxYDistance = Math.max(Math.abs(sourceGapPoint.y - points[0].y), Math.abs(targetGapPoint.y - points[0].y));

    // we want to place the label on the longest segment of the edge
    if (maxXDistance >= maxYDistance) {
      centerX = (sourceGapPoint.x + targetGapPoint.x) / 2;
      centerY = points[0].y;
    } else {
      centerX = points[0].x;
      centerY = (sourceGapPoint.y + targetGapPoint.y) / 2;
    }
  }

  const pathPoints = [
    source,
    { x: sourceGapped.x + sourceGapOffset.x, y: sourceGapped.y + sourceGapOffset.y },
    ...points,
    { x: targetGapped.x + targetGapOffset.x, y: targetGapped.y + targetGapOffset.y },
    target
  ];
  toIntPoints(pathPoints);
  return [pathPoints, centerX, centerY, 0, 0, ctrlType];
}
export const getEasyPoints = ({
  source,
  sourcePosition = RGDirection.Bottom,
  target,
  targetPosition = RGDirection.Top,
  center,
  sourceOffset,
  targetOffset
}: {
  source: RGCoordinate;
  sourcePosition: RGDirection;
  target: RGCoordinate;
  targetPosition: RGDirection;
  center: RGCoordinate;
  sourceOffset: number;
  targetOffset: number;
}): [RGCoordinate[], number, number, number, number, number] => {
  const pathPoints: RGCoordinate[] = [];
  if (sourcePosition === RGDirection.Left || sourcePosition === RGDirection.Right) {
    if (targetPosition === RGDirection.Left || targetPosition === RGDirection.Right) {
      pathPoints.push(source, {x: source.x, y: target.y}, target);
    } else {
      pathPoints.push(source, {x: target.x, y: source.y}, target);
    }
  } else {
    if (targetPosition === RGDirection.Left || targetPosition === RGDirection.Right) {
      pathPoints.push(source, {x: source.x, y: target.y}, target);
    } else {
      pathPoints.push(source, {x: target.x, y: source.y}, target);
    }
  }
  toIntPoints(pathPoints);
  return [pathPoints, 0, 0, 0, 0, 0];
  // return [[], 0, 0, 0, 0, 0];
}

export const toIntPoints = (allPoints: RGCoordinate[]) => {
  for (let i = 0; i < allPoints.length; i++) {
    const point = allPoints[i];
    point.x = Math.round(point.x);
    point.y = Math.round(point.y);
  }
};
export const clearSamePoint = (allPoints: RGCoordinate[]) => {
  const pathPoints: any[] = [];
  for (let i = 0; i < allPoints.length; i++) {
    const point = allPoints[i];
    point.x = Math.round(point.x);
    point.y = Math.round(point.y);
    if (i === 0 || i === allPoints.length - 1) {
      pathPoints.push(point);
    } else {
      const prevPoint = pathPoints[pathPoints.length - 1];
      if (point.x === prevPoint.x && point.y === prevPoint.y) {
        // ignore point
      } else {
        pathPoints.push(point);
      }
    }
  }
  for (let i = 2; i < pathPoints.length; i++) {
    const prev2Point = pathPoints[i - 2];
    const prev1Point = pathPoints[i - 1];
    const point = pathPoints[i];
    const prevDir = prev2Point.x === prev1Point.x ? 'v' : 'h';
    const dir = prev1Point.x === point.x ? 'v' : 'h';
    if (prevDir === dir) {
      prev1Point.merged = true;
    }
  }
  return pathPoints.filter(p => p.merged !== true);
  // return allPoints;
};
export function getBend(a: RGCoordinate, b: RGCoordinate, c: RGCoordinate, size: number): string {
  const bendSize = Math.min(distance(a, b) / 2, distance(b, c) / 2, size);
  const { x, y } = b;

  // no bend
  if ((a.x === x && x === c.x) || (a.y === y && y === c.y)) {
    return `L ${x} ${y}`;
  }

  // first segment is horizontal
  if (a.y === y) {
    const xDir = a.x < c.x ? -1 : 1;
    const yDir = a.y < c.y ? 1 : -1;
    return `L ${x + bendSize * xDir},${y}Q ${x},${y} ${x},${y + bendSize * yDir}`;
  }

  const xDir = a.x < c.x ? 1 : -1;
  const yDir = a.y < c.y ? -1 : 1;
  return `L ${x},${y + bendSize * yDir}Q ${x},${y} ${x + bendSize * xDir},${y}`;
}
export const createPathDataByPoints = (points: RGCoordinate[], borderRadius:number) => {
  const path = points.reduce<string>((res, p, i) => {
    let segment = '';

    if (i > 0 && i < points.length - 1) {
      segment = getBend(points[i - 1], p, points[i + 1], borderRadius);
    } else {
      segment = `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
    }

    res += segment;

    return res;
  }, '');
  return path;
};
export enum LVLineJunctionPoint {
  border = 'border',
  ltrb = 'ltrb',
  tb = 'tb',
  lr = 'lr',
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom'
};
export const getJunctionPointDirection = (junctionPoint: RGJunctionPoint | undefined, x:number, y: number) => {
  if (junctionPoint === LVLineJunctionPoint.left) {
    return RGDirection.Left;
  } else if (junctionPoint === LVLineJunctionPoint.right) {
    return RGDirection.Right;
  } else if (junctionPoint === LVLineJunctionPoint.top) {
    return RGDirection.Top;
  } else if (junctionPoint === LVLineJunctionPoint.bottom) {
    return RGDirection.Bottom;
  }
  if (x === 1) {
    return RGDirection.Right;
  } else if (x === -1) {
    return RGDirection.Left;
  } else {
    if (y === 1) {
      return RGDirection.Bottom;
    } else if (y === -1) {
      return RGDirection.Top;
    } else {
      return RGDirection.Left;
    }
  }
};
export const getReverseJPDirection = (dir: RGDirection) => {
  if (dir === RGDirection.Left) {
    return RGDirection.Right;
  } else if (dir === RGDirection.Right) {
    return RGDirection.Left;
  } else if (dir === RGDirection.Top) {
    return RGDirection.Bottom;
  } else if (dir === RGDirection.Bottom) {
    return RGDirection.Top;
  } else { return RGDirection.Left; }
};

export const getJPDirectionByPoint = (point1: RGCoordinate, point2: RGCoordinate) => {
  if (point1.x === point2.x) {
    return point2.y > point1.y ? RGDirection.Bottom : RGDirection.Top;
  } else {
    return point2.x > point1.x ? RGDirection.Right : RGDirection.Left;
  }
};
export type SvgPathPoints = {
  startPoint: RGCoordinate,
  ctrl1: RGCoordinate,
  ctrl2: RGCoordinate,
  endPoint: RGCoordinate,
  lines: RGCoordinate[]
};

export const calculatePolylineCenter = (points: RGCoordinate[]): RGCoordinate => {
  if (points.length < 2) {
    throw new Error("At least two points are required to form a polyline.");
  }

  // 计算总长度
  let totalLength = 0;
  const lengths = [];

  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const length = Math.sqrt(dx * dx + dy * dy);
    lengths.push(length);
    totalLength += length;
  }

  // 找到中心点所在的段
  const halfLength = totalLength / 2;
  let accumulatedLength = 0;

  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    if (accumulatedLength >= halfLength) {
      // 计算中心点在该段上的位置
      const prevPoint = points[i];
      const nextPoint = points[i + 1];
      const segmentLength = lengths[i];
      const distanceFromPrev = halfLength - (accumulatedLength - segmentLength);
      const ratio = distanceFromPrev / segmentLength;

      const centerX = prevPoint.x + (nextPoint.x - prevPoint.x) * ratio;
      const centerY = prevPoint.y + (nextPoint.y - prevPoint.y) * ratio;

      return { x: centerX, y: centerY };
    }
  }
  return {x:0, y:0};
};
