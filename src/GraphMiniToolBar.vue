<template>
  <div :style="{'margin-left':(graphSetting.viewELSize.width-50)+'px','margin-top':(graphSetting.viewELSize.height-260)/2+'px'}" class="c-mini-toolbar">
    <div class="c-mb-button" style="margin-top: 0px;" @click="graphSetting.fullscreen = !graphSetting.fullscreen"><i class="el-icon-full-screen" /><span class="c-mb-text">{{ graphSetting.fullscreen?'退出':'全屏' }}</span></div>
    <div class="c-mb-button" @click="$parent.zoom(20)"><i class="el-icon-zoom-in" /><span class="c-mb-text">放大</span></div>
    <div style="float:left;margin-top:0px;height:20px;width:40px;border-top:0px;border-bottom:0px;background-color: #ffffff;color: #262626;font-size: 10px;background-color: #efefef;text-align: center;line-height: 20px;" @click="printGraphJsonData">{{ graphSetting.canvasZoom }}%</div>
    <!--<div style="float:left;margin-top:0px;height:20px;width:40px;border-top:0px;border-bottom:0px;background-color: #ffffff;color: #262626;font-size: 10px;background-color: #efefef;text-align: center;line-height: 20px;">{{ hits }}</div>-->
    <div class="c-mb-button" style="margin-top:0px;" @click="$parent.zoom(-20)"><i class="el-icon-zoom-out" /><span class="c-mb-text">缩小</span></div>
    <div v-if="graphSetting.layouts.length > 1" class="c-mb-button">
      <i class="el-icon-s-help" /><span class="c-mb-text">布局</span>
      <div :style="{width:(graphSetting.layouts.length * 70 + 6)+'px','margin-left':(graphSetting.layouts.length * -70 - 7)+'px'}" class="c-mb-child-panel">
        <div v-for="thisLayoutSetting in graphSetting.layouts" :key="thisLayoutSetting.label" class="c-mb-button c-mb-button-c" :class="{'c-mb-button-on':graphSetting.layoutLabel===thisLayoutSetting.label}" style="width: 70px;" @click="switchLayout(thisLayoutSetting)">
          <i class="el-icon-s-help" /><span class="c-mb-text">{{ thisLayoutSetting.label }}</span>
        </div>
      </div>
    </div>
    <div v-if="graphSetting.allowSwitchLineShape" class="c-mb-button">
      <i class="el-icon-s-help" /><span class="c-mb-text">线条</span>
      <div class="c-mb-child-panel" style="width:256px;margin-left:-257px;">
        <div :class="{'c-mb-button-on':graphSetting.defaultLineShape===1}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultLineShape=1"><i class="el-icon-s-help" /><span class="c-mb-text">直线</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultLineShape===2}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultLineShape=2"><i class="el-icon-s-help" /><span class="c-mb-text">简洁</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultLineShape===6}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultLineShape=6"><i class="el-icon-s-help" /><span class="c-mb-text">生动</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultLineShape===5}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultLineShape=5"><i class="el-icon-s-help" /><span class="c-mb-text">鱼尾</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultLineShape===4}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultLineShape=4"><i class="el-icon-s-help" /><span class="c-mb-text">折线</span></div>
      </div>
    </div>
    <div v-if="graphSetting.allowSwitchJunctionPoint" class="c-mb-button">
      <i class="el-icon-s-help" /><span class="c-mb-text">连接点</span>
      <div class="c-mb-child-panel" style="width:206px;margin-left:-207px;">
        <div :class="{'c-mb-button-on':graphSetting.defaultJunctionPoint==='border'}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultJunctionPoint='border'"><i class="el-icon-s-help" /><span class="c-mb-text">边缘</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultJunctionPoint==='ltrb'}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultJunctionPoint='ltrb'"><i class="el-icon-s-help" /><span class="c-mb-text">四点</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultJunctionPoint==='tb'}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultJunctionPoint='tb'"><i class="el-icon-s-help" /><span class="c-mb-text">上下</span></div>
        <div :class="{'c-mb-button-on':graphSetting.defaultJunctionPoint==='lr'}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="graphSetting.defaultJunctionPoint='lr'"><i class="el-icon-s-help" /><span class="c-mb-text">左右</span></div>
      </div>
    </div>
    <div v-if="graphSetting.isNeedShowAutoLayoutButton" :title="graphSetting.autoLayouting?'点击停止自动布局':'点击开始自动调整布局'" :class="{'c-mb-button-on':graphSetting.autoLayouting}" class="c-mb-button" @click="toggleAutoLayout">
      <i v-if="!graphSetting.autoLayouting" class="el-icon-magic-stick" />
      <i v-else class="el-icon-loading" />
      <span class="c-mb-text">自动</span>
    </div>
    <div class="c-mb-button" @click="refresh"><i class="el-icon-refresh" /><span class="c-mb-text">刷新</span></div>
    <div class="c-mb-button">
      <i class="el-icon-download" /><span class="c-mb-text">下载</span>
      <div :style="{width:downloadPanelWidth+'px','margin-left':(downloadPanelWidth*-1-1)+'px'}" class="c-mb-child-panel">
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="$parent.downloadAsImage('png')"><i class="el-icon-picture-outline" /><span class="c-mb-text">PNG</span></div>
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="$parent.downloadAsImage('jpg')"><i class="el-icon-picture-outline" /><span class="c-mb-text">JPG</span></div>
        <div v-if="typeof $parent.onDownloadExcel === 'function'" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="$parent.onDownloadExcel()"><i class="el-icon-s-grid" /><span class="c-mb-text">Excel</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import SeeksRGLayouters from './core4vue/SeeksRGLayouters'
