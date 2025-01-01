import {devLog} from "./RGCommon";

const STAITC_MAP_ANGLE = 0;
export type SizeInfo = {
  canvas_width: number
  canvas_height: number
  node_width: number
  node_height: number
};
function calculateNearestIntersection(x1, y1, w1, h1, x2, y2, w2, h2, distance) {
  // 计算两个矩形中心的连线的方向向量
  const dx = x2 - x1;
  const dy = y2 - y1;

  // 计算平行线的起点（移动距离distance沿垂直于连线的方向）
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  const offsetDx = (distance * dy) / magnitude;
  const offsetDy = -(distance * dx) / magnitude;
  const lineX = x1 + offsetDx;
  const lineY = y1 + offsetDy;

  // 计算矩形n1的边界
  const left = x1 - w1 / 2;
  const right = x1 + w1 / 2;
  const top = y1 - h1 / 2;
  const bottom = y1 + h1 / 2;

  // 计算直线与矩形n1边界的交点
  let intersections = [];
  if (dx !== 0) {
    // 检查左侧和右侧边界
    let tLeft = (left - lineX) / dx;
    let yLeft = lineY + tLeft * dy;
    if (yLeft >= top && yLeft <= bottom) {
      intersections.push({ x: left, y: yLeft });
    }
    let tRight = (right - lineX) / dx;
    let yRight = lineY + tRight * dy;
    if (yRight >= top && yRight <= bottom) {
      intersections.push({ x: right, y: yRight });
    }
  }
  if (dy !== 0) {
    // 检查上侧和下侧边界
    let tTop = (top - lineY) / dy;
    let xTop = lineX + tTop * dx;
    if (xTop >= left && xTop <= right) {
      intersections.push({ x: xTop, y: top });
    }
    let tBottom = (bottom - lineY) / dy;
    let xBottom = lineX + tBottom * dx;
    if (xBottom >= left && xBottom <= right) {
      intersections.push({ x: xBottom, y: bottom });
    }
  }

  // 找出距离矩形n2中心最近的交点
  let nearestIntersection = null;
  let minDistance = Infinity;
  intersections.forEach(point => {
    const dist = Math.sqrt((point.x - x2) ** 2 + (point.y - y2) ** 2);
    if (dist < minDistance) {
      minDistance = dist;
      nearestIntersection = point;
    }
  });

  return nearestIntersection;
}

