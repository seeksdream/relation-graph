import RGOptions from '@/models/RGOptions';
import { devLog } from '@/utils/RGCommon';
export class RelationGraph {
  instanceId = '';
  options;
  listeners;
  constructor(options, listeners) {
    this.listeners = listeners;
    this.options = new RGOptions(options);
    this.instanceId = this.options.instanceId;
    devLog('new RelationGraph:', this);
  }
  enableDebugLog(enable) {
    this.options.debug = enable;
    if (window) window.relationGraphDebug = enable;
  }
}
