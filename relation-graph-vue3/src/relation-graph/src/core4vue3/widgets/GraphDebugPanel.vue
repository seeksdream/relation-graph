<script lang="ts" setup>
import { inject, ref, computed } from 'vue'
import { devLog } from '../../../../../../relation-graph-vue2/src/utils/RGCommon'
import {graphInstanceKey, graphKey} from '../../../../constants'
const graphInstance$ = inject(graphInstanceKey)
const graph = inject(graphKey)
const options = computed(() => {
  return graph!.options!;
})
const showSettingPanel = ref(false)
const toggleSettingPanel = () => {
  showSettingPanel.value = !showSettingPanel.value
}
const printOptions = () => {
  graphInstance$?.value!.printOptions();
}
const printData = () => {
  graphInstance$?.value!.printData();
}
const enableDevlog = () => {
  graphInstance$?.value!.enableDebugLog(!options.value.debug)
  devLog('debugLog:', graphInstance$?.value!.options.debug)
}
</script>
<template>
  <div>
    <div :class="[]" class="c-setting-panel-button" @click="toggleSettingPanel">
      Debug
    </div>
    <div v-if="showSettingPanel" :class="[]" class="c-setting-panel">
      <div class="c-debug-tools-row"><button @click="printOptions">print options in console</button></div>
      <div class="c-debug-tools-row"><button @click="printData">print json data in console</button></div>
      <div class="c-debug-tools-row">debug log status: {{options.debug}}<button @click="enableDevlog">{{options.debug?'disable':'enable'}} debug log</button></div>
    </div>
  </div>
</template>
