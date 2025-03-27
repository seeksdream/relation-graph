/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 *
 */
import vue from 'vue';
import type { VNode, RendererNode, RendererElement } from 'vue';
import type {
  RelationGraphProps, RelationGraphInstance, RGJsonData, RGLayouter, RGOptions, RGRefreshCallback,
  RGLineSlotProps, RGNodeSlotProps
} from './types/relation-graph-models/types';

import BidirectionalTreeLayouter from './types/relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/relation-graph-models/layouters/SeeksForceLayouter';
import SeeksBaseLayouter from './types/relation-graph-models/layouters/SeeksBaseLayouter';
import * as SeeksRGLink from './types/relation-graph-models/models/RGLink';
import * as SeeksRGNode from './types/relation-graph-models/models/RGNode';
import * as SeeksRGOptions from './types/relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from './types/relation-graph-models/models/RGLayouter';
import {RelationGraphFinal} from './types/relation-graph-models/models/RelationGraphFinal';
import * as _RGNodesAnalytic from './types/relation-graph-models/utils/RGNodesAnalytic';
import * as _RGEffectUtils from './types/relation-graph-models/utils/RGEffectUtils';
import {
  RGBackgroundProps,
  RGCreateLineHandleProps, RGMiniViewProps,
  RGToolBarProps,
  RGWatermarkProps,
  RGWidgetPosition
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
export declare const RGGraphMath: typeof RGGraphMath;
export declare const RGNodesAnalyticUtils: typeof _RGNodesAnalytic;
export declare const RGEffectUtils: typeof _RGEffectUtils;
export declare const BaseLayouter: typeof SeeksBaseLayouter;
export declare class GraphToolBar extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RGMiniToolBar extends vue {
  $props: RGToolBarProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGMiniView extends vue {
  $props: RGMiniViewProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGBackground extends vue {
  $props: RGBackgroundProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGWatermark extends vue {
  $props: RGWatermarkProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingController extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingResize extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingNearNodeWidget extends vue {
  $props: {
    position: RGWidgetPosition
  };
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingLineController extends vue {
  $props: {
    textEditable?: boolean
  };
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingConnectController extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingCreateLineHandle extends vue {
  $props: RGCreateLineHandleProps;
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingConnectPoints extends vue {
  $slots: {
    default: VNode[];
  };
}
export declare class RGEditingReferenceLine extends vue {
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
