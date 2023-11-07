import React, { useContext } from 'react';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineProps } from './RGLineSmart';

const RGLineTextByPath: React.FC<RGLineProps> = ({link,relation, relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const options = relationGraph.options;
  const textOffset = `translate(${relation.textOffset_x || options.defaultLineTextOffset_x || 0},${relation.textOffset_y || options.defaultLineTextOffset_y || -8})`;
  const pathRef = `#${options.instanceId}-${link.seeks_id}-${relationIndex}`;
  const checked = link.seeks_id === options.checkedLineId;
  const textAnchor = relation.lineShape === 4 || options.defaultLineShape === 4 ? 'start' : 'middle';
  const textHPosition = relation.lineShape === 4 || options.defaultLineShape === 4 ? (options.layoutDirection === 'v' ? Math.abs(link.toNode.x - link.fromNode.x) + 43 : Math.abs(link.toNode.y - link.fromNode.y) + 43) : '50%';

  const onClick = (e: React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onLineClick(relation, link, e);
    updateView();
  };

  return (
    <g>
      <use
        xlinkHref={pathRef}
        className={[
          'c-rg-line',
          relation.styleClass,
          relation.dashType ? `rg-line-dashtype-${relation.dashType}` : undefined,
          relation.animation ? `rg-line-anm-${relation.animation}` : undefined,
          checked ? 'c-rg-line-checked' : undefined
        ].filter(Boolean).join(' ')}
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      <g transform={textOffset}>
        <text
          className="c-rg-line-text"
          style={{
            opacity: relation.opacity,
            fill: relation.fontColor || options.defaultLineFontColor || relation.color || options.defaultLineColor
          }}
          onTouchStart={(e) => onClick(e)}
          onClick={(e) => onClick(e)}
        >
          <textPath xlinkHref={pathRef} startOffset={textHPosition} textAnchor={textAnchor} method="align" spacing="auto">{relation.text}</textPath>
        </text>
      </g>
    </g>
  );
};

export default RGLineTextByPath;
