<template>
  <div>
    <div>
      <div class="c-doc-title">所有布局都具有的选项:</div>
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
      <div class="c-doc-title">tree / 树状布局 特有的选项:</div>
      <el-table :data="list_data_for_tree" style="width: 100%">
        <el-table-column prop="option" label="参数	" width="250">
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
      <div class="c-doc-title">center / 中心布局 特有的选项:</div>
      <el-table :data="list_data_for_center" style="width: 100%">
        <el-table-column prop="option" label="参数	" width="250">
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
      <div class="c-doc-title">force / 力学自动布局 特有的选项:</div>
      <el-table :data="list_data_for_force" style="width: 100%">
        <el-table-column prop="option" label="参数	" width="250">
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
      <div class="c-doc-title">fixed / 固定坐标布局:</div>
      <div style="padding:10px;color:#666666;">固定坐标布局，需要你为每一个节点设置x,y坐标，x,y坐标的值是以图谱左上角为0,0的坐标系，示例:<a style="color: blue" href="/#/demo/layout-diy">使用示例</a></div>
      <el-table :data="list_data_for_force" style="width: 100%">
        <el-table-column prop="option" label="参数	" width="250">
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
        { option: 'layoutLabel', desc: '布局描述（如果有多个布局可以切换，此属性将作为布局名称显示）', type: 'string', notnull: '是', default_value: '' },
        { option: 'layoutName', desc: '布局方式（tree树状布局/center中心布局/force自动布局）', type: 'string', notnull: '是', default_value: 'center' },
        { option: 'layoutClassName', desc: '当使用这个布局时，会将此样式添加到图谱上', type: 'string', notnull: '否', default_value: '1' },
        // { option: 'useLayoutStyleOptions', desc: '是否使用该布局的样式设置覆盖全局样式设置（当有多个布局可供切换时，此功能可以实现不同布局下整体样式的切换）', type: 'boolean', notnull: '否', default_value: 'false' },
        // { option: 'defaultNodeShape', desc: '当useLayoutStyleOptions=true时有效，默认的节点形状，0:圆形；1:矩形', type: 'int', notnull: '否', default_value: '1' },
        // { option: 'defaultNodeColor', desc: '当useLayoutStyleOptions=true时有效，默认的节点背景颜色', type: 'string', notnull: '否', default_value: '' },
        // { option: 'defaultNodeFontColor', desc: '当useLayoutStyleOptions=true时有效，默认的节点文字颜色', type: 'string', notnull: '否', default_value: '' },
        // { option: 'defaultNodeBorderColor', desc: '当useLayoutStyleOptions=true时有效，默认的节点边框颜色', type: 'string', notnull: '否', default_value: '' },
        // { option: 'defaultNodeBorderWidth', desc: '当useLayoutStyleOptions=true时有效，默认的节点边框粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        // { option: 'defaultNodeWidth', desc: '当useLayoutStyleOptions=true时有效，默认的节点宽度', type: 'int', notnull: '否', default_value: '自动' },
        // { option: 'defaultNodeHeight', desc: '当useLayoutStyleOptions=true时有效，默认的节点高度', type: 'int', notnull: '否', default_value: '自动' },
        // { option: 'defaultExpandHolderPosition', desc: '当useLayoutStyleOptions=true时有效，默认的节点展开/关闭按钮位置（left/top/right/bottom）', type: 'string', notnull: '否', default_value: 'hide' },
        // // { option: 'defaultJunctionPoint', desc: '默认的连接点位置', type: 'string', notnull: '否', default_value: '' },
        // { option: 'defaultLineColor', desc: '当useLayoutStyleOptions=true时有效，默认的线条颜色', type: 'string', notnull: '否', default_value: '' },
        // { option: 'defaultLineWidth', desc: '当useLayoutStyleOptions=true时有效，默认的线条粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        // { option: 'defaultLineShape', desc: '当useLayoutStyleOptions=true时有效，默认的线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6）<a href="/#/demo/line">使用示例</a>', type: 'int', notnull: '否', default_value: '' },
        // { option: 'defaultLineMarker', desc: '当useLayoutStyleOptions=true时有效，默认的线条箭头样式，示例参考：<a href="#/options-tools">配置工具</a>中的选项：连线箭头样式', type: 'Object', notnull: '否', default_value: '' },
        // { option: 'defaultShowLineLabel', desc: '当useLayoutStyleOptions=true时有效，默认是否显示连线文字', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: 'centerOffset_x', desc: '根节点x坐标偏移量', type: 'int', notnull: '否', default_value: '0' },
        { option: 'centerOffset_y', desc: '根节点y坐标偏移量', type: 'int', notnull: '否', default_value: '0' }
      ],
      list_data_for_tree: [
        { option: 'from', desc: 'left:从左到右/top:从上到下/right:从右到左/bottom:从下到上', type: 'string', notnull: '否', default_value: 'left' },
        { option: 'min_per_width', desc: '节点距离限制:节点之间横向距离最小值', type: 'int', notnull: '否', default_value: '' },
        { option: 'max_per_width', desc: '节点距离限制:节点之间横向距离最大值', type: 'int', notnull: '否', default_value: '' },
        { option: 'min_per_height', desc: '节点距离限制:节点之间纵向距离最小值', type: 'int', notnull: '否', default_value: '' },
        { option: 'max_per_height', desc: '节点距离限制:节点之间纵向距离最大值', type: 'int', notnull: '否', default_value: '' },
        { option: 'levelDistance', desc: '分别设置每一层的高度，例如：100,200,300,200，此设置优先级高于"节点距离限制"选项', type: 'string', notnull: '否', default_value: '' }
      ],
      list_data_for_center: [
        { option: 'distance_coefficient', desc: '层级距离系数，默认为1，可以为小数，用于调节中心布局不同层级之间的距离，实现连线比较长的视觉效果<a href="/#/demo/distance_coefficient">使用示例</a>', type: 'number', notnull: '否', default_value: 'left' }
      ],
      list_data_for_force: [],
      list_data_for_fixed: [],
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
 * if (thisLayout.from === undefined) thisLayout.from = 'top'
 if (thisLayout.levelDistance === undefined) thisLayout.levelDistance = ''
 if (thisLayout.min_per_width === undefined) thisLayout.min_per_width = 30
 if (thisLayout.max_per_width === undefined) thisLayout.max_per_width = 200
 if (thisLayout.min_per_height === undefined) thisLayout.min_per_height = 100
 if (thisLayout.max_per_height === undefined) thisLayout.max_per_height = 500
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
