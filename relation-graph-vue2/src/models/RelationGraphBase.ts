import { devLog } from '../utils/RGCommon';
import { newInstanceOptions } from './RGOptions';
import { RGListeners, RGOptions, RGOptionsFull } from '../types';
export class RelationGraphBase {
  options!: RGOptionsFull;
  listeners: RGListeners;
  isReact = false;
  constructor(options: RGOptions, listeners: RGListeners) {
    this.listeners = listeners;
    this.options = newInstanceOptions(options);
    devLog('new RelationGraph:', this);
  }
  enableDebugLog(enable:boolean) {
    this.options.debug = enable;
    if (window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.relationGraphDebug = enable;
    }
  }
  updateViewHook: () => void = () => {
    // do nothing
  };
  setUpdateViewHook(hook: () => void) {
    this.isReact = true;
    this.updateViewHook = hook;
  }
  protected _dataUpdated() {
    // console.log('_dataUpdated:');
    this.updateViewHook();
  }
}
