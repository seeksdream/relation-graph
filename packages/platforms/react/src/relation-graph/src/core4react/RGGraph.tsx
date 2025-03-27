import React, { useContext, useEffect, useRef } from 'react';
import SeeksRGNode from './RGNode';
import SeeksRGLink from './RGLink';
import { RelationGraphStoreContext } from './store/reducers/StockStore';
import type { RGLineSlotProps, RGNodeSlotProps } from '../../../../../../relation-graph-models/types';
import type { MutableRefObject} from 'react';
import {RGNodeExpandHolderProps} from '../../../types-react';
import RGLineChecked from './RGLineChecked';
import RGLineSmart from './RGLineSmart';
import RGGraphRefs from './RGGraphRefs';
import RGLineTextByPath from './RGLineTextByPath';
export interface RGSingleGraphProps {
  nodeSlot?: React.FC<RGNodeSlotProps> | React.ReactNode
  lineSlot?: React.FC<RGLineSlotProps> | React.ReactNode
  svgDefs?: React.FC | React.ReactNode
  expandHolderSlot?: React.FC<RGNodeExpandHolderProps> | React.ReactNode
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
  const nodes = relationGraph.graphData.nodes;
  const links = relationGraph.graphData.links;
  const elementLines = relationGraph.graphData.elementLines;
  const LineSlot = canvasProps.lineSlot;
  return (
    <>
      <div ref={rgCanvas$} className="rel-linediv">
        <svg
          className="rel-lines-svg"
          style={
            {width: `${options.canvasSize.width  }px`,
              height: `${options.canvasSize.height  }px`}
          }
          xmlns="http://www.w3.org/2000/svg"
        >
          <RGGraphRefs svgDefs={canvasProps.svgDefs} />
          {!options.showEasyView && <RGLineChecked/>}
          {
            links.map(thisLink=>
              (!options.showEasyView && !thisLink.invisiable) && <SeeksRGLink
                key={thisLink.seeks_id}
                linkProps={thisLink}
                LineSlot={LineSlot}
              />
            )
          }
        </svg>
      </div>
      <div className="rel-nodediv rel-nodediv-for-webkit">
        {
          nodes.map(thisNode=>
            (!options.showEasyView && !thisNode.invisiable) && <SeeksRGNode
              key={thisNode.seeks_id}
              nodeProps={thisNode}
              NodeSlot={canvasProps.nodeSlot}
              ExpandHolderSlot={canvasProps.expandHolderSlot}
            />
          )
        }
      </div>
      <div className="rel-linediv rel-linediv-el-lines">
        <svg className="rel-lines-svg rel-lines-svg-el-lines"
          xmlns="http://www.w3.org/2000/svg">
          {<RGGraphRefs forElementLines={true} />}
          {
            elementLines.map(thisLink=>
              <>
                {thisLink.relations.map((thisRelation, ri) =>
                  thisRelation.isHide !== true && <React.Fragment key={thisRelation.id}>
                    {
                      LineSlot ?
                        <LineSlot relationGraph={relationGraph} link={thisLink} line={thisRelation} lineIndex={ri}  />
                        :
                        (
                          (thisRelation.useTextPath !== undefined ? thisRelation.useTextPath : options.lineUseTextPath) ?
                            <RGLineTextByPath link={thisLink} relation={thisRelation} relationIndex={ri} />
                            :
                            <RGLineSmart link={thisLink} relation={thisRelation} relationIndex={ri} />
                        )
                    }
                  </React.Fragment>
                )}
                {/*thisLink.relations[0].isHide === false && <RGLineSmart key={'ell-'+thisLink.relations[0].id} link={thisLink} relation={thisLink.relations[0]} relationIndex={0} />*/}
              </>
            )
          }
          {
            options.creatingLinePlot && options.newLinkTemplate.fromNode
            && <RGLineSmart link={options.newLinkTemplate} relation={options.newLineTemplate} relationIndex={0} />
          }
        </svg>
      </div>
    </>
  );
};

export default RGSingleGraph;
