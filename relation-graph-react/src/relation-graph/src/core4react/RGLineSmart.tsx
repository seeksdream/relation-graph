import React, { useContext } from 'react';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLine, RGLink } from '../../../../../relation-graph-vue2/src/types';
import { devLog } from '../../../../../relation-graph-vue2/src/utils/RGCommon';
export interface RGLineProps {
  link: RGLink
  relation: RGLine
  relationIndex: number
}
const RGLineSmart: React.FC<RGLineProps> = ({link,relation,relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const options = relationGraph.options;
  const checked = link.seeks_id === options.checkedLineId;

  const showStartArrow = relation.showStartArrow ? relationGraph.getArrow(relation, link, true) : undefined;
  const showEndArrow = relation.showEndArrow ? relationGraph.getArrow(relation, link, false) : undefined;

  const pathData = React.useMemo(() => {
    try {
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
    } catch (e) {
      devLog(e);
    }
    return { path: undefined, textTransform: undefined };
  }, [link, relation, relationIndex]);

  const onClick = (e: React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onLineClick(relation, link, e);
    updateView();
  };

  return (
    <g>
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
          'strokeWidth': (relation.lineWidth ? relation.lineWidth : options.defaultLineWidth) + 'px'
        }}
        markerStart={showStartArrow}
        markerEnd={showEndArrow}
        fill="none"
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      {options.defaultShowLineLabel && options.canvasZoom > 40 && (
        <g transform={pathData.textTransform}>
          <text
            key={'t-' + relation.seeks_id}
            x={relation.textOffset_x || options.defaultLineTextOffset_x || 0}
            y={relation.textOffset_y || options.defaultLineTextOffset_y || 10}
            style={{
              opacity: relation.opacity,
              fill: relation.fontColor ? relation.fontColor : (options.defaultLineFontColor ? options.defaultLineFontColor : (relation.color ? relation.color : options.defaultLineColor))
            }}
            className="c-rg-line-text"
            onTouchStart={(e) => onClick(e)}
            onClick={(e) => onClick(e)}
          >
            {relation.text}
          </text>
        </g>
      )}
    </g>
  );
};

export default RGLineSmart;
