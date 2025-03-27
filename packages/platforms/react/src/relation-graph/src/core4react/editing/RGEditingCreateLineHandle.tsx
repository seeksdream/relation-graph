import React, { useContext } from 'react';
import {RGWidgetPosition, RGCreateLineHandleProps} from '../../../../types';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';

const RGEditingCreateLineHandle:React.FC<RGCreateLineHandleProps> = ({ lineTemplate, children }) => {
  const updateSingal = useContext(RGUpdateSingalContext);
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance && graphInstance.options;

  const onMouseDown = (type: RGWidgetPosition, event: React.MouseEvent) => {
    graphInstance.startCreateLineByTemplate(type, lineTemplate, event.nativeEvent);
  };

  if (options.editingController.nodes.length !== 1) {
    return null;
  }

  return (
    <div
      className="rel-editing-line-handle"
      onMouseDown={(event) => onMouseDown('br', event)}
    >
      {children}
    </div>
  );
};

export default RGEditingCreateLineHandle;
