import React, { useContext } from 'react';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLine, RGLink } from '../../../../../../relation-graph-models/types';
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon';
export interface RGLineProps {
  link: RGLink
  relation: RGLine
  relationIndex: number
}
const RGLineSmart: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const options = relationGraph.options;
  const checked = relation.id === options.checkedLineId;

  const showStartArrow = relationGraph.getArrow(relation, link, true);
  const showEndArrow = relationGraph.getArrow(relation, link, false);
  const calcPathData = () => {
    const { path, textPosition } = relationGraph.createLinePath(link, relation, relationIndex);
    let textTransform = undefined;
    try {
      textTransform = relationGraph.getTextTransform(relation, textPosition.x, textPosition.y, textPosition.rotate);
    } catch (e) {
      devLog(e);
    }
    return {
      path,
      textTransform
    };
  };
  const textStyle = relationGraph.getLineTextStyle(link, relation, relationIndex);
  const onClick = (e: React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onLineClick(relation, link, e);
    updateView();
  };
  const pathData = calcPathData();
  const lineWidth = relation.lineWidth !== undefined ? relation.lineWidth : (options.defaultLineWidth || 1);
  return (
    <g className={[relation.className].join(' ')} data-id={relation.id}>
      <path
        d={pathData.path}
        className="c-rg-line-bg"
        style={{
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
        }}
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      <path
        d={pathData.path}
        className={[
          'c-rg-line',
          relation.styleClass,
          relation.dashType ? ('rg-line-dashtype-' + relation.dashType) : undefined,
          relation.animation ? ('rg-line-anm-' + relation.animation) : undefined,
          checked ? 'c-rg-line-checked' : undefined
        ].join(' ')}
        stroke={relation.color ? relation.color : options.defaultLineColor}
        style={{
          opacity: relation.opacity,
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          strokeWidth: lineWidth + 'px',
          fill: relation.lineShape === 8 ? (relation.color || options.defaultLineColor) : 'none'
        }}
        markerStart={showStartArrow}
        markerEnd={showEndArrow}
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      {textStyle && options.defaultShowLineLabel && options.canvasZoom > 40 && (
        <g transform={pathData.textTransform}>
          <text
            key={'t-' + relation.seeks_id}
            x={relation.textOffset_x || options.defaultLineTextOffset_x || 0}
            y={relation.textOffset_y || options.defaultLineTextOffset_y || 10}
            style={{
              opacity: relation.opacity,
              fill: relation.fontColor ? relation.fontColor : (options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color ? relation.color : options.defaultLineColor))
            }}
            textAnchor={textStyle.textAnchor}
            className={`c-rg-line-text ${checked && 'c-rg-line-text-checked'}`}
            onTouchStart={(e) => onClick(e)}
            onClick={(e) => onClick(e)}
          >
            {textStyle.text}
          </text>
        </g>
      )}
    </g>
  );
};

export default RGLineSmart;
