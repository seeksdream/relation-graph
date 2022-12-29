<template>
  <div>
    <div style="font-size: 16px;color: #333333;line-height: 25px;">
      在构建图谱数据时需要两个要素nodes和lines，其中的lines是指节点之间的关系，图谱会根据这些line来生成线条，同时根据line来生成用于总结节点之间的关联的Link(两个有关联的节点之间有且只有一个Link，节点之间的所有关系线(Line[])，都会被放在link.relations中)。
      <br>
      线条可以通过this.$refs.seeksRelationGraph.getLinks()的方式获取。
    </div>
    <div>
      <div class="c-doc-title">Line Arributes / 关系线条数据的选项:</div>
      <el-table :data="list_data_attributes" style="width: 100%">
        <el-table-column prop="option" label="参数" width="180" />
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
      <div class="c-doc-title">Link / 节点关联对象属性:</div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'LinkAttributes',
  components: {},
  data() {
    return {
      list_data_attributes: [
        { option: 'from', desc: '关系from节点的id', type: 'string', notnull: '是', default_value: '' },
        { option: 'to', desc: '关系to节点的id', type: 'string', notnull: '是', default_value: '' },
        { option: 'text', desc: '关系文字', type: 'string', notnull: '是', default_value: '' },
        { option: 'styleClass', desc: '节点样式class', type: 'string', notnull: '否', default_value: '' },
        { option: 'lineWidth', desc: '线条粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        { option: 'color', desc: '线条颜色', type: 'string', notnull: '否', default_value: '' },
        { option: 'isHide', desc: '是否显示', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: 'lineShape', desc: '线条样式（1:直线/2:样式2/3:样式3/4:折线/5:样式5/6:样式6）<a href="#/demo/line">使用示例</a>', type: 'int', notnull: '否', default_value: '' },
        { option: 'fontColor', desc: '线条文字颜色', type: 'string', notnull: '否', default_value: '' },
        // { option: 'lineMarker', desc: '默认的线条箭头样式<a href="#">查看布局参数配置说明</a>', type: 'Object', notnull: '否', default_value: '' },
        { option: 'showLineLabel', desc: '是否显示连线文字', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: 'isHideArrow', desc: '是否显示箭头', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: 'data', desc: '<span style="color:red">自定义属性需要放在这里，才能在后续使用中从节点获取，如:{myKey1:\'value1\',myKey2:\'value2\'}</span>,示例1：<a href="#/demo/adv-data-filter">使用自定义属性进行筛选</a>', type: 'Object', notnull: '否', default_value: '' }
      ],
      list_data_runtime: [
        { option: 'relations', desc: '【只读属性】Array&lt;Line&gt;这是一个数组，可以获取这个线条上所有的关系数据。', type: '', notnull: '', default_value: '' },
        { option: 'fromNode', desc: '【只读属性】获取这个线条的起始节点对象', type: '', notnull: '', default_value: '' },
        { option: 'toNode', desc: '【只读属性】获取这个线条的终止节点对象', type: '', notnull: '', default_value: '' }
      ],
      list_data_events: [
      ],
      list_data_methods: [
      ],
      list_data_slot: [
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
</style>
