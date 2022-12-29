import { RelationGraphWithData } from '@/models/RelationGraphWithData';
import screenfull from 'screenfull';
export class RelationGraphWithDom extends RelationGraphWithData {
  $dom;
  $canvasDom;
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super(...arguments);
  }
  setDom(relationGraphDom) {
    this.$dom = relationGraphDom;
  }
  setCanvasDom(canvasDom) {
    this.$canvasDom = canvasDom;
  }
  fullscreen(newValue) {
    if (newValue === undefined) {
      this.options.fullscreen = !this.options.fullscreen;
      screenfull.toggle(this.$dom).then(() => {
        setTimeout(() => {
          this.refreshNVAnalysisInfo();
        }, 1000);
      });
    } else {
      this.options.fullscreen = newValue;
      setTimeout(() => {
        this.refreshNVAnalysisInfo();
      }, 1000);
    }
  }
}
