<template>
  <div>
    <rg-header title="Relation Graph 使用 & 配置 " />
    <el-container style="border-top: #efefef solid 1px;padding-top:40px;">
      <el-aside style="padding:0px;background-color: #ffffff;border-right: #efefef solid 1px;padding:50px;padding-top:10px;padding-bottom:10px;">
        <router-link to="/docs/start"><div class="c-left-menu-item" :class="[currentPath === '/docs/start' ? 'c-left-menu-item-checked' : '']">快速上手</div></router-link>
        <el-divider content-position="left">图谱配置</el-divider>
        <router-link to="/docs/graph"><div class="c-left-menu-item" :class="[currentPath === '/docs/graph' ? 'c-left-menu-item-checked' : '']">Graph 图谱</div></router-link>
        <router-link to="/docs/layout"><div class="c-left-menu-item" :class="[currentPath === '/docs/layout' ? 'c-left-menu-item-checked' : '']">Layout 布局</div></router-link>
        <el-divider content-position="left">数据配置</el-divider>
        <router-link to="/docs/data"><div class="c-left-menu-item" :class="[currentPath === '/docs/data' ? 'c-left-menu-item-checked' : '']">数据格式</div></router-link>
        <router-link to="/docs/node"><div class="c-left-menu-item" :class="[currentPath === '/docs/node' ? 'c-left-menu-item-checked' : '']">Node 节点</div></router-link>
        <router-link to="/docs/link"><div class="c-left-menu-item" :class="[currentPath === '/docs/link' ? 'c-left-menu-item-checked' : '']">Link 关系 & Line 线条</div></router-link>
        <div class="c-bottom-panel222" style="text-align: center;">京ICP备19054220号-5</div>
      </el-aside>
      <el-main style="padding:30px;">
        <app-main />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AppMain from '../../layout/AppMain';
import RgHeader from './rg-header';
export default {
  name: 'DocsIndex',
  components: {
    AppMain,
    RgHeader
  },
  data() {
    return {
      checkedRoute: null,
      currentPath: ''
    };
  },
  watch: {
    $route(to, from) {
      this.currentPath = this.$route.path;
    }
  },
  mounted() {
    this.currentPath = this.$route.path;
    // console.log('path:', this.$route.path)
  }
};
</script>

<style>
</style>
<style lang="scss" scoped>
  .c-bottom-panel222{
    display: block;
    position: fixed;
    bottom: 0px;
    padding:5px;
  }
  .c-left-menu-item{
    text-align: left;
    height:49px;
    color: #444444;
    opacity: 0.7;
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
