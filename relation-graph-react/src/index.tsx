import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import RelationGraph from './relation-graph';
import type { MutableRefObject} from 'react';
import './css/index.css';
import type { RGJsonData, RGOptions, RelationGraphExpose, RGNodeSlotProps } from './relation-graph/src/RelationGraph';
const NodeSlot: React.FC<RGNodeSlotProps> = ({node}) => {
  return <div>slot:{node.text}</div>
}
const App: React.FC = () => {
  const seeksRelationGraph$ = useRef() as MutableRefObject<RelationGraphExpose>;
  useEffect(() => {
    const graphJsonData:RGJsonData = {
      rootId: 'N3',
      nodes: [
        { id: 'N4', text: '十4' },
        { id: 'N5', text: '十5' },
        { id: 'N6', text: '十6' },
        { id: 'N7', text: '十7' },
        { id: 'N3', text: '十三' },
        { id: 'N9', text: '152****3393' },
      ],
      lines: [
        { from: 'N3', to: 'N9', text: '分享' },
        { from: 'N3', to: 'N4', text: '分享444' },
        { from: 'N3', to: 'N5', text: '分享555' },
        { from: 'N3', to: 'N6', text: '分享666' },
        { from: 'N3', to: 'N7', text: '分享777' },
        { from: 'N9', to: 'N4', text: '分享x' }
      ],
    };
    seeksRelationGraph$.current.setJsonData(graphJsonData,  true,() => {
      play()
    })
  }, [])
  const play = () => {
    const rootNode = seeksRelationGraph$.current.getNodeById('N3');
    rootNode.x += 10;
    seeksRelationGraph$.current.updateView()
    setTimeout(()=>{play()}, 1000)
  }
  const options:RGOptions = {
    showDebugPanel: true,
    lineUseTextPath: true,
    defaultLineShape: 3
  }
  return <div>
    <div>ok</div>
    <div style={{ height: 600, width: 900, border: '#efefef solid 1px' }}>
      <RelationGraph ref={seeksRelationGraph$} options={options} nodeSlot={NodeSlot} />
    </div>
  </div>
};
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
