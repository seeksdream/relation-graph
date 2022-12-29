<template>
  <div>
    <div :class="[]" class="c-setting-panel-button" @click="toggleSettingPanel">
      Debug
    </div>
    <div v-if="showSettingPanel" :class="[]" class="c-setting-panel">
      <div class="c-debug-tools-row"><button @click="printOptions">print options in console</button></div>
      <div class="c-debug-tools-row"><button @click="printData">print json data in console</button></div>
      <div class="c-debug-tools-row">debug log status: {{relationGraph.options.debug}}<button @click="enableDevlog">{{relationGraph.options.debug?'disable':'enable'}} debug log</button></div>
    </div>
  </div>
</template>

<script>

import { devLog } from '@/utils/RGCommon';

export default {
  name: 'GraphSettingPanel',
  props: {
    relationGraph: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    }
  },
  data() {
    return {
      search_text: '',
      showSettingPanel: false,
      currentLayoutName: ''
    };
  },
  // computed: mapState({
  //   graphSetting: () => _parent.graphSetting
  // }),
  // watch: {
  //   'graphSetting.layoutName': function(newV, oldV) {
  //     console.log('change layout:', newV, oldV)
  //     RGLayouterController.switchLayout(newV, this.graphSetting)
  //     this.$parent.refresh()
  //   }
  // },
  methods: {
    toggleSettingPanel() {
      this.showSettingPanel = !this.showSettingPanel;
    },
    printOptions() {
      console.log('options:', this.relationGraph.options);
    },
    printData() {
      console.log('data:', this.relationGraph.graphData);
    },
    enableDevlog() {
      this.relationGraph.enableDebugLog(!this.relationGraph.options.debug);
      devLog('debugLog:', this.relationGraph.options.debug);
    }
  }
};
</script>

<style scoped>
  .c-setting-panel{
    --height:300px;
    --width:200px;
    width:300px;
    height:200px;
    position: absolute;
    margin-left:10px;
    margin-top:5px;
    font-size: 12px;
    color: rgb(58, 91, 178);
    padding:10px;
    overflow: hidden;
    box-shadow: 0px 0px 5px #999999;
    border-radius: 5px;
    z-index: 1000;
    background-color: #ffffff;
    border: #999999 solid 1px;
    padding-top:60px;
  }
  .c-setting-panel-button{
    height:35px;
    width:35px;
    font-size: 8px;
    line-height: 35px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    margin-left:25px;
    margin-top:20px;
    background-color: rgb(58, 91, 178);
    color: #ffffff;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0px 0px 8px #999999;
  }
  .c-setting-panel-button:hover{
    box-shadow: 0px 0px 20px #FFA20A;
    border:#ffffff solid 1px;
    color: #FFA20A;
    -moz-transform: rotate(-89deg) translateX(-190px);
    animation-timing-function:linear;
    animation: flashButton 2s infinite;
  }
  .c-fixedLayout{
    position: fixed;
    top: 125px
  }
  @keyframes flashButton {
    from {
      box-shadow: 0px 0px 8px rgb(46, 78, 143);
    }
    30% {
      box-shadow: 0px 0px 20px #FFA20A;
    }
    to {
      box-shadow: 0px 0px 8px rgb(46, 78, 143);
    }
  }
  .c-debug-tools-row{
    text-align:left;
  }
</style>
