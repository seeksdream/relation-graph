<template>
  <div>
    <div v-if="options">
      <el-divider content-position="left">图谱显示</el-divider>
      <el-form label-width="170px" size="mini">
<!--        <el-form-item label="是否显示搜索栏">-->
<!--          <el-switch v-model="options.allowShowMiniNameFilter" @change="resetGraphOptions" />-->
<!--        </el-form-item>-->
        <el-form-item label="是否显示工具栏">
          <el-switch v-model="options.allowShowMiniToolBar" @change="resetGraphOptions" />
        </el-form-item>
        <!--            <el-form-item v-if="options.allowShowMiniToolBar" label="">-->
        <!--              <el-switch v-model="options.allowSwitchLayout" @change="resetGraphOptions" />-->
        <!--              允许切换主题-->
        <!--            </el-form-item>-->
        <el-form-item v-if="options.allowShowMiniToolBar" label="允许更改线条样式">
          <el-switch v-model="options.allowSwitchLineShape" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item v-if="options.allowShowMiniToolBar" label="允许更改连接点">
          <el-switch v-model="options.allowSwitchJunctionPoint" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item v-if="options.allowShowMiniToolBar" label="显示缩放按钮">
          <el-switch v-model="options.allowShowZoomMenu" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item v-if="options.allowShowMiniToolBar" label="显示刷新按钮">
          <el-switch v-model="options.allowShowRefreshButton" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item v-if="options.allowShowMiniToolBar" label="显示自动布局按钮">
          <el-switch v-model="options.allowAutoLayoutIfSupport" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item v-if="options.allowShowMiniToolBar" label="显示下载图片按钮">
          <el-switch v-model="options.allowShowDownloadButton" @change="resetGraphOptions" />
        </el-form-item>
