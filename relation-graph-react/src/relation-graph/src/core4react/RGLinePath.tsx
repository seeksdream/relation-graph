import React, { useContext } from 'react';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineProps } from './RGLineSmart';

const RGLinePath: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const options = relationGraph.options;
  const checked = link.seeks_id === options.checkedLineId;

  const pathData = () => {
    const { path } = relationGraph.createLinePath(
      link,
      relation,
      relationIndex
    );
    return path;
  };
  const showStartArrow = relation.showStartArrow ? relationGraph.getArrow(relation, link, true) : undefined;
  const showEndArrow = relation.showEndArrow ? relationGraph.getArrow(relation, link, false) : undefined;
  return (
    <path
      id={`${options.instanceId}-${link.seeks_id}-${relationIndex}`}
      d={pathData()}
      stroke={relation.color ? relation.color : options.defaultLineColor}
      style={{
        opacity: relation.opacity,
        strokeWidth: `${
          relation.lineWidth ? relation.lineWidth : options.defaultLineWidth
        }px`,
      }}
      markerStart={showStartArrow}
      markerEnd={showEndArrow}
      className={`c-rg-line-path ${relation.styleClass} ${
        checked ? 'c-rg-line-checked' : ''
      }`}
      fill="none"
    />
  );
};

export default RGLinePath;
