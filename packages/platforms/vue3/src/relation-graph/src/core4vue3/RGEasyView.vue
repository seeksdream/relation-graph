<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { devLog } from '../../../../../../relation-graph-models/utils/RGCommon'
import {graphInstanceKey, graphKey} from '../../../constants'
const $rgEasyCanvas = ref<HTMLCanvasElement>()
// const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
onMounted(() => {
  devLog('[RGEasyView mounted]');
  graph.instance!.setEasyViewCanvas && graph.instance!.setEasyViewCanvas($rgEasyCanvas.value!);
})
</script>
<template>
    <div class="rel-easy-view" :class="{'rel-easy-view-active':options.showEasyView}">
        <canvas ref="$rgEasyCanvas" style="width: 100%;height: 100%;" />
    </div>
</template>
