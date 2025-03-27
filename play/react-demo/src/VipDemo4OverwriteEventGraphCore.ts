
import {RelationGraphCore, RGUserEvent} from 'relation-graph-react';

export class MyRelationGraphCore extends RelationGraphCore{
    constructor(...args) {
        super(...args);
    }
    myMouseDownAction: (e:RGUserEvent) => void;
    setMyMouseDownAction(action: (e:RGUserEvent) => void) {
        this.myMouseDownAction = action;
    }
    // 当鼠标在画布上按下时mousedown
    onCanvasDragStart(e:RGUserEvent) {
    // 触发自定义的事件
        this.myMouseDownAction(e);
        // 触发图谱本身的事件
        super.onCanvasDragStart(e);
    }
}
