<template>
  <div>
    <div>
      <div class="c-doc-title">Arributes / 选项:</div>
      <el-table :data="list_data_attributes" style="width: 100%">
        <el-table-column prop="option" label="参数" width="260">
          <template slot-scope="scope">
            <div v-html="scope.row.option" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="说明" min-width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.desc" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="notnull" label="必选/非必选" width="100" />
        <el-table-column prop="default_value" label="默认值" width="100" />
      </el-table>
    </div>
    <div>
      <div class="c-doc-title">Runtime-properties / 运行时属性:</div>
      <el-table :data="list_data_runtime" style="width: 100%">
        <el-table-column prop="option" label="属性名	" width="250">
          <template slot-scope="scope">
            <div v-html="scope.row.option" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="说明" min-width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.desc" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <div class="c-doc-title">Methods / 方法:</div>
      <el-table :data="list_data_methods" style="width: 100%">
        <el-table-column prop="option" label="事件名	" width="250">
          <template slot-scope="scope">
            <div v-html="scope.row.option" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="说明" min-width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.desc" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="参数" width="280" />
      </el-table>
    </div>
    <div>
      <div class="c-doc-title">Events / 事件:</div>
      <el-table :data="list_data_events" style="width: 100%">
        <el-table-column prop="option" label="事件名	" width="250" />
        <el-table-column prop="desc" label="说明" min-width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.desc" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="参数" width="280" />
      </el-table>
    </div>
    <div>
      <div class="c-doc-title">Slot / 插槽:</div>
      <el-table :data="list_data_slot" style="width: 100%">
        <el-table-column prop="option" label="事件名	" width="250" />
        <el-table-column prop="desc" label="说明" min-width="500">
          <template slot-scope="scope">
            <div v-html="scope.row.desc" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="参数" width="280" />
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'GraphAttributes',
  components: {},
  data() {
    return {
      list_data_attributes: [
        { option: 'options', desc: '图谱配置，一个对象，里面包含了具体的选项：', type: 'Object', notnull: '是', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>debug', desc: '是否开始调试模式，调试模式下会在控制台打印额外的日志信息', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>showDebugPanel', desc: '是否显示调试按钮，通过此按钮可以打印配置、数据等', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>backgrounImage', desc: '图谱水印url,如：https://camo.githubusercontent.com/ede1654f055903cdc39044129d15d5b158f4f3b33ba5b7c21c7407792a506dea/687474703a2f2f72656c6174696f6e2d67726170682e636f6d2f776562736974652f6c6f676f', type: 'string', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>backgrounImageNoRepeat', desc: '只在右下角显示水印，不重复显示水印', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowShowMiniToolBar', desc: '是否显示工具栏', type: 'boolean', notnull: '否', default_value: 'true' },
        // { option: '<span class="c-ops-tag">options.</span>allowShowMiniView', desc: '是否显示缩略图', type: 'boolean', notnull: '否', default_value: 'false' },
        // { option: '<span class="c-ops-tag">options.</span>allowShowMiniNameFilter', desc: '是否显示搜索框', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowSwitchLineShape', desc: '是否在工具栏中显示切换线条形状的按钮', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowSwitchJunctionPoint', desc: '是否在工具栏中显示切换连接点位置的按钮', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>allowAutoLayoutIfSupport', desc: '是否在工具栏中显示【自动布局】按钮（只有在布局支持且此选项为true时才会显示的按钮）', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowShowRefreshButton', desc: '是否在工具栏中显示【刷新】按钮', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowShowDownloadButton', desc: '是否在工具栏中显示【下载图片】按钮', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>disableZoom', desc: '是否禁用图谱的缩放功能', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>disableDragNode', desc: '是否禁用图谱中节点的拖动', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>disableNodeClickEffect', desc: '是否禁用节点默认的点击效果（选中、闪烁）', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>disableLineClickEffect', desc: '是否禁用线条默认的点击效果（选中、闪烁）', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>moveToCenterWhenRefresh', desc: '当图谱刷新后（调用setJsonData或refresh方法都会触发），是否重新让图谱的内容看起来居中', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>zoomToFitWhenRefresh', desc: '当图谱刷新后（调用setJsonData或refresh方法都会触发），是否让图谱缩放到适合可见区域大小，此选项不适用于fixed和force布局', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>defaultFocusRootNode', desc: '默认为根节点添加一个被选中的样式', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>allowShowZoomMenu', desc: '是否在右侧菜单栏显示放大缩小的按钮，此设置和disableZoom不冲突', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>isMoveByParentNode', desc: '是否在拖动节点后让子节点跟随', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>hideNodeContentByZoom', desc: '是否根据缩放比例隐藏节点内容', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeShape', desc: '默认的节点形状，0:圆形；1:矩形', type: 'int', notnull: '否', default_value: '1' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeColor', desc: '默认的节点背景颜色', type: 'string', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeFontColor', desc: '默认的节点文字颜色', type: 'string', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeBorderColor', desc: '默认的节点边框颜色', type: 'string', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeBorderWidth', desc: '默认的节点边框粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeWidth', desc: '默认的节点宽度', type: 'int', notnull: '否', default_value: '自动' },
        { option: '<span class="c-ops-tag">options.</span>defaultNodeHeight', desc: '默认的节点高度', type: 'int', notnull: '否', default_value: '自动' },
        { option: '<span class="c-ops-tag">options.</span>defaultJunctionPoint', desc: '默认的连线与节点接触的方式（border:边缘/ltrb:上下左右/tb:上下/lr:左右）<span style="color:red">当布局为树状布局时应使用tb或者lr，这样才会好看</span>', type: 'string', notnull: '否', default_value: '自动' },
        { option: '<span class="c-ops-tag">options.</span>defaultExpandHolderPosition', desc: '默认的节点展开/关闭按钮位置（left/top/right/bottom）', type: 'string', notnull: '否', default_value: 'hide' },
        { option: '<span class="c-ops-tag">options.</span>defaultLineColor', desc: '默认的线条颜色', type: 'string', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultLineWidth', desc: '默认的线条粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        { option: '<span class="c-ops-tag">options.</span>defaultLineShape', desc: '默认的线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6）<a href="#/demo/line">使用示例</a>', type: 'int', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultLineMarker', desc: '默认的线条箭头样式，示例参考：<a href="#/options-tools">配置工具</a>中的选项：连线箭头样式', type: 'Object', notnull: '否', default_value: '' },
        { option: '<span class="c-ops-tag">options.</span>defaultShowLineLabel', desc: '默认是否显示连线文字', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: '<span class="c-ops-tag">options.</span>layouts', desc: '布局方式，布局配置详情参考<a href="#/docs/layout">Layout布局</a>，可以设置多个布局，用于切换<a href="#/demo/adv-multi-layout">查看布局参数配置说明</a>', type: 'Object/Array', notnull: '否', default_value: '中心布局' }
      ],
      list_data_events: [
        { option: 'on-node-click', desc: '点击节点事件，注意：请使用&lt;graph :on-node-click=functionName /&gt;的方式来绑定节点事件,<a href="#/demo/adv-effect">使用示例</a>', type: '(nodeObject, $event)', notnull: '', default_value: '' },
        { option: 'on-node-expand', desc: '展开节点事件，仅当节点的【展开/收缩】按钮可用时有效，注意：请使用&lt;graph :on-node-expand=functionName /&gt;的方式来绑定事件,<a href="/#/demo/scene-org">使用示例</a>', type: '(nodeObject, $event)', notnull: '', default_value: '' },
        { option: 'on-node-collapse', desc: '收缩节点事件，仅当节点的【展开/收缩】按钮可用时有效，注意：请使用&lt;graph :on-node-collapse=functionName /&gt;的方式来绑定事件,<a href="/#/demo/scene-org">使用示例</a>', type: '(nodeObject, $event)', notnull: '', default_value: '' },
        { option: 'on-line-click', desc: '点击线条事件，注意：请使用&lt;graph :on-line-click=functionName /&gt;的方式来绑定关系线事件,<a href="#/demo/adv-effect">使用示例</a>', type: '(lineObject, $event)', notnull: '', default_value: '' },
        { option: 'on-image-download', desc: '当点击下载图片按钮时触发，会替换图谱默认的下载事件，可通过此事件接收到一个图谱的dom对象，你可以根据此对象来生成图片。注意：请使用&lt;graph :on-image-download=functionName /&gt;的方式来绑定关系线事件,<a href="#/demo/adv-effect-download">使用示例</a>', type: '(cavansDom, $event)', notnull: '', default_value: '' }
      ],
      list_data_runtime: [
        { option: 'options', desc: '图片会根据options生成一个包含默认值的完整配置对象，它就是options，可以通过this.$refs.seeksRelationGraph.getInstance().options来获取；<span style="color:red">你还可以从这个对象中获取当前图谱的可见区域大小、画布大小、画布偏移量、当前布局器等运行时对象。</span>', type: '', notnull: '', default_value: '' }
      ],
      list_data_methods: [
        { option: 'getInstance()', desc: '获取图谱实例，实例中会包含一些实用方法，可以通过this.$refs.seeksRelationGraph.getInstance()来获取，此实例支持的方法见：<a href="#/demo/instance-api">实例方法api</a>', type: '', notnull: '', default_value: '' },
        { option: 'setOptions(options, callback)', desc: '设置/重新设置图谱的选项,options：图谱选项,不能为空;callback:当设置完成后的回调函数,可以为空;options选项设置方法示例：&lt;SeeksRelationGraph ref="seeksRelationGraph" :options="userGraphSetting" /&gt; 更改设置：this.$refs.seeksRelationGraph.setOptions(newOptions, callback);', type: '', notnull: '', default_value: '' },
        { option: 'setJsonData(jsonData, callback)', desc: '设置/重新设置图谱中的数据,jsonData：图谱数据,不能为空，jsonData中需要包含三要素（rootId、nodes、links）<a href="#/demo/adv-expand">数据格式示例</a>;callback:当设置完成后的回调函数,可以为空;', type: '', notnull: '', default_value: '' },
        { option: 'appendJsonData(jsonData, callback)', desc: '向图谱中追加数据,jsonData：图谱数据,不能为空，<a href="#/demo/adv-dynamic-data">数据格式示例</a>;callback:当设置完成后的回调函数,可以为空;', type: '', notnull: '', default_value: '' },
        { option: 'refresh()', desc: '刷新布局，你可以通过getNodes()获取当前图谱中的节点，并通过节点的isHide属性隐藏一些节点，再调用refresh()方法可以根据依然显示的节点重新布局图谱;或者在动态向图谱中添加数据候刷新布局;当你的图片默认默认状态是不可见的时，在切换到可见状态下后可能会显示不正常，这时你调用一下refresh()方法可以让图片正确显示。<span style="color:red">总之一句话：当图谱中的节点看起来不正常时，你都可以调用refresh方法来让布局器重新为节点分配位置。</span>', type: '', notnull: '', default_value: '' },
        { option: 'onGraphResize()', desc: '当用于展示图谱的div容器大小发生变化时，可以调用此方法来让图谱各个部件展示到正确位置;<a href="#/demo/graph-resize">使用示例</a>', type: '', notnull: '', default_value: '' },
        { option: 'focusRootNode()', desc: '选中图谱的根节点居中并选中;', type: '', notnull: '', default_value: '' },
        { option: 'focusNodeById(nodeId)', desc: '根据节点id在图谱中选中该节点并居中;', type: '', notnull: '', default_value: '' },
        { option: 'getNodeById(nodeId)', desc: '根据节点id获取节点对象;', type: '', notnull: '', default_value: '' },
        { option: 'removeNodeById(nodeId)', desc: '移除指定id对应的节点，彻底移除，移除element和数据对象;', type: '', notnull: '', default_value: '' },
        { option: 'downloadAsImage(format)', desc: '下载图片，将当前图谱导出为图片，format可以为：png/jpg，默认为png;', type: '', notnull: '', default_value: '' },
        { option: 'getNodes()', desc: '获取图谱中所有的节点对象，可以直接修改该对象的属性，这些对象不能用于JSON序列化;', type: '', notnull: '', default_value: '' },
        { option: 'getLines()', desc: '获取图谱中所有的连线对象，可以直接修改该对象的属性，这些对象不能用于JSON序列化;', type: '', notnull: '', default_value: '' },
        { option: 'getGraphJsonData()', desc: '获取当前图谱的节点、关系数据的json数据;', type: '', notnull: '', default_value: '' },
        { option: 'getGraphJsonOptions()', desc: '获取当前图谱的完整的配置信息;', type: '', notnull: '', default_value: '' }
      ],
      list_data_slot: [
        { option: 'node', desc: '自定义节点内容的插槽，通过此功能可以完全自定义节点的样式，实现图片节点、闪烁节点等等你想要的效果。<a href="#/demo/adv-slot">使用示例</a>', type: '{ node }', notnull: '', default_value: '' },
        { option: 'line', desc: '自定义连线内容的插槽，通过此功能可以完全自定义连线的样式，实现自定义样式线条、自定义连线文字位置等等你想要的效果。<a href="#/demo/adv-slot-line">使用示例</a>', type: '{ line }', notnull: '', default_value: '' },
        { option: 'graphPlug', desc: '自定义图谱区域内容的插槽，通过此功能可以在图谱中显示一些内容，比如筛选区域，图例说明等。', type: '{ relationGraph }', notnull: '', default_value: '' },
        { option: 'canvas-plug', desc: '自定义图谱画布区域内容的插槽，通过此功能可以在画布中显示一些内容，这些内容会和节点、线条一样可以被缩放、根据画布被拖动。', type: '{ relationGraph }', notnull: '', default_value: '' }
      ],
      instance_api: [

      ],
      checkedRoute: null
    };
  },
  computed: {
    ...mapState({
    })
  },
  methods: {
  }
};
/**
 */
</script>

<style>
</style>
<style lang="scss" scoped>
.c-doc-title{
  margin-top:30px;
  font-size:22px;
  line-height:30px;
  padding-left:0px;
}
  /deep/ .el-table__row a{
    color:#1989fa;
  }
  /deep/ .el-table__row .c-ops-tag{
    color: #bbbbbb;
    padding-left:0px;
  }
</style>
