import { VueElement } from 'vue';
import type { VNode } from 'vue';
import type { RelationGraphProps, RelationGraphInstance, RGJsonData, RGLayouter, RGOptions, RGRefreshCallback } from './types';

export * from './types';
export declare class RelationGraphComponent extends VueElement {
  options: RGOptions;
  getInstance(): RelationGraphInstance;
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  );
  setJsonData(
    jsonData: RGJsonData,
    reLayoutOrCallback?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  );
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  );
  setLayouter(layouterInstance: RGLayouter);
  onGraphResize();
  refresh(callback?: RGRefreshCallback);
  focusRootNode();
  focusNodeById(nodeId: string);
  getNodeById(nodeId: string);
  removeNodeById(nodeId: string);
  getNodes();
  getLinks();
  getGraphJsonData();
  getGraphJsonOptions();
  updateView();
  $props: RelationGraphProps;
  $slots: {
    default: VNode[];
    canvasPlug: VNode[];
    miniToolBar: VNode[];
    miniViewPanel: VNode[];
    graphPlug: VNode[];
    node: VNode[];
    line: VNode[];
  };
}
export declare const version: string;
export default RelationGraphComponent;
