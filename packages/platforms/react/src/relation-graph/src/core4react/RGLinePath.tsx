import React, {CSSProperties, useContext} from 'react';
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
  const lineColor = relation.color ? relation.color : options.defaultLineColor;
  const style:CSSProperties = options.snapshotting ? {
    stroke: lineColor,
    opacity: relation.opacity,
    strokeWidth: lineWidth + 'px',
    pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
    fill: relation.lineShape === 8 ? lineColor : 'none'
  } : {};
  return (
    <path
      id={`${options.instanceId}-${relation.id}`}
      d={pathData()}
      markerStart={showStartArrow}
      markerEnd={showEndArrow}
      className={`c-rg-line-path ${relation.styleClass} ${
        checked ? 'c-rg-line-checked' : ''
      }`}
      style={style}
    />
  );
};

export default RGLinePath;