<!--        <el-form-item label="是否显示缩略图">-->
<!--          <el-switch v-model="options.allowShowMiniView" @change="resetGraphOptions" />-->
<!--        </el-form-item>-->
        <!--            <el-form-item label="图谱大小">-->
        <!--              宽度：<el-input v-model="options.viewSize.width" style="width:80px;" @change="resetGraphOptions" />-->
        <!--              高度：<el-input v-model="options.viewSize.height" style="width:80px;" @change="resetGraphOptions" />-->
        <!--            </el-form-item>-->
        <el-form-item label="图谱水印">
          <el-input v-model="options.backgrounImage" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="仅在右下角展示水印">
          <el-switch v-model="options.backgrounImageNoRepeat" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="是否在控制台打印日志">
          <el-switch v-model="options.debug" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="显示调试面板">
          <el-switch v-model="options.showDebugPanel" @change="resetGraphOptions" />
        </el-form-item>
        <el-divider content-position="left">节点 & 连线 默认样式</el-divider>
        <el-form-item label="默认显示连线文字">
          <el-switch v-model="options.defaultShowLineLabel" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="默认节点颜色">
          <el-input v-model="options.defaultNodeColor" style="width:270px;" size="mini" @change="resetGraphOptions">
            <template slot="append">
              <el-color-picker v-model="options.defaultNodeColor" show-alpha :predefine="predefineColors" @change="resetGraphOptions" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="默认节点文字颜色">
          <el-input v-model="options.defaultNodeFontColor" style="width:270px;" size="mini" @change="resetGraphOptions">
            <template slot="append">
              <el-color-picker v-model="options.defaultNodeFontColor" show-alpha size="mini" :predefine="predefineColors" @change="resetGraphOptions" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="默认节点边框颜色">
          <el-input v-model="options.defaultNodeBorderColor" style="width:270px;" size="mini" @change="resetGraphOptions">
            <template slot="append">
              <el-color-picker v-model="options.defaultNodeBorderColor" size="mini" :predefine="predefineColorsBorder" @change="resetGraphOptions" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="默认的节点边框粗细">
          <el-radio-group v-model="options.defaultNodeBorderWidth" size="mini" @change="resetGraphOptions">
            <el-radio-button :label="0">0</el-radio-button>
            <el-radio-button :label="1">1</el-radio-button>
            <el-radio-button :label="2">2</el-radio-button>
            <el-radio-button :label="3">3</el-radio-button>
            <el-radio-button :label="4">4</el-radio-button>
            <el-radio-button :label="5">5</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认的节点形状">
          <el-radio-group v-model="options.defaultNodeShape" size="mini" @change="resetGraphOptions">
            <el-radio-button :label="0">圆形</el-radio-button>
            <el-radio-button :label="1">矩形</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认的节点大小">
          宽度：<el-input v-model="options.defaultNodeWidth" style="width:80px;" size="mini" @change="resetGraphOptions" />
          高度：<el-input v-model="options.defaultNodeHeight" style="width:80px;" size="mini" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="默认线条颜色">
          <el-input v-model="options.defaultLineColor" style="width:270px;" size="mini" @change="resetGraphOptions">
            <template slot="append">
              <el-color-picker v-model="options.defaultLineColor" show-alpha size="mini" :predefine="predefineColors" @change="resetGraphOptions" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="默认的连线粗细">
          <el-radio-group v-model="options.defaultLineWidth" size="mini" @change="resetGraphOptions">
            <el-radio-button :label="1">1</el-radio-button>
            <el-radio-button :label="2">2</el-radio-button>
            <el-radio-button :label="3">3</el-radio-button>
            <el-radio-button :label="4">4</el-radio-button>
            <el-radio-button :label="5">5</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!--              <el-form-item label="布局方向">-->
        <!--                <el-radio-group v-model="currentLayout.layoutDirection" @change="resetGraphOptions">-->
        <!--                  <el-radio-button label="h">横向</el-radio-button>-->
        <!--                  <el-radio-button label="v">纵向</el-radio-button>-->
        <!--                </el-radio-group>-->
        <!--              </el-form-item>-->
        <el-form-item label="默认的线条形状">
          <el-radio-group v-model="options.defaultLineShape" @change="resetGraphOptions">
            <el-radio-button :label="1">直线</el-radio-button>
            <el-radio-button :label="2">简洁</el-radio-button>
            <el-radio-button :label="3">生动</el-radio-button>
            <el-radio-button :label="5">鱼尾</el-radio-button>
            <el-radio-button :label="4">折线</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认的线条连接点">
          <el-radio-group v-model="options.defaultJunctionPoint" @change="resetGraphOptions">
            <el-radio-button label="border">边缘</el-radio-button>
            <el-radio-button label="tb">上下</el-radio-button>
            <el-radio-button label="lr">左右</el-radio-button>
            <el-radio-button label="ltrb">上下左右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="默认的连线箭头">
          <el-radio-group v-model="currentArrowData" size="mini" @change="changeDefaultArrow">
            <el-radio-button v-for="thisArrow in arrowArr" :key="thisArrow.text" :label="thisArrow.data">{{ thisArrow.text }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="连线箭头样式">
          箭头宽度：<el-input v-model="options.defaultLineMarker.markerWidth" size="mini" style="width:80px;" @change="resetGraphOptions" />
          X偏移：<el-input v-model="options.defaultLineMarker.refX" size="mini" style="width:80px;" @change="resetGraphOptions" />
          <div style="height:1px;" />
          箭头高度：<el-input v-model="options.defaultLineMarker.markerHeight" size="mini" style="width:80px;" @change="resetGraphOptions" />
          Y偏移：<el-input v-model="options.defaultLineMarker.refY" size="mini" style="width:80px;" @change="resetGraphOptions" />
          <div style="height:1px;" />
          箭头形状：<el-input v-model="options.defaultLineMarker.data" size="mini" style="width:215px;" @change="resetGraphOptions" />
        </el-form-item>
        <el-divider content-position="left">效果 & 交互设置</el-divider>
        <el-form-item label="在展示图谱时居中">
          <el-switch v-model="options.moveToCenterWhenRefresh" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="自动缩放图谱到合适大小">
          <el-switch v-model="options.zoomToFitWhenRefresh" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="默认选中根节点">
          <el-switch v-model="options.defaultFocusRootNode" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="禁用节点选中效果">
          <el-switch v-model="options.disableNodeClickEffect" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="禁用线条选中效果">
          <el-switch v-model="options.disableLineClickEffect" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="禁用节点拖动">
          <el-switch v-model="options.disableDragNode" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="禁用画布拖动">
          <el-switch v-model="options.disableDragCanvas" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="禁用鼠标滚轮缩放">
          <el-switch v-model="options.disableZoom" @change="resetGraphOptions" />
        </el-form-item>
        <el-form-item label="子节点跟随父节点移动">
          <el-switch v-model="options.isMoveByParentNode" @change="resetGraphOptions" />
        </el-form-item>
        <!--            <el-form-item label="显示节点文字">-->
        <!--              <el-switch v-model="options.showNodeLabel" @change="resetGraphOptions" />-->
        <!--            </el-form-item>-->
        <el-form-item label="当缩放比例小于40%时">
          <el-switch v-model="options.hideNodeContentByZoom" @change="resetGraphOptions" />只显示轮廓
        </el-form-item>
        <el-form-item label="节点展开/关闭按钮位置">
          <el-radio-group v-model="options.defaultExpandHolderPosition" @change="resetGraphOptions">
            <el-radio-button label="top">上</el-radio-button>
            <el-radio-button label="bottom">下</el-radio-button>
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
            <el-radio-button label="hide">隐藏</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">布局设置</el-divider>
      <el-form label-width="170px" size="mini">
        <div v-if="options.layouts.length>1">
<!--          <div style="line-height:30px;padding-left:10px;font-size:12px;padding-bottom:10px;color:#666666;background-color: #ffffff;">-->
<!--            可以设置多个主题，供使用者在图谱中的【工具栏】中点击【布局】来切换。-->
<!--            <el-button type="success" icon="el-icon-circle-plus" size="mini" @click="addTab()">添加</el-button>-->
<!--          </div>-->
          <el-tabs v-model="currentLayoutIndex" style="border-bottom:0px;" type="border-card" @tab-click="switchCurrentLayout" @tab-remove="removeTab">
            <el-tab-pane v-for="(thisLayout, _l_index) in options.layouts" :key="_l_index + ''" :label="thisLayout.label" :name="_l_index + ''" />
          </el-tabs>
        </div>
        <div v-if="currentLayout" style="background-color:#ffffff;">
<!--          <el-form-item label="主题描述">-->
<!--            <el-input v-model="currentLayout.label" @change="resetGraphOptions" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="主题css样式">-->
<!--            <el-input v-model="currentLayout.layoutClassName" placeholder="当前布局下时给图谱添加的样式" @change="resetGraphOptions" />-->
<!--          </el-form-item>-->
          <el-form-item label="布局" size="mini">
            <el-radio-group v-model="currentLayout.layoutName" @change="resetGraphOptions">
              <el-radio-button label="tree">树状布局</el-radio-button>
              <el-radio-button label="center">中心布局</el-radio-button>
              <el-radio-button label="force">自动布局</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div v-if="currentLayout.layoutName==='tree'">
            <el-form-item label="树的方向" size="mini">
              <el-radio-group v-model="currentLayout.from" @change="resetGraphOptions">
                <el-radio-button label="top">上到下</el-radio-button>
                <el-radio-button label="left">左到右</el-radio-button>
                <el-radio-button label="bottom">下到上</el-radio-button>
                <el-radio-button label="right">右到左</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="节点横向距离限制" size="mini">
              最小：<el-input v-model="currentLayout.min_per_width" size="mini" style="width:80px;" @change="resetGraphOptions" />
              最大：<el-input v-model="currentLayout.max_per_width" size="mini" style="width:80px;" @change="resetGraphOptions" />
            </el-form-item>
            <el-form-item label="节点纵向距离限制">
              最小：<el-input v-model="currentLayout.min_per_height" size="mini" style="width:80px;" @change="resetGraphOptions" />
              最大：<el-input v-model="currentLayout.max_per_height" size="mini" style="width:80px;" @change="resetGraphOptions" />
            </el-form-item>
            <el-form-item label="层级高度" size="mini">
              <el-input v-model="currentLayout.levelDistance" @change="resetGraphOptions" />
              <div style="color:#888888;font-size: 12px;line-height:20px;">
                此设置优先级高于"节点距离限制"选项,分别设置每一层的高度，例如：100,200,300,200
              </div>
            </el-form-item>
            <el-form-item label="根节点坐标偏移量" size="mini">
              x：<el-input v-model="currentLayout.centerOffset_x" size="mini" style="width:80px;" @change="resetGraphOptions" />
              y：<el-input v-model="currentLayout.centerOffset_y" size="mini" style="width:80px;" @change="resetGraphOptions" />
            </el-form-item>
          </div>
          <div v-if="currentLayout.layoutName==='center'">
            <el-form-item label="层级距离系数" size="mini">
              <el-slider v-model="currentLayout.distance_coefficient" size="mini" :max="3" :min="0.2" :step="0.1" @change="resetGraphOptions">
              </el-slider>
            </el-form-item>
          </div>
          <div style="height:10px;margin-top:10px;border-top:1px solid #dddddd;background-color:#ffffff;margin-left:50px;margin-right: 50px;" />
          <el-form-item v-if="options.layouts.length>1" label="自定义布局样式">
            <el-switch v-model="currentLayout.useLayoutStyleOptions" @change="resetGraphOptions" />
          </el-form-item>
          <div v-if="options.layouts.length>1 && currentLayout.useLayoutStyleOptions===true">
            <el-form-item label="默认节点颜色">
              <el-input v-model="currentLayout.defaultNodeColor" style="width:270px;" size="medium" @change="resetGraphOptions">
                <template slot="append">
                  <el-color-picker v-model="currentLayout.defaultNodeColor" show-alpha size="mini" :predefine="predefineColors" @change="resetGraphOptions" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="默认节点文字颜色">
              <el-input v-model="currentLayout.defaultNodeFontColor" style="width:270px;" size="medium" @change="resetGraphOptions">
                <template slot="append">
                  <el-color-picker v-model="currentLayout.defaultNodeFontColor" show-alpha size="mini" :predefine="predefineColors" @change="resetGraphOptions" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="默认节点边框颜色">
              <el-input v-model="currentLayout.defaultNodeBorderColor" style="width:270px;" size="medium" @change="resetGraphOptions">
                <template slot="append">
                  <el-color-picker v-model="currentLayout.defaultNodeBorderColor" size="mini" :predefine="predefineColorsBorder" @change="resetGraphOptions" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="默认的节点边框粗细">
              <el-radio-group v-model="currentLayout.defaultNodeBorderWidth" size="mini" @change="resetGraphOptions">
                <el-radio-button :label="0">0</el-radio-button>
                <el-radio-button :label="1">1</el-radio-button>
                <el-radio-button :label="2">2</el-radio-button>
                <el-radio-button :label="3">3</el-radio-button>
                <el-radio-button :label="4">4</el-radio-button>
                <el-radio-button :label="5">5</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="默认的节点形状">
              <el-radio-group v-model="currentLayout.defaultNodeShape" size="mini" @change="resetGraphOptions">
                <el-radio-button :label="0">圆形</el-radio-button>
                <el-radio-button :label="1">矩形</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="默认的节点大小">
              宽度：<el-input v-model="currentLayout.defaultNodeWidth" style="width:80px;" size="mini" @change="resetGraphOptions" />
              高度：<el-input v-model="currentLayout.defaultNodeHeight" style="width:80px;" size="mini" @change="resetGraphOptions" />
            </el-form-item>
            <el-form-item label="默认线条颜色">
              <el-input v-model="currentLayout.defaultLineColor" style="width:270px;" size="medium" @change="resetGraphOptions">
                <template slot="append">
                  <el-color-picker v-model="currentLayout.defaultLineColor" show-alpha size="mini" :predefine="predefineColors" @change="resetGraphOptions" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="默认的连线粗细">
              <el-radio-group v-model="currentLayout.defaultLineWidth" size="mini" @change="resetGraphOptions">
                <el-radio-button :label="1">1</el-radio-button>
                <el-radio-button :label="2">2</el-radio-button>
                <el-radio-button :label="3">3</el-radio-button>
                <el-radio-button :label="4">4</el-radio-button>
                <el-radio-button :label="5">5</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <!--              <el-form-item label="布局方向">-->
            <!--                <el-radio-group v-model="currentLayout.layoutDirection" @change="resetGraphOptions">-->
            <!--                  <el-radio-button label="h">横向</el-radio-button>-->
            <!--                  <el-radio-button label="v">纵向</el-radio-button>-->
            <!--                </el-radio-group>-->
            <!--              </el-form-item>-->
            <el-form-item label="默认的线条形状">
              <el-radio-group v-model="currentLayout.defaultLineShape" @change="resetGraphOptions">
                <el-radio-button :label="1">直线</el-radio-button>
                <el-radio-button :label="2">简洁</el-radio-button>
                <el-radio-button :label="3">生动</el-radio-button>
                <el-radio-button :label="5">鱼尾</el-radio-button>
                <el-radio-button :label="4">折线</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="默认的线条连接点">
              <el-radio-group v-model="currentLayout.defaultJunctionPoint" @change="resetGraphOptions">
                <el-radio-button label="border">边缘</el-radio-button>
                <el-radio-button label="tb">上下</el-radio-button>
                <el-radio-button label="lr">左右</el-radio-button>
                <el-radio-button label="ltrb">上下左右</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="显示连线文字">
              <el-switch v-model="currentLayout.defaultShowLineLabel" @change="resetGraphOptions" />
            </el-form-item>
            <el-form-item label="节点展开/关闭按钮位置">
              <el-radio-group v-model="currentLayout.defaultExpandHolderPosition" @change="resetGraphOptions">
                <el-radio-button label="top">上</el-radio-button>
                <el-radio-button label="bottom">下</el-radio-button>
                <el-radio-button label="left">左</el-radio-button>
                <el-radio-button label="right">右</el-radio-button>
                <el-radio-button label="hide">隐藏</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { appendDefaultOptions4Layout } from '@/models/RGOptions';
import { predefineColors, predefineColorsBorder } from '../data';

export default {
  name: 'OptionsView',
  components: { },
  props: {
    onOptionsChange: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    }
  },
  data() {
    return {
      options: null,
      currentArrowData: '',
      currentLayoutIndex: 0,
      nextNewLayoutIndex: 2,
      currentLayout: null,
      arrowArr: [
        {
          text: '锋利',
          markerWidth: 12,
          markerHeight: 12,
          refX: 6,
          refY: 6,
          color: undefined,
          data: 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        {
          text: '不锋利',
          markerWidth: 20,
          markerHeight: 20,
          refX: 3,
          refY: 3,
          color: undefined,
          data: 'M 0 0, V 6, L 4 3, Z'
        },
        { // 另一种箭头样式
          text: '样式3',
          markerWidth: 15,
          markerHeight: 15,
          refX: 30,
          refY: 7,
          color: '#128bed',
          data: 'M 14 7 L 1 .3 L 4 7 L .4 13 L 14 7, Z'
        }
      ],
      predefineColors,
      predefineColorsBorder
    };
  },
  computed: mapState({
  }),
  created() {
  },
  mounted() {
  },
  methods: {
    setOptions(options) {
      console.log('setOptions:', options);
      this.options = JSON.parse(JSON.stringify(options));
      this.currentArrowData = this.options.defaultLineMarker.data;
      this.currentLayout = this.options.layouts[parseInt(this.currentLayoutIndex)];
      this.nextNewLayoutIndex = this.options.layouts.length + 1;
      const defaultLayout = this.options.layouts[0];
      if (defaultLayout.layoutName === 'center') {
        if (defaultLayout.distance_coefficient === undefined) {
          defaultLayout.distance_coefficient = 1;
        }
      } else {
        defaultLayout.distance_coefficient = 1;
      }
    },
    resetGraphOptions() {
      this.onOptionsChange(this.options);
    },
    changeDefaultArrow() {
      this.arrowArr.forEach(thisArrow => {
        if (thisArrow.data === this.currentArrowData) {
          this.options.defaultLineMarker.markerWidth = thisArrow.markerWidth;
          this.options.defaultLineMarker.markerHeight = thisArrow.markerHeight;
          this.options.defaultLineMarker.refX = thisArrow.refX;
          this.options.defaultLineMarker.refY = thisArrow.refY;
          this.options.defaultLineMarker.data = thisArrow.data;
        }
      });
      this.resetGraphOptions();
    },
    switchCurrentLayout(tab, event) {
      this.currentLayout = this.options.layouts[parseInt(this.currentLayoutIndex)];
    },
    addTab(targetName) {
      const _new_layout_config = {
        label: '主题' + (this.nextNewLayoutIndex++),
        layoutName: 'center',
        from: 'top',
        distance_coefficient: 1,
        levelDistance: '',
        min_per_width: 30,
        max_per_width: 200,
        min_per_height: 100,
        max_per_height: 500
      };
      appendDefaultOptions4Layout(_new_layout_config, this.options);
      this.options.layouts.push(_new_layout_config);
      this.currentLayoutIndex = (this.options.layouts.length - 1) + '';
      this.currentLayout = _new_layout_config;
      this.resetGraphOptions();
    },
    removeTab(tabIndex) {
      console.log('removeTab:', tabIndex);
      if (this.options.layouts.length === 1) {
        this.$message('至少需要一个主题！');
        return;
      }
      this.$confirm('确定吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (parseInt(this.currentLayoutIndex) === parseInt(tabIndex)) {
          this.currentLayoutIndex = '0';
          this.switchCurrentLayout();
        }
        this.options.layouts.splice(tabIndex, 1);
        this.resetGraphOptions();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .el-form-item--mini.el-form-item{
  margin-bottom:5px;
}
/deep/ .el-form-item__label, .el-form-item__content{
  font-size: 12px;
}
/deep/ .el-form-item__content{
  font-size: 12px;
}
/deep/ .el-color-picker--mini{
  height:20px;
}
/deep/ .el-color-picker__trigger{
  padding:0px;
  height:20px;
}
</style>
