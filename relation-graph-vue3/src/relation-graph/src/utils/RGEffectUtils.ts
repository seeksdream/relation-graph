import { devLog, isSupportTouch } from '../utils/RGCommon'
import type { RGDragedCallback, RGDraggingCallback } from '../RelationGraph'

let __tmp_startPositionModel = { x: 0, y: 0 }
const __tmp_startNodeInfo = { x: 0, y: 0 }
const __tmp_startEventInfo = { x: 0, y: 0 }
export declare type RGDraggingFn = (
  offsetX: number,
  offsetY: number,
  event: MouseEvent | TouchEvent
) => void
let callback_ondragging: RGDraggingFn
let callback_ondraged: RGDragedCallback | undefined
const getClientPosition = (e: MouseEvent | TouchEvent) => {
  const clientPosition = {
    clientX: 0,
    clientY: 0,
  }
  if (isSupportTouch) {
    const te = e as TouchEvent
    const touches = te.touches || te.targetTouches
    if (!touches) {
      throw new Error('error targetTouches')
    }
    clientPosition.clientX = touches[0].clientX
    clientPosition.clientY = touches[0].clientY
  } else {
    const te = e as MouseEvent
    clientPosition.clientX = te.clientX
    clientPosition.clientY = te.clientY
  }
  return clientPosition
}
const RGEffectUtils = {
  startDrag(
    e: MouseEvent | TouchEvent,
    startPositionModel: { x: number; y: number },
    ondraged?: RGDragedCallback,
    ondragging?: RGDraggingCallback
  ) {
    if (ondragging) {
      callback_ondragging = (ex, ey, event) => {
        const offsetX = ex - __tmp_startEventInfo.x
        const offsetY = ey - __tmp_startEventInfo.y
        ondragging(
          offsetX,
          offsetY,
          __tmp_startNodeInfo,
          __tmp_startEventInfo,
          event
        )
      }
    } else {
      callback_ondragging = (ex, ey) => {
        __tmp_startPositionModel.x =
          __tmp_startNodeInfo.x + (ex - __tmp_startEventInfo.x)
        __tmp_startPositionModel.y =
          __tmp_startNodeInfo.y + (ey - __tmp_startEventInfo.y)
      }
    }
    callback_ondraged = ondraged
    __tmp_startPositionModel = startPositionModel
    __tmp_startNodeInfo.x = __tmp_startPositionModel.x
    __tmp_startNodeInfo.y = __tmp_startPositionModel.y

    devLog('[canvas]onDragStart...', isSupportTouch, e)
    try {
      const clientPosition = getClientPosition(e)
      __tmp_startEventInfo.x = clientPosition.clientX
      __tmp_startEventInfo.y = clientPosition.clientY
      if (isSupportTouch) {
        // e.stopPropagation();
        e.preventDefault()
        document.body.addEventListener('touchmove', RGEffectUtils.onNodeMove)
        document.body.addEventListener('touchend', RGEffectUtils.onNodeDragend)
      } else {
        document.body.addEventListener('mousemove', RGEffectUtils.onNodeMove)
        document.body.addEventListener('mouseup', RGEffectUtils.onNodeDragend)
      }
    } catch (e: any) {
      console.error(e.message)
    }
  },
  onNodeMove(e: MouseEvent | TouchEvent) {
    const clientPosition = getClientPosition(e)
    callback_ondragging(clientPosition.clientX, clientPosition.clientY, e)
  },
  onNodeDragend(e: MouseEvent | TouchEvent) {
    if (isSupportTouch) {
      document.body.removeEventListener('touchmove', RGEffectUtils.onNodeMove)
      document.body.removeEventListener('touchend', RGEffectUtils.onNodeDragend)
    } else {
      document.body.removeEventListener('mousemove', RGEffectUtils.onNodeMove)
      document.body.removeEventListener('mouseup', RGEffectUtils.onNodeDragend)
    }
    devLog('Node dragend')
    if (callback_ondraged) {
      callback_ondraged(
        __tmp_startPositionModel.x - __tmp_startNodeInfo.x,
        __tmp_startPositionModel.y - __tmp_startNodeInfo.y,
        e
      )
    }
  },
  getColorId(color: string) {
    color = color.replace('#', '')
    color = color.replace('(', '')
    color = color.replace(')', '')
    color = color.replace(/,/, '-')
    return color
  },
}

// const circle_node_text_set = [4, 5, 6, 4, 2, 100]
export default RGEffectUtils
