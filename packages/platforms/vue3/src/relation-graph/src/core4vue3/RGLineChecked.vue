<script lang="ts" setup>
import { computed, inject } from 'vue'
import {graphInstanceKey, graphKey} from '../../../constants'
import type { RGLine, RGLink } from '../../../../../../relation-graph-models/types';
import {devLog} from "../../../../../../relation-graph-models/utils/RGCommon";
import {RGOptions} from "../../../../../../relation-graph-models/types";
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed<RGOptions>(() => {
  return graph!.options!;
})
const pathData = computed(() => {
  return graph.instance!.createCheckedLinePath();
})
const strokeWidth = computed(() => {
  return graph.instance!.createCheckedLineStrokeWidth();
})
</script>
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
