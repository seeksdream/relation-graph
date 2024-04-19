import React, {MutableRefObject, useContext, useEffect, useRef} from "react";
import {RelationGraphStoreContext} from "./store/reducers/StockStore";
import {RGCanvasProps} from "./RGCanvas";
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon';

const RGCanvas: React.FC<RGCanvasProps> = (canvasProps) => {
    const relationGraph = useContext(RelationGraphStoreContext);
    const options = relationGraph.options;
    const rgEasyCanvas$ = useRef() as MutableRefObject<HTMLCanvasElement>;

    useEffect(() => {
        devLog('[RGEasyView mounted]');
        relationGraph.setEasyViewCanvas(rgEasyCanvas$.current!);
    }, []);

    return (
    <div className={`rel-easy-view ${options.showEasyView ? 'rel-easy-view-active' : ''}`}>
        <canvas ref={rgEasyCanvas$} />
    </div>
    );
};

export default RGCanvas;
