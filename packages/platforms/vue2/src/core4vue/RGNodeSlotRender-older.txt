
[
    t.options.oldVueVersion && !t.options.oldVueVersionUseSlot
        ? [
            t.nodeProps.innerHTML
                ? e("div", {
                    domProps: {
                        innerHTML: t._s(t.nodeProps.innerHTML),
                    },
                })
                : e(
                    "div",
                    {
                        staticClass: "c-node-text",
                        style: {
                            color:
                                t.nodeProps.fontColor ||
                                t.options.defaultNodeFontColor,
                        },
                    },
                    [
                        e("span", {
                            domProps: {
                                innerHTML: t._s(t.nodeProps.text),
                            },
                        }),
                    ]
                ),
        ]
        : t._t(
            "node",
            [
                t.nodeProps.innerHTML
                    ? e("div", {
                        domProps: {
                            innerHTML: t._s(t.nodeProps.innerHTML),
                        },
                    })
                    : e(
                        "div",
                        {
                            staticClass: "c-node-text",
                            style: {
                                color:
                                    t.nodeProps.fontColor ||
                                    t.options.defaultNodeFontColor,
                            },
                        },
                        [
                            e("span", {
                                domProps: {
                                    innerHTML: t._s(t.nodeProps.text),
                                },
                            }),
                        ]
                    ),
            ],
            { node: t.nodeProps }
        ),
]

    function renderSlot(name, fallbackRender, props, bindObject) {
        const scopedSlotFn = this.$scopedSlots[name];
        let nodes;
        if (scopedSlotFn) {
            // scoped slot
            props = props || {};
            if (bindObject) {
                if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
                    warn$2('slot v-bind without argument expects an Object', this);
                }
                props = extend(extend({}, bindObject), props);
            }
            nodes =
                scopedSlotFn(props) ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
        }
        else {
            nodes =
                this.$slots[name] ||
                (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
        }
        const target = props && props.slot;
        if (target) {
            return this.$createElement('template', { slot: target }, nodes);
        }
        else {
            return nodes;
        }
    }
