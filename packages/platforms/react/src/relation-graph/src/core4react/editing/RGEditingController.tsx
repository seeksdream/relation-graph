import React, { useContext } from 'react';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';

const RGEditingController:React.FC = ({ children }) => {
  const updateSingal = useContext(RGUpdateSingalContext);
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance && graphInstance.options;

  if (!options.editingController.show || options.snapshotting) {
    return null;
  }

  const style = {
    left: options.editingController.x + 'px',
    top: options.editingController.y + 'px',
    width: options.editingController.width + 'px',
    height: options.editingController.height + 'px',
  };

  return (
    <div className="rel-editing-ctrl" style={style}>
      {children}
    </div>
  );
};

export default RGEditingController;
