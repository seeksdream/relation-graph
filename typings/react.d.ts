/**
 * relation-graph
 * Website: https://ssl.relation-graph.com/
 *          http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */
import type React from 'react';
import {RelationGraphInstance,RelationGraphExpose,RelationGraphProps, RGNode, RGNodeSlotProps} from "./types/types";

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
  GraphMiniToolBar?: React.FC<{relationGraph: RelationGraphInstance}>
  GraphMiniView?: React.FC<{relationGraph: RelationGraphInstance}>
  GraphPlug?: React.FC<{relationGraph: RelationGraphInstance}>
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}>
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps>
};

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

declare const RelationGraphComponent: React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphExpose>>;
export default RelationGraphComponent;
