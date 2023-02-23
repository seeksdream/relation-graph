import { devLog, isSupportTouch } from '@/utils/RGCommon';

let __tmp_startPositionModel = { x: 0, y: 0 };
const __tmp_startNodeInfo = { x: 0, y: 0 };
const __tmp_startEventInfo = { x: 0, y: 0 };
let callback_ondragging;
let callback_ondraged;
const getClientPosition = (e) => {
  const clientPosition = {
    clientX: 0,
    clientY: 0
  };
  if (isSupportTouch) {
    const touches = e.touches || e.targetTouches;
    if (!touches) {
      throw new Error('error targetTouches');
    }
    clientPosition.clientX = touches[0].clientX;
    clientPosition.clientY = touches[0].clientY;
  } else {
    clientPosition.clientX = e.clientX;
    clientPosition.clientY = e.clientY;
  }
  return clientPosition;
};
const RGEffectUtils = {
  startDrag(e, startPositionModel, ondraged, ondragging) {
    if (ondragging) {
      callback_ondragging = (ex, ey, event) => {
        const offsetX = (ex - __tmp_startEventInfo.x);
        const offsetY = (ey - __tmp_startEventInfo.y);
        ondragging(offsetX, offsetY, __tmp_startNodeInfo, __tmp_startEventInfo, event);
      };
    } else {
      callback_ondragging = (ex, ey) => {
        __tmp_startPositionModel.x = __tmp_startNodeInfo.x + (ex - __tmp_startEventInfo.x);
        __tmp_startPositionModel.y = __tmp_startNodeInfo.y + (ey - __tmp_startEventInfo.y);
      };
    }
    callback_ondraged = ondraged;
    __tmp_startPositionModel = startPositionModel;
    __tmp_startNodeInfo.x = __tmp_startPositionModel.x;
    __tmp_startNodeInfo.y = __tmp_startPositionModel.y;

    devLog('[canvas]onDragStart...', isSupportTouch, e);
    try {
      const clientPosition = getClientPosition(e);
      __tmp_startEventInfo.x = clientPosition.clientX;
      __tmp_startEventInfo.y = clientPosition.clientY;
      if (isSupportTouch) {
        // e.stopPropagation();
        e.preventDefault();
        document.body.addEventListener('touchmove', RGEffectUtils.onNodeMove);
        document.body.addEventListener('touchend', RGEffectUtils.onNodeDragend);
      } else {
        document.body.addEventListener('mousemove', RGEffectUtils.onNodeMove);
        document.body.addEventListener('mouseup', RGEffectUtils.onNodeDragend);
      }
    } catch (e) {
      console.error(e.message);
    }
  },
  onNodeMove(e) {
    const clientPosition = getClientPosition(e);
    callback_ondragging(clientPosition.clientX, clientPosition.clientY, e);
  },
  onNodeDragend(e) {
    if (isSupportTouch) {
      document.body.removeEventListener('touchmove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('touchend', RGEffectUtils.onNodeDragend);
    } else {
      document.body.removeEventListener('mousemove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('mouseup', RGEffectUtils.onNodeDragend);
    }
    devLog('Node dragend');
    if (callback_ondraged) {
      callback_ondraged(
        __tmp_startPositionModel.x - __tmp_startNodeInfo.x,
        __tmp_startPositionModel.y - __tmp_startNodeInfo.y,
        e
      );
    }
  },
  transName4Circle(name) {
    let _thisLevel = 0;
    let _thisLevelCharsArr = [];
    const result = [];
    for (const element of name) {
      _thisLevelCharsArr.push(element);
      if (_thisLevelCharsArr.length === circle_node_text_set[_thisLevel]) {
        result.push(_thisLevelCharsArr.join(''));
        _thisLevel++;
        _thisLevelCharsArr = [];
      }
    }
    if (_thisLevelCharsArr.length > 0) {
      result.push(_thisLevelCharsArr.join(''));
    }
    // if (result.length < 3) {
    //   result.unshift('')
    //   if (result.length < 3) {
    //     result.unshift('')
    //     if (result.length < 3) {
    //       result.unshift('')
    //     }
    //   }
    // }
    return result.join('<br>');
  },
  getColorId(color) {
    color = color.replace('#', '');
    color = color.replace('(', '');
    color = color.replace(')', '');
    color = color.replace(/,/, '-');
    return color;
  }
};

const circle_node_text_set = [4, 5, 6, 4, 2, 100];
export default RGEffectUtils;
