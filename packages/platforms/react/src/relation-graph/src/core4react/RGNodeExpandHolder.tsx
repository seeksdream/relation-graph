import React from 'react';
import {RGNodeExpandHolderProps} from "../../../types-react";

const RGNodeExpandHolder: React.FC<RGNodeExpandHolderProps> = ({expandButtonClass, expandOrCollapseNode, expandHolderPosition, color}) => {
  return (
    <div
      className={`c-expand-positon-${expandHolderPosition} c-btn-open-close`}
    >
      <span
        className={expandButtonClass}
        style={{ backgroundColor: color }}
        onClickCapture={(e) => {
          expandOrCollapseNode(e);
        }}
        onTouchEnd={(e) => {
          expandOrCollapseNode(e);
        }}
      ></span>
    </div>
  );
};

export default RGNodeExpandHolder;
