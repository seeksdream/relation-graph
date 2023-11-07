import { devLog, isSupportTouch } from '../utils/RGCommon';
export type RGDataModelWithPosition = {
  x:number,
  y:number
};
export type RGPositionInfo = {
  x:number,
  y:number
};
export type RGDragedCallback = (buff_x:number, buff_y:number, e:MouseEvent|TouchEvent) => void;
export type RGDraggingCallback = (offsetX:number, offsetY:number, startNodeInfo:RGPositionInfo, startEventInfo:RGPositionInfo, event:MouseEvent|TouchEvent) => void;
export type RGDragging = (ex:number, ey:number, event:MouseEvent|TouchEvent) => void;
let __tmp_startPositionModel = { x: 0, y: 0 };
const __tmp_startNodeInfo:RGPositionInfo = { x: 0, y: 0 };
const __tmp_startEventInfo:RGPositionInfo = { x: 0, y: 0 };
let callback_ondragging:RGDragging;
let callback_ondraged:RGDragedCallback;
const getClientPosition = (e:MouseEvent|TouchEvent) => {
  const clientPosition = {
    clientX: 0,
    clientY: 0
  };
  if (isSupportTouch(e)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const touches = e.touches || e.targetTouches;
    if (!touches) {
      throw new Error('error targetTouches');
    }
    clientPosition.clientX = touches[0].clientX;
    clientPosition.clientY = touches[0].clientY;
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clientPosition.clientX = e.clientX;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clientPosition.clientY = e.clientY;
  }
  return clientPosition;
};
const RGEffectUtils = {
  startDrag(e:MouseEvent|TouchEvent, startPositionModel:RGDataModelWithPosition, ondraged:RGDragedCallback, ondragging:RGDraggingCallback|undefined) {
    if (ondragging) {
      callback_ondragging = (ex:number, ey:number, event:MouseEvent|TouchEvent) => {
        const offsetX = (ex - __tmp_startEventInfo.x);
        const offsetY = (ey - __tmp_startEventInfo.y);
        ondragging(offsetX, offsetY, __tmp_startNodeInfo, __tmp_startEventInfo, event);
      };
    } else {
      callback_ondragging = (ex:number, ey:number) => {
        __tmp_startPositionModel.x = __tmp_startNodeInfo.x + (ex - __tmp_startEventInfo.x);
        __tmp_startPositionModel.y = __tmp_startNodeInfo.y + (ey - __tmp_startEventInfo.y);
      };
    }
    callback_ondraged = ondraged;
    __tmp_startPositionModel = startPositionModel;
    __tmp_startNodeInfo.x = __tmp_startPositionModel.x;
    __tmp_startNodeInfo.y = __tmp_startPositionModel.y;

    devLog('[canvas]onDragStart...', isSupportTouch(e), e);
    try {
      const clientPosition = getClientPosition(e);
      __tmp_startEventInfo.x = clientPosition.clientX;
      __tmp_startEventInfo.y = clientPosition.clientY;
      if (isSupportTouch(e)) {
        // e.stopPropagation();
        document.body.addEventListener('touchmove', RGEffectUtils.onNodeMove);
        document.body.addEventListener('touchend', RGEffectUtils.onNodeDragend);
        e.preventDefault();
      } else {
        document.body.addEventListener('mousemove', RGEffectUtils.onNodeMove);
        document.body.addEventListener('mouseup', RGEffectUtils.onNodeDragend);
      }
    } catch (error:any) {
      console.error(error.message);
    }
  },
  onNodeMove(e:MouseEvent|TouchEvent) {
    const clientPosition = getClientPosition(e);
    callback_ondragging(clientPosition.clientX, clientPosition.clientY, e);
  },
  onNodeDragend(e:MouseEvent|TouchEvent) {
    if (isSupportTouch(e)) {
      document.body.removeEventListener('touchmove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('touchend', RGEffectUtils.onNodeDragend);
    } else {
      document.body.removeEventListener('mousemove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('mouseup', RGEffectUtils.onNodeDragend);
    }
    devLog('[canvas]onDragend...', isSupportTouch(e), e);
    if (callback_ondraged) {
      callback_ondraged(
        __tmp_startPositionModel.x - __tmp_startNodeInfo.x,
        __tmp_startPositionModel.y - __tmp_startNodeInfo.y,
        e
      );
    }
  }
};
export default RGEffectUtils;
