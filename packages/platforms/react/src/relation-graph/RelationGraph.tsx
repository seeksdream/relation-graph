import React, {useContext, useEffect, useRef} from 'react';
import type { MutableRefObject} from 'react';
import '../../../../relation-graph-models/utils/RGGraphIconfont.ts';
import '../../../vue2/src/core4vue/relation-graph.scss';
import '../../../vue2/src/core4vue/relation-graph-toolbar.scss';
import { devLog } from '../../../../relation-graph-models/utils/RGCommon';
import GraphDebugPanel from './src/core4react/widgets/GraphDebugPanel';
import GraphMiniToolBar from './src/core4react/widgets/GraphMiniToolBar';
import RGCanvas from './src/core4react/RGCanvas';
import * as screenfull from 'screenfull';
import GraphOperateStuff from './src/core4react/widgets/GraphOperateStuff';
import GraphLoading from './src/core4react/widgets/GraphLoading';
import {RelationGraphStoreContext} from './src/core4react/store/reducers/StockStore';
import {RelationGraphCompJsxProps} from "../types-react";


const RelationGraph:React.FC<RelationGraphCompJsxProps> = (props) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const seeksRelationGraph$ = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    devLog('[RelationGraph mounted]');
    devLog('setDom:', seeksRelationGraph$.current);
    graphInstance.setDom(seeksRelationGraph$.current);
    graphInstance.ready();
    graphInstance.dataUpdated();
    screenfull && screenfull.on && screenfull.on('change', onFullscreen);
    // seeksRelationGraph$.current && seeksRelationGraph$.current.addEventListener('wheel', mouseListener, { passive: false, capture: true });
    return () => {
      // seeksRelationGraph$.current && seeksRelationGraph$.current.removeEventListener('wheel', mouseListener);
      screenfull && screenfull.off && screenfull.off('change', onFullscreen);
    };
  }, []);
  const onFullscreen = () => {
    graphInstance.fullscreen(screenfull.isFullscreen);
  };
  const options = graphInstance && graphInstance.options;
  return (
    <div
      ref={seeksRelationGraph$}
      className={'relation-graph'}
      style={{ width: '100%', height: '100%' } }
    >
      {options &&(options.showDebugPanel && <GraphDebugPanel />)}
      {options &&(options.allowShowMiniToolBar === true && (
        (
          props.toolBarSlot ? (
            typeof props.toolBarSlot === 'function' ? <props.toolBarSlot relationGraph={graphInstance} /> : props.toolBarSlot
          ) : <GraphMiniToolBar />
        )
      )
      )}
      {options &&(
        (props.graphPlugSlot ? (
          typeof props.graphPlugSlot === 'function' ? <props.graphPlugSlot relationGraph={graphInstance} /> : props.graphPlugSlot
        ) : <div className="rel-graph-plug"></div>)
      )}
      {options &&
                <RGCanvas
                  nodeSlot={props.nodeSlot}
                  lineSlot={props.lineSlot}
                  svgDefs={props.svgDefs}
                  canvasPlugSlot={props.canvasPlugSlot}
                  canvasPlugAboveSlot={props.canvasAboveSlot}
                  expandHolderSlot={props.expandHolderSlot}
                >
                </RGCanvas>
      }
      <GraphOperateStuff nodeSlot={props.nodeSlot} />
      <GraphLoading />
    </div>
  );
};

export default RelationGraph;
