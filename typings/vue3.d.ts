/**
 * relation-graph
 * Website: https://ssl.relation-graph.com/
 *          http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import { VueElement } from 'vue';
import type { VNode } from 'vue';
import type { RelationGraphProps, RelationGraphInstance, RGJsonData, RGLayouter, RGOptions, RGRefreshCallback } from './types';

import BidirectionalTreeLayouter from './types/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/layouters/SeeksForceLayouter';
import * as SeeksRGLink from './types/models/RGLink';
import * as SeeksRGNode from './types/models/RGNode';
import * as SeeksRGOptions from './types/models/RGOptions';
import * as SeeksRGLayouter from './types/models/RGLayouter';

export * from './types/types';


export declare const Layout: {
  BidirectionalTreeLayouter: typeof BidirectionalTreeLayouter;
  CenterLayouter: typeof CenterLayouter;
  CircleLayouter: typeof CircleLayouter;
  FixedLayouter: typeof FixedLayouter;
  ForceLayouter: typeof ForceLayouter;
};
export declare const RGLayouterUtils: typeof SeeksRGLayouter;
export declare const RGOptionsUtils: typeof SeeksRGOptions;
export declare const RGLinkUtils: typeof SeeksRGLink;
export declare const RGNodeUtils: typeof SeeksRGNode;


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
