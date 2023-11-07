import { RelationGraphBase } from './RelationGraphBase';
import { RGListeners, RGOptions } from '../types';
export class RelationGraphWith1Dom extends RelationGraphBase {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $dom:HTMLDivElement;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  $canvasDom:HTMLDivElement;
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  setDom(relationGraphDom:HTMLDivElement) {
    this.$dom = relationGraphDom;
  }
  setCanvasDom(canvasDom:HTMLDivElement) {
    this.$canvasDom = canvasDom;
  }
  getBoundingClientRect() {
    return this.$dom.getBoundingClientRect();
  }
}
