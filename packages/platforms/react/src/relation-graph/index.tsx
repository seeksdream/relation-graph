import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { MutableRefObject} from 'react';
import { RGUpdateProvider, RelationGraphProvider } from './src/core4react/store';
import { RelationGraphFinal } from '../../../../relation-graph-models/models/RelationGraphFinal';
import type {
  RGJsonData, RGLayouter,
  RGOptions,
  RGRefreshCallback,
  RelationGraphExpose, RelationGraphInstance
} from '../../../../relation-graph-models/types';
import '../../../../relation-graph-models/utils/RGGraphIconfont.ts';
import '../../../vue2/src/core4vue/relation-graph.scss';
import '../../../vue2/src/core4vue/relation-graph-toolbar.scss';
import {RelationGraphJsxProps} from '../types-react';
import { devLog, relationGraphVersionInfo } from '../../../../relation-graph-models/utils/RGCommon';
import { getEventListeners } from '../../../../relation-graph-models/utils/RGIntergration';
import GraphDebugPanel from './src/core4react/widgets/GraphDebugPanel';
import GraphMiniToolBar from './src/core4react/widgets/GraphMiniToolBar';
import GraphMiniView from './src/core4react/widgets/GraphMiniView';
import RGCanvas from './src/core4react/RGCanvas';
import screenfull from 'screenfull';
import GraphOperateStuff from "./src/core4react/widgets/GraphOperateStuff";
import GraphLoading from "./src/core4react/widgets/GraphLoading";


const Index: React.ForwardRefRenderFunction<RelationGraphExpose, RelationGraphJsxProps> = (props, ref) => {
  // const [rgInstanceState, rgInstanceDispatch] = useReducer(relationGraphReducer, rgInstance);
  // const rgInstance = useRef() as MutableRefObject<RelationGraph>;
  const [_rgInstance, setRgInstance] = useState<{instance:RelationGraphInstance|null}>({instance: null});
  const seeksRelationGraph$ = useRef() as MutableRefObject<HTMLDivElement>;
  const theInstance = useRef() as MutableRefObject<RelationGraphInstance>;
  useEffect(() => {
    devLog('[RelationGraph] start init...');

    // 注意：
    // 根据MIT许可证的规定，允许您自由地使用、修改和分发源代码。您可以根据自己的需求对源代码进行更改。
    // 然而，您仍然需要遵守MIT许可证的其他规定，如保留版权声明和免责声明等
    // relation-graph是relation-graph的网址是它的版权声明，请勿注释掉以下版权声明信息
    relationGraphVersionInfo('react');
    const newInstance = props.relationGraphCore ? new props.relationGraphCore(props.options, getEventListeners(props)) : new RelationGraphFinal(props.options, getEventListeners(props));
    theInstance.current = newInstance;
    newInstance.setUpdateViewHook(updateView);
    devLog('setDom:', seeksRelationGraph$.current);
    newInstance.setDom(seeksRelationGraph$.current);
    newInstance.ready();
    updateView();
    screenfull && screenfull.on && screenfull.on('change', onFullscreen);
    seeksRelationGraph$.current && seeksRelationGraph$.current.addEventListener('wheel', mouseListener, { passive: false, capture: true });
    return () => {
      seeksRelationGraph$.current && seeksRelationGraph$.current.removeEventListener('wheel', mouseListener);
      screenfull && screenfull.off && screenfull.off('change', onFullscreen);
    };
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
        theInstance.current.setLayouter(layouterInstance);
        updateView();
      },
      onGraphResize() {
        theInstance.current.refreshNVAnalysisInfo();
        updateView();
      },
      refresh() {
        theInstance.current.refresh();
      },
      focusRootNode() {
        theInstance.current.focusRootNode();
        updateView();
      },
      focusNodeById(nodeId: string) {
        theInstance.current.focusNodeById(nodeId);
        updateView();
      },
      getNodeById(nodeId: string) {
        return theInstance.current.getNodeById(nodeId);
      },
      removeNodeById(nodeId: string) {
        return theInstance.current.removeNodeById(nodeId);
      },
      getNodes() {
        return theInstance.current.getNodes();
      },
      getLinks() {
        return theInstance.current.getLinks();
      },
      getGraphJsonData() {
        return theInstance.current.getGraphJsonData();
      },
      getGraphJsonOptions() {
        return theInstance.current.getGraphJsonOptions();
      },
      updateView() {
        updateView();
      }
    };
  }, [theInstance.current]);
  const updateView = (v?: RelationGraphInstance) => {
    // console.log('================== Index:update instance:')
    setRgInstance({instance:v||theInstance.current});
  };
  theInstance.current && theInstance.current.setUpdateViewHook(updateView);
  const onFullscreen = () => {
    theInstance.current.fullscreen(screenfull.isFullscreen);
  };
  const mouseListener = (e:WheelEvent) => {
    theInstance.current.onMouseWheel(e);
    updateView();
  };
  const options = _rgInstance && _rgInstance.instance && _rgInstance.instance.options;
  return (
    <>
      <RelationGraphProvider value={theInstance.current}>
        <RGUpdateProvider value={updateView}>
          <div
            ref={seeksRelationGraph$}
            className={'relation-graph'}
            style={{ width: '100%', height: '100%' } }
          >
            {options &&(options.showDebugPanel && <GraphDebugPanel />)}
            {options &&(options.allowShowMiniToolBar === true && (
              props.toolBarSlot ? (typeof props.toolBarSlot === 'function' ? <props.toolBarSlot relationGraph={_rgInstance.instance} /> : props.toolBarSlot) : <GraphMiniToolBar />)
            )}
            {options &&(options.allowShowMiniView === true && (
              props.miniViewSlot ? (typeof props.miniViewSlot === 'function' ? <props.miniViewSlot relationGraph={_rgInstance.instance} /> : props.miniViewSlot) : <GraphMiniView />)
            )}
            {options &&(props.graphPlugSlot ? (
              typeof props.graphPlugSlot === 'function' ? <props.graphPlugSlot relationGraph={_rgInstance.instance} /> : props.graphPlugSlot
            ) : <div className="rel-graph-plug"></div>)}
            {options &&
                <RGCanvas
                  nodeSlot={props.nodeSlot}
                  lineSlot={props.lineSlot}
                  canvasPlugSlot={props.children}
                  canvasPlugAboveSlot={props.canvasPlugSlot}
                  expandHolderSlot={props.expandHolderSlot}
                />
            }
            <GraphOperateStuff nodeSlot={props.nodeSlot} />
            <GraphLoading />
          </div>
        </RGUpdateProvider>
      </RelationGraphProvider>
    </>
  );
};

export default React.forwardRef(Index);
