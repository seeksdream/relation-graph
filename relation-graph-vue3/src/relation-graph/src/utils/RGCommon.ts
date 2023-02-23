import * as screenfull from 'screenfull'
import * as html2canvas from 'html2canvas'
import { version } from '../../../constants'

export const getScreenWidth = () => {
  return window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width
}
export const getScreenHeight = () => {
  return window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height
}
export const getLightColor = (col: string) => {
  if (col[0] === '#') {
    let _s = col.slice(1)
    if (_s.length === 3) {
      _s = _s[0] + _s[0] + _s[1] + _s[1] + _s[2] + _s[2]
    }
    const _rgb_arr = [
      Number.parseInt(`${_s[0]}${_s[1]}`, 16),
      Number.parseInt(`${_s[2]}${_s[3]}`, 16),
      Number.parseInt(`${_s[4]}${_s[5]}`, 16),
    ]
    devLog('getLightColor1:', col, ':', _rgb_arr.join(','))
    col = `rgb(${_rgb_arr.join(',')})`
  }
  let _st = col.slice(Math.max(0, col.indexOf('(') + 1))
  _st = _st.slice(0, Math.max(0, _st.indexOf(')')))
  const _rgb_string = _st.split(',')
  if (_rgb_string.length >= 3) {
    const _rgb_number = [
      Math.round(Number.parseInt(_rgb_string[0]) * 0.9),
      Math.round(Number.parseInt(_rgb_string[1]) * 0.9),
      Math.round(Number.parseInt(_rgb_string[2]) * 0.9),
    ]
    devLog('getLightColor2:', col, ':', _rgb_number.join(','))
    const lightColor = `rgb(${_rgb_number.join(',')}, 0.3)`
    return lightColor
  } else {
    return col
  }
}
export const getTextSize = (text: string) => {
  if (!text) return 0;
  let width = 0
  for (const _thisChar of text) {
    const _charCode = _thisChar.charCodeAt(0)
    if (_charCode < 0 || _charCode > 255) {
      width += 2
    } else {
      width++
    }
  }
  return width
}

export const mergeRGObject = (
  oldObj: { [key: string]: any },
  newObj: { [key: string]: any }
) => {
  Object.keys(newObj).forEach((key) => {
    oldObj[key] = newObj[key]
  })
  return oldObj
}

export let isSupportTouch = false
const isSupportTouchCheck = () => {
  try {
    document.createEvent('TouchEvent')
    isSupportTouch = true
  } catch {
    // xx
  }
}
isSupportTouchCheck()
export const devLog = (...args: any[]) => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window['relationGraphDebug'])
    console.log('[relation-graph:debug]', ...args)
}
export const relationGraphVersion = version
export const relationGraphVersionInfo = () => {
  console.log(
    `%c relation-graph/vue3 %c Version v${version} %c More info: https://github.com/seeksdream/relation-graph %c`,
    'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:#fff ; padding: 1px; border-radius: 0 3px 3px 0;  color: #41b883',
    'background:transparent'
  )
  if (!screenfull) {
    console.error(
      '[relation-graph]Please introduce component screenfull, for example:https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/5.1.0/screenfull.min.js'
    )
  }
  if (!html2canvas) {
    console.error(
      '[relation-graph]Please introduce component html2canvas, for example:https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
    )
  }
}
