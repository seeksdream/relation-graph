import { RGListeners, RGOptions } from '../types';
import { RelationGraphFinal } from './RelationGraphFinal';

export class RelationGraphReact extends RelationGraphFinal {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }
}
