/**
 * relation-graph
 * Website: http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import type React from 'react';
import {RelationGraphInstance,RelationGraphComponent,RelationGraphProps, RGNode, RGNodeSlotProps, RGLineSlotProps} from "./types/types";

import BidirectionalTreeLayouter from './types/layouters/SeeksBidirectionalTreeLayouter';
import CenterLayouter from './types/layouters/SeeksCenterLayouter';
import CircleLayouter from './types/layouters/SeeksCircleLayouter';
import FixedLayouter from './types/layouters/SeeksFixedLayouter';
import ForceLayouter from './types/layouters/SeeksForceLayouter';
import BaseLayouter from "./types/layouters/SeeksBaseLayouter";
import * as SeeksRGLink from './types/models/RGLink';
import * as SeeksRGNode from './types/models/RGNode';
import * as SeeksRGOptions from './types/models/RGOptions';
import * as SeeksRGLayouter from './types/models/RGLayouter';
import {RelationGraphFinal} from "./types/models/RelationGraphFinal";
import * as _RGNodesAnalyticUtils from "./types/utils/RGNodesAnalytic";
import * as _RGEffectUtils from "./types/utils/RGEffectUtils";
import {
  RGEventTargetType,
  RGLayoutOptions,
  RGLine,
  RGLink,
  RGOptions,
  RGSelectionView,
  RGUserEvent
} from "../packages/platforms/vue2/src";


export * from './types/types';

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
  toolBarSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  miniViewSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  graphPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | JSX.Element
};
export declare const Layout: {
  BaseLayouter: typeof BaseLayouter;
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
export declare const RelationGraphStoreContext: React.Context<RelationGraphInstance>;

export declare const GraphToolBar: React.FC;
declare const RelationGraph: React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphComponent>>;
export default RelationGraph;
