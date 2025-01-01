import _RelationGraph from './src/core4vue3/index.vue.js';
export default _RelationGraph;
export declare const RelationGraph: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{}> & Omit<Readonly<import("vue").ExtractPropTypes<{
            options: {
                type: import("vue").PropType<any>;
                required: true;
            };
            relationGraphCore: {
                type: import("vue").PropType<any>;
            };
            onNodeClick: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onNodeExpand: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onNodeCollapse: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onLineClick: {
                type: import("vue").PropType<(line: import("./src/RelationGraph").RGLine, link: import("./src/RelationGraph").RGLink, e: MouseEvent | TouchEvent) => boolean>;
            };
            onImageDownload: {
                type: import("vue").PropType<(dom: HTMLElement, format: string) => boolean>;
            };
        }>> & {
            "onOn-node-click"?: ((...args: any[]) => any) | undefined;
            "onOn-line-click"?: ((...args: any[]) => any) | undefined;
            "onOn-node-expand"?: ((...args: any[]) => any) | undefined;
            "onOn-node-collapse"?: ((...args: any[]) => any) | undefined;
            "onOn-image-download"?: ((...args: any[]) => any) | undefined;
            "onOn-download-excel"?: ((...args: any[]) => any) | undefined;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, never>;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot | undefined;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null;
        $emit: (event: "on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel", ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
            options: {
                type: import("vue").PropType<any>;
                required: true;
            };
            relationGraphCore: {
                type: import("vue").PropType<any>;
            };
            onNodeClick: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onNodeExpand: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onNodeCollapse: {
                type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
            };
            onLineClick: {
                type: import("vue").PropType<(line: import("./src/RelationGraph").RGLine, link: import("./src/RelationGraph").RGLink, e: MouseEvent | TouchEvent) => boolean>;
            };
            onImageDownload: {
                type: import("vue").PropType<(dom: HTMLElement, format: string) => boolean>;
            };
        }>> & {
            "onOn-node-click"?: ((...args: any[]) => any) | undefined;
            "onOn-line-click"?: ((...args: any[]) => any) | undefined;
            "onOn-node-expand"?: ((...args: any[]) => any) | undefined;
            "onOn-node-collapse"?: ((...args: any[]) => any) | undefined;
            "onOn-image-download"?: ((...args: any[]) => any) | undefined;
            "onOn-download-excel"?: ((...args: any[]) => any) | undefined;
        }, {
            onFullscreen: () => void;
            getInstance(): import("./src/RelationGraph").RelationGraphInstance;
            setOptions(options: import("./src/RelationGraph").RGOptions, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
            setJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
            appendJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
            setLayouter(layouterInstance: import("./src/RelationGraph").RGLayouter): void;
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
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel")[], string, {}, {}, string> & {
            beforeCreate?: ((() => void) | (() => void)[]) | undefined;
            created?: ((() => void) | (() => void)[]) | undefined;
            beforeMount?: ((() => void) | (() => void)[]) | undefined;
            mounted?: ((() => void) | (() => void)[]) | undefined;
            beforeUpdate?: ((() => void) | (() => void)[]) | undefined;
            updated?: ((() => void) | (() => void)[]) | undefined;
            activated?: ((() => void) | (() => void)[]) | undefined;
            deactivated?: ((() => void) | (() => void)[]) | undefined;
            beforeDestroy?: ((() => void) | (() => void)[]) | undefined;
            beforeUnmount?: ((() => void) | (() => void)[]) | undefined;
            destroyed?: ((() => void) | (() => void)[]) | undefined;
            unmounted?: ((() => void) | (() => void)[]) | undefined;
            renderTracked?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            renderTriggered?: (((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[]) | undefined;
            errorCaptured?: (((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void)[]) | undefined;
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import("vue").WatchOptions<boolean> | undefined): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<{
        options: {
            type: import("vue").PropType<any>;
            required: true;
        };
        relationGraphCore: {
            type: import("vue").PropType<any>;
        };
        onNodeClick: {
            type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
        };
        onNodeExpand: {
            type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
        };
        onNodeCollapse: {
            type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
        };
        onLineClick: {
            type: import("vue").PropType<(line: import("./src/RelationGraph").RGLine, link: import("./src/RelationGraph").RGLink, e: MouseEvent | TouchEvent) => boolean>;
        };
        onImageDownload: {
            type: import("vue").PropType<(dom: HTMLElement, format: string) => boolean>;
        };
    }>> & {
        "onOn-node-click"?: ((...args: any[]) => any) | undefined;
        "onOn-line-click"?: ((...args: any[]) => any) | undefined;
        "onOn-node-expand"?: ((...args: any[]) => any) | undefined;
        "onOn-node-collapse"?: ((...args: any[]) => any) | undefined;
        "onOn-image-download"?: ((...args: any[]) => any) | undefined;
        "onOn-download-excel"?: ((...args: any[]) => any) | undefined;
    } & import("vue").ShallowUnwrapRef<{
        onFullscreen: () => void;
        getInstance(): import("./src/RelationGraph").RelationGraphInstance;
        setOptions(options: import("./src/RelationGraph").RGOptions, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
        setJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
        appendJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
        setLayouter(layouterInstance: import("./src/RelationGraph").RGLayouter): void;
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
    }> & {} & import("vue").ComponentCustomProperties & {};
    __isFragment?: undefined;
    __isTeleport?: undefined;
    __isSuspense?: undefined;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: import("vue").PropType<any>;
        required: true;
    };
    relationGraphCore: {
        type: import("vue").PropType<any>;
    };
    onNodeClick: {
        type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
    };
    onNodeExpand: {
        type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
    };
    onNodeCollapse: {
        type: import("vue").PropType<(node: import("./src/RelationGraph").RGNode, e: MouseEvent | TouchEvent) => boolean>;
    };
    onLineClick: {
        type: import("vue").PropType<(line: import("./src/RelationGraph").RGLine, link: import("./src/RelationGraph").RGLink, e: MouseEvent | TouchEvent) => boolean>;
    };
    onImageDownload: {
        type: import("vue").PropType<(dom: HTMLElement, format: string) => boolean>;
    };
}>> & {
    "onOn-node-click"?: ((...args: any[]) => any) | undefined;
    "onOn-line-click"?: ((...args: any[]) => any) | undefined;
    "onOn-node-expand"?: ((...args: any[]) => any) | undefined;
    "onOn-node-collapse"?: ((...args: any[]) => any) | undefined;
    "onOn-image-download"?: ((...args: any[]) => any) | undefined;
    "onOn-download-excel"?: ((...args: any[]) => any) | undefined;
}, {
    onFullscreen: () => void;
    getInstance(): import("./src/RelationGraph").RelationGraphInstance;
    setOptions(options: import("./src/RelationGraph").RGOptions, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
    setJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
    appendJsonData(jsonData: import("./src/RelationGraph").RGJsonData, reLayout?: boolean | import("./src/RelationGraph").RGRefreshCallback | undefined, callback?: ((graphInstance: import("./src/RelationGraph").RelationGraphInstance) => void) | undefined): void;
    setLayouter(layouterInstance: import("./src/RelationGraph").RGLayouter): void;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel")[], "on-node-click" | "on-line-click" | "on-node-expand" | "on-node-collapse" | "on-image-download" | "on-download-excel", {}, {}, string> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        miniToolBar: (_: {}) => any;
        miniViewPanel: (_: {}) => any;
        'graph-plug': (_: {
            relationGraph: import("./src/RelationGraph").RelationGraphInstance;
        }) => any;
        node: (_: {
            node: import("./src/RelationGraph").RGNode;
            relationGraph: import("./src/RelationGraph").RelationGraphInstance;
        }) => any;
        line: (_: {
            line: import("./src/RelationGraph").RGLine;
            link: import("./src/RelationGraph").RGLink;
            relationGraph: import("./src/RelationGraph").RelationGraphInstance;
        }) => any;
        'canvas-plug': (_: {
            relationGraph: import("./src/RelationGraph").RelationGraphInstance;
        }) => any;
    };
});
