import { devLog } from '../utils/RGCommon';
import { newInstanceOptions } from './RGOptions';
import {RGEventHandler, RGListeners, RGOptions, RGOptionsFull} from '../types';
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
  _dataUpdating = false;
  _dataUpdatingNext = false;
  protected _dataUpdated() {
    if (this._dataUpdating) {
      this._dataUpdatingNext = true;
      return;
    }
    this._dataUpdating = true;
    requestAnimationFrame(this._doSomethingAfterDataUpdated.bind(this));
  }
  private _doSomethingAfterDataUpdated() {
    devLog('_dataUpdated:', this._dataUpdatingNext);
    // console.error('_dataUpdated:', this._dataUpdatingNext);
    this._dataUpdating = true;
    this.updateVisbleViewNodes();
    this.updateEasyView();
    this.updateViewHook();
    this._dataUpdating = false;
    if (this._dataUpdatingNext) {
      this._dataUpdatingNext = false;
      // this._doSomethingAfterDataUpdated();
      requestAnimationFrame(this._doSomethingAfterDataUpdated.bind(this));
    }
  }
  eventHandlers: RGEventHandler[] = [];
  addEventListener(handler:RGEventHandler) {
    this.eventHandlers.push(handler);
  }
  removeEventListener(handler:RGEventHandler) {
    const index = this.eventHandlers.indexOf(handler);
    index !== -1 && this.eventHandlers.splice(index, 1);
  }
  emitEvent(eventName:string, object: {[option: string]:any}) {
    for (const handler of this.eventHandlers) {
      handler(eventName, object)
    }
  }
}
