import { RelationGraphWith9EasyView } from './RelationGraphWith9EasyView';
import { JsonLineTemplate, RGJunctionPoint, RGLine, RGLink, RGNode, RGResizeHandlePosition, RGSelectionView, RGUserEvent, RGWidgetPosition } from '../types';
export declare class RelationGraphWith91Editing extends RelationGraphWith9EasyView {
    setEditingNodes(nodes: RGNode[]): void;
    addEditingNode(node: RGNode): void;
    removeEditingNode(node: RGNode): void;
    toggleEditingNode(node: RGNode): void;
    updateEditingControllerView(): void;
    protected _getEventPoint(e: RGUserEvent): {
        x: number;
        y: number;
    };
    protected _onResizing: any;
    protected _onResizeEnd: any;
    protected _startPoint: {
        x: number;
        y: number;
    };
    protected _startSize: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    protected _resizeType: RGResizeHandlePosition;
    protected nodeStartSizeMap: WeakMap<RGNode, any>;
    protected resizeMiniLimit: {
        width: number;
        height: number;
    };
    onResizeStart(type: RGResizeHandlePosition, e: RGUserEvent): void;
    onResizing(e: RGUserEvent): void;
    private _applyResizeScale;
    onResizeEnd(e: RGUserEvent): void;
    protected draggingSelectedNodes(draggedNode: RGNode, buff_x: number, buff_y: number): void;
    getNodesInSelectionView(selectionView: RGSelectionView): any[];
    updateEditingConnectControllerView(): void;
    setEditingLine(line: RGLine | null, link: RGLink | null): void;
    updateReferenceLineView(draggedNode: RGNode, buff_x: number, buff_y: number): void;
    hideEditingLineView(): void;
    updateEditingLineView(updateLine49Points?: boolean): void;
    private getStartAndEndPoint;
    private _currentCreatingLineIsReverse;
    startMoveLineVertex(type: 'start' | 'end', $event: RGUserEvent): void;
    startCreateLineByTemplate(type: RGWidgetPosition, lineTemplate: JsonLineTemplate | undefined, $event: RGUserEvent): void;
    onLineVertexBeDropped(type: RGJunctionPoint, $event: RGUserEvent, junctionPointOffset?: {
        x: number;
        y: number;
    }): void;
    startMoveLineText($event: RGUserEvent): void;
}