export default {
  name: 'GraphMiniToolBar',
  props: {
    graphSetting: {
      mustUseProp: true,
      default: () => { return {} },
      type: Object
    }
  },
  data() {
    return {
      height: 275,
      hits: 0,
      downloadPanelWidth: 106
    }
  },
  // watch: {
  //   'graphSetting.layoutName': function(newV, oldV) {
  //     console.log('change layout:', newV, oldV)
  //     SeeksRGLayouters.switchLayout(newV, this.graphSetting)
  //     this.refresh()
  //   }
  // },
  mounted() {
    if (this.$parent.onDownloadExcel !== null) {
      this.downloadPanelWidth += 50
    }
    if (this.graphSetting.layouts.length > 1) {
      this.height -= 40
    }
  },
  methods: {
    refresh() {
      this.$parent.refresh()
    },
    switchLayout(layoutConfig) {
      console.log('change layout:', layoutConfig)
      SeeksRGLayouters.switchLayout(layoutConfig, this.graphSetting)
      this.refresh()
    },
    toggleAutoLayout() {
      // console.log('this.graphSetting.autoLayouting', this.graphSetting.autoLayouting)
      this.graphSetting.autoLayouting = !this.graphSetting.autoLayouting
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
    printGraphJsonData(e) {
      this.hits++
      setTimeout(() => {
        if (this.hits > 0) this.hits--
      }, 2000)
      if (this.hits > 8) {
        this.hits = 0
        this.$parent.printGraphJsonData()
      }
    }
  }
}
</script>

<style scoped>
  .c-mini-toolbar{
    width:42px;
    position: absolute;
    margin-top:170px;
    margin-right:10px;
    z-index: 999;
    border: #bbbbbb solid 1px;
    background-color: #ffffff;
    box-shadow: 0px 0px 8px #cccccc;
  }
  .c-fixedLayout{
    position: fixed;
    top:100px;
  }
  .c-mb-button{
    height:40px;
    width:40px;
    margin-top:0px;
    background-color: #ffffff;
    border-top: #efefef solid 1px;
    opacity: 1;
    text-align: center;
    padding-top:3px;
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    float: left;
  }
  .c-mb-button .c-mb-text{
    display: inline-block;
    height:14px;
    width:40px;
    font-size: 12px;
    line-height: 12px;
    margin-top:20px;
    margin-left:-28px;
    position: absolute;
    color: #262626;
  }
  .c-mb-button-on{
    background-color: #2E74B5;
    border: #2E4E8F solid 1px;
    color: #ffffff;
  }
  .c-mb-button:hover{
    background-color: #2E4E8F;
    border: #2E4E8F solid 1px;
    color: #ffffff;
  }
  .c-mb-button:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff;
  }
  .c-mb-button .c-mb-child-panel{
    height:40px;position: absolute;margin-top: -24px;background-color: #ffffff;
    border: #DEDEDE solid 1px;
    display: none;
    border: #bbbbbb solid 1px;
    box-shadow: 0px 0px 8px #cccccc;
  }
  .c-mb-button:hover .c-mb-child-panel{
    display: block;
  }
  .c-mb-button .c-mb-button{
    height:38px;
    width: 42px;
    margin:0px;
    border: none;
  }
  .c-mb-button-c .c-mb-text{
    color: #262626 !important;
  }
  .c-mb-button-c:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff !important;
  }
</style>
