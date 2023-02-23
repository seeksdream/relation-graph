import screenfull from 'screenfull'
import { RelationGraphWithData } from '../models/RelationGraphWithData'
import type { RGListeners, RGOptions } from '../RelationGraph'
export class RelationGraphWithDom extends RelationGraphWithData {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners)
  }
  $dom: HTMLElement | undefined
  $canvasDom: HTMLElement | undefined
  setDom(relationGraphDom: HTMLElement) {
    this.$dom = relationGraphDom
  }
  setCanvasDom(canvasDom: HTMLElement) {
    this.$canvasDom = canvasDom
  }
  fullscreen(newValue?: boolean) {
    if (newValue === undefined) {
      this.options.fullscreen = !this.options.fullscreen
      screenfull.toggle(this.$dom).then(() => {
        setTimeout(() => {
          this.refreshNVAnalysisInfo()
        }, 1000)
      })
    } else {
      this.options.fullscreen = newValue
      setTimeout(() => {
        this.refreshNVAnalysisInfo()
      }, 1000)
    }
  }
}
