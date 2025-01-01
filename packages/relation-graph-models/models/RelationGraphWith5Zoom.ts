import {devLog, getScreenHeight, getScreenWidth} from '../utils/RGCommon';
import { RGListeners, RGOptions } from '../types';
import { RelationGraphWith4Line } from './RelationGraphWith4Line';
export type RGZoomCenter = {
  x:number
  y:number
};
export type RGCoordinate = {
  x:number
  y:number
};
export class RelationGraphWith5Zoom extends RelationGraphWith4Line {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }

  zoom(buff:number, userZoomCenter?:RGZoomCenter) {
    // devLog('[zoom]', buff, 'from:', userZoomCenter);
    if ((this.options.canvasZoom + buff) < 5) {
      devLog('zoom:reset zoom=10');
      buff = 5 - this.options.canvasZoom;
    }
    const oldZoom = this.options.canvasZoom;
    const __new_zoom_value = this.options.canvasZoom + buff;
    const zoomBuff = this.showZoomCenter(userZoomCenter, buff);
    this.options.canvasOffset.x += zoomBuff.buff_x;
    this.options.canvasOffset.y += zoomBuff.buff_y;
    this.options.canvasZoom = __new_zoom_value;
    this.refreshNVAnalysisInfo();
    if (this.listeners.onZoomEnd) {
      this.listeners.onZoomEnd();
    }
    if (oldZoom <= 40 && __new_zoom_value > 40) {
      if (this.options.performanceMode) {
        this.updateVisbleViewNodes(true);
      }
      this.options.showEasyView = false;
      devLog('zoom:hide:showEasyView', oldZoom, __new_zoom_value);
      setTimeout(() => {
        this.updateElementLines();
      }, 150)
    }
    if (oldZoom > 40 && __new_zoom_value <= 40) {
      devLog('zoom:show:showEasyView', oldZoom, __new_zoom_value);
      if (this.options.performanceMode) {
        this.options.showEasyView = true;
      }
    }
    // this.options.showEasyView = this.options.canvasZoom <= 40;
    this._dataUpdated();
    this.emitEvent('zoom', { canvasZoom: this.options.canvasZoom });
  }
  setZoom(finalZoom:number, userZoomCenter?:RGZoomCenter) {
    const buff = Math.floor(finalZoom - this.options.canvasZoom);
    this.zoom(buff, userZoomCenter);
  }
  zoomCenter_of_newSize = { x: 0, y: 0 };
  getCanvasCoordinateByClientCoordinate(clientCoordinate:RGCoordinate) {
    const _current_zoom = this.options.canvasZoom / 100;
    const { NMCanvasStart, NMZoomCenter } = this.analysisByZoom(_current_zoom, clientCoordinate);
    const zoomCenter = {
      x: NMZoomCenter.x - NMCanvasStart.x,
      y: NMZoomCenter.y - NMCanvasStart.y
    };
    return {
      x: zoomCenter.x / _current_zoom,
      y: zoomCenter.y / _current_zoom
    };
  }
  getClientCoordinateByCanvasCoordinate(canvasCoordinate:RGCoordinate) {
    const _current_zoom = this.options.canvasZoom / 100;
    const { NMCanvasStart } = this.analysisByZoom(_current_zoom);

    const zoomCenter = {
      x: canvasCoordinate.x * _current_zoom + NMCanvasStart.x,
      y: canvasCoordinate.y * _current_zoom + NMCanvasStart.y
    };

    return {
      x: zoomCenter.x + this.options.canvasOffset.x,
      y: zoomCenter.y + this.options.canvasOffset.y
    };
  }
  analysisByZoom(zoom:number, userZoomCenter?:RGZoomCenter) {
    const result = {
      NMViewPosition: { x: 0, y: 0 },
      NMViewCenter: { x: 0, y: 0 },
      NMCanvasCenter: { x: 0, y: 0 },
      NMCanvasStart: { x: 0, y: 0 },
      NMCanvasEnd: { x: 0, y: 0 },
      NMZoomCenter: { x: 0, y: 0 },
      NMViewBuff: { x: 0, y: 0 },
      NMCanvasOffsetBuff: { x: 0, y: 0 },
      NMCanvasSize: { width: 0, height: 0 }
    };
    // const windowWidth = getScreenWidth();
    // const windowHeight = getScreenHeight();
    const _view_info = this.$dom.getBoundingClientRect();
    result.NMViewPosition.x = _view_info.left;
    result.NMViewPosition.y = _view_info.top;
    // if (_view_info.width + result.NMViewPosition.x > windowWidth) {
    //   result.NMViewCenter.x = (windowWidth - _view_info.left) / 2;
    // } else {
    //   result.NMViewCenter.x = _view_info.width / 2;
    // }
    // if (_view_info.height + result.NMViewPosition.y > windowHeight) {
    //   result.NMViewCenter.y = (windowHeight - _view_info.top) / 2;
    // } else {
    //   result.NMViewCenter.y = _view_info.height / 2;
    // }
    result.NMViewCenter.x = _view_info.width / 2;
    result.NMViewCenter.y = _view_info.height / 2;
    const _NM_canvas_width = this.options.canvasSize.width * zoom;
    const _NM_canvas_height = this.options.canvasSize.height * zoom;
    result.NMCanvasCenter.x = this.options.canvasOffset.x + (this.options.canvasSize.width / 2); // + (this.options.canvasOffset.zoom_buff_x * _NM_canvas_width)
    result.NMCanvasCenter.y = this.options.canvasOffset.y + (this.options.canvasSize.height / 2); // + (this.options.canvasOffset.zoom_buff_y * _NM_canvas_height)
    result.NMCanvasStart.x = result.NMCanvasCenter.x - _NM_canvas_width / 2;
    result.NMCanvasStart.y = result.NMCanvasCenter.y - _NM_canvas_height / 2;
    result.NMCanvasEnd.x = result.NMCanvasCenter.x + _NM_canvas_width / 2;
    result.NMCanvasEnd.y = result.NMCanvasCenter.y + _NM_canvas_height / 2;
    result.NMZoomCenter.x = result.NMViewCenter.x;
    result.NMZoomCenter.y = result.NMViewCenter.y;
    if (userZoomCenter) {
      result.NMZoomCenter.x = userZoomCenter.x - result.NMViewPosition.x;
      result.NMZoomCenter.y = userZoomCenter.y - result.NMViewPosition.y;
    }
    let _NM_buff_x = result.NMViewCenter.x - result.NMCanvasCenter.x;
    let _NM_buff_y = result.NMViewCenter.y - result.NMCanvasCenter.y;
    if (userZoomCenter) {
      _NM_buff_x = result.NMZoomCenter.x - result.NMCanvasCenter.x;
      _NM_buff_y = result.NMZoomCenter.y - result.NMCanvasCenter.y;
    }
    result.NMViewBuff.x = _NM_buff_x;
    result.NMViewBuff.y = _NM_buff_y;
    result.NMCanvasSize.width = _NM_canvas_width;
    result.NMCanvasSize.height = _NM_canvas_height;
    return result;
  }
  showZoomCenter(userZoomCenter:RGZoomCenter|undefined, zoomBuff:number):{buff_x:number, buff_y:number} {
    if (!this.$dom) {
      return { buff_x: 0, buff_y: 0 };
    }
    const _current_zoom = this.options.canvasZoom / 100;
    const currentZoomSet = this.analysisByZoom(_current_zoom, userZoomCenter);
    const _new_zoom = (this.options.canvasZoom + zoomBuff) / 100;
    const newZoomSet = this.analysisByZoom(_new_zoom, userZoomCenter);
    // devLog('currentZoomSet:', currentZoomSet)
    // devLog('currentZoomSet:', this.newZoomSet)
    const a = _new_zoom / _current_zoom;
    const b = 0;
    const c = 0;
    const d = _new_zoom / _current_zoom;
    const e = 0;
    const f = 0;
    this.zoomCenter_of_newSize.x = a * currentZoomSet.NMViewBuff.x + c * currentZoomSet.NMViewBuff.y + e;
    this.zoomCenter_of_newSize.y = b * currentZoomSet.NMViewBuff.x + d * currentZoomSet.NMViewBuff.y + f;
    const buff_x = currentZoomSet.NMViewBuff.x - this.zoomCenter_of_newSize.x;
    const buff_y = currentZoomSet.NMViewBuff.y - this.zoomCenter_of_newSize.y;
    this.zoomCenter_of_newSize.x += currentZoomSet.NMCanvasCenter.x;
    this.zoomCenter_of_newSize.y += currentZoomSet.NMCanvasCenter.y;
    // e = currentZoomSet.NMViewBuff.x
    // f = currentZoomSet.NMViewBuff.y
    // new start
    let old_x = currentZoomSet.NMCanvasStart.x - currentZoomSet.NMCanvasCenter.x;
    let old_y = currentZoomSet.NMCanvasStart.y - currentZoomSet.NMCanvasCenter.y;
    let new_x = a * old_x + c * old_y + e;
    let new_y = b * old_x + d * old_y + f;
    newZoomSet.NMCanvasStart.x = buff_x + currentZoomSet.NMCanvasCenter.x + new_x;
    newZoomSet.NMCanvasStart.y = buff_x + currentZoomSet.NMCanvasCenter.y + new_y;
    // new end
    old_x = currentZoomSet.NMCanvasEnd.x - currentZoomSet.NMCanvasCenter.x;
    old_y = currentZoomSet.NMCanvasEnd.y - currentZoomSet.NMCanvasCenter.y;
    new_x = a * old_x + c * old_y + e;
    new_y = b * old_x + d * old_y + f;
    newZoomSet.NMCanvasEnd.x = buff_x + currentZoomSet.NMCanvasCenter.x + new_x;
    newZoomSet.NMCanvasEnd.y = buff_x + currentZoomSet.NMCanvasCenter.y + new_y;
    currentZoomSet.NMCanvasOffsetBuff.x = buff_x;
    currentZoomSet.NMCanvasOffsetBuff.y = buff_y;
    // this.isShowZoomCenter = true
    return {
      buff_x, buff_y
    };
  }
}
