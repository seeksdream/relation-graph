import type React from 'react';
import type {
  RelationGraphProps,
  RGNode,
  RGNodeSlotProps,
  RelationGraphInstance, RGLineSlotProps, RelationGraphExpose
} from './types';
import {RGEventTargetType, RGLayoutOptions, RGLine, RGLink, RGOptions, RGSelectionView, RGUserEvent} from "./types";
import {RGPosition} from "./types";

export type RGNodeProps = {
  nodeProps: RGNode
  NodeSlot?: React.FC<RGNodeSlotProps>
  ExpandHolderSlot?: React.FC<RGNodeExpandHolderProps> | JSX.Element
};
export type RGNodeExpandHolderProps = {
  nodeProps: RGNode
  expandButtonClass: string
  expandOrCollapseNode: (e: React.MouseEvent|React.TouchEvent) => void
  expandHolderPosition?: string
  color?: string
};
export interface RelationGraphJsxProps {
  options: RGOptions;
  relationGraphCore?: any;
  onNodeClick?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onNodeExpand?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onNodeCollapse?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onLineClick?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onImageDownload?: (dom: HTMLElement, format: string) => boolean
  onImageSaveAsFile?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean
  beforeChangeLayout?: (newLayoutOptions:RGLayoutOptions) => boolean
  onNodeDragStart?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => RGPosition | undefined
  onCanvasDragEnd?: (e:RGUserEvent) => void
  onContextmenu?: (e:RGUserEvent, objectType:RGEventTargetType, object:RGNode|RGLink|undefined) => void
  onFullscreen?: (newValue:boolean) => void
  onCanvasClick?: (e:RGUserEvent) => void
  onCanvasSelectionEnd?: (selectionView:RGSelectionView, e:RGUserEvent) => void
  onZoomEnd?: () => void
  toolBarSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  miniViewSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  graphPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | JSX.Element
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | JSX.Element
}
export type RelationGraphComponent = React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphExpose>>;
