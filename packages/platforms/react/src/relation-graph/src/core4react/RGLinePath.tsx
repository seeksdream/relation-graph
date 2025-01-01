import React, { useContext } from 'react';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineProps } from './RGLineSmart';

const RGLinePath: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph.options;
  const checked = relation.id === options.checkedLineId;

  const pathData = () => {
    const { path } = relationGraph.createLinePath(
      link,
      relation,
      relationIndex
    );
    return path;
  };
  const showStartArrow = relationGraph.getArrow(relation, link, true);
  const showEndArrow = relationGraph.getArrow(relation, link, false);
  const lineWidth = relation.lineWidth !== undefined ? relation.lineWidth : (options.defaultLineWidth || 1);
  return (
    <path
      id={`${options.instanceId}-${link.seeks_id}-${relationIndex}`}
      d={pathData()}
      markerStart={showStartArrow}
      markerEnd={showEndArrow}
      className={`c-rg-line-path ${relation.styleClass} ${
        checked ? 'c-rg-line-checked' : ''
      }`}
    />
  );
};

export default RGLinePath;
