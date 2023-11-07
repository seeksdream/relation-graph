import React, { useContext, useEffect, useRef } from 'react';
import SeeksRGNode from './RGNode';
import SeeksRGLink from './RGLink';
import SeeksRGLinePath from './RGLinePath';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineSlotProps, RGNodeSlotProps } from '../../../../../relation-graph-vue2/src/types';
import type { MutableRefObject} from 'react';
import {RGNodeExpandHolderProps} from "../../../types-react";
export interface RGSingleGraphProps {
  nodeSlot?: React.FC<RGNodeSlotProps>
  lineSlot?: React.FC<RGLineSlotProps>
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps>
}
const RGSingleGraph: React.FC<RGSingleGraphProps> = (canvasProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const rgCanvas$ = useRef() as MutableRefObject<HTMLDivElement>;
  useEffect(() => {
    init();
  }, []);
  const init = () => {
    rgCanvas$.current!.style.setProperty(
      '--stroke',
      `url('#${options.instanceId}-lineStyle')`
    );
    rgCanvas$.current!.style.setProperty(
      '--markerEnd',
      `url('#${options.instanceId}-start-arrow-default')`
    );
    rgCanvas$.current!.style.setProperty(
      '--markerStart',
      `url('#${options.instanceId}-arrow-default')`
    );
    rgCanvas$.current!.style.setProperty(
      '--markerEndChecked',
      `url('#${options.instanceId}-arrow-checked')`
    );
    rgCanvas$.current!.style.setProperty(
      '--markerStartChecked',
      `url('#${options.instanceId}-start-arrow-checked')`
    );
  };
  const options = relationGraph.options;
  const allLineColors = relationGraph.allLineColors;
  const nodes = relationGraph.graphData.nodes;
  const links = relationGraph.graphData.links;
  return (
    <div>
      <div ref={rgCanvas$} className="rel-linediv" style={{ overflow: 'visible' }}>
        <svg
          style={
            {width: `${options.canvasSize.width  }px`,
              height: `${options.canvasSize.height  }px`,
              overflow:'visible'}
          }
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`${options.instanceId  }-lineStyle`}
              x1="1"
              y1="0"
              x2="0"
              y2="0"
            >
              <stop offset="0%" stopColor="#e52c5c" />
              <stop offset="100%" stopColor="#FD8B37" />
            </linearGradient>
            <marker
              id={`${options.instanceId  }-arrow-default`}
              markerWidth={options.defaultLineMarker!.markerWidth}
              markerHeight={options.defaultLineMarker!.markerHeight}
              refX={options.defaultLineMarker!.refX}
              refY={options.defaultLineMarker!.refY}
              markerUnits="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
            >
              <path
                style={{ fill: options.defaultLineColor }}
                d={options.defaultLineMarker!.data}
              />
            </marker>
            <marker
              id={`${options.instanceId  }-start-arrow-default`}
              markerWidth={options.defaultLineMarker!.markerWidth}
              markerHeight={options.defaultLineMarker!.markerHeight}
              refX={options.defaultLineMarker!.refX}
              refY={options.defaultLineMarker!.refY}
              markerUnits="strokeWidth"
              orient="auto"
              viewBox="0 0 12 12"
            >
              <path
                style={{ fill: options.defaultLineColor }}
                d={options.defaultLineMarker!.data}
                transform="translate(12,12)rotate(180)"
              />
            </marker>
            <marker
              id={`${options.instanceId  }-arrow-checked`}
              markerUnits="strokeWidth"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <path
                style={{ fill: options.checkedLineColor }}
                d="M2,2 L10,6 L2,10 L6,6 L2,2"
              />
            </marker>
            <marker
              id={`${options.instanceId  }-start-arrow-checked`}
              markerUnits="strokeWidth"
              markerWidth="12"
              markerHeight="12"
              viewBox="0 0 12 12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <path
                style={{ fill: options.checkedLineColor }}
                d="M2,2 L10,6 L2,10 L6,6 L2,2"
                transform="translate(12,12)rotate(180)"
              />
            </marker>
            {allLineColors.map(thisColor=>
              <marker
                id={`${options.instanceId  }-arrow-${  thisColor.id}`}
                key={thisColor.id}
                markerWidth={options.defaultLineMarker!.markerWidth}
                markerHeight={options.defaultLineMarker!.markerHeight}
                refX={options.defaultLineMarker!.refX}
                refY={options.defaultLineMarker!.refY}
                markerUnits="strokeWidth"
                orient="auto"
              >
                <path
                  fill={options.defaultLineMarker!.color ||
                    thisColor.color}
                  d={options.defaultLineMarker!.data}
                />
              </marker>)}
            {allLineColors.map(thisColor=>
              <marker
                id={`${options.instanceId
                }-start-arrow-${
                  thisColor.id}`}
                key={`start-${  thisColor.id}`}
                markerWidth={options.defaultLineMarker!.markerWidth}
                markerHeight={options.defaultLineMarker!.markerHeight}
                refX={options.defaultLineMarker!.refX}
                refY={options.defaultLineMarker!.refY}
                markerUnits="strokeWidth"
                orient="auto"
              >
                <path
                  fill={options.defaultLineMarker!.color ||
                    thisColor.color}
                  d={options.defaultLineMarker!.data}
                  transform="translate(12,12)rotate(180)"
                />
              </marker>
            )}
            {links.map(thisLink=>
              <React.Fragment key={thisLink.seeks_id}>
                {thisLink.relations.filter(thisRelation => (options.lineUseTextPath || thisRelation.useTextPath)).map((thisRelation, ri) =>
                  <SeeksRGLinePath
                    key = { thisRelation.id }
                    link = { thisLink }
                    relation = { thisRelation }
                    relationIndex = { ri }
                  />
                )}
              </React.Fragment>
            )}
          </defs>
          {
            links.map(thisLink=>
              <SeeksRGLink
                key={thisLink.seeks_id}
                linkProps={thisLink}
                LineSlot={canvasProps.lineSlot}
              />
            )
          }
        </svg>
      </div>
      <div className="rel-nodediv rel-nodediv-for-webkit">
        {
          nodes.map(thisNode=>
            <SeeksRGNode
              key={thisNode.id}
              nodeProps={thisNode}
              NodeSlot={canvasProps.nodeSlot}
              ExpandHolderSlot={canvasProps.expandHolderSlot}
            />
          )
        }
      </div>
    </div>
  );
};

export default RGSingleGraph;
