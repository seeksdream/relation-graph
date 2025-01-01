import { RelationGraphBase } from './RelationGraphBase';
import {RGListeners, RGNode, RGOptions} from '../types';
import {devLog} from "../utils/RGCommon";
export class RelationGraphWith1Dom extends RelationGraphBase {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $dom:HTMLDivElement;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $canvasDom:HTMLDivElement;
  resizeObserver: ResizeObserver;
  resizeListenerMap = new WeakMap();
  nodeMap = new WeakMap();
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
    this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      // console.log('xxxxxxxxxxxxxxxxxx:ResizeObserver:', entries.length, Object.entries(this.nodeMap).length);
      for (const entry of entries) {
        const resizeHandler = this.resizeListenerMap.get(entry.target);
        if (resizeHandler) {
          resizeHandler(entry.borderBoxSize[0].inlineSize, entry.borderBoxSize[0].blockSize);
        } else {
          this._onNodeResize(entry.target, entry.borderBoxSize[0].inlineSize, entry.borderBoxSize[0].blockSize);
        }
      }
    });
  }
  setDom(relationGraphDom:HTMLDivElement) {
    devLog('setDom');
    this.$dom = relationGraphDom;
    this.addResizeListener(this.$dom, (width, height) => {
      devLog('resizeListener:this.$dom');
      this.refreshNVAnalysisInfo();
      this.updateEasyView();
      setTimeout(() => {
        devLog('resizeListener:updateVisbleViewNodes');
        this.zoom(-1);
        this.zoom(1);
        this.emitEvent('view-resize', { width, height });
      }, 500);
      // await this.setZoom(100);
      // await this.moveToCenter();
      // await this.zoomToFit();
    });
  }
  setCanvasDom(canvasDom:HTMLDivElement) {
    this.$canvasDom = canvasDom;
  }
  getBoundingClientRect() {
    return this.$dom.getBoundingClientRect();
  }
  addResizeListener(dom: HTMLElement, callback: (width: number, height: number) => void) {
    this.resizeListenerMap.set(dom, callback);
    this.resizeObserver.observe(dom);
  }
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
  addNodeResizeListener(dom: HTMLElement, node: RGNode) {
    this.nodeMap.set(dom, node);
    this.resizeObserver.observe(dom);
  }
  removeNodeResizeListener(dom: HTMLElement) {
    this.nodeMap.delete(dom);
    this.resizeObserver.unobserve(dom);
  }
  removeResizeListener(dom: HTMLElement) {
    this.resizeListenerMap.delete(dom);
    this.resizeObserver.unobserve(dom);
  }
}
