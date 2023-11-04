import React from 'react';
import type { RGOptions, RelationGraphExpose } from './RelationGraph';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type {
  RGLine,
  RGLineSlotProps, RGLink,
  RGNode,
  RGNodeSlotProps,
  RelationGraphInstance
} from './RelationGraph';
import type {RGJsonData, RGLayouter, RGRefreshCallback} from 'relation-graph/react/RelationGraph';

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
declare class ReactRelationGraph extends React.Component<RelationGraphExpose, RelationGraphProps>{
  props: RelationGraphProps
  getInstance(): RelationGraphInstance
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  setJsonData(
    jsonData: RGJsonData,
    reLayoutOrCallback?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  )
  setLayouter(layouterInstance: RGLayouter)
  onGraphResize()
  refresh(callback?: RGRefreshCallback)
  focusRootNode()
  focusNodeById(nodeId: string)
  getNodeById(nodeId: string)
  removeNodeById(nodeId: string)
  getNodes()
  getLinks()
  getGraphJsonData()
  getGraphJsonOptions()
  updateView()
}

export default ReactRelationGraph
