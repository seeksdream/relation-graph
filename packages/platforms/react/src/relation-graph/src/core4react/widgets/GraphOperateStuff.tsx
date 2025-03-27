import React, {useContext} from 'react';
import SeeksRGNode from '../RGNode';
import {RelationGraphStoreContext} from '../store/reducers/StockStore';
import type { RGNodeSlotProps } from '../../../../../../../relation-graph-models/types';

export interface GraphOperateStuffProps {
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
}
const GraphOperateStuff: React.FC<GraphOperateStuffProps> = ({nodeSlot}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph && relationGraph.options;
  return (
    (options && (options.creatingNodePlot || options.creatingSelection)) ?
      <div className="rel-operate">
        <div style={{position: 'relative'}}>
          {options.creatingNodePlot && options.showTemplateNode &&
                  <SeeksRGNode
                    nodeProps={options.newNodeTemplate}
                    NodeSlot={nodeSlot}
                  />
          }
          {
            options.creatingSelection &&
              <div
                className="rel-selection"
                style={{
                  left: options.selectionView.x + 'px',
                  top: options.selectionView.y + 'px',
                  width: options.selectionView.width + 'px',
                  height: options.selectionView.height + 'px',
                }}
              >
              </div>
          }
        </div>
      </div>
      :
      <div></div>
  );
};

export default GraphOperateStuff;
