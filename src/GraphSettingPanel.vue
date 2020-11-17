<template>
  <div>
    <div :class="[$parent.isNeedFixedTools?'c-fixedLayout':'']" class="c-setting-panel-button" @click="toggleSettingPanel">
      <i class="el-icon-setting" />
    </div>
    <div v-if="showSettingPanel" :class="[$parent.isNeedFixedTools?'c-fixedLayout':'']" class="c-setting-panel">
      <!--      <div style="padding:3px;">-->
      <!--        搜索节点：-->
      <!--        <el-autocomplete-->
      <!--          v-model="$parent.search_text"-->
      <!--          :fetch-suggestions="$parent.querySearchAsync"-->
      <!--          :trigger-on-focus="true"-->
      <!--          :label="'xxxx'"-->
      <!--          size="small"-->
      <!--          placeholder="输入节点名称"-->
      <!--          clearable-->
      <!--          style="width: 220px;"-->
      <!--          @select="$parent.handleSelect">-->
      <!--          <template slot-scope="{ item }">-->
      <!--            <div class="c-suggestion-name">{{ item.text }}</div>-->
      <!--          </template>-->
      <!--        </el-autocomplete>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        布局方式：-->
      <!--        <el-radio-group v-model="currentlayoutName" size="mini" @change="switchLayout">-->
      <!--          <el-radio-button label="center">中心</el-radio-button>-->
      <!--          <el-radio-button label="circle">环形</el-radio-button>-->
      <!--          <el-radio-button label="tree">树状(L)</el-radio-button>-->
      <!--          <el-radio-button label="tree-plus-r">树状(R)</el-radio-button>-->
      <!--          <el-radio-button label="tree-plus-t">树状(T)</el-radio-button>-->
      <!--          <el-radio-button label="tree-plus-b">树状(B)</el-radio-button>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        线条样式：-->
      <!--        <el-radio-group v-model="graphSetting.defaultLineShape" size="small">-->
      <!--          <el-radio-button :label="1">直线</el-radio-button>-->
      <!--          <el-radio-button :label="2">简洁</el-radio-button>-->
      <!--          <el-radio-button :label="3">生动</el-radio-button>-->
      <!--          <el-radio-button :label="5">鱼尾</el-radio-button>-->
      <!--          <el-radio-button :label="4">折线</el-radio-button>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        节点样式：-->
      <!--        <el-radio-group v-model="graphSetting.defaultNodeShape" size="small">-->
      <!--          <el-radio-button :label="0">圆形</el-radio-button>-->
      <!--          <el-radio-button :label="1">长方形</el-radio-button>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        图像缩放：-->
      <!--        <el-input-number v-model="graphSetting.canvasZoom" :max="500" :min="10" :step="20" size="small"/>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        连线标签：-->
      <!--        <el-switch-->
      <!--          v-model="graphSetting.defaultShowLineLabel"-->
      <!--          active-color="#13ce66"-->
      <!--          inactive-color="#ff4949"/>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        联动拖拽：-->
      <!--        <el-switch-->
      <!--          v-model="graphSetting.isMoveByParentNode"-->
      <!--          active-color="#13ce66"-->
      <!--          inactive-color="#ff4949"/>-->
      <!--        拖动父节点后子节点跟随-->
      <!--      </div>-->
      <!--      <div style="padding:3px;display: none;">-->
      <!--        最大层级：-->
      <!--        <el-radio-group v-model="graphSetting.maxLevel" size="small">-->
      <!--          <el-radio-button :label="1">1级</el-radio-button>-->
      <!--          <el-radio-button :label="2">2级</el-radio-button>-->
      <!--          <el-radio-button :label="3">3级</el-radio-button>-->
      <!--          <el-radio-button :label="4">4级</el-radio-button>-->
      <!--          <el-radio-button :label="5">5级</el-radio-button>-->
      <!--        </el-radio-group>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        自动布局：-->
      <!--        <el-switch-->
      <!--          v-model="graphSetting.autoLayouting"-->
      <!--          active-color="#13ce66"-->
      <!--          inactive-color="#ff4949"-->
      <!--          @change="toggleAutoLayout" />-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        全屏展示：-->
      <!--        <el-switch-->
      <!--          v-model="graphSetting.fullscreen"-->
      <!--          active-color="#13ce66"-->
      <!--          inactive-color="#ff4949"/>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        刷新布局：-->
      <!--        <el-button size="small" type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>-->
      <!--      </div>-->
      <!--      <div style="padding:3px;">-->
      <!--        图片下载：-->
      <!--        <el-button size="small" type="primary" icon="el-icon-download" @click="$parent.downloadAsImage('png')">下载png</el-button>-->
      <!--        <el-button size="small" type="primary" icon="el-icon-download" @click="$parent.downloadAsImage('jpg')">下载jpg</el-button>-->
      <!--      </div>-->
      <!--      <slot :setting="graphSetting" name="settingPanelPlus"/>-->
    </div>
  </div>
</template>

<script>
import SeeksRGLayouters from './core4vue/SeeksRGLayouters'
// import SeeksRGStore from './core4vue/SeeksRGStore'
// import { mapState } from 'vuex'
// var _parent = this.$parent
// console.log('GraphSettingPanel.vue:', _parent)
export default {
  name: 'GraphSettingPanel',
  props: {
    graphSetting: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      search_text: '',
      showSettingPanel: false,
      currentLayoutName: ''
    }
  },
  // computed: mapState({
  //   graphSetting: () => _parent.graphSetting
  // }),
  // watch: {
  //   'graphSetting.layoutName': function(newV, oldV) {
  //     console.log('change layout:', newV, oldV)
  //     SeeksRGLayouters.switchLayout(newV, this.graphSetting)
  //     this.$parent.refresh()
  //   }
  // },
  methods: {
    toggleSettingPanel() {
      this.showSettingPanel = !this.showSettingPanel
    },
    toggleAutoLayout() {
      if (this.graphSetting.autoLayouting) {
        if (!this.graphSetting.layouter.autoLayout) {
          console.log('当前布局不支持自动布局！')
        } else {
          this.graphSetting.layouter.autoLayout(true)
        }
      } else {
        if (!this.graphSetting.layouter.stop) {
          console.log('当前布局不支持自动布局stop！')
        } else {
          this.graphSetting.layouter.stop()
        }
      }
    },
    switchLayout() {
      if (window.SeeksGraphDebug) console.log('change layout:', this.currentLayoutName)
      SeeksRGLayouters.switchLayout(this.currentLayoutName, this.graphSetting)
      this.refresh()
    },
    refresh() {
      this.$parent.refresh()
    }
  }
}
</script>

<style scoped>
  .c-setting-panel{
    --height:500px;
    --width:500px;
    width:500px;
    height:500px;
    position: absolute;
    margin-left:10px;
    margin-top:5px;
    font-size: 12px;
    color: rgb(58, 91, 178);
    padding:10px;
    overflow: hidden;
    box-shadow: 0px 0px 5px rgb(58, 91, 178);
    border-radius: 5px;
    z-index: 1000;
    background-color: #ffffff;
    border: rgb(58, 91, 178) solid 1px;
    padding-top:60px;
  }
  .c-setting-panel-button{
    height:45px;
    width:45px;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    margin-left:25px;
    margin-top:20px;
    background-color: rgb(58, 91, 178);
    color: #ffffff;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0px 0px 8px rgb(46, 78, 143);
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
</style>
