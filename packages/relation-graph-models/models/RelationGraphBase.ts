import {devLog} from '../utils/RGCommon';
import {newInstanceOptions} from './RGOptions';
import {RGEventEmitHook, RGEventHandler, RGEventNames, RGListeners, RGOptions, RGOptionsFull} from '../types';

export class RelationGraphBase {
  options!: RGOptionsFull;
  listeners: RGListeners;
  isReact = false;
  constructor(options: RGOptions, listeners: RGListeners) {
    this.listeners = listeners;
    this.options = newInstanceOptions(options);
    devLog('new RelationGraph:', this);
  }

  /**
   * * Enable or disable logging functionality
   * @param enable
   */
  enableDebugLog(enable:boolean) {
    this.options.debug = enable;
    if (window) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.relationGraphDebug = enable;
    }
  }

  /**
   * Protected method, For react only
   */
  protected updateViewHook: () => void = () => {
    // do nothing
  };

  /**
   * * Used to trigger the external function for updating the view (currently only for React)
   * @param hook
   */
  setUpdateViewHook(hook: () => void) {
    this.isReact = true;
    this.updateViewHook = hook;
  }
  protected _dataUpdating = false;
  protected _dataUpdatingNext = false;
  /**
   * Trigger view update
   * @private
   */
  protected _dataUpdated() {
    // if (this._dataUpdating) {
    //   this._dataUpdatingNext = true;
    //   return;
    // }
    // this._dataUpdating = true;
    requestAnimationFrame(this._doSomethingAfterDataUpdated.bind(this));
  }

  /**
   * Trigger view update
   * @private
   */
  private _doSomethingAfterDataUpdated() {
    devLog('_dataUpdated:', this._dataUpdatingNext);
    // console.error('_dataUpdated:', this._dataUpdatingNext);
    // this._dataUpdating = true;
    this.updateVisbleViewNodes();
    this.updateEasyView();
    this.updateViewHook();
    // this._dataUpdating = false;
    // if (this._dataUpdatingNext) {
    //   this._dataUpdatingNext = false;
    //   // this._doSomethingAfterDataUpdated();
    //   requestAnimationFrame(this._doSomethingAfterDataUpdated.bind(this));
    // }
  }
  protected eventHandlers: RGEventHandler[] = [];

  /**
   * * Register event handler
   * @param handler: RGEventHandler
   */
  addEventListener(handler:RGEventHandler) {
    // console.log('xxxxxxxxxxx:addEventListener');
    if (!this.eventHandlers.includes(handler)) this.eventHandlers.push(handler);
  }
  /**
   * * Remove event handler
   * @param handler: RGEventHandler
   */
  removeEventListener(handler:RGEventHandler) {
    const index = this.eventHandlers.indexOf(handler);
    index !== -1 && this.eventHandlers.splice(index, 1);
  }

  protected _hook: RGEventEmitHook;

  /**
   * * Set the event hook, For Vue2,Vue3 only
   * @param hook
   */
  setEventEmitHook(hook: RGEventEmitHook) {
    this._hook = hook;
  }
  /**
   * Trigger event
   * @param eventName Name of the event
   * @param object Parameters passed to the event handler
   */
  emitEvent(eventName: RGEventNames, ...args: any[]) {
    let {result, handled} = this.defaultEventHandler(eventName, ...args);
    for (const handler of this.eventHandlers) {
      const customResult = handler(eventName, ...args);
      devLog('[custom event Handler]', handler, eventName, ' => ', customResult);
      if (result !== undefined) {
        result = customResult;
      }
    }
    if (!handled) {
      if (this._hook) {
        const hookReture = this._hook(eventName, ...args, (customReturnValue:any) => {
          if (customReturnValue !== undefined) {
            result = customReturnValue;
          }
        });
        devLog('[custom event hook]', eventName, ' => ', hookReture);
        if (hookReture !== undefined) {
          result = hookReture;
        }
      }
    }
    if (result !== undefined) {
      return result;
    }
  }

  /**
   * Protected Method to trigger the default event handler, i.e., trigger the events set in jsx
   * @param eventName
   * @param args
   * @protected
   */
  protected defaultEventHandler(eventName: RGEventNames, ...args: any[]) {
    let result;
    let handled = false;
    if (eventName === RGEventNames.nodeDragStart) {
      if (this.listeners.onNodeDragStart) {
        handled = true;
        this.listeners.onNodeDragStart(args[0], args[1]);
      }
    } else if (eventName === RGEventNames.nodeDragging) {
      // console.log('xxxxxxxxxxx:emitEvent', eventName);
      if (this.listeners.onNodeDragging) {
        handled = true;
        const node = args[0];
        const x = args[1];
        const y = args[2];
        // const buff_x = args[3];
        // const buff_y = args[4];
        const e = args[5];
        result = this.listeners.onNodeDragging(node, x, y, e);
      }
    } else if (eventName === RGEventNames.onCanvasDragging) {
      // console.log('xxxxxxxxxxx:emitEvent', eventName);
      if (this.listeners.onCanvasDragging) {
        handled = true;
        const newX = args[0];
        const newY = args[1];
        const buffX = args[2];
        const buffY = args[3];
        result = this.listeners.onCanvasDragging(newX, newY, buffX, buffY);
      }
    } else if (eventName === RGEventNames.nodeDragEnd) {
      const node = args[0];
      const e = args[1];
      const x_buff = args[2];
      const y_buff = args[3];
      if (this.listeners.onNodeDragEnd) {
        handled = true;
        this.listeners.onNodeDragEnd(node, e, x_buff, y_buff);
      }
    } else if (eventName === RGEventNames.onZoomEnd) {
      if (this.listeners.onZoomEnd) {
        handled = true;
        this.listeners.onZoomEnd();
      }
    } else if (eventName === RGEventNames.beforeChangeLayout) {
      if (this.listeners.beforeChangeLayout) {
        handled = true;
        const newLayoutOptions = args[0];
        return this.listeners.beforeChangeLayout(newLayoutOptions);
      }
    } else if (eventName === RGEventNames.onNodeClick) {
      if (this.listeners.onNodeClick) {
        handled = true;
        const node = args[0];
        const e = args[1];
        this.listeners.onNodeClick(node, e);
      }
    } else if (eventName === RGEventNames.onImageDownload) {
      if (this.listeners.onImageDownload) {
        handled = true;
        const canvasDom = args[0];
        const format = args[1];
        result = this.listeners.onImageDownload(canvasDom, format);
      }
    } else if (eventName === RGEventNames.onImageSaveAsFile) {
      if (this.listeners.onImageSaveAsFile) {
        handled = true;
        const canvas = args[0];
        const format = args[1];
        const fileName = args[2];
        result = this.listeners.onImageSaveAsFile(
          canvas,
          format,
          fileName
        );
      }
    } else if (eventName === RGEventNames.onLineClick) {
      if (this.listeners.onLineClick) {
        handled = true;
        const line = args[0];
        const link = args[1];
        const e = args[2];
        this.listeners.onLineClick(line, link, e);
      }
    } else if (eventName === RGEventNames.onNodeExpand) {
      if (this.listeners.onNodeExpand) {
        handled = true;
        const node = args[0];
        const e = args[1];
        this.listeners.onNodeExpand(node, e);
      }
    } else if (eventName === RGEventNames.onNodeCollapse) {
      if (this.listeners.onNodeCollapse) {
        handled = true;
        const node = args[0];
        const e = args[1];
        this.listeners.onNodeCollapse(node, e);
      }
    } else if (eventName === RGEventNames.onCanvasDragEnd) {
      if (this.listeners.onCanvasDragEnd) {
        handled = true;
        const e = args[0];
        this.listeners.onCanvasDragEnd(e);
      }
    } else if (eventName === RGEventNames.onCanvasClick) {
      if (this.listeners.onCanvasClick) {
        handled = true;
        const e = args[0];
        this.listeners.onCanvasClick(e);
      }
    } else if (eventName === RGEventNames.onCanvasSelectionEnd) {
      if (this.listeners.onCanvasSelectionEnd) {
        handled = true;
        const selectionView = args[0];
        const e = args[1];
        this.listeners.onCanvasSelectionEnd(selectionView, e);
      }
    } else if (eventName === RGEventNames.onContextmenu) {
      if (this.listeners.onContextmenu) {
        handled = true;
        const e = args[0];
        const objectType = args[1];
        const object = args[2];
        this.listeners.onContextmenu(e, objectType, object);
      }
    } else if (eventName === RGEventNames.onFullscreen) {
      if (this.listeners.onFullscreen) {
        handled = true;
        const fullscreen = args[0] as boolean;
        const callback = args[1];
        result = this.listeners.onFullscreen(fullscreen, callback);
      }
    }
    return {
      result,
      handled
    }
  }
}
