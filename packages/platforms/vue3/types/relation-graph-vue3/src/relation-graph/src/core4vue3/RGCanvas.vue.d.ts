declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>, {
    'canvas-plug': (_: {}) => any;
    line: (_: {
        line: import("../RelationGraph").RGLine;
        link: import("../RelationGraph").RGLink;
    }) => any;
    node: (_: {
        node: import("../RelationGraph").RGNode;
    }) => any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
