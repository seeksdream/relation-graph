import { RGListeners, RGOptions } from '../types';
import {RelationGraphWith92MiniView} from "./RelationGraphWith92MiniView";

export class RelationGraphFinal extends RelationGraphWith92MiniView {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners);
  }

  /**
    * [Used internally by relation-graph], this method will be called to initialize some configurations based on options (such as creating a layouter based on the options.layout configuration), and to obtain information such as viewport size.
    */
  ready() {
    this.initLayouter();
    this.resetViewSize(true);
    this.refreshNVAnalysisInfo();
  }
}
