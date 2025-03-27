/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 *
 */
import type React from 'react';
import {
  RelationGraphInstance,
  RelationGraphComponent,
  RelationGraphProps,
  RGNode,
  RGNodeSlotProps,
  RGLineSlotProps,
  RGToolBarProps, RGMiniViewProps, RGBackgroundProps, RGWatermarkProps, RGWidgetPosition, RGCreateLineHandleProps
} from "./types/relation-graph-models/types";

import BidirectionalTreeLayouter from './types/relation-graph-models/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/relation-graph-models/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/relation-graph-models/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/relation-graph-models/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/relation-graph-models/layouters/SeeksForceLayouter';
import BaseLayouter from "./types/relation-graph-models/layouters/SeeksBaseLayouter";
import * as SeeksRGLink from './types/relation-graph-models/models/RGLink';
import * as SeeksRGNode from './types/relation-graph-models/models/RGNode';
import * as SeeksRGOptions from './types/relation-graph-models/models/RGOptions';
import * as SeeksRGLayouter from './types/relation-graph-models/models/RGLayouter';
import {RelationGraphFinal} from "./types/relation-graph-models/models/RelationGraphFinal";
import * as _RGNodesAnalyticUtils from "./types/relation-graph-models/utils/RGNodesAnalytic";
import * as _RGEffectUtils from "./types/relation-graph-models/utils/RGEffectUtils";

export * from './types/relation-graph-models/types';

export type RGNodeProps = {
  nodeProps: RGNode
  NodeSlot?: React.FC<RGNodeSlotProps>
  ExpandHolderSlot?: React.FC<RGNodeExpandHolderProps>
};
export type RGNodeExpandHolderProps = {
  nodeProps: RGNode
  expandButtonClass: string
  expandOrCollapseNode: (e: React.MouseEvent|React.TouchEvent) => void
  expandHolderPosition?: string
  color?: string
};
export type RelationGraphJsxProps = RelationGraphProps & {
  toolBarSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  miniViewSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  graphPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  lineSlot?: React.FC<RGLineSlotProps> | React.ReactNode
  svgDefs?: React.FC | React.ReactNode
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  canvasPlugAboveSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | React.ReactNode
  children?: React.ReactNode
};
export declare const Layout: {
  BaseLayouter: typeof BaseLayouter;
  BidirectionalTreeLayouter: typeof BidirectionalTreeLayouter;
  CenterLayouter: typeof CenterLayouter;
  CircleLayouter: typeof CircleLayouter;
  FixedLayouter: typeof FixedLayouter;
  ForceLayouter: typeof ForceLayouter;
};
export const RGSlotOnGraph: React.FC;
export const RGSlotOnCanvasAbove: React.FC;
export declare const RelationGraphCore: typeof RelationGraphFinal;
export declare const RGLayouterUtils: typeof SeeksRGLayouter;
export declare const RGOptionsUtils: typeof SeeksRGOptions;
export declare const RGLinkUtils: typeof SeeksRGLink;
export declare const RGNodeUtils: typeof SeeksRGNode;
export declare const RGNodesAnalyticUtils: typeof _RGNodesAnalyticUtils;
export declare const RGEffectUtils: typeof _RGEffectUtils;
export declare const RelationGraphStoreContext: React.Context<RelationGraphInstance>;
export declare const RGInstanceContext: React.Context<RelationGraphInstance>;
export declare const RGUpdateSingalContext: React.Context<RelationGraphInstance>;

export declare const GraphToolBar: React.FC;
export declare const RGMiniToolBar: React.FC<RGToolBarProps>;
export declare const RGMiniView: React.FC<RGMiniViewProps>;
export declare const RGBackground: React.FC<RGBackgroundProps>;
export declare const RGWatermark: React.FC<RGWatermarkProps>;
export declare const RGEditingController: React.FC;
export declare const RGEditingResize: React.FC;
export declare const RGEditingNearNodeWidget: React.FC<{position: RGWidgetPosition}>;
export declare const RGEditingLineController: React.FC<{textEditable?: boolean}>;
export declare const RGEditingConnectController: React.FC;
export declare const RGEditingCreateLineHandle: React.FC<RGCreateLineHandleProps>;
export declare const RGEditingConnectPoints: React.FC;
export declare const RGEditingReferenceLine: React.FC;
declare const RelationGraph: React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphComponent|undefined>>;
export default RelationGraph;
