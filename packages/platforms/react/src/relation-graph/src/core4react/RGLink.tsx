import React, {useContext, useEffect} from 'react';
import RGLineSmart from './RGLineSmart';
import RGLineTextByPath from './RGLineTextByPath';
import RGNodesAnalytic from '../../../../../../relation-graph-models/utils/RGNodesAnalytic';
import {RelationGraphStoreContext} from './store/reducers/StockStore';
import type { RGLink, RGNode, RGLineSlotProps } from '../../../../../../relation-graph-models/types';
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
  return isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode) && (
    <g
      className={[
        'rel-link-peel',
        options.checkedLinkId === linkProps.seeks_id ? 'c-rg-link-checked' : ''
      ].join(' ')}
      transform="translate(0,0)"
      data-id={linkProps.seeks_id}
    >
      {linkProps.relations.map((thisRelation, ri) =>
        thisRelation.isHide !== true && <React.Fragment key={thisRelation.id}>
          {
            LineSlot ?
              <LineSlot relationGraph={relationGraph} link={linkProps} line={thisRelation} lineIndex={ri}  />
              :
              (
                (thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) ?
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
