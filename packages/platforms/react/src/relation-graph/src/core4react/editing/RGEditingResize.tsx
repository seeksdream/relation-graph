import React, { useContext } from 'react';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';
import {RGResizeHandlePosition} from "../../../../types";

const RGEditingResize:React.FC = () => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const options = graphInstance && graphInstance.options;

  const onMouseDown = (type: RGResizeHandlePosition, event: React.MouseEvent) => {
    event.stopPropagation();
    // console.log('Resize start:', type);
    graphInstance.onResizeStart(type, event.nativeEvent);
  };

  return (
    <div className="rel-resize-ctl">
      {options.editingController.width > 30 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-tl"
          onMouseDown={(event) => onMouseDown('tl', event)}
        ></div>
      )}
      {options.editingController.width > 30 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-tr"
          onMouseDown={(event) => onMouseDown('tr', event)}
        ></div>
      )}
      {options.editingController.width > 30 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-bl"
          onMouseDown={(event) => onMouseDown('bl', event)}
        ></div>
      )}
      <div
        className="rel-resize-ctl-handler rel-resize-ctl-br"
        onMouseDown={(event) => onMouseDown('br', event)}
      ></div>
      {options.editingController.width > 60 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-t"
          onMouseDown={(event) => onMouseDown('t', event)}
        ></div>
      )}
      {options.editingController.width > 60 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-b"
          onMouseDown={(event) => onMouseDown('b', event)}
        ></div>
      )}
      {options.editingController.height > 60 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-l"
          onMouseDown={(event) => onMouseDown('l', event)}
        ></div>
      )}
      {options.editingController.height > 60 && (
        <div
          className="rel-resize-ctl-handler rel-resize-ctl-r"
          onMouseDown={(event) => onMouseDown('r', event)}
        ></div>
      )}
    </div>
  );
};

export default RGEditingResize;
