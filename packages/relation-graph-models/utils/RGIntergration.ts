import {RelationGraphProps} from "../types";

export const getEventListeners = (props: RelationGraphProps) => {
  const listeners = {
    onNodeClick: props.onNodeClick,
    onNodeExpand: props.onNodeExpand,
    onNodeDragging: props.onNodeDragging,
    onNodeDragStart: props.onNodeDragStart,
    onNodeDragEnd: props.onNodeDragEnd,
    onNodeCollapse: props.onNodeCollapse,
    onLineClick: props.onLineClick,
    onImageDownload: props.onImageDownload,
    onCanvasDragEnd: props.onCanvasDragEnd,
    beforeChangeLayout: props.beforeChangeLayout,
    onContextmenu: props.onContextmenu,
    onFullscreen: props.onFullscreen,
    onCanvasClick: props.onCanvasClick,
    onCanvasSelectionEnd: props.onCanvasSelectionEnd,
    onImageSaveAsFile: props.onImageSaveAsFile,
    onZoomEnd: props.onZoomEnd
  };
  return listeners;
};
