/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import {InjectionKey, VueElement, Ref} from 'vue';
import type { VNode, RendererNode, RendererElement } from 'vue';
import type {
  RelationGraphInstance,
  RGNode,
  RGLine,
  RGLink,
  RGJsonData,
  RGLayouter,
  RGOptions,
  RGRefreshCallback,
  RGUserEvent, RGLayoutOptions, RGEventTargetType, RGSelectionView, RGPosition, RGLineSlotProps, RGNodeSlotProps
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
import * as _RGNodesAnalyticUtils from "./types/utils/RGNodesAnalytic";
import * as _RGEffectUtils from "./types/utils/RGEffectUtils";

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
export declare const RGNodesAnalyticUtils: typeof _RGNodesAnalyticUtils;
export declare const RGEffectUtils: typeof _RGEffectUtils;
export declare const BaseLayouter: typeof SeeksBaseLayouter;


export declare const graphInstanceKey: string;
export declare const graphDataKey: string;
export declare const graphKey: string;

export type RelationGraphProps = {
  options: RGOptions;
  relationGraphCore?: any;
  onNodeClick?: (node: RGNode, e: RGUserEvent) => boolean | void;
  onNodeExpand?: (node: RGNode, e: RGUserEvent) => boolean | void;
  onNodeCollapse?: (node: RGNode, e: RGUserEvent) => boolean | void;
  onLineClick?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean | void;
  onImageDownload?: (dom: HTMLElement, format: string) => boolean | void;
  onImageSaveAsFile?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean | void;
  beforeChangeLayout?: (newLayoutOptions: RGLayoutOptions) => boolean | void;
  onNodeDragStart?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => RGPosition | undefined
  onCanvasDragEnd?: (e: RGUserEvent) => void;
  onContextmenu?: (e: RGUserEvent, objectType: RGEventTargetType, object: RGNode | RGLink | undefined) => void;
  onFullscreen?: (newValue:boolean) => void
  onCanvasClick?: (e: RGUserEvent) => void;
  onCanvasSelectionEnd?: (selectionView: RGSelectionView, e: RGUserEvent) => void;
  onZoomEnd?: () => void
};
export declare class GraphToolBar extends VueElement {
  $slots: {
    default: VNode[];
  };
}
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
