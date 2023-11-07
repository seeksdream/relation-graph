import type React from 'react';
import type {RGNodeExpandHolderProps, RelationGraphProps, RGNode, RGNodeSlotProps} from './types';

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
