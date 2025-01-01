import React, {useEffect, useRef, useState} from 'react';
import RelationGraph from 'relation-graph-react';
import type { RGOptions, RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RelationGraphComponent } from 'relation-graph-react';
import CircumIcon from "@klarr-agency/circum-icons-react";
import './element-lines.scss';

interface InterestGroup {
  groupId: string;
  groupName: string;
}

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent | null>(null);
  const checkedGroupId = useRef('');
  const checkedMemberId = useRef('');
  const [interestGroups, setInterestGroups] = useState([]);
  const graphOptions: RGOptions = {
    debug: false,
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    allowShowDownloadButton: true,
    defaultJunctionPoint: 'border',
    placeOtherNodes: false,
    placeSingleNode: false,
    graphOffset_x: -400,
    graphOffset_y: -200,
    layout: {
      layoutName: 'fixed'
    }
  };
  const loadDataFromRemote = async() => {
    setInterestGroups([
      { groupId: 'a', groupName: 'Sports Group', location: { x: 260, y: 300 } },
      { groupId: 'b', groupName: 'Music Group', location: { x: 350, y: 100 } },
      { groupId: 'c', groupName: 'Arts and Crafts Group', location: { x: 180, y: 40 } },
      { groupId: 'd', groupName: 'Literature Reading Group', location: { x: 430, y: 200 } },
      { groupId: 'e', groupName: 'Volunteer Group', location: { x: 530, y: 130 } },
      { groupId: 'f', groupName: 'Science Research Group', location: { x: 600, y: 240 } },
    ]);
  }
  const initGraph = async() => {
    await loadDataFromRemote();
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.addNodes([
        { id: 'startNode', text: '', opacity: 0, x: -300, y: -300 },
        { id: 'endNode', text: '', opacity: 0, x: 700, y: 700 }
      ]);
      setTimeout(() => {
        onGroupClick('a');
      }, 200);
    }
  };

  const onGroupClick = (groupId: string) => {
    checkedMemberId.current = '';
    checkedGroupId.current = groupId;
    const htmlElementLines = [];
    htmlElementLines.push({
      from: 'group-' + groupId,
      to: 'location-' + groupId,
      color: 'rgba(159,23,227,0.65)',
      lineWidth: 3,
      lineShape: 5,
      animation: 2
    });
    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      graphInstance.clearElementLines();
      graphInstance.addElementLines(htmlElementLines);
    }
  };

  useEffect(() => {
    initGraph();
  }, []);
  useEffect(() => {
  }, [interestGroups]);

  return (
    <div>
      <div className="h-screen">
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          canvasPlugSlot={() => {
            return (
              <>
                <div
                  style={{
                    zIndex: 1, position: 'absolute', left: -700, top: 100, height: 800, width: 800,
                    backgroundImage: `url('https://www.relation-graph.com/images/school-map.png')`,
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.6
                  }}>
                </div>
                <div
                  style={{
                    zIndex: 2, position: 'absolute', left: -700, top: 100, height: 800, width: 800,
                  }}>
                  <div className="relative">
                    {interestGroups.map(group => (
                      <div
                        key={group.groupId}
                        id={`location-${group.groupId}`}
                        className={`c-i-location ${checkedGroupId.current === group.groupId ? 'c-i-location-active' : ''}`}
                        style={{ left: group.location.x + 'px', top: group.location.y + 'px' }}
                        onClick={() => onGroupClick(group.groupId)}
                      >
                        <span><CircumIcon name="location_on" /></span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-72 absolute top-0 z-10" style={{left: '200px'}}>
                  <div>Interest Groups</div>
                  <div>
                    {interestGroups.map(group => (
                      <div
                        key={group.groupId}
                        id={`group-${group.groupId}`}
                        className={`c-i-group ${checkedGroupId.current === group.groupId ? 'c-i-group-checked' : ''}`}
                        onClick={() => onGroupClick(group.groupId)}
                      >
                        <div className="c-i-name">{group.groupName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          }}
        >
        </RelationGraph>
      </div>
    </div>
  );
};

export default MyComponent;
