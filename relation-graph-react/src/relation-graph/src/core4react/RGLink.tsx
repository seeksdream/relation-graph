import React, { useContext } from 'react';
import RGLineTextByPath from './RGLineTextByPath'
import RGLineSmart from './RGLineSmart';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineSlotProps, RGLink, RGNode } from '../RelationGraph';
export interface RGLinkProps {
  linkProps: RGLink
  LineSlot?: React.FC<RGLineSlotProps>
}
const RGLinkFC: React.FC<RGLinkProps> = ({linkProps, LineSlot}) => {
  const relationGraph = useContext(RelationGraphStoreContext);
  const isAllowShowNode = (thisNode:RGNode):boolean => {
    const _r =
      thisNode.isShow !== false &&
      thisNode.isHide !== true &&
      (!thisNode.lot.parent || isAllowShowNode(thisNode.lot.parent) === true)
    return _r
  }
  const isShow = isAllowShowNode(linkProps.fromNode) && isAllowShowNode(linkProps.toNode)
return <>{isShow && <g
  className={[
    relationGraph.options.checkedLineId == linkProps.seeks_id
      ? 'c-rg-link-checked'
      : ''
  ].join(' ')}
  transform="translate(0,0)"
    >
  {
    linkProps.relations.filter(thisRelation => thisRelation.isHide === false).map((thisRelation, ri)=>
      <React.Fragment key={thisRelation.seeks_id}>
        {
          LineSlot ?
            <LineSlot relationGraph={relationGraph} link={linkProps} relation={thisRelation} relationIndex={ri}  />
            :
            <>
              {
                (relationGraph.options.lineUseTextPath ||
                  thisRelation.useTextPath)
                 ? <RGLineTextByPath
                    key={`l-${  thisRelation.seeks_id}`}
                    link={linkProps}
                    relation={thisRelation}
                    relationIndex={ri}
                  />
                  :
                  <RGLineSmart
                    key={`l-${  thisRelation.seeks_id}`}
                    link={linkProps}
                    relation={thisRelation}
                    relationIndex={ri}
                />
              }
            </>
        }
      </React.Fragment>
    )
  }
</g>}
  </>
};

export default RGLinkFC;
