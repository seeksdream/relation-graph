import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { MutableRefObject} from 'react';
import {RGUpdateProvider, RelationGraphProvider, RGUpdateSingalProvider} from './src/core4react/store';
import { RelationGraphFinal } from '../../../../relation-graph-models/models/RelationGraphFinal';
import type {
  RGJsonData, RGLayouter,
  RGOptions,
  RGRefreshCallback,
  RelationGraphExpose, RelationGraphInstance
} from '../../../../relation-graph-models/types';
import {RelationGraphJsxProps} from '../types-react';
import {deprecatedWaring, devLog, relationGraphVersionInfo} from '../../../../relation-graph-models/utils/RGCommon';
import { getEventListeners } from '../../../../relation-graph-models/utils/RGIntergration';
import RelationGraph from './RelationGraph';
import RGSlotOnGraph from './src/core4react/slots/RGSlotOnGraph';
import RGSlotOnCanvasAbove from './src/core4react/slots/RGSlotOnCanvasAbove';


const Index: React.ForwardRefRenderFunction<RelationGraphExpose, RelationGraphJsxProps> = (props, ref) => {
  // const [rgInstanceState, rgInstanceDispatch] = useReducer(relationGraphReducer, rgInstance);
  // const rgInstance = useRef() as MutableRefObject<RelationGraph>;
  const [updateSingal, setUpdateSingal] = useState(false);
  // const [_rgInstance, setRgInstance] = useState<{instance:RelationGraphInstance|null}>({instance: null});
  const updateSingalValue = useRef(false);
  const theInstance = useRef() as MutableRefObject<RelationGraphInstance>;
  useEffect(() => {
    devLog('[RelationGraph] start init...');
  }, []);
  useImperativeHandle(ref, ():RelationGraphExpose => {
    return {
      getInstance() {
        return theInstance.current;
      },
      async setOptions(
        options: RGOptions,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        deprecatedWaring('Method [$graphRef.onFullscreen()] has been deprecated. Please use: $graphRef.getInstance().onFullscreen()');
        await theInstance.current.setOptions(options);
        updateView();
        callback && callback(theInstance.current);
      },
      async setJsonData(
        jsonData: RGJsonData,
        reLayout?: boolean | RGRefreshCallback,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        if (arguments.length === 2 && typeof reLayout === 'function') {
          callback = reLayout;
          reLayout = true;
        }
        // console.log('xxxxxxxxxx setJsonData:', theInstance.current.graphData.rootNode)
        await theInstance.current.setJsonData(
          jsonData,
          true
        );
        await theInstance.current.refresh(false);
        updateView();
        if (callback) callback(theInstance.current);
      },
      async appendJsonData(
        jsonData: RGJsonData,
        reLayout?: boolean | RGRefreshCallback,
        callback?: (graphInstance: RelationGraphInstance) => void
      ) {
        if (arguments.length === 2 && typeof reLayout === 'function') {
          callback = reLayout;
          reLayout = true;
        }
        await theInstance.current.appendJsonData(jsonData, true);
        updateView();
        if (callback) callback(theInstance.current);
      },
      setLayouter(layouterInstance: RGLayouter) {
        deprecatedWaring('Method [$graphRef.setLayouter()] has been deprecated. Please use: $graphRef.getInstance().setLayouter()');
        theInstance.current.setLayouter(layouterInstance);
        updateView();
      },
      onGraphResize() {
        deprecatedWaring('Method [$graphRef.onGraphResize()] has been deprecated. Please use: $graphRef.getInstance().resetViewSize()');
        theInstance.current.refreshNVAnalysisInfo();
        updateView();
      },
      refresh() {
        deprecatedWaring('Method [$graphRef.refresh()] has been deprecated. Please use: $graphRef.getInstance().refresh()');
        theInstance.current.refresh();
      },
      focusRootNode() {
        deprecatedWaring('Method [$graphRef.focusRootNode()] has been deprecated. Please use: $graphRef.getInstance().focusRootNode()');
        theInstance.current.focusRootNode();
        updateView();
      },
      focusNodeById(nodeId: string) {
        deprecatedWaring('Method [$graphRef.focusNodeById()] has been deprecated. Please use: $graphRef.getInstance().focusNodeById()');
        theInstance.current.focusNodeById(nodeId);
        updateView();
      },
      getNodeById(nodeId: string) {
        deprecatedWaring('Method [$graphRef.getNodeById()] has been deprecated. Please use: $graphRef.getInstance().getNodeById()');
        return theInstance.current.getNodeById(nodeId);
      },
      removeNodeById(nodeId: string) {
        deprecatedWaring('Method [$graphRef.removeNodeById()] has been deprecated. Please use: $graphRef.getInstance().removeNodeById()');
        return theInstance.current.removeNodeById(nodeId);
      },
      getNodes() {
        deprecatedWaring('Method [$graphRef.getNodes()] has been deprecated. Please use: $graphRef.getInstance().getNodes()');
        return theInstance.current.getNodes();
      },
      getLinks() {
        deprecatedWaring('Method [$graphRef.getLinks()] has been deprecated. Please use: $graphRef.getInstance().getLinks()');
        return theInstance.current.getLinks();
      },
      getGraphJsonData() {
        deprecatedWaring('Method [$graphRef.getGraphJsonData()] has been deprecated. Please use: $graphRef.getInstance().getGraphJsonData()');
        return theInstance.current.getGraphJsonData();
      },
      getGraphJsonOptions() {
        deprecatedWaring('Method [$graphRef.getGraphJsonOptions()] has been deprecated. Please use: $graphRef.getInstance().getGraphJsonOptions()');
        return theInstance.current.getGraphJsonOptions();
      },
      updateView() {
        deprecatedWaring('Method [$graphRef.updateView()] has been deprecated. Please use: $graphRef.getInstance().dataUpdated()');
        updateView();
      }
    };
  }, [theInstance.current]);
  const updateView = (_v?: RelationGraphInstance) => {
    // console.log('================== [relation-graph]:update instance:');
    // setRgInstance({instance:v||theInstance.current});
    updateSingalValue.current = !updateSingalValue.current;
    setUpdateSingal(updateSingalValue.current);
  };
  if (!theInstance.current) {
    // 注意：
    // 根据MIT许可证的规定，允许您自由地使用、修改和分发源代码。您可以根据自己的需求对源代码进行更改。
    // 然而，您仍然需要遵守MIT许可证的其他规定，如保留版权声明和免责声明等
    // relation-graph是relation-graph的网址是它的版权声明，请勿注释掉以下版权声明信息
    relationGraphVersionInfo('React');
    const newInstance = props.relationGraphCore ? new props.relationGraphCore(props.options, getEventListeners(props)) : new RelationGraphFinal(props.options, getEventListeners(props));
    theInstance.current = newInstance;
    newInstance.setUpdateViewHook(updateView);
  }
  const slotsOnGraph: React.ReactNode[] = [];
  const slotsOnCanvasAbove: React.ReactNode[] = [];
  const slotsOnLine: React.ReactNode[] = [];
  const slotsOnNode: React.ReactNode[] = [];
  const slotOnNodeExpandHandle: React.ReactNode[] = [];
  const slotOnToolbar: React.ReactNode[] = [];
  const slotsOnCanvasBehind = React.Children.toArray(props.children).filter((child: React.ReactNode) => {
    if (child) {
      if (child.type === RGSlotOnGraph) {
        slotsOnGraph.push(child);
        return false;
      } else if (child.type === RGSlotOnCanvasAbove) {
        slotsOnCanvasAbove.push(child);
        return false;
        // } else if (child.type === RGSlotOnLine) {
        //   console.log('xxxxx3333:push:', child);
        //   slotsOnLine.push(child);
        //   return false;
        // } else if (child.type === RGSlotOnNode) {
        //   console.log('xxxxxNode:push:', child);
        //   slotsOnNode.push(child);
        //   return false;
        // } else if (child.type === RGSlotOnNodeExpandHandle) {
        //   console.log('xxxxx3333:push:', child);
        //   slotOnNodeExpandHandle.push(child);
        //   return false;
        // } else if (child.type === RGSlotOnToolbar) {
        //   console.log('xxxxx3333:push:', child);
        //   slotOnToolbar.push(child);
        //   return false;
      }
    }
    return true;
  });
  const graphPlugSlot = slotsOnGraph.length > 0 ? slotsOnGraph : props.graphPlugSlot;
  const canvasPlugAbove = slotsOnCanvasAbove.length > 0 ? slotsOnCanvasAbove : props.canvasAboveSlot;
  const canvasPlugBehind = slotsOnCanvasBehind.length > 0 ? slotsOnCanvasBehind : props.canvasPlugSlot;
  // const graphPlugSlot = slotsOnGraph.length > 0 ? (() => {
  //   return slotsOnGraph;
  // }) : props.graphPlugSlot;
  // const canvasPlugAbove = slotsOnCanvasAbove.length > 0 ? (() => {
  //   return slotsOnCanvasAbove;
  // }) : props.canvasAboveSlot;
  // const canvasPlugBehind = slotsOnCanvasAbove.length > 0 ? (() => {
  //   return slotsOnCanvasBehind;
  // }) : null;
  return (
    <>
      <RelationGraphProvider value={theInstance.current}>
        <RGUpdateProvider value={updateView}>
          <RGUpdateSingalProvider value={updateSingal}>
            {theInstance.current && <RelationGraph
              toolBarSlot={props.toolBarSlot}
              miniViewSlot={props.miniViewSlot}
              graphPlugSlot={graphPlugSlot}
              nodeSlot={props.nodeSlot}
              lineSlot={props.lineSlot}
              canvasPlugSlot={canvasPlugBehind}
              canvasAboveSlot={canvasPlugAbove}
              expandHolderSlot={props.expandHolderSlot}
            >
            </RelationGraph>}
          </RGUpdateSingalProvider>
        </RGUpdateProvider>
      </RelationGraphProvider>
    </>
  );
};

export default React.forwardRef(Index);
