import React, { useContext } from 'react';
import {RelationGraphStoreContext} from '../store/reducers/StockStore';
import {RGJunctionPoint} from "../../../../types";

const RGEditingConnectPoints = () => {
  const graphInstance = useContext(RelationGraphStoreContext);

  const onMouseUp = (type: RGJunctionPoint, event: React.MouseEvent) => {
    graphInstance.onLineVertexBeDropped(type, event.nativeEvent);
  };

  return (
    <div className="rel-connect-ctl">
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-t"
        data-point="top"
        onMouseUp={(event) => onMouseUp('top', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-b"
        data-point="bottom"
        onMouseUp={(event) => onMouseUp('bottom', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-center"
        data-point="border"
        onMouseUp={(event) => onMouseUp('border', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-l"
        data-point="left"
        onMouseUp={(event) => onMouseUp('left', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-r"
        data-point="right"
        onMouseUp={(event) => onMouseUp('right', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-lr"
        data-point="lr"
        onMouseUp={(event) => onMouseUp('lr', event)}
      />
      <div
        className="rel-connect-ctl-handler rel-connect-ctl-tb"
        data-point="tb"
        onMouseUp={(event) => onMouseUp('tb', event)}
      />
    </div>
  );
};

export default RGEditingConnectPoints;
