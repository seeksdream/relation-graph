import React, {useContext, useEffect, useState} from 'react';
import {RGLineEditPoint} from '../../../../types';
import {RelationGraphStoreContext, RGUpdateSingalContext} from '../store/reducers/StockStore';

const RGEditingLineController:React.FC<{textEditable?: boolean}> = ({ textEditable, children }) => {
  const updateSingal = useContext(RGUpdateSingalContext);
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance && graphInstance.options;
  const show = options.editingLineController.show;
  const text = options.editingLineController.line && options.editingLineController.line.text;
  const [editing, setEditing] = useState(false);
  const [lineText, setLineText] = useState('');
  useEffect(() => {
    if (!show) {
      setEditing(false);
      setLineText('');
    }
  }, [show]);
  useEffect(() => {
    setLineText(text || '');
  }, [text]);
  useEffect(() => {
    graphInstance.updateEditingLineView();
  }, [lineText]);
  const onMouseDown = (type: RGLineEditPoint, event: React.MouseEvent) => {
    graphInstance.startMoveLineVertex(type, event.nativeEvent);
  };

  const startMoveText = ($event: React.MouseEvent) => {
    graphInstance.startMoveLineText($event.nativeEvent);
  };

  if (!options.editingLineController.show) {
    return null;
  }
  const startEditingLineText = (_event: React.MouseEvent) => {
    setEditing(!editing);
  };
  const onLineTextChange = (_event: React.FocusEvent) => {
    const line = options.editingLineController.line;
    if (line) {
      line.text = lineText;
    }
  };

  return (
    <div className="rel-editing-line-ctrl">
      {children}
      <div
        className="rel-line-ctrl-dot start-dot"
        style={{
          left: options.editingLineController.startPoint.x + 'px',
          top: options.editingLineController.startPoint.y + 'px',
        }}
        onMouseDown={(event) => onMouseDown('start', event)}
      ></div>
      <div
        className="rel-line-ctrl-dot end-dot"
        style={{
          left: options.editingLineController.endPoint.x + 'px',
          top: options.editingLineController.endPoint.y + 'px',
        }}
        onMouseDown={(event) => onMouseDown('end', event)}
      ></div>
      {textEditable && options.editingLineController.line && <div
        className={['rel-line-ctrl-text', (editing && 'rel-line-ctrl-text-editing')].join(' ')}
        style={{
          width: options.editingLineController.text.width + 'px',
          height: options.editingLineController.text.height + 'px',
          left: options.editingLineController.text.x + 'px',
          top: options.editingLineController.text.y + 'px'
        }}
        onDoubleClick={(event) => startEditingLineText(event)}
        onMouseDown={(event) => startMoveText(event)}
      >
        {
          !editing ? <span>{text}</span>
            :<input className="rel-line-text-input"
              value={lineText}
              onChange={(event) => {setLineText(event.target.value);}}
              onBlur={(event) => onLineTextChange(event)} />
        }
      </div>
      }
    </div>
  );
};

export default RGEditingLineController;
