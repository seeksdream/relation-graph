<script lang="ts" setup>
import { inject, ref } from 'vue'
import { devLog } from '../../utils/RGCommon'
import { relationGraphKey } from '../../../../constants'
const relationGraph = inject(relationGraphKey)!.value
const search_text = ref('')
const currentLayoutName = ref('')
const showSettingPanel = ref(false)
const toggleSettingPanel = () => {
  showSettingPanel.value = !showSettingPanel.value
}
const printOptions = () => {
  console.log('options:', relationGraph.getGraphJsonOptions())
}
const printData = () => {
  console.log('data:', relationGraph.getGraphJsonData())
}
const enableDevlog = () => {
  relationGraph.enableDebugLog(!relationGraph.options.debug)
  devLog('debugLog:', relationGraph.options.debug)
}
</script>
<template>
  <div>
    <div :class="[]" class="c-setting-panel-button" @click="toggleSettingPanel">
      Debug
    </div>
    <div v-if="showSettingPanel" :class="[]" class="c-setting-panel">
      <div class="c-debug-tools-row">
        <button @click="printOptions">print options in console</button>
      </div>
      <div class="c-debug-tools-row">
        <button @click="printData">print json data in console</button>
      </div>
      <div class="c-debug-tools-row">
        debug log status: {{ relationGraph.options.debug
        }}<button @click="enableDevlog">
          {{ relationGraph.options.debug ? 'disable' : 'enable' }} debug log
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.c-setting-panel {
  --height: 300px;
  --width: 200px;
  width: 300px;
  height: 200px;
  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 12px;
  color: rgb(58, 91, 178);
  padding: 10px;
  overflow: hidden;
  box-shadow: 0px 0px 5px #999999;
  border-radius: 5px;
  z-index: 1000;
  background-color: #ffffff;
  border: #999999 solid 1px;
  padding-top: 60px;
}
.c-setting-panel-button {
  height: 35px;
  width: 35px;
  font-size: 8px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  margin-left: 25px;
  margin-top: 20px;
  background-color: rgb(58, 91, 178);
  color: #ffffff;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0px 0px 8px #999999;
}
.c-setting-panel-button:hover {
  box-shadow: 0px 0px 20px #ffa20a;
  border: #ffffff solid 1px;
  color: #ffa20a;
  -moz-transform: rotate(-89deg) translateX(-190px);
  animation-timing-function: linear;
  animation: flashButton 2s infinite;
}
.c-fixedLayout {
  position: fixed;
  top: 125px;
}
@keyframes flashButton {
  from {
    box-shadow: 0px 0px 8px rgb(46, 78, 143);
  }
  30% {
    box-shadow: 0px 0px 20px #ffa20a;
  }
  to {
    box-shadow: 0px 0px 8px rgb(46, 78, 143);
  }
}
.c-debug-tools-row {
  text-align: left;
}
</style>
