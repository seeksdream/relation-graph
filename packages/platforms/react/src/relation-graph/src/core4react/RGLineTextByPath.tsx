import React, { useContext } from 'react';
import { RGUpdateContext, RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineProps } from './RGLineSmart';

const RGLineTextByPath: React.FC<RGLineProps> = ({link,relation, relationIndex}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const updateView = useContext(RGUpdateContext);
  const options = relationGraph.options;
  const pathRef = `#${options.instanceId}-${relation.id}`;
  const checked = relation.id === options.checkedLineId;
  // const textOffset = `translate(${relation.textOffset_x || options.defaultLineTextOffset_x || 0},${relation.textOffset_y || options.defaultLineTextOffset_y || -8})`;
  // const textAnchor = relation.lineShape === 4 || options.defaultLineShape === 4 ? 'start' : 'middle';
  // const textHPosition = relation.lineShape === 4 || options.defaultLineShape === 4 ? (options.layoutDirection === 'v' ? Math.abs(link.toNode.x - link.fromNode.x) + 43 : Math.abs(link.toNode.y - link.fromNode.y) + 43) : '50%';
  const textStyle = relationGraph.getLineTextStyle(link, relation, relationIndex);
  const onClick = (e: React.MouseEvent|React.TouchEvent) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    relationGraph.onLineClick(relation, link, e);
    updateView();
  };

  const lineWidth = relation.lineWidth !== undefined ? relation.lineWidth : (options.defaultLineWidth || 1);
  const lineColor = relation.color ? relation.color : options.defaultLineColor;
  return (
    <g className={[relation.className].join(' ')} data-id={relation.id}>
      <use
        xlinkHref={pathRef}
        className="c-rg-line-bg"
        style={{
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          strokeWidth: (lineWidth < 8 ? 8 : lineWidth) + 'px'
        }}
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      <use
        xlinkHref={pathRef}
        className={[
          'c-rg-line',
          relation.styleClass,
          relation.dashType ? `rg-line-dashtype-${relation.dashType}` : undefined,
          relation.animation ? `rg-line-anm-${relation.animation}` : undefined,
          checked ? 'c-rg-line-checked' : undefined
        ].filter(Boolean).join(' ')}
        style={{
          stroke: lineColor,
          opacity: relation.opacity,
          strokeWidth: lineWidth + 'px',
          pointerEvents: (relation.disableDefaultClickEffect ? 'none' : undefined),
          fill: relation.lineShape === 8 ? lineColor : 'none'
        }}
        onTouchStart={(e) => onClick(e)}
        onClick={(e) => onClick(e)}
      />
      {textStyle && options.defaultShowLineLabel && options.canvasZoom > 40 && <g transform={textStyle.textOffset}>
        <text
          className={`c-rg-line-text ${checked && 'c-rg-line-text-checked'}`}
          style={{
            opacity: relation.opacity,
            fill: relation.fontColor || options.defaultLineFontColor || relation.color || options.defaultLineColor
          }}
          rotate={textStyle.textRotate}
          onTouchStart={(e) => onClick(e)}
          onClick={(e) => onClick(e)}
        >
          <textPath xlinkHref={pathRef} startOffset={textStyle.textHPosition} textAnchor={textStyle.textAnchor}
                    method="align" spacing="auto">{textStyle.text}</textPath>
        </text>
      </g>}
    </g>
  );
};

export default RGLineTextByPath;
