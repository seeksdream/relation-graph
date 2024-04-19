import { RelationGraphWith8Update } from './RelationGraphWith8Update';
import { RGListeners, RGOptions } from '../types';
import {RelationGraphWith9EasyView} from "./RelationGraphWith9EasyView";

export class RelationGraphFinal extends RelationGraphWith9EasyView {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  ready() {
    this.initLayouter();
    this.resetViewSize();
    this.refreshNVAnalysisInfo();
  }
}
