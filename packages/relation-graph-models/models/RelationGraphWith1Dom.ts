import { RelationGraphBase } from './RelationGraphBase';
import {RGEventEmitHook, RGEventNames, RGListeners, RGNode, RGOptions} from '../types';
import {devLog} from "../utils/RGCommon";
export class RelationGraphWith1Dom extends RelationGraphBase {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $dom:HTMLDivElement;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $canvasDom:HTMLDivElement;
  protected resizeObserver: ResizeObserver;
  protected resizeListenerMap = new WeakMap();
  protected nodeMap = new WeakMap();
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      // console.log('xxxxxxxxxxxxxxxxxx:ResizeObserver:', entries.length, Object.entries(this.nodeMap).length);
      for (const entry of entries) {
        const resizeHandler = this.resizeListenerMap.get(entry.target);
        if (resizeHandler) {
          if (entry.borderBoxSize) {
            resizeHandler(entry.borderBoxSize[0].inlineSize, entry.borderBoxSize[0].blockSize);
          } else {
            resizeHandler(entry.target.clientWidth, entry.target.clientHeight);
          }
        } else {
          if (entry.borderBoxSize) {
            this._onNodeResize(entry.target, entry.borderBoxSize[0].inlineSize, entry.borderBoxSize[0].blockSize);
          } else {
            this._onNodeResize(entry.target, entry.target.clientWidth, entry.target.clientHeight);
          }
        }
      }
    });
  }

  /**
   * [Used internally by relation-graph] This method will be called after the RelationGraph component is mounted, to facilitate DOM operations in the JS instance object (this will only obtain visual information of the DOM and monitor changes in size and position).
   * @param relationGraphDom:HTMLDivElement RelationGraph container DOM
   */
  setDom(relationGraphDom:HTMLDivElement) {
    this.$dom = relationGraphDom;
    this.addResizeListener(this.$dom, (width, height) => {
      devLog('resizeListener:this.$dom');
      this.refreshNVAnalysisInfo();
      this.updateEasyView();
      setTimeout(() => {
        devLog('resizeListener:updateVisbleViewNodes');
        this.zoom(-1);
        this.zoom(1);
        this.emitEvent(RGEventNames.viewResize, { width, height });
      }, 500);
      // await this.setZoom(100);
      // await this.moveToCenter();
      // await this.zoomToFit();
    });
  }
  /**
   * [Used internally by relation-graph] This method will be called after the RelationGraph component's canvas element is mounted, to facilitate DOM operations in the JS instance object (this will only obtain visual information of the DOM and monitor changes in size and position).
   * @param relationGraphDom:HTMLDivElement canvas DOM
   */
  setCanvasDom(canvasDom:HTMLDivElement) {
    this.$canvasDom = canvasDom;
  }

  /**
   * Get the RelationGraph component DOM
   * @return relationGraphDom:HTMLDivElement RelationGraph container DOM
   */
  getBoundingClientRect() {
    return this.$dom.getBoundingClientRect();
  }

  /**
   * Monitor the size changes of a DOM element using ResizeObserver
   * @param dom
   * @param callback
   * @protected
   */
  protected addResizeListener(dom: HTMLElement, callback: (width: number, height: number) => void) {
    this.resizeListenerMap.set(dom, callback);
    this.resizeObserver.observe(dom);
  }

  /**
   * Node DOM resize event handler
   * @param dom
   * @param width
   * @param height
   * @private
   */
  private _onNodeResize(dom: Element, width: number, height: number) {
    if (width === 0 || height === 0) {
      return;
    }
    const node: RGNode = this.nodeMap.get(dom);
    const _ow = node.el.offsetWidth;
    const _oh = node.el.offsetHeight;
    // console.log('Node resized:', node.id, _ow, ',', _oh, ' > ', width, ',', height);
    if (node) {
      if (_ow !== width || _oh !== height) {
        // console.log('Node resized:', node.id, _ow, ',', _oh, ' > ', width, ',', height);
        devLog('Node resized:', node.id, _ow, ',', _oh, ' > ', width, ',', height);
        this.updateNodeOffsetSize(node, width, height);
      }
    }
  }

  /**
   * [Used internally by relation-graph] This method is called when the Node component is mounted to monitor changes in the size of the Node's DOM element.
   * @param dom The DOM element corresponding to the Node component
   * @param node The JS data object of the Node
   */
  addNodeResizeListener(dom: HTMLElement, node: RGNode) {
    this.nodeMap.set(dom, node);
    this.resizeObserver.observe(dom);
  }

  /**
   * [Used internally by relation-graph] This method is called when the Node component is destroyed to remove monitoring of the corresponding DOM element of the Node.
   * @param dom The DOM element corresponding to the Node component
   */
  removeNodeResizeListener(dom: HTMLElement) {
    this.nodeMap.delete(dom);
    this.resizeObserver.unobserve(dom);
  }

  /**
  * Remove size change monitoring for the DOM element
  * @param dom
  * @protected
  */
  protected removeResizeListener(dom: HTMLElement) {
    this.resizeListenerMap.delete(dom);
    this.resizeObserver.unobserve(dom);
  }
}
