<template>
  <div>
    <rg-header :title="'Relation Graph 在线示例'" />
    <el-container style="border-top: #efefef solid 1px;">
      <el-aside style="padding:0px;background-color: #ffffff;border-right: #efefef solid 1px;padding:0px;">
        <div style="height:calc(100vh - 60px);width: 100%;overflow: auto;background-color: #ffffff;padding:30px;">
          <el-divider content-position="left">基本</el-divider>
          <router-link to="/demo/simple"><div class="c-left-menu-item" :class="[currentPath === '/demo/simple' ? 'c-left-menu-item-checked' : '']">简单实例</div></router-link>
          <router-link to="/demo/node"><div class="c-left-menu-item" :class="[currentPath === '/demo/node' ? 'c-left-menu-item-checked' : '']">节点样式</div></router-link>
          <router-link to="/demo/line"><div class="c-left-menu-item" :class="[currentPath === '/demo/line' ? 'c-left-menu-item-checked' : '']">线条样式</div></router-link>
          <el-divider content-position="left">布局</el-divider>
          <router-link to="/demo/layout-tree"><div class="c-left-menu-item" :class="[currentPath === '/demo/layout-tree' ? 'c-left-menu-item-checked' : '']">树状布局(tree)</div></router-link>
          <router-link to="/demo/tree-distance"><div class="c-left-menu-item" :class="[currentPath === '/demo/tree-distance' ? 'c-left-menu-item-checked' : '']">tree-层级距离&节点距离</div></router-link>
          <router-link to="/demo/layout-center"><div class="c-left-menu-item" :class="[currentPath === '/demo/layout-center' ? 'c-left-menu-item-checked' : '']">中心布局(center)</div></router-link>
          <router-link to="/demo/distance_coefficient"><div class="c-left-menu-item" :class="[currentPath === '/demo/distance_coefficient' ? 'c-left-menu-item-checked' : '']">center-层级距离设置</div></router-link>
          <router-link to="/demo/layout-force"><div class="c-left-menu-item" :class="[currentPath === '/demo/layout-force' ? 'c-left-menu-item-checked' : '']">自动布局(force)</div></router-link>
          <router-link to="/demo/layout-diy"><div class="c-left-menu-item" :class="[currentPath === '/demo/layout-diy' ? 'c-left-menu-item-checked' : '']">手工设定坐标(fixed)</div></router-link>
          <el-divider content-position="left">使用场景</el-divider>
          <router-link to="/demo/bothway-tree"><div class="c-left-menu-item" :class="[currentPath === '/demo/bothway-tree' ? 'c-left-menu-item-checked' : '']">双向树</div></router-link>
          <router-link to="/demo/scene-group"><div class="c-left-menu-item" :class="[currentPath === '/demo/scene-group' ? 'c-left-menu-item-checked' : '']">集团图谱</div></router-link>
          <router-link to="/demo/scene-org"><div class="c-left-menu-item" :class="[currentPath === '/demo/scene-org' ? 'c-left-menu-item-checked' : '']">组织架构图谱</div></router-link>
          <router-link to="/demo/scene-company"><div class="c-left-menu-item" :class="[currentPath === '/demo/scene-company' ? 'c-left-menu-item-checked' : '']">企业图谱</div></router-link>
          <router-link to="/demo/scene-network"><div class="c-left-menu-item" :class="[currentPath === '/demo/scene-network' ? 'c-left-menu-item-checked' : '']">网络拓扑</div></router-link>
          <router-link to="/demo/scene-relationship"><div class="c-left-menu-item" :class="[currentPath === '/demo/scene-relationship' ? 'c-left-menu-item-checked' : '']">人物关系网络</div></router-link>
          <el-divider content-position="left">高级 & 交互</el-divider>
          <router-link to="/demo/tree-data"><div class="c-left-menu-item" :class="[currentPath === '/demo/tree-data' ? 'c-left-menu-item-checked' : '']">使用有层级结构的数据</div></router-link>
          <router-link to="/demo/adv-hide-2-show"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-hide-2-show' ? 'c-left-menu-item-checked' : '']">默认被隐藏起来的图谱</div></router-link>
          <router-link to="/demo/adv-multi-layout"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-multi-layout' ? 'c-left-menu-item-checked' : '']">多主题切换</div></router-link>
          <router-link to="/demo/adv-slot"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-slot' ? 'c-left-menu-item-checked' : '']">自定义插槽slot/右键菜单</div></router-link>
          <router-link to="/demo/adv-node-tips"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-node-tips' ? 'c-left-menu-item-checked' : '']">节点详情悬浮框</div></router-link>
          <router-link to="/demo/adv-dynamic-data"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-dynamic-data' ? 'c-left-menu-item-checked' : '']">动态追加数据</div></router-link>
          <router-link to="/demo/adv-expand"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-expand' ? 'c-left-menu-item-checked' : '']">节点展开/收缩的用法</div></router-link>
          <router-link to="/demo/adv-expand-gradually"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-expand-gradually' ? 'c-left-menu-item-checked' : '']">默认是收缩起来的图谱</div></router-link>
          <router-link to="/demo/adv-data-filter"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-data-filter' ? 'c-left-menu-item-checked' : '']">节点筛选 & 关系筛选</div></router-link>
          <router-link to="/demo/adv-effect"><div class="c-left-menu-item" :class="[currentPath === '/demo/adv-effect' ? 'c-left-menu-item-checked' : '']">效果、控制</div></router-link>
          <router-link to="/demo/graph-resize"><div class="c-left-menu-item" :class="[currentPath === '/demo/graph-resize' ? 'c-left-menu-item-checked' : '']">图谱大小调整相关</div></router-link>
        </div>
      </el-aside>
      <el-main style="padding:0px;">
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from '../../../layout/AppMain';
import RgHeader from '../rg-header';
export default {
  name: 'SeeksRelationGraphDemo',
  components: { RgHeader, AppMain },
  data() {
    return {
      currentPath: '',
      demoname: ''
    };
  },
  watch: {
    $route(to, from) {
      this.currentPath = this.$route.path;
    }
  },
  created() {
  },
  mounted() {
    this.demoname = this.$route.params.demoname;
    this.currentPath = this.$route.path;
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .c-app-bottom-panel{
    display: none ;
    position: fixed;
    bottom: 0px;
    padding:5px;
  }
  .c-left-menu-item{
    text-align: left;
    height:49px;
    color: #444444;
    opacity: 0.7;
    cursor:pointer;
  }
  .c-left-menu-item:hover{
    color: #1989fa;
    opacity: 1;
  }
  .c-left-menu-item-checked{
    color: #1989fa;
    opacity: 1;
    font-weight: bold;
  }
</style>
