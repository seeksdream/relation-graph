import React, { useContext } from 'react';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineProps } from './RGLineSmart';

const RGLinePath: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const checked = link.seeks_id === relationGraph.options.checkedLineId
  const {path} = relationGraph.createLinePath(link, relation, relationIndex)
return <path
    id={`${relationGraph.options.instanceId 
      }-${ 
      link.seeks_id 
      }-${ 
      relationIndex}`}
d={path}
stroke={checked
  ? relationGraph.options.checkedLineColor
  : relation.color
    ? relation.color
    : relationGraph.options.defaultLineColor}
style={{
  strokeWidth:
    `${relation.lineWidth
      ? relation.lineWidth
      : relationGraph.options.defaultLineWidth  }px`
}}
markerStart={relation.showStartArrow ? relationGraph.getArrow(relation, link, true) : ''}
markerEnd={relation.showEndArrow ? relationGraph.getArrow(relation, link, false) : ''}
className={[checked ? 'c-rg-line-checked' : ''].join(' ')}
fill="none"
  />;
};

export default RGLinePath;
