import { devLog } from '../utils/RGCommon'
import { createDefaultOptions } from './RGOptions'
import type { RGListeners, RGOptions, RGOptionsFull } from '../RelationGraph'
let graphInstanceIndex = 0
export class RelationGraphBase {
  instanceId = ''
  options!: RGOptionsFull
  listeners: RGListeners
  constructor(options: RGOptions, listeners: RGListeners) {
    this.listeners = listeners
    this.options = createDefaultOptions(options)
    this.enableDebugLog(this.options.debug)
    this.instanceId = `RGIns-${graphInstanceIndex++}`
    this.options.instanceId = this.instanceId
    devLog('new RelationGraph:', this)
  }
  enableDebugLog(enable: boolean) {
    this.options.debug = enable
    // @ts-ignore
    if (window) window['relationGraphDebug'] = enable
  }
  refreshNVAnalysisInfo() {
    devLog('[interface]refreshNVAnalysisInfo')
  }
  resetViewSize() {
    devLog('[interface]resetViewSize')
  }
  doLayout() {
    devLog('[interface]doLayout')
  }
}
