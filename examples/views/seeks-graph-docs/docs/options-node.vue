<template>
  <div>
    <div>
      <div class="c-doc-title">Arributes / 选项:</div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'NodeAttributes',
  components: {},
  data() {
    return {
      list_data_attributes: [
        { option: 'id', desc: '节点id，不能重复，重复会被忽略', type: 'string', notnull: '是', default_value: '' },
        { option: 'text', desc: '节点名称', type: 'string', notnull: '是', default_value: '' },
        { option: 'styleClass', desc: '节点样式class', type: 'string', notnull: '否', default_value: '' },
        { option: 'color', desc: '节点背景颜色', type: 'string', notnull: '否', default_value: '' },
        { option: 'fontColor', desc: '节点文字颜色', type: 'string', notnull: '否', default_value: '' },
        { option: 'borderWidth', desc: '节点边框粗细（像素）', type: 'int', notnull: '否', default_value: '1' },
        { option: 'borderColor', desc: '节点边框颜色', type: 'string', notnull: '否', default_value: '' },
        { option: 'nodeShape', desc: '节点形状，0:圆形；1:矩形;<a href="#/demo/node">使用示例</a>', type: 'int', notnull: '否', default_value: '1' },
        { option: 'width', desc: '节点宽度', type: 'int', notnull: '否', default_value: '自动' },
        { option: 'height', desc: '节点高度', type: 'int', notnull: '否', default_value: '自动' },
        { option: 'opacity', desc: '透明度(值范围：0到1,或者0到100)', type: 'number', notnull: '否', default_value: '1' },
        { option: 'isHide', desc: '是否隐藏这个节点', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: 'disableDrag', desc: '是否禁用节点的拖动功能', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: 'disableDefaultClickEffect', desc: '是否禁用默认的点击选中效果（即使禁用，可以出发自定的节点点击事件）', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: 'expandHolderPosition', desc: '节点展开/关闭按钮位置（left/top/right/bottom）节点的这个设置会覆盖全局的expandHolderPosition设置，即使改节点没有子节点也可以让其显示展开/收缩按钮，可以实现部分节点显示展开/收缩按钮的效果;<a href="#/demo/adv-expand">使用示例</a>', type: 'string', notnull: '否', default_value: 'hide' },
        { option: 'expanded', desc: '手工设置节点的展开收缩状态;<a href="#/demo/adv-expand">使用示例</a>', type: 'boolean', notnull: '否', default_value: 'true' },
        { option: 'fixed', desc: '是否使用固定位置（以当前图谱左上角为0,0的坐标系）;<a href="#/demo/layout-diy">使用示例</a>', type: 'boolean', notnull: '否', default_value: 'false' },
        { option: 'x', desc: 'x坐标（以当前图谱左上角为0,0的坐标系）,fixed=true时有效', type: 'int', notnull: '否', default_value: '' },
        { option: 'y', desc: 'y坐标（以当前图谱左上角为0,0的坐标系）,fixed=true时有效', type: 'int', notnull: '否', default_value: '' },
        { option: 'innerHTML', desc: '用HTML自定义节点内部的内容，当此属性不为空时，text属性将失效;<a href="#/demo/node">使用示例</a>', type: 'string', notnull: '否', default_value: '' },
        { option: 'html', desc: '用HTML自定义节点，当此属性不为空时，节点的所有样式属性将失效<a href="#/demo/node">使用示例</a>', type: 'string', notnull: '否', default_value: '' },
        { option: 'data', desc: '<span style="color:red">自定义属性需要放在这里，才能在后续使用中从节点获取，如:{myKey1:\'value1\',myKey2:\'value2\'}</span>，示例1：<a href="#/demo/adv-slot">使用自定义属性作为节点名称/节点图标</a>，示例1：<a href="#/demo/adv-data-filter">使用自定义属性进行筛选</a>', type: 'Object', notnull: '否', default_value: '' }
      ],
      list_data_runtime: [
        { option: 'targetNodes', desc: '获取与当前节点存在关系的其他所有节点，这些节点中包含的当前节点的父节点和子节点，如果只想获取父节点请使用lot.parent,获取子节点请使用lot.childs', type: '', notnull: '', default_value: '' },
        { option: 'lot', desc: '获取与当前节点的布局信息，其中包含了当前布局器为其设置的坐标、层级、权重、上下级节点等信息', type: '', notnull: '', default_value: '' },
        { option: 'lot.parent', desc: '单独说明lot中的这个属性，他可以获取节点的父节点，这个子节点是由布局器分析出来的父节点，在有循环闭合回路的关系网中是不准确的，他会强行从多个中取一个', type: '', notnull: '', default_value: '' },
        { option: 'lot.childs', desc: '单独说明lot中的这个属性：他可以获取节点的子节点，这个子节点是由布局器分析出来的子节点，在有循环闭合回路的关系网中是不完整的，他会强行剔除一些冲突的子节点', type: '', notnull: '', default_value: '' }
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
