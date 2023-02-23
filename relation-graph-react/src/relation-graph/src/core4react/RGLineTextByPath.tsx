import React, { useContext } from 'react';
import { getTextSize } from '../utils/RGCommon'
import { getNodeDistance } from '../utils/RGGraphMath'
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLine, RGNode } from '../RelationGraph';
import type { RGLineProps } from './RGLineSmart';

const RGLineTextByPath: React.FC<RGLineProps> = ({link,relation, relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const checked = link.seeks_id === relationGraph.options.checkedLineId
  const textWidth = getTextSize(relation.text!) * 10
  const distance = getNodeDistance(
    link.fromNode.x,
    link.fromNode.y,
    link.toNode.x,
    link.toNode.y
  )
  const textOffset = (distance - textWidth) / 2
  const onClick = (line:RGLine, e:React.MouseEvent | React.TouchEvent) => {
    // @ts-ignore
    relationGraph.onLineClick(line, link, e)
    updateView();
  }
  const isAllowShowNode = (thisNode:RGNode):boolean => {
    const _r =
      thisNode.isShow !== false &&
      thisNode.isHide !== true &&
      (!thisNode.lot.parent || isAllowShowNode(thisNode.lot.parent) === true)
    return _r
  }
return <g>
  <use
    xlinkHref={`#${ 
    relationGraph.options.instanceId 
    }-${ 
    link.seeks_id 
    }-${ 
    relationIndex}`}
  className={['c-rg-line', checked ? 'c-rg-line-checked' : ''].join(' ')}
  onClickCapture={($event)=>{onClick(relation, $event)}}
  />
  <text
    className="c-rg-line-text"
  style={{
    fill: checked
      ? relationGraph.options.checkedLineColor
      : relation.fontColor
        ? relation.fontColor
        : relation.color
          ? relation.color
          : undefined,
  }}
  x={textOffset}
  y="0"
    onClickCapture={($event)=>{onClick(relation, $event)}}
  >
  <textPath
    xlinkHref={`#${ 
    relationGraph.options.instanceId 
    }-${ 
    link.seeks_id 
    }-${ 
    relationIndex}`}
  startOffset="0"
  textAnchor="start"
  method="align"
  spacing="auto"
  >
  { relation.text }
</textPath>
</text>
</g>;
};

export default RGLineTextByPath;
