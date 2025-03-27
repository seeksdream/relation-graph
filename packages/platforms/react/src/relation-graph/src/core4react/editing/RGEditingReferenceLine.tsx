import React, { useContext, useEffect } from 'react';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';

const RGEditingReferenceLine:React.FC = () => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const options = graphInstance && graphInstance.options;

  useEffect(() => {
    options.editingReferenceLine.show = true;

    return () => {
      options.editingReferenceLine.show = false;
    };
  }, [options]);

  return (
    <div className="rel-editing-referline"
      style={{
        display: options.editingReferenceLine.show ? 'block':'none',
      }}
    >
      {options.editingReferenceLine.directionV && (
        <div
          className="rel-editing-referline-v"
          style={{
            left: options.editingReferenceLine.v_x + 'px',
            top: options.editingReferenceLine.v_y + 'px',
            height: options.editingReferenceLine.v_height + 'px',
          }}
        >
          <div className="referline">
            <div>{options.editingReferenceLine.v_height}px</div>
          </div>
        </div>
      )}
      {options.editingReferenceLine.directionH && (
        <div
          className="rel-editing-referline-h"
          style={{
            left: options.editingReferenceLine.h_x + 'px',
            top: options.editingReferenceLine.h_y + 'px',
            width: options.editingReferenceLine.h_width + 'px',
          }}
        >
          <div className="referline">
            <div>{options.editingReferenceLine.h_width}px</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGEditingReferenceLine;
