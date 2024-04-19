import type { RGJsonData, RGLayouter, RGOptions, RGRefreshCallback, RelationGraphInstance, RelationGraphProps } from '../RelationGraph';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<RelationGraphProps>, {
    onFullscreen: () => void;
    getInstance(): RelationGraphInstance;
    setOptions(options: RGOptions, callback?: ((graphInstance: RelationGraphInstance) => void) | undefined): void;
    setJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: ((graphInstance: RelationGraphInstance) => void) | undefined): void;
    appendJsonData(jsonData: RGJsonData, reLayout?: boolean | RGRefreshCallback, callback?: ((graphInstance: RelationGraphInstance) => void) | undefined): void;
    setLayouter(layouterInstance: RGLayouter): void;
    onGraphResize(): void;
    refresh(): void;
    focusRootNode(): void;
    focusNodeById(nodeId: string): any;
    getNodeById(nodeId: string): any;
    removeNodeById(nodeId: string): any;
    getNodes(): any;
    getLinks(): any;
    getGraphJsonData(): any;
    getGraphJsonOptions(): any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel")[], "on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<RelationGraphProps>>> & {
    "onOn-node-click"?: ((...args: any[]) => any) | undefined;
    "onOn-line-click"?: ((...args: any[]) => any) | undefined;
    "onOn-node-expand"?: ((...args: any[]) => any) | undefined;
    "onOn-node-collapse"?: ((...args: any[]) => any) | undefined;
    "onOn-image-download"?: ((...args: any[]) => any) | undefined;
    "onOn-download-excel"?: ((...args: any[]) => any) | undefined;
}, {}>, {
    miniToolBar: (_: {}) => any;
    miniViewPanel: (_: {}) => any;
    'graph-plug': (_: {
        relationGraph: RelationGraphInstance;
    }) => any;
    node: (_: {
        node: import("../RelationGraph").RGNode;
        relationGraph: RelationGraphInstance;
    }) => any;
    line: (_: {
        line: import("../RelationGraph").RGLine;
        link: import("../RelationGraph").RGLink;
        relationGraph: RelationGraphInstance;
    }) => any;
    'canvas-plug': (_: {
        relationGraph: RelationGraphInstance;
    }) => any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
