/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import vue from 'vue';
import type { VNode, RendererNode, RendererElement } from 'vue';
import type {
  RelationGraphProps, RelationGraphInstance, RGJsonData, RGLayouter, RGOptions, RGRefreshCallback,
  RGLineSlotProps, RGNodeSlotProps
} from './types';

import BidirectionalTreeLayouter from './types/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/layouters/SeeksForceLayouter';
import SeeksBaseLayouter from "./types/layouters/SeeksBaseLayouter";
import * as SeeksRGLink from './types/models/RGLink';
import * as SeeksRGNode from './types/models/RGNode';
import * as SeeksRGOptions from './types/models/RGOptions';
import * as SeeksRGLayouter from './types/models/RGLayouter';
import {RelationGraphFinal} from "./types/models/RelationGraphFinal";
import * as _RGNodesAnalytic from "../packages/relation-graph-models/utils/RGNodesAnalytic";
import * as _RGEffectUtils from "../packages/relation-graph-models/utils/RGEffectUtils";

export * from './types/types';


export declare const Layout: {
  BaseLayouter: typeof SeeksBaseLayouter;
  BidirectionalTreeLayouter: typeof BidirectionalTreeLayouter;
  CenterLayouter: typeof CenterLayouter;
  CircleLayouter: typeof CircleLayouter;
  FixedLayouter: typeof FixedLayouter;
  ForceLayouter: typeof ForceLayouter;
};
export declare const RelationGraphCore: typeof RelationGraphFinal;
export declare const RGLayouterUtils: typeof SeeksRGLayouter;
export declare const RGOptionsUtils: typeof SeeksRGOptions;
export declare const RGLinkUtils: typeof SeeksRGLink;
export declare const RGNodeUtils: typeof SeeksRGNode;
export declare const RGGraphMath: typeof RGGraphMath;
export declare const RGNodesAnalyticUtils: typeof _RGNodesAnalytic;
export declare const RGEffectUtils: typeof _RGEffectUtils;
export declare const BaseLayouter: typeof SeeksBaseLayouter;
export declare class GraphToolBar extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RelationGraphComponent extends vue {
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
    'canvas-plug': VNode[];
    'tool-bar': VNode[];
    'mini-view': VNode[];
    'graph-plug': VNode[];
    node: VNode<RendererNode, RendererElement, RGNodeSlotProps>[];
    line: VNode<RendererNode, RendererElement, RGLineSlotProps>[];
  };
}
export declare const version: string;
export default RelationGraphComponent;
