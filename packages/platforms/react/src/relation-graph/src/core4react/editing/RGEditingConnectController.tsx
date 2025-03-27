import React, { useContext } from 'react';
import RGEditingConnectPoints from './RGEditingConnectPoints';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';

const RGEditingConnectController:React.FC = ({children}) => {
  const updateSingal = useContext(RGUpdateSingalContext);
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance && graphInstance.options;

  if (!options.nodeConnectController.show) {
    return null;
  }

  return (
    <div
      className="rel-editing-connect-ctrl"
      style={{
        left: options.nodeConnectController.x + 'px',
        top: options.nodeConnectController.y + 'px',
        width: options.nodeConnectController.width + 'px',
        height: options.nodeConnectController.height + 'px',
      }}
    >
      {
        children ? children : <RGEditingConnectPoints />
      }
    </div>
  );
};

export default RGEditingConnectController;
