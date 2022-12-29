export const getScreenWidth = () => {
  return window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
};
export const getScreenHeight = () => {
  return window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
};
export let isSupportTouch = false;
const isSupportTouchCheck = () => {
  try {
    document.createEvent('TouchEvent');
    isSupportTouch = true;
  } catch (e) {
    // xx
  }
};
isSupportTouchCheck();
export const devLog = (...args) => {
  if ((typeof window !== 'undefined' && window.relationGraphDebug))console.log('[relation-graph:debug]', ...args);
};
