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
    onCanvasDragging: props.onCanvasDragging,
    onCanvasSelectionEnd: props.onCanvasSelectionEnd,
    onImageSaveAsFile: props.onImageSaveAsFile,
    beforeNodeResize: props.beforeNodeResize,
    onZoomEnd: props.onZoomEnd
  };
  return listeners;
};
