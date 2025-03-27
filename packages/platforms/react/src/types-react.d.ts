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
  NodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  ExpandHolderSlot?: React.FC<RGNodeExpandHolderProps> | React.ReactNode
};
export type RGNodeExpandHolderProps = {
  nodeProps: RGNode
  expandButtonClass: string
  expandOrCollapseNode: (e: React.MouseEvent|React.TouchEvent) => void
  expandHolderPosition?: string
  color?: string
};
export interface RelationGraphCompJsxProps {
  toolBarSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  miniViewSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  graphPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  lineSlot?: React.FC<RGLineSlotProps> | React.ReactNode
  svgDefs?: React.FC | React.ReactNode
  canvasPlugSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  canvasAboveSlot?: React.FC<{relationGraph: RelationGraphInstance}> | React.ReactNode
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> |React.ReactNode
  children: React.ReactNode;
}
export interface RelationGraphJsxProps extends RelationGraphCompJsxProps{
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
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent, x_buff?:number, y_buff?: number) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => void | RGPosition | undefined
  onCanvasDragging?: (newX:number, newY:number, buffX:number, buffY:number) => void | RGPosition | undefined
  onCanvasDragEnd?: (e:RGUserEvent) => void
  onContextmenu?: (e:RGUserEvent, objectType:RGEventTargetType, object:RGNode|RGLink|undefined) => void
  onFullscreen?: (newValue:boolean, defaultFullscreen: () => Promise<void>) => void;
  onCanvasClick?: (e:RGUserEvent) => void
  onCanvasSelectionEnd?: (selectionView:RGSelectionView, e:RGUserEvent) => void
  beforeNodeResize?: (node: RGNode, newX:number, newY:number, newW:number, newH:number) => void|false
  onZoomEnd?: () => void
}
export type RelationGraphComponent = React.ForwardRefExoticComponent<RelationGraphJsxProps & React.RefAttributes<RelationGraphExpose>>;
