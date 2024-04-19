import React, { useEffect, useRef } from 'react';
import RelationGraph from '../relation-graph-agent';
import type { RGJsonData, RGNode, RGLine, RGLink, RGUserEvent, RGOptions, RelationGraphComponent, RGNodeSlotProps }
  from 'relation-graph-react';

const MyComponent = () => {
  const graphRef = useRef<RelationGraphComponent | null>(null);

  useEffect(() => {
    showGraph();
  }, []);

  const showGraph = async () => {
    const __graph_json_data: RGJsonData = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
        { id: 'x', text: 'X' },
        { id: 'd', text: 'D', nodeShape: 1, width: 150, height: 100 },
        { id: 'e', text: 'E', width: 150, height: 150 },
        { id: 'f', text: 'F', nodeShape: 1 },
        { id: 'g', text: 'G', borderWidth: 1, nodeShape: 1, width: 300, height: 60 },
        { id: 'h', text: 'H', fixed: true, x: 20, y: 20 },
        { id: 'i', text: 'I' },
        { id: 'k1', text: 'K-1' },
        { id: 'k2', text: 'K-2' },
        { id: 'k3', text: 'K-3' },
        { id: 'k4', text: 'K-4' },
        { id: 'm1', text: 'M-1' },
        { id: 'm2', text: 'M-2' },
        { id: 'm3', text: 'M-3' },
        { id: 'm4', text: 'M-4' },
        { id: 'p1', text: 'P-1' },
        { id: 'p2', text: 'P-2' },
        { id: 'p3', text: 'P-3' },
        { id: 'p4', text: 'P-4' }
      ],
      lines: [
        { from: 'a', to: 'b', text: 'Text Color', color: '#c71585' },
        { from: 'a', to: 'c', text: 'Multiple Relations 1', color: 'rgba(30, 144, 255, 1)' },
        { from: 'a', to: 'c', text: 'Multiple Relations 2', color: 'rgba(255, 140, 0, 1)' },
        { from: 'c', to: 'a', text: 'Multiple Relations 3', color: '#90ee90' },
        { from: 'a', to: 'd', text: 'Thick Line', lineWidth: 3 },
        { from: 'a', to: 'e', text: 'Hide Arrow', showEndArrow: false },
        { from: 'e', to: 'e', text: 'Same Start and End', color: 'red' },
        { from: 'a', to: 'f', text: 'Line Style 5', lineShape: 5 },
        { from: 'f', to: 'g', text: 'Line Style 3', lineShape: 3 },
        { from: 'a', to: 'h', text: 'Different Color for Line and Text', color: 'rgba(30, 144, 255, 1)', fontColor: 'rgba(255, 140, 0, 1)' },
        { from: 'a', to: 'i', text: 'Polyline', lineShape: 4 },
        { from: 'b', to: 'h', text: 'Line Style 1', lineShape: 6 },
        { from: 'd', to: 'k1', text: 'Style 2', lineShape: 2, lineWidth: 2, color: '#ff8c00' },
        { from: 'd', to: 'k2', text: 'Style 2', lineShape: 2, lineWidth: 3, color: '#ff8c00' },
        { from: 'd', to: 'k3', text: 'Style 2', lineShape: 2, lineWidth: 4, color: '#ff8c00' },
        { from: 'd', to: 'k4', text: 'Style 2', lineShape: 2, lineWidth: 5, color: '#ff8c00' },
        { from: 'c', to: 'm1', text: 'Style 3', lineShape: 3, lineWidth: 6, color: '#00ced1' },
        { from: 'c', to: 'm2', text: 'Style 3', lineShape: 3, lineWidth: 7, color: '#00ced1' },
        { from: 'c', to: 'm3', text: 'Style 3', lineShape: 3, lineWidth: 8, color: '#00ced1' },
        { from: 'c', to: 'm4', text: 'Style 3', lineShape: 3, lineWidth: 9, color: '#00ced1' },
        { from: 'e', to: 'p1', text: 'Style 5', lineShape: 5, lineWidth: 10, color: '#ffd700' },
        { from: 'e', to: 'p2', text: 'Style 5', lineShape: 5, lineWidth: 11, color: '#ffd700' },
        { from: 'e', to: 'p3', text: 'Style 5', lineShape: 5, lineWidth: 12, color: '#ffd700' },
        { from: 'e', to: 'p4', text: 'This line has a very long text that can follow along the line', useTextPath: true, lineShape: 5, color: '#ffd700' },
        {
          from: 'i',
          to: 'x',
          text: 'Link2',
          color: 'rgba(255, 120, 0, 1)',
          lineWidth: 1,
          data: {}
        },
        {
          from: 'x',
          to: 'i',
          text: 'Link3',
          color: 'rgba(0, 206, 209, 1)',
          showStartArrow: true,
          showEndArrow: false,
          lineWidth: 1,
          lineShape: 1,
          data: {}
        },
        {
          from: 'x',
          to: 'i',
          text: 'Link3',
          color: 'rgba(144, 240, 144, 0.5)',
          showEndArrow: false,
          lineWidth: 5,
          lineShape: 3,
          data: {}
        }
      ]
    };

    const graphInstance = graphRef.current?.getInstance();
    if (graphInstance) {
      await graphInstance.setJsonData(__graph_json_data);
      await graphInstance.moveToCenter();
      await graphInstance.zoomToFit();
    }
  };

  const onNodeClick = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeClick:', nodeObject);
  };

  const onLineClick = (lineObject: RGLine, linkObject: RGLink, $event: RGUserEvent) => {
    console.log('onLineClick:', lineObject, linkObject);
  };
  const onNodeDragStart = (nodeObject: RGNode, $event: RGUserEvent) => {
    console.log('onNodeDragStart:', nodeObject, $event);
  };

  const NodeSlot: React.FC<RGNodeSlotProps> = ({ node }) => {
    return (
      <div className="my-node">
        <div className="my-node-text">
          {node.text}
        </div>
      </div>
    );
  };
  const graphOptions: RGOptions = {
    debug: true,
    defaultNodeBorderWidth: 0,
    // disableDragCanvas: true,
    // disableDragNode: true,
    // disableZoom: true
    // 这里可以参考"Graph 图谱"中的参数进行设置
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
        <RelationGraph
          ref={graphRef}
          options={graphOptions}
          onNodeClick={onNodeClick}
          onNodeDragStart={onNodeDragStart}
          onLineClick={onLineClick}
          nodeSlot={NodeSlot}
        />
      </div>
    </div>
  );
};

export default MyComponent;
