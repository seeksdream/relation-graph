import React, { useContext, useState } from 'react';
import { RelationGraphStoreContext } from '../store/reducers/StockStore';

const GraphLoading: React.FC = () => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph && relationGraph.options;
  const clickGraphMask = (e) => {
    relationGraph.clickGraphMask(e);
  }
  return (
    <>
    {
      options && <div
    className={`rel-graph-loading ${!options.graphLoading ? 'rel-graph-loading-hide' : ''}`}
    onClick={(e) => {clickGraphMask(e);}}
  >
    <div className="rel-graph-loading-message">
      <svg className="c-graph-loading-icon" aria-hidden="true">
        <use xlinkHref="#icon-lianjiezhong"></use>
      </svg>
      Loading...
    </div>
  </div>
}
    </>
  );
};

export default GraphLoading;
