import React, { useContext, useEffect, useRef } from 'react';
import screenfull from 'screenfull'
import { devLog, relationGraphVersionInfo } from '../utils/RGCommon'
import '../utils/RGGraphIconfont'
import RGCanvas from './RGCanvas'
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import GraphDebugPanel from './widgets/GraphDebugPanel'
import GraphMiniView from './widgets/GraphMiniView'
import GraphMiniToolBar from './widgets/GraphMiniToolBar'
import type { MutableRefObject } from 'react';
import type { RelationGraphProps } from '../RelationGraph';
const Graph: React.FC<RelationGraphProps> = (props) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const rootNode = relationGraph.graphData.rootNode;
  const seeksRelationGraph$ = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    relationGraphVersionInfo()
    // 在元素上做些操作
    devLog('---------------------------graph mounted---------------------------')
    // const listeners: RGListeners = {
    //   'on-node-click': props.onNodeClick,
    //   'on-node-expand': props.onNodeExpand,
    //   'on-node-collapse': props.onNodeCollapse,
    //   'on-line-click': props.onLineClick,
    //   'on-image-download': props.onImageDownload,
    // }
    // devLog(this.relationGraphCore);
    // const rgClass = this.relationGraphCore || RelationGraphFinal;
    // const newRGCoreInstance = Object.create(rgClass.prototype);
    // const relationGraph = rgClass.apply(newRGCoreInstance, [this.options, listeners]);
    // const rgInstance =
    //   props.relationGraphCore || new RelationGraphFinal(props.options, listeners)
    // console.log('xxxxxxxxxx set dom');
    relationGraph.setDom(seeksRelationGraph$.current)
    relationGraph.ready()
    updateView()
    // @ts-ignore
    screenfull.on('change', onFullscreen)
    // console.log(relationGraph.value)
    return () => {
      // @ts-ignore
      screenfull.off('change', onFullscreen)
    }
  }, []);
  const onFullscreen = () => {
    // @ts-ignore
    relationGraph.fullscreen(screenfull.isFullscreen)
  }
  // console.log('=========RGGraph:relationGraph.graphData.nodes.length:', relationGraph.graphData.nodes.length);
  // console.log('=========RGGraph:relationGraph:relationGraph.graphData2', rootNode);
  return (
    <div
      ref={seeksRelationGraph$}
      style={{ width: '100%', height: '100%', boxSizing: 'border-box' } }
    >
      {rootNode &&(relationGraph.options.showDebugPanel && <GraphDebugPanel />)}
      {rootNode &&(relationGraph.options.allowShowMiniToolBar === true && (props.GraphMiniToolBar ? <props.GraphMiniToolBar relationGraph={relationGraph} /> : <GraphMiniToolBar />))}
      {rootNode &&(relationGraph.options.allowShowMiniView === true && (props.GraphMiniView ? <props.GraphMiniView relationGraph={relationGraph} /> : <GraphMiniView />))}
      {rootNode &&(props.GraphPlug ? <props.GraphPlug relationGraph={relationGraph} /> : <div className="rel-graph-plug"></div>)}
      {rootNode &&
      <RGCanvas
        nodeSlot={props.nodeSlot}
        lineSlot={props.lineSlot}
        canvasPlugSlot={props.canvasPlugSlot}
      />
      }
  </div>
  );
};
export default Graph;
