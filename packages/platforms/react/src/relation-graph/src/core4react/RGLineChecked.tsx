import React, { useContext } from 'react';
import { RelationGraphStoreContext } from './store/reducers/StockStore';

const RGLineChecked: React.FC = () => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const pathData = relationGraph.createCheckedLinePath();
  const strokeWidth = relationGraph.createCheckedLineStrokeWidth();
  return (
    <g>
      {pathData && <path
        d={pathData}
        fill="none"
        stroke="red"
        strokeWidth={strokeWidth}
        className="c-rg-line-checked-bg"
      />}
    </g>
  );
};

export default RGLineChecked;
