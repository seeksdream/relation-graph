/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
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
} from './types/relation-graph-models/types';

import BidirectionalTreeLayouter from './types/relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/relation-graph-models/layouters/SeeksForceLayouter';
import SeeksBaseLayouter from "./types/relation-graph-models/layouters/SeeksBaseLayouter";
import * as SeeksRGLink from './types/relation-graph-models/models/RGLink';
import * as SeeksRGNode from './types/relation-graph-models/models/RGNode';
import * as SeeksRGOptions from './types/relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from './types/relation-graph-models/models/RGLayouter';
import {RelationGraphFinal} from "./types/relation-graph-models/models/RelationGraphFinal";
import * as _RGNodesAnalyticUtils from "./types/relation-graph-models/utils/RGNodesAnalytic";
import * as _RGEffectUtils from "./types/relation-graph-models/utils/RGEffectUtils";
import {
  RGBackgroundProps, RGCreateLineHandleProps,
  RGMiniViewProps,
  RGToolBarProps,
  RGWatermarkProps, RGWidgetPosition
} from "./types/relation-graph-models/types";

export * from './types/relation-graph-models/types';


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
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent, x_buff?:number, y_buff?: number) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => void | RGPosition | undefined
  onCanvasDragging?: (newX:number, newY:number, buffX:number, buffY:number) => void | RGPosition | undefined
  onCanvasDragEnd?: (e: RGUserEvent) => void;
  onContextmenu?: (e: RGUserEvent, objectType: RGEventTargetType, object: RGNode | RGLink | undefined) => void;
  onFullscreen?: (newValue:boolean, defaultFullscreen: () => Promise<void>) => void;
  onCanvasClick?: (e: RGUserEvent) => void;
  onCanvasSelectionEnd?: (selectionView: RGSelectionView, e: RGUserEvent) => void;
  onZoomEnd?: () => void
};
export declare class GraphToolBar extends VueElement {
  $slots: {
    default: VNode[];
  };
}
export declare class RGMiniToolBar extends VueElement {
  $props: RGToolBarProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGMiniView extends VueElement {
  $props: RGMiniViewProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGBackground extends VueElement {
  $props: RGBackgroundProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGWatermark extends VueElement {
  $props: RGWatermarkProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingController extends VueElement {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingResize extends VueElement {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingNearNodeWidget extends VueElement {
  $props: {
    position: RGWidgetPosition
  };
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingLineController extends VueElement {
  $props: {
    textEditable?: boolean
  };
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingConnectController extends VueElement {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingCreateLineHandle extends VueElement {
  $props: RGCreateLineHandleProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingConnectPoints extends VueElement {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingReferenceLine extends VueElement {
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
  onGraphResize();
  refresh(callback?: RGRefreshCallback);
  $props: RelationGraphProps;
  $slots: {
    default: VNode[];
    'canvas-plug': VNode[];
    'tool-bar': VNode[];
    'mini-view': VNode[];
    'graph-plug': VNode[];
    'svg-defs': VNode[];
    'node-template': VNode[];
    node: VNode<RendererNode, RendererElement, RGNodeSlotProps>[];
    line: VNode<RendererNode, RendererElement, RGLineSlotProps>[];
  };
}
export declare const version: string;

export default RelationGraphComponent;
