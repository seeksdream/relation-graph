import React from 'react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type {
  RelationGraphInstance,
  RGLine, RGLineSlotProps,
  RGLink,
  RGNode,
  RGNodeSlotProps
} from "./RelationGraph";
import { RelationGraphExpose, RGOptions } from "./RelationGraph";

export * from './RelationGraph'

export interface RelationGraphProps {
  options: RGOptions
  relationGraphCore?: any
  onNodeClick?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onNodeExpand?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onNodeCollapse?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  onLineClick?: (
    line: RGLine,
    link: RGLink,
    e: MouseEvent | TouchEvent
  ) => boolean
  onImageDownload?: (dom: HTMLElement, format: string) => boolean
  GraphMiniToolBar?: React.FC<{relationGraph: RelationGraphInstance}>
  GraphMiniView?: React.FC<{relationGraph: RelationGraphInstance}>
  GraphPlug?: React.FC<{relationGraph: RelationGraphInstance}>
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}>
}
declare const ReactRelationGraph: React.ForwardRefExoticComponent<RelationGraphExpose, RelationGraphProps>;

export default ReactRelationGraph
