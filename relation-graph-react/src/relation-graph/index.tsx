import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import '../css/index.css';
import Graph from './src/core4react/Graph';
import { RGUpdateProvider, RelationGraphProvider } from './src/core4react/store';
// import { relationGraphReducer } from "./src/core4react/store/reducers/StockStore";
import { RelationGraphFinal } from './src/models/RelationGraphFinal';
import type {
  RGJsonData, RGLayouter,
  RGListeners,
  RGOptions,
  RGRefreshCallback,
  RelationGraphExpose, RelationGraphInstance
} from './src/RelationGraph';
import type {
  RelationGraphProps
} from '../../../react';
import type { MutableRefObject} from 'react';

// export interface RelationGraphExpose {
//   getInstance():RelationGraphInstance
//   setOptions(
//     options: RGOptions,
//     callback?: (graphInstance: RelationGraphInstance) => void
//   ):void
//   setLayouter(userLayouerInstance: RGLayouter): void
//   setJsonData(
//     jsonData: RGJsonData,
//     reLayout?: boolean | RGRefreshCallback,
//     callback?: (graphInstance: RelationGraphInstance) => void
//   ):void
//   appendJsonData(
//     jsonData: RGJsonData,
//     reLayout?: boolean | RGRefreshCallback,
//     callback?: (graphInstance: RelationGraphInstance) => void
//   ):void
//   getNodes():RGNode[]
//   getLinks():RGLink[]
//   getGraphJsonData():RGJsonData
//   getGraphJsonOptions():RGOptions
//   getNodeById(nodeId: string):RGNode
//   removeNodeById(nodeId: string):void
//   focusRootNode():void
//   focusNodeById(nodeId: string):void
//   refresh(callback: RGRefreshCallback):void
//   onGraphResize():void
// }

const Index: React.ForwardRefRenderFunction<RelationGraphExpose, RelationGraphProps> = (props, ref) => {
  const listeners: RGListeners = {
    'on-node-click': props.onNodeClick,
    'on-node-expand': props.onNodeExpand,
    'on-node-collapse': props.onNodeCollapse,
    'on-line-click': props.onLineClick,
    'on-image-download': props.onImageDownload,
  }
  // const [rgInstanceState, rgInstanceDispatch] = useReducer(relationGraphReducer, rgInstance);
  // const rgInstance = useRef() as MutableRefObject<RelationGraph>;
  const [rgInstance, setRgInstance] = useState<{instance:RelationGraphInstance|null}>({instance: null});
  const theInstance = useRef() as MutableRefObject<RelationGraphInstance>;
  useEffect(() => {
    const newInstance = props.relationGraphCore || new RelationGraphFinal(props.options, listeners)
    // console.log('xxxxxxxxxx newInstance:', newInstance)
    theInstance.current = newInstance
    updateView()
  }, [])
  // console.log('xxxxxxxxxx Index:', rgInstance)
  // rgInstance && console.log('xxxxxxxxxx Index rootNode:', rgInstance.instance && rgInstance.instance.graphData.rootNode)
  useImperativeHandle(ref, ():RelationGraphExpose => {
    // console.log('xxxxxxxxxx Index:useImperativeHandle', theInstance.current)
    return {
      getInstance() {
        return theInstance.current
      },
      setOptions(
        options: RGOptions,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        theInstance.current.setOptions(options, callback)
        updateView();
      },
      setJsonData(
        jsonData: RGJsonData,
        reLayout?: boolean | RGRefreshCallback,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        if (arguments.length === 2 && typeof reLayout === 'function') {
          callback = reLayout;
          reLayout = true;
        }
        // console.log('xxxxxxxxxx setJsonData:', theInstance.current.graphData.rootNode)
        theInstance.current.setJsonData(
          jsonData,
          reLayout,
          (instance: RelationGraphInstance) => {
            instance.playShowEffect(() => {
              // console.log('xxxxxxxxxx setJsonData:ok2:', theInstance.current.graphData)
              updateView();
              if (callback) callback(instance)
            })
          }
        )
      },
      appendJsonData(
        jsonData: RGJsonData,
        reLayout?: boolean | RGRefreshCallback,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        if (arguments.length === 2 && typeof reLayout === 'function') {
          callback = reLayout;
          reLayout = true;
        }
        theInstance.current.appendJsonData(jsonData, reLayout, (instance: RelationGraphInstance) => {
          updateView();
          if (callback) callback(instance)
        })
      },
      setLayouter(layouterInstance: RGLayouter) {
        theInstance.current.setLayouter(layouterInstance)
        updateView();
      },
      onGraphResize() {
        theInstance.current.refreshNVAnalysisInfo()
        updateView();
      },
      refresh() {
        theInstance.current.refresh()
        updateView();
      },
      focusRootNode() {
        theInstance.current.focusRootNode()
        updateView();
      },
      focusNodeById(nodeId: string) {
        theInstance.current.focusNodeById(nodeId)
        updateView();
      },
      getNodeById(nodeId: string) {
        return theInstance.current.getNodeById(nodeId)
      },
      removeNodeById(nodeId: string) {
        return theInstance.current.removeNodeById(nodeId)
      },
      getNodes() {
        return theInstance.current.getNodes()
      },
      getLinks() {
        return theInstance.current.getLinks()
      },
      getGraphJsonData() {
        return theInstance.current.getGraphJsonData()
      },
      getGraphJsonOptions() {
        return theInstance.current.getGraphJsonOptions()
      },
      updateView() {
        updateView()
      }
    }
  }, [theInstance.current]);
  const updateView = (v?: RelationGraphInstance) => {
    // console.log('================== Index:update instance:')
    setRgInstance({instance:v||theInstance.current});
  }
  return (
    <>
        <RelationGraphProvider value={theInstance.current}>
          <RGUpdateProvider value={updateView}>
            {rgInstance.instance && <Graph {...props} />}
          </RGUpdateProvider>
        </RelationGraphProvider>
    </>
  );
};

export default React.forwardRef(Index);
