import {RelationGraphProps} from "../types";

export const getEventListeners = (props: RelationGraphProps) => {
  const listeners = {
    onNodeClick: props.onNodeClick,
    onNodeExpand: props.onNodeExpand,
    onNodeCollapse: props.onNodeCollapse,
    onLineClick: props.onLineClick,
    onImageDownload: props.onImageDownload,
    onNodeDragEnd: props.onNodeDragEnd,
    onCanvasDragEnd: props.onCanvasDragEnd,
    beforeChangeLayout: props.beforeChangeLayout,
    onContextmenu: props.onContextmenu,
    onCanvasClick: props.onCanvasClick,
    onCanvasSelectionEnd: props.onCanvasSelectionEnd,
    onImageSaveAsFile: props.onImageSaveAsFile
  };
  return listeners;
};
