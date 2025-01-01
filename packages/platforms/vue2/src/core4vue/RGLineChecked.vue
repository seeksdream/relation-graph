<template>
  <g>
    <path
        v-if="pathData"
        :d="pathData"
        fill="none"
        stroke="red"
        :stroke-width="strokeWidth"
        class="c-rg-line-checked-bg"
    />
  </g>
</template>

<script lang="ts">

import {devLog} from "../../../../relation-graph-models/utils/RGCommon";
import {RGLine, RGLink} from "../../../../relation-graph-models/types";

export default {
  name: 'RGCheckedLine',
  inject: ['graph', 'graphInstance'],
  computed: {
    options() {
      return this.graph.options;
    },
    relationGraph() {
      return this.graphInstance();
    },
    pathData() {
      return this.relationGraph.createCheckedLinePath();
    },
    strokeWidth() {
      return this.relationGraph.createCheckedLineStrokeWidth();
    }
  },
  data() {
    return {
      is_flashing: false
    };
  },
  show() {
    this.isShow = true;
  },
  watch: {
  }
};
</script>

<style scoped>
</style>
