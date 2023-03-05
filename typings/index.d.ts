import {VueElement} from 'vue';
import type { VNode } from 'vue';
import type { RelationGraphInstance, RGJsonData, RGLayouter, RGOptions, RGRefreshCallback } from './RelationGraph';
import type { RGLine, RGLink, RGNode } from './RelationGraph';
export * from './RelationGraph'
export type {RelationGraphExpose} from './RelationGraph'
export interface RelationGraphProps {
  options: any
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
}
export declare class RelationGraph extends VueElement {
  // options: RGOptions
  // relationGraphCore?: any
  // onNodeClick?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  // onNodeExpand?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  // onNodeCollapse?: (node: RGNode, e: MouseEvent | TouchEvent) => boolean
  // onLineClick?: (
  //   line: RGLine,
  //   link: RGLink,
  //   e: MouseEvent | TouchEvent
  // ) => boolean
  // onImageDownload?: (dom: HTMLElement, format: string) => boolean

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
  $props: RelationGraphProps
  $slots: {
    default: VNode[];
    canvasPlug: VNode[];
    miniToolBar: VNode[];
    miniViewPanel: VNode[];
    graphPlug: VNode[];
    node: VNode[];
    line: VNode[];
  };
}
export declare const version: string;
export default RelationGraph;