export const RGGraphMath = {
  getRectPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, isReserve = false, allSize = 1, indexOfAll = 1, lineDistance = 14) {
    // if (isReserve) {
    //   indexOfAll = allSize - indexOfAll - 1;
    // }
    const ri_angle_buff = (indexOfAll - ((allSize - 1) / 2));
    const fx = x1 + n1w / 2;
    const fy = y1 + n1h / 2;
    const tx = x2 + n2w / 2;
    const ty = y2 + n2h / 2;
    if (allSize > 1) {
      const distance = lineDistance * ri_angle_buff;
      const nearestIntersection = calculateNearestIntersection(
        fx, fy, n1w, n1h,
        tx, ty, n2w, n2h,
        distance
      );
      if (nearestIntersection) {
        return nearestIntersection;
      }
    }
    const _ar_x = fx < tx ? 1 : -1;
    const _ar_y = fy < ty ? 1 : -1;
    if (ty === fy) {
      return { x: fx + _ar_x * n1w / 2, y: fy };
    }
    const __tan = Math.abs((tx - fx) / (ty - fy));
    // const centerAngle = Math.atan(__tan) * (180/Math.PI); // 将弧度转换为角度
    // const __tan_ri = Math.tan((centerAngle + ri_angle_buff) * (Math.PI/180)); // 使用tan函数获取正切值
    const rectAngle = n1w / n1h;
    // if (__tan_ri < rectAngle) {
    //   const __w = (n1h / 2) / Math.tan(__tan_ri);
    //   return { x: fx + _ar_x * __w, y: fy - _ar_y * (n1h / 2) };
    // } else {
    //   const __h = Math.tan(__tan_ri) * (n1w / 2);
    //   return { x: fx + _ar_x * n1w / 2, y: fy - _ar_y * __h };
    // }
    let __w = 0;
    let __h = 0;
    if (__tan < rectAngle) {
      __w = _ar_x * n1h / 2 * __tan + _ar_y  * rectAngle;
      __h = _ar_y * n1h / 2;
    } else {
      __w = _ar_x * n1w / 2;
      __h = _ar_y * n1w / 2 / __tan + _ar_x * rectAngle;
    }
    const x = fx + __w;
    const y = fy + __h;
    return { x, y };
  },
  getRectPointBasic(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number) {
    const fx = x1 + n1w / 2;
    const fy = y1 + n1h / 2;
    const tx = x2 + n2w / 2;
    const ty = y2 + n2h / 2;
    // var x = fx - tx
    // var y = fy - ty
    // var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
    // var cos = y / z
    // var radina = Math.acos(cos)// 用反三角函数求弧度
    // var angle = Math.floor(180 / (Math.PI / radina))// 将弧度转换成角度
    // n1h = n1h + 10
    // n1w = n1w + 10

    let __tanA = ty === fy ? 0 : (tx - fx) / (ty - fy);
    if (__tanA === 0)__tanA = (tx - fx) / (ty - fy + 1);
    const rectAngle = n1w / n2h;
    let __w = 0;
    let __h = 0;
    let _case = '1';
    // var __A_angle = Math.atan(__tanA) / (Math.PI / 180)
    if ((-1 * rectAngle) < __tanA && __tanA < rectAngle) {
      _case = '2';
      if (fy < ty) {
        __w = n1h / 2 * __tanA;
        __h = n1h / 2;
      } else {
        __w = -1 * n1h / 2 * __tanA;
        __h = -1 * n1h / 2;
      }
    } else {
      if (fx < tx) {
        __w = 1 * n1w / 2;
        __h = 1 * n1w / 2 / __tanA;
      } else {
        __w = -1 * n1w / 2;
        __h = -1 * n1w / 2 / __tanA;
      }
      _case = '3';
    }
    // var __w = (n1h / 2) * Math.tan(__A_angle)
    // var __w = ty === fy ? parseInt(n1w / 2) : parseInt(((n1h / 2) * (tx - fx)) / (ty - fy))
    // var __h = tx === fx ? parseInt(n1h / 2) : parseInt((__w * (ty - fy)) / (tx - fx))
    return { x: fx + __w, y: fy + __h, _case };
  },
  getRectJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number) {
    const _from_c_x = x1 + n1w / 2;
    const _from_c_y = y1 + n1h / 2;
    const _to_c_x = x2 + n2w / 2;
    const _to_c_y = y2 + n2h / 2;
    const _atan2 = Math.round(Math.atan2(_to_c_y - _from_c_y, _to_c_x - _from_c_x) * 180 / 3.14) + 135;
    if (_atan2 >= 0 && _atan2 < 90) { // top
      return { x: x1 + n1w / 2, y: y1 - 5 };
    } else if (_atan2 >= 90 && _atan2 < 180) { // right
      return { x: x1 + n1w + 5, y: y1 + n1h / 2 };
    } else if (_atan2 >= 180 && _atan2 < 270) { // bottom
      return { x: x1 + n1w / 2, y: y1 + n1h + 5 };
    } else { // left
      return { x: x1 - 5, y: y1 + n1h / 2 };
    }
  },
  getRectHJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number) {
    const _hH = n1h / 2;
    // var _hW = n1w / 2
    if ((x1 + n1w) < x2) {
      return { x: x1 + n1w + 5, y: y1 + _hH };
    } else if ((x1 + n1w) < (x2 + n2w)) {
      return { x: x1 - 5, y: y1 + _hH };
    } else {
      return { x: x1 - 5, y: y1 + _hH };
    }
  },
  getRectLeftJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number) {
    const _hH = n1h / 2;
    return { x: x1, y: y1 + _hH };
  },
  getRectRightJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number) {
    const _hH = n1h / 2;
    return { x: x1 + n1w, y: y1 + _hH };
  },
  getRectTopJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number) {
    return { x: x1 + n1w / 2, y: y1 };
  },
  getRectBottomJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, n1style:number, isReserve:boolean, allSize:number, indexOfAll:number, lineDistance = 14, defaultBottomJuctionPoint_X?:number) {
    if (defaultBottomJuctionPoint_X !== undefined) {
      return { x: x1 + defaultBottomJuctionPoint_X, y: y1 + n1h };
    }
    return { x: x1 + n1w / 2, y: y1 + n1h };
  },
  getRectVJoinPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number) {
    const _hW = n1w / 2;
    // var _hW = n1w / 2
    if ((y1 + n1h) < y2) {
      return { y: y1 + n1h + 5, x: x1 + _hW };
    } else if ((y1 + n1h) < (y2 + n2h)) {
      return { y: y1 - 5, x: x1 + _hW };
    } else {
      return { y: y1 - 5, x: x1 + _hW };
    }
  },
  getBorderPoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, n1style:number) {
    if (n1style === 0) {
      return this.getCirclePoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h);
    } else {
      return this.getRectPoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h);
    }
  },
  getBorderPoint4MultiLine(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, n1style:number, isReserve:boolean, allSize:number, indexOfAll:number, lineDistance = 14) {
    if (n1style === 0) {
      return this.getCirclePoint4MultiLine(x1, y1, x2, y2, n1w, n1h, n2w, n2h, isReserve, allSize, indexOfAll, lineDistance);
    } else {
      return this.getRectPoint(x1, y1, x2, y2, n1w, n1h, n2w, n2h, isReserve, allSize, indexOfAll, lineDistance);
    }
  },
  getCirclePoint(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number) {
    const fx = x2 + n2w / 2;
    const fy = y2 + n2h / 2;
    const tx = x1 + n1w / 2;
    const ty = y1 + n1h / 2;
    const buff_h = fx - tx;
    if (buff_h === 0) {
      return { x: tx, y: ty - (n1h / 2) * (fy < ty ? 1 : -1) };
    }
    const buff_v = fy - ty;
    const k = buff_v / buff_h;
    // var m = ty - tx * k
    const __x = Math.sqrt(1 / ((1 / (n1w / 2) ** 2) + (k ** 2 / (n1h / 2) ** 2))) * (fx < tx ? 1 : -1);
    const __y = k * __x;
    // this.c = Math.sqrt(this.h * this.h + this.s * this.s)
    // // this.l = this.c - radius
    // this.v = (this.c - n1w / 2) * this.h / this.c * -1
    // this.t = (this.c - n1h / 2) * this.s / this.c * -1
    // alert(this.h+","+this.s+","+this.c+","+this.l+","+this.v+","+this.t);
    return { x: tx - __x, y: ty - __y };
  },
  getCirclePoint4MultiLine(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, isReserve:boolean, allSize:number, indexOfAll:number, lineDistance:number, tryTime = 0) {
    // if (isReserve) {
    //   indexOfAll = allSize - indexOfAll - 1;
    // }
    let to_x = x2 + n2w / 2;
    const to_y = y2 + n2h / 2;
    let from_x = x1 + n1w / 2;
    const from_y = y1 + n1h / 2;
    let buff_h = to_x - from_x;
    const isSameH = buff_h > -1 && buff_h < 1;
    if (isSameH) {
      to_x = to_x - 2;
      from_x = from_x + 2;
      buff_h = -4;
    }
    const ri_angle_buff = (indexOfAll - ((allSize - 1) / 2));
    const distance = ri_angle_buff * lineDistance;
    const buff_v = to_y - from_y;
    const b = Math.sqrt(buff_h ** 2 + buff_v ** 2) * distance / buff_h;
    const k = buff_v / buff_h;
    const m = n1w / 2;
    const n = n1h / 2;
    const __wow = (from_x < to_x ? -1 : 1);
    const __x = (-1 * (m ** 2) * k * b + (m * n * Math.sqrt(Math.abs(n ** 2 + (k ** 2) * (m ** 2) - b ** 2))) / __wow) / (n ** 2 + m ** 2 * k ** 2);
    const __y = (k * __x + b);
    // if (window.xxxxxxx) {
    //   console.log('wwww:1:', from_x.toFixed(1), to_x.toFixed(1), '|', x1, x2);
    //   console.log('wwww:2:', from_x, from_y, '__x,__y:', __x, __y, 'buff_h:', buff_h, 'm,n,k:', m, n, k, '|', Math.sqrt(Math.abs(n ** 2 + (k ** 2) * (m ** 2) - b ** 2)));
    // }
    // if (tryTime === 0 && (Number.isNaN(__x) || Number.isNaN(__y))) {
    //   // devLog('xxxx')
    //   return this.getCirclePoint4MultiLine(x1, y1, x2, y2, n1w, n1h, n2w, n2h, isReserve, 1, 0, lineDistance, tryTime + 1)
    // }
    return { x: from_x - __x, y: from_y - __y };
  },
  getCirclePointBasic(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number, radius:number) {
    const fx = x1 + n1w / 2;
    const fy = y1 + n1h / 2;
    const tx = x2 + n2w / 2;
    const ty = y2 + n2h / 2;
    const h = tx - fx;
    const s = ty - fy;
    const c = Math.sqrt(h * h + s * s);
    const l = c - radius;
    const v = l * h / c * -1;
    const t = l * s / c * -1;
    // alert(this.h+","+this.s+","+this.c+","+this.l+","+this.v+","+this.t);
    return { x: tx + v, y: ty + t };
  },
  getCirclePointPlus(x1:number, y1:number, x2:number, y2:number, n1w:number, n1h:number, n2w:number, n2h:number) {
    const fx = x1 + n1w / 2;
    const fy = y1 + n1h / 2;
    const tx = x2 + n2w / 2;
    const ty = y2 + n2h / 2;
    const h = tx - fx;
    const s = ty - fy;
    const c = Math.sqrt(h * h + s * s);
    const v = (c - n1w / 2) * h / c * -1;
    const t = (c - n1h / 2) * s / c * -1;
    return { x: tx + v, y: ty + t };
  },
  getOvalPoint(c_x:number, c_y:number, c_r:number, c_i:number, c_n:number, startAngle = 180) {
    const deg_i = c_i * (360 / c_n);
    const angle_i = (180 - startAngle + deg_i) * Math.PI / 180;
    // console.log('getOvalPoint:', deg_i, 180 - startAngle + deg_i, angle_i);
    return {
      x: c_x + c_r * Math.sin(angle_i),
      y: c_y + c_r * Math.cos(angle_i) * -1
    };
  },
  getAngleType(buffer_x:number, buffer_y:number) {
    if (buffer_x >= 0 && buffer_y >= 0) { // 第一象限
      return 1;
    } else if (buffer_x < 0 && buffer_y >= 0) { // 第二象限
      return 2;
    } else if (buffer_x < 0 && buffer_y < 0) { // 第三象限
      return 3;
    } else if (buffer_x >= 0 && buffer_y < 0) { // 第三象限
      return 4;
    }
  },
  getTextAngle(fx:number, fy:number, tx:number, ty:number) {
    let angle = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;

    // adjust angle to range 0-360
    if (angle < 0) {
      angle += 360;
    }

    // conditions to ensure text display is upright
    if (angle > 90 && angle <= 270) {
      angle += 180;
    }

    // Normalize final angle to be between 0-360
    if (angle >= 360) {
      angle -= 360;
    }

    return Math.round(angle);
  },
  getTreePointFromTop(c_x:number, c_y:number, c_height:number, c_i:number, c_n:number, sizehelper:SizeInfo) {
    if (!c_x) { // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2 - 200
      };
    }
    const sssss = {
      x: c_x - 300 + (Math.max(600 / ((c_n === 1 ? 2 : c_n) - 1), 80)) * c_i,
      y: c_y + c_height
    };
    return sssss;
  },
  getTreePointFromRight(c_x:number, c_y:number, c_height:number, c_i:number, c_n:number, sizehelper:SizeInfo) {
    if (!c_x) { // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2 + 300,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2
      };
    }
    return {
      x: c_x - c_height,
      y: c_y - 200 + (Math.max(400 / ((c_n === 1 ? 2 : c_n) - 1), 80)) * c_i
    };
  },
  getTreePointFromBottom(c_x:number, c_y:number, c_height:number, c_i:number, c_n:number, sizehelper:SizeInfo) {
    if (!c_x) { // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2 + 200
      };
    }
    return {
      x: c_x - 300 + (Math.max(600 / ((c_n === 1 ? 2 : c_n) - 1), 80)) * c_i,
      y: c_y - c_height
    };
  },
  getTreePointFromLeft(c_x:number, c_y:number, c_height:number, c_i:number, c_n:number, sizehelper:SizeInfo) {
    if (!c_x) { // if root
      return {
        x: (sizehelper.canvas_width - sizehelper.node_width) / 2 - 300,
        y: (sizehelper.canvas_height - sizehelper.node_height) / 2
      };
    }
    return {
      x: c_x + c_height,
      y: c_y - 200 + (Math.max(400 / ((c_n === 1 ? 2 : c_n) - 1), 80)) * c_i
    };
  }
};
export const getNodeDistance = (fx:number, fy:number, tx:number, ty:number) => {
  const buff_x = fx - tx;
  const buff_y = fy - ty;
  const bSquare = buff_x ** 2;
  const pSquare = buff_y ** 2;
  const sum = bSquare + pSquare;
  const hypotenuse = Math.sqrt(sum);
  return hypotenuse;
};
export default RGGraphMath;
