import React, {useContext, useEffect} from 'react';
import RGLineSmart from './RGLineSmart';
import RGLineTextByPath from './RGLineTextByPath';
import RGNodesAnalytic from '../../../../../relation-graph-vue2/src/utils/RGNodesAnalytic';
import {RelationGraphStoreContext} from './store/reducers/StockStore';
import type { RGLink, RGNode, RGLineSlotProps } from '../../../../../relation-graph-vue2/src/types';
export interface RGLinkProps {
  linkProps: RGLink
  LineSlot?: React.FC<RGLineSlotProps>
}
const SeeksRGLink = ({ linkProps, LineSlot }:RGLinkProps) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const isAllowShowNode = (thisNode:RGNode) => {
    return RGNodesAnalytic.isAllowShowNode(thisNode);
  };

  useEffect(() => {
    // mounted logic here
  }, []);

  const options = relationGraph.options;
  return (
    <g
      style={{ display: isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode) ? 'block' : 'none' }}
      className={[
        'rel-link-peel',
        options.checkedLineId === linkProps.seeks_id ? 'c-rg-link-checked' : ''
      ].join(' ')}
      transform="translate(0,0)"
      data-id={linkProps.seeks_id}
    >
      {linkProps.relations.map((thisRelation, ri) =>
        <React.Fragment key={thisRelation.id}>
          {
            LineSlot ?
              <LineSlot relationGraph={relationGraph} link={linkProps} relation={thisRelation} relationIndex={ri}  />
              :
              (
                (thisRelation.useTextPath || options.lineUseTextPath) ?
                  <RGLineTextByPath link={linkProps} relation={thisRelation} relationIndex={ri} />
                  :
                  <RGLineSmart link={linkProps} relation={thisRelation} relationIndex={ri} />
              )
          }
        </React.Fragment>
      )}
    </g>
  );
};

export default SeeksRGLink;
