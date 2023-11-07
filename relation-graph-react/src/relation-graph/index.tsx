import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { MutableRefObject} from 'react';
import { RGUpdateProvider, RelationGraphProvider } from './src/core4react/store';
import { RelationGraphFinal } from '../../../relation-graph-vue2/src/models/RelationGraphFinal';
import type {
  RGJsonData, RGLayouter,
  RGOptions,
  RGRefreshCallback,
  RelationGraphExpose, RelationGraphInstance
} from '../../../relation-graph-vue2/src/types';
import '../../../relation-graph-vue2/src/utils/RGGraphIconfont.ts';
import '../../../relation-graph-vue2/src/core4vue/relation-graph.scss';
import '../../../relation-graph-vue2/src/core4vue/relation-graph-toolbar.scss';
import {RelationGraphJsxProps} from '../types-react';
import { devLog, relationGraphVersionInfo } from '../../../relation-graph-vue2/src/utils/RGCommon';
import { getEventListeners } from '../../../relation-graph-vue2/src/utils/RGIntergration';
import GraphDebugPanel from './src/core4react/widgets/GraphDebugPanel';
import GraphMiniToolBar from './src/core4react/widgets/GraphMiniToolBar';
import GraphMiniView from './src/core4react/widgets/GraphMiniView';
import RGCanvas from './src/core4react/RGCanvas';
import screenfull from 'screenfull';
import GraphOperateStuff from "./src/core4react/widgets/GraphOperateStuff";


const Index: React.ForwardRefRenderFunction<RelationGraphExpose, RelationGraphJsxProps> = (props, ref) => {
  // const [rgInstanceState, rgInstanceDispatch] = useReducer(relationGraphReducer, rgInstance);
  // const rgInstance = useRef() as MutableRefObject<RelationGraph>;
  const [_rgInstance, setRgInstance] = useState<{instance:RelationGraphInstance|null}>({instance: null});
  const seeksRelationGraph$ = useRef() as MutableRefObject<HTMLDivElement>;
  const theInstance = useRef() as MutableRefObject<RelationGraphInstance>;
  useEffect(() => {
    console.log('[debug][RelationGraph] ready!');
    relationGraphVersionInfo('react');
    const newInstance = props.relationGraphCore || new RelationGraphFinal(props.options, getEventListeners(props));
    theInstance.current = newInstance;
    newInstance.setUpdateViewHook(updateView);
    devLog('setDom:', seeksRelationGraph$.current);
    newInstance.setDom(seeksRelationGraph$.current);
    newInstance.ready();
    updateView();
    screenfull && screenfull.on && screenfull.on('change', onFullscreen);
    // console.log(relationGraph.value)
    return () => {
      screenfull.off('change', onFullscreen);
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
        await theInstance.current.playShowEffect();
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
  const options = _rgInstance && _rgInstance.instance && _rgInstance.instance.options;
  return (
    <>
      <RelationGraphProvider value={theInstance.current}>
        <RGUpdateProvider value={updateView}>
          <div
            ref={seeksRelationGraph$}
            className={'relation-graph'}
            style={{ width: '100%', height: '100%', boxSizing: 'border-box' } }
          >
            {options &&(options.showDebugPanel && <GraphDebugPanel />)}
            {options &&(options.allowShowMiniToolBar === true && (props.GraphMiniToolBar ? <props.GraphMiniToolBar relationGraph={_rgInstance.instance} /> : <GraphMiniToolBar />))}
            {options &&(options.allowShowMiniView === true && (props.GraphMiniView ? <props.GraphMiniView relationGraph={_rgInstance.instance} /> : <GraphMiniView />))}
            {options &&(props.GraphPlug ? <props.GraphPlug relationGraph={_rgInstance.instance} /> : <div className="rel-graph-plug"></div>)}
            {options &&
                <RGCanvas
                  nodeSlot={props.nodeSlot}
                  lineSlot={props.lineSlot}
                  canvasPlugSlot={props.canvasPlugSlot}
                  expandHolderSlot={props.expandHolderSlot}
                />
            }
            <GraphOperateStuff nodeSlot={props.nodeSlot} />
          </div>
        </RGUpdateProvider>
      </RelationGraphProvider>
    </>
  );
};

export default React.forwardRef(Index);
