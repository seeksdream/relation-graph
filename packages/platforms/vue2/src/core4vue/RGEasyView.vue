<template>
    <div class="rel-easy-view" :class="{'rel-easy-view-active':options.showEasyView}">
        <canvas ref="rgEasyCanvas" style="width: 100%;height: 100%;" />
    </div>
</template>

<script lang="ts">
import { devLog } from '../../../../relation-graph-models/utils/RGCommon';

export default {
    name: 'RGEasyView',
    components: {},
    data() {
        return {
        };
    },
    inject: ['graphData', 'graph', 'graphInstance'],
    computed: {
        options() {
            return this.graph.options;
        },
        relationGraph() {
          return this.graphInstance();
        },
        allLineColors() {
            return this.graph.allLineColors;
        }
    },
    created() {
        devLog('[RGEasyView created]');
    },
    mounted() {
        devLog('[RGEasyView mounted]');
      this.relationGraph.setEasyViewCanvas && this.relationGraph.setEasyViewCanvas(this.$refs.rgEasyCanvas);
        this.init();
    },
    beforeDestroy() {
    },
    methods: {
        init() {
            // this.$refs.rgCanvas.style.setProperty('--stroke', `url('#${  this.options.instanceId  }-lineStyle')`);
            // this.$refs.rgCanvas.style.setProperty('--markerEnd', `url('#${  this.options.instanceId  }-start-arrow-default')`);
            // this.$refs.rgCanvas.style.setProperty('--markerStart', `url('#${  this.options.instanceId  }-arrow-default')`);
            // this.$refs.rgCanvas.style.setProperty('--markerEndChecked', `url('#${  this.options.instanceId  }-arrow-checked')`);
            // this.$refs.rgCanvas.style.setProperty('--markerStartChecked', `url('#${  this.options.instanceId  }-start-arrow-checked')`);
        },
    }
};
</script>
