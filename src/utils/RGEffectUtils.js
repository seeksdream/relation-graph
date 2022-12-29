import { isSupportTouch } from '@/utils/RGCommon';

const __tmp_basePosition = { x: 0, y: 0 };
let __tmp_positionModel = { x: 0, y: 0 };
let __ondraged;
const __start_info = { x: 0, y: 0 };
const getClientPosition = (e) => {
  const clientPosition = {
    clientX: 0,
    clientY: 0
  };
  if (isSupportTouch) {
    if (!e.targetTouches) {
      throw new Error('error targetTouches');
    }
    clientPosition.clientX = e.targetTouches[0].clientX;
    clientPosition.clientY = e.targetTouches[0].clientY;
  } else {
    clientPosition.clientX = e.clientX;
    clientPosition.clientY = e.clientY;
  }
  return clientPosition;
};
const RGEffectUtils = {
  startDrag(e, positionModel, ondraged) {
    __ondraged = ondraged;
    // console.log('startDrag:', __tmp_basePosition, e.clientX, e.clientY)
    __tmp_positionModel = positionModel;
    __start_info.x = __tmp_positionModel.x;
    __start_info.y = __tmp_positionModel.y;

    // console.log('[canvas]onDragStart...', isSupportTouch, e);
    try {
      const clientPosition = getClientPosition(e);
      __tmp_basePosition.x = parseInt(__tmp_positionModel.x) - clientPosition.clientX;
      __tmp_basePosition.y = parseInt(__tmp_positionModel.y) - clientPosition.clientY;
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
    // console.log('move', __tmp_basePosition, clientPosition, e);
    __tmp_positionModel.x = clientPosition.clientX + __tmp_basePosition.x;
    __tmp_positionModel.y = clientPosition.clientY + __tmp_basePosition.y;
  },
  onNodeDragend(e) {
    // console.log('onNodeDragend', __tmp_positionModel.x - __start_info.x, __tmp_positionModel.y - __start_info.y)
    if (isSupportTouch) {
      document.body.removeEventListener('touchmove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('touchend', RGEffectUtils.onNodeDragend);
    } else {
      document.body.removeEventListener('mousemove', RGEffectUtils.onNodeMove);
      document.body.removeEventListener('mouseup', RGEffectUtils.onNodeDragend);
    }
    if (__ondraged) {
      __ondraged(
        __tmp_positionModel.x - __start_info.x,
        __tmp_positionModel.y - __start_info.y,
        e
      );
    }
  },
  transName4Circle(name) {
    let _thisLevel = 0;
    let _thisLevelCharsArr = [];
    const result = [];
    for (let i = 0; i < name.length; i++) {
      _thisLevelCharsArr.push(name[i]);
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
