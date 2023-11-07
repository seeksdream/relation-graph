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

<script lang="ts">

import { devLog } from '../../utils/RGCommon';

export default {
  name: 'GraphSettingPanel',
  data() {
    return {
      search_text: '',
      showSettingPanel: false,
      currentLayoutName: ''
    };
  },
  inject: ['graph'],
  computed: {
    relationGraph() {
      return this.graph.instance;
    },
    options() {
      return this.graph.options;
    }
  },
  methods: {
    toggleSettingPanel() {
      this.showSettingPanel = !this.showSettingPanel;
    },
    printOptions() {
      this.relationGraph.printOptions();
    },
    printData() {
      this.relationGraph.printData();
    },
    enableDevlog() {
      this.relationGraph.enableDebugLog(!this.options.debug);
      devLog('debugLog:', this.options.debug);
    }
  }
};
</script>

