<template>
  <div ref="graphPanel" style="width: calc(100vw - 10px);height:800px;">
    <div v-if="g_loading" style="text-align: center;line-height: 800px;">数据加载中...</div>
    <SeeksRelationGraph ref="seeksRelationGraph" :user-graph-setting="userGraphSetting">
      <template slot="node" slot-scope="{node}">
        <div style="padding:5px;">
          <span style="color: #ffffff;font-size: 25px;">
            <i :class="node.myicon" />
          </span>
          <br>
          <span style="color: forestgreen;font-size: 12px;">
            {{ node.myicon }}
          </span>
        </div>
      </template>
      <template slot="settingPanelPlus" slot-scope="{setting}">
        <div>
          <i class="el-icon-sunny" /> 关系筛选：
        </div>
      </template>
    </SeeksRelationGraph>
    <site-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SiteFooter from '@/views/app-cods/SiteFooter';
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SiteFooter },
  data() {
    return {
      userGraphSetting: {
        debug: false,
        autoLayout: false,
        heightByContent: true,
        layouter: undefined,
        layoutName: 'center',
        defaultLineColor: '#FD8B37',
        showSingleNode: true,
        showNodeLabel: true,
        showNodeShortLabel: true,
        showLineLabel: true,
        defaultLineShape: 1,
        defaultNodeShape: 0,
        viewSize: { width: 1300, height: 800 },
        canvasSize: {
          width: 5000,
          height: 5000
        }
      },
      g_loading: true
    };
  },
  computed: mapState({
  }),
  created() {
  },
  mounted() {
    // this.userGraphSetting.viewSize.width = this.$refs.graphPanel.offsetWidth
    // this.userGraphSetting.viewSize.height = this.$refs.graphPanel.offsetHeight
    // console.log('view:', this.$route.params.orgId)
    this.initData();
  },
  methods: {
    randomString(len) {
      len = len || 32;
      const $chars = '观自在菩萨行深般若波罗蜜多时照见五蕴皆空度一切苦厄舍利子色不异空空不异色色即是空空即是色受想行识亦复如是舍利子是诸法空相不生不灭不垢不净不增不减是故空中无色无受想行识无眼耳鼻舌身意无色声香味触法无眼界乃至无意识界无无明亦无无明尽乃至无老死亦无老死尽无苦集灭道无智亦无得以无所得故菩提萨埵依般若波罗蜜多故心无罣碍无罣碍故无有恐怖远离颠倒梦想究竟涅磐三世诸佛依般若波罗蜜多故得阿耨多罗三藐三菩提故知般若波罗蜜多是大神咒是大明咒是无上咒是无等等咒能除一切苦真实不虚故说般若波罗蜜多咒即说咒曰揭谛揭谛波罗揭谛波罗僧揭谛菩提萨婆诃'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    initData() {
      const data = {
        rootId: '2',
        nodes: [
          { id: '1', name: '节点-1', myicon: 'el-icon-star-on' },
          { id: '2', name: '节点-2', myicon: 'el-icon-setting' },
          { id: '3', name: '节点-3', myicon: 'el-icon-setting' },
          { id: '4', name: '节点-4', myicon: 'el-icon-star-on' },
          { id: '6', name: '节点-6', myicon: 'el-icon-setting' },
          { id: '7', name: '节点-7', myicon: 'el-icon-setting' },
          { id: '8', name: '节点-8', myicon: 'el-icon-star-on' },
          { id: '9', name: '节点-9', myicon: 'el-icon-headset' },
          { id: '71', name: '节点-71', myicon: 'el-icon-headset' },
          { id: '72', name: '节点-72', myicon: 'el-icon-s-tools' },
          { id: '73', name: '节点-73', myicon: 'el-icon-star-on' },
          { id: '81', name: '节点-81', myicon: 'el-icon-s-promotion' },
          { id: '82', name: '节点-82', myicon: 'el-icon-s-promotion' },
          { id: '83', name: '节点-83', myicon: 'el-icon-star-on' },
          { id: '84', name: '节点-84', myicon: 'el-icon-s-promotion' },
          { id: '85', name: '节点-85', myicon: 'el-icon-sunny' },
          { id: '91', name: '节点-91', myicon: 'el-icon-sunny' },
          { id: '92', name: '节点-82', myicon: 'el-icon-sunny' },
          { id: '51', name: '节点-51', myicon: 'el-icon-sunny' },
          { id: '52', name: '节点-52', myicon: 'el-icon-sunny' },
          { id: '53', name: '节点-53', myicon: 'el-icon-sunny' },
          { id: '54', name: '节点-54', myicon: 'el-icon-sunny' },
          { id: '55', name: '节点-55', myicon: 'el-icon-sunny' },
          { id: '5', name: '节点-5', myicon: 'el-icon-sunny' }
        ],
        lines: [
          { from: '7', to: '71', text: '投资' },
          { from: '7', to: '72', text: '投资' },
          { from: '7', to: '73', text: '投资' },
          { from: '8', to: '81', text: '投资' },
          { from: '8', to: '82', text: '投资' },
          { from: '8', to: '83', text: '投资' },
          { from: '8', to: '84', text: '投资' },
          { from: '8', to: '85', text: '投资' },
          { from: '9', to: '91', text: '投资' },
          { from: '9', to: '92', text: '投资' },
          { from: '5', to: '51', text: '投资1' },
          { from: '5', to: '52', text: '投资' },
          { from: '5', to: '53', text: '投资3' },
          { from: '5', to: '54', text: '投资4' },
          { from: '5', to: '55', text: '投资' },
          { from: '1', to: '2', text: '投资' },
          { from: '3', to: '1', text: '高管' },
          { from: '4', to: '2', text: '高管' },
          { from: '6', to: '2', text: '高管' },
          { from: '7', to: '2', text: '高管' },
          { from: '8', to: '2', text: '高管' },
          { from: '9', to: '2', text: '高管' },
          { from: '1', to: '5', text: '投资' }
        ]
      };
      setTimeout(() => {
        this.g_loading = false;
        this.$refs.seeksRelationGraph.setJsonData(data, function(seeksRGGraph) {
          seeksRGGraph.doLayout();
        });
      }, 500);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
