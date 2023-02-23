<template>
  <div>
    <div style="border: #efefef solid 1px; height: calc(100vh - 100px);width: 100%;">
      <RelationGraph ref="relationGraph$" :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import RelationGraph from '../../../relation-graph-vue3/src'
const relationGraph$ = ref()
const options = {
  defaultExpandHolderPosition: 'right',
  defaultLineShape: 1,
  debug: true,
  showDebugPanel: true,
}
onMounted(() => {
  const jsonData = {
    rootId: 'a',
    nodes: [
      { id: 'a', text: 'a', },
      { id: 'b', text: 'b', },
      { id: 'c', text: 'c', },
      { id: 'd', text: 'd', },
      { id: 'e', text: 'e', },
      { id: 'f', text: 'f', },
      { id: 'sc', text: 'sc', },
      { id: 'sd', text: 'sd', },
      { id: 'se', text: 'se', },
      { id: 'sf', text: 'sf', },
    ],
    lines: [
      { from: 'a', to: 'b', },
      { from: 'a', to: 'c', },
      { from: 'a', to: 'd', },
      { from: 'a', to: 'e', },
      { from: 'a', to: 'f', },
      { from: 'sc', to: 'se', },
      { from: 'sc', to: 'sf', },
    ],
  }
  relationGraph$.value.setJsonData(jsonData, (rgInstance) => {
    console.log('setJsonData ok:', rgInstance.options.instanceId);
  })
})
</script>
