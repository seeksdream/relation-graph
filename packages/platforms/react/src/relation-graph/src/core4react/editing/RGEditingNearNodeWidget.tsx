import React from 'react';
import {RGWidgetPosition, RGWidgetProps} from '../../../../types';

const RGEditingNearNodeWidget: React.FC<RGWidgetProps> = ({ position, children }) => {
  const _position: RGWidgetPosition = position || 'top';
  return (
    <div
      className={`rel-editing-bar rel-editing-bar-${_position}`}
    >
      {children}
    </div>
  );
};

export default RGEditingNearNodeWidget;
