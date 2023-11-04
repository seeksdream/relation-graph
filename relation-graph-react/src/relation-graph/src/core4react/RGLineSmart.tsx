import React, { useContext } from 'react';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLine, RGLink } from '../RelationGraph';
export interface RGLineProps {
  link: RGLink
  relation: RGLine
  relationIndex: number
}
const RGLineSmart: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const checked = link.seeks_id === relationGraph.options.checkedLineId
  const { path, textPosition } = relationGraph.createLinePath(
    link,
    relation,
    relationIndex
  )
  const textTransform = relationGraph.getTextTransform(
    relation,
    textPosition.x,
    textPosition.y,
    textPosition.rotate
  )
  const onClick = (line:RGLine, e: React.MouseEvent | React.TouchEvent) => {
    // @ts-ignore
    relationGraph.onLineClick(line, link, e)
    updateView();
  }
  const showText = relationGraph.options.defaultShowLineLabel &&
    relationGraph.options.canvasZoom > 40
return <g>
  <path
  d={path}
  className={['c-rg-line', relation.styleClass, checked ? 'c-rg-line-checked' : ''].join(' ')}
  stroke={checked
    ? relationGraph.options.checkedLineColor
    : relation.color
      ? relation.color
      : relationGraph.options.defaultLineColor}
  style={{
    opacity: relation.opacity,
    strokeWidth:
      `${relation.lineWidth
        ? relation.lineWidth
        : relationGraph.options.defaultLineWidth  }px`,
  }}
  markerStart={relation.showStartArrow ? relationGraph.getArrow(relation, link, true) : ''}
  markerEnd={relation.showEndArrow ? relationGraph.getArrow(relation, link, false) : ''}
  fill="none"
  onClickCapture={($event)=>{onClick(relation, $event)}}
  />
  {showText && <g transform={textTransform}>
  <text
  key={`t-${  relation.seeks_id}`}
  x="0"
  y="0"
  style={{
    opacity: relation.opacity,
    fill: checked
      ? relationGraph.options.checkedLineColor
      : relation.fontColor
        ? relation.fontColor
        : relation.color
          ? relation.color
          : undefined
  }}
  className="c-rg-line-text"
  onClickCapture={($event)=>{onClick(relation, $event)}}
  >
  { relation.text }
</text>
</g>}
</g>
};

export default RGLineSmart;

