import { RelationGraphWith8Update } from './RelationGraphWith8Update';
import { RGListeners, RGOptions } from '../types';

export class RelationGraphFinal extends RelationGraphWith8Update {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
  ready() {
    this.initLayouter();
    this.resetViewSize();
    this.refreshNVAnalysisInfo();
  }
}
