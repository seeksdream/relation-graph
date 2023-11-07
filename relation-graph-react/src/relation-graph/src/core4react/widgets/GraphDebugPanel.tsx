import React, { useContext, useState } from 'react';
import { devLog } from '../../../../../../relation-graph-vue2/src/utils/RGCommon';
import { RGUpdateContext, RelationGraphStoreContext } from '../store/reducers/StockStore';

const GraphDebugPanel: React.FC = () => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const options = relationGraph.options;
  const [showSettingPanel, setShowSettingPanel] = useState(false);
  const toggleSettingPanel = () => {
    setShowSettingPanel(!showSettingPanel);
  };
  const printOptions = () => {
    relationGraph.printOptions();
  };
  const printData = () => {
    relationGraph.getGraphJsonData();
  };
  const enableDevlog = () => {
    relationGraph.enableDebugLog(!options.debug);
    devLog('debugLog:', options.debug);
    updateView();
  };
  return (
    <div>
      <div className="c-setting-panel-button" onClick={()=>{toggleSettingPanel();}}>
        Debug
      </div>
      {
        showSettingPanel &&
        <div className="c-setting-panel">
          <div className="c-debug-tools-row">
            <button onClick={()=>{printOptions();}}>print options in console</button>
          </div>
          <div className="c-debug-tools-row">
            <button onClick={()=>{printData();}}>print json data in console</button>
          </div>
          <div className="c-debug-tools-row">
            debug log status: {options.debug ? 'true' : 'false'}
            <button onClick={()=>{enableDevlog();}}>
              { options.debug ? 'disable' : 'enable' } debug log
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default GraphDebugPanel;
