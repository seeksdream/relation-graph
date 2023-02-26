<template>
  <div>
    <div style="height:50px;padding-top:6px;padding-left: 30px;padding-right:30px;border-bottom: #efefef solid 1px;color: #555555;font-size: 12px;">
      <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/examples/views/seeks-graph-docs/demo/Demo4AdvEffect2.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
    </div>
    <div style="margin-top:0px;width: calc(100% - 10px);height:calc(100vh - 100px);">
      <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
export default {
  name: 'SeeksRelationGraphDemo',
  components: { },
  data() {
    return {
      g_loading: true,
      demoname: '---',
      checked_sex: '',
      checked_isgoodman: '',
      rel_checkList: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
      all_rel_type: ['师生', '上下级', '亲戚', '情人', '朋友', '夫妻', '勾结', '腐化', '举报'],
      graphOptions: {
        debug: true,
        defaultNodeBorderWidth: 0,
        defaultNodeColor: 'rgba(238, 178, 94, 1)',
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultLineShape: 1,
        'layouts': [
          {
            'label': '自动布局',
            'layoutName': 'force',
            'layoutClassName': 'seeks-layout-force'
          }
        ],
        defaultJunctionPoint: 'border'

        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  created() {
  },
  mounted() {
    this.demoname = this.$route.params.demoname;
    this.setGraphData();
  },
  methods: {
    setGraphData() {
      const __graph_json_data = { 'rootId': 'N13', 'nodes': [{ 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014);"><div class="c-node-name2" style="color:#ff875e">侯亮平</div></div>' }, { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062);"><div class="c-node-name2" style="color:#ff875e">李达康</div></div>' }, { 'id': 'N3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092);"><div class="c-node-name2" style="color:#6cc0ff">祁同伟</div></div>' }, { 'id': 'N4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021);"><div class="c-node-name2" style="color:#ff875e">陈岩石</div></div>' }, { 'id': 'N5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060);"><div class="c-node-name2" style="color:#ff875e">陆亦可</div></div>' }, { 'id': 'N6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1);"><div class="c-node-name2" style="color:#6cc0ff">高育良</div></div>' }, { 'id': 'N7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1);"><div class="c-node-name2" style="color:#ff875e">沙瑞金</div></div>' }, { 'id': 'N8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011);"><div class="c-node-name2" style="color:#6cc0ff">高小琴</div></div>' }, { 'id': 'N9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012);"><div class="c-node-name2" style="color:#6cc0ff">高小凤</div></div>' }, { 'id': 'N10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013);"><div class="c-node-name2" style="color:#ff875e">赵东来</div></div>' }, { 'id': 'N11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3);"><div class="c-node-name2" style="color:#6cc0ff">程度</div></div>' }, { 'id': 'N12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081);"><div class="c-node-name2" style="color:#ff875e">吴惠芬</div></div>' }, { 'id': 'N13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080);"><div class="c-node-name2" style="color:#6cc0ff">赵瑞龙</div></div>' }, { 'id': 'N14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);"><div class="c-node-name2" style="color:#6cc0ff">赵立春</div></div>' }, { 'id': 'N15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0);"><div class="c-node-name2" style="color:#ff875e">陈海</div></div>' }, { 'id': 'N16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2);"><div class="c-node-name2" style="color:#ff875e">梁璐</div></div>' }, { 'id': 'N17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082);"><div class="c-node-name2" style="color:#6cc0ff">刘新建</div></div>' }, { 'id': 'N18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091);"><div class="c-node-name2" style="color:#6cc0ff">欧阳菁</div></div>' }, { 'id': 'N19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e', 'borderWidth': 3, 'data': { 'isGoodMan': true, 'sexType': '女' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);"><div class="c-node-name2" style="color:#ff875e">吴心怡</div></div>' }, { 'id': 'N20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1);"><div class="c-node-name2" style="color:#6cc0ff">蔡成功</div></div>' }, { 'id': 'N21', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'borderWidth': 3, 'data': { 'isGoodMan': false, 'sexType': '男' }, 'innerHTML': '<div class="c-my-node2" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093);"><div class="c-node-name2" style="color:#6cc0ff">丁义珍</div></div>' }], 'lines': [{ 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '师生' }}, { 'from': 'N6', 'to': 'N3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '师生' }}, { 'from': 'N14', 'to': 'N6', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N14', 'to': 'N13', 'text': '亲戚', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '亲戚' }}, { 'from': 'N14', 'to': 'N17', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N2', 'to': 'N14', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N3', 'to': 'N8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '情人' }}, { 'from': 'N4', 'to': 'N15', 'text': '亲戚', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '亲戚' }}, { 'from': 'N5', 'to': 'N15', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N7', 'to': 'N4', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N3', 'to': 'N15', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N3', 'to': 'N1', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N1', 'to': 'N15', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N1', 'to': 'N15', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N6', 'to': 'N12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '夫妻' }}, { 'from': 'N15', 'to': 'N10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N8', 'to': 'N9', 'text': '亲戚', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '亲戚' }}, { 'from': 'N10', 'to': 'N5', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '情人' }}, { 'from': 'N3', 'to': 'N11', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N6', 'to': 'N9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '情人' }}, { 'from': 'N13', 'to': 'N3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '勾结' }}, { 'from': 'N2', 'to': 'N10', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N13', 'to': 'N11', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N7', 'to': 'N2', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N7', 'to': 'N6', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N3', 'to': 'N16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '夫妻' }}, { 'from': 'N12', 'to': 'N16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N2', 'to': 'N18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '夫妻' }}, { 'from': 'N13', 'to': 'N17', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '腐化' }}, { 'from': 'N13', 'to': 'N8', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '勾结' }}, { 'from': 'N13', 'to': 'N8', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '腐化' }}, { 'from': 'N13', 'to': 'N9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '腐化' }}, { 'from': 'N19', 'to': 'N5', 'text': '亲戚', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '亲戚' }}, { 'from': 'N19', 'to': 'N12', 'text': '亲戚', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '亲戚' }}, { 'from': 'N20', 'to': 'N1', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '朋友' }}, { 'from': 'N20', 'to': 'N18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d', 'data': { 'type': '举报' }}, { 'from': 'N18', 'to': 'N17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d', 'data': { 'type': '举报' }}, { 'from': 'N17', 'to': 'N13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d', 'data': { 'type': '举报' }}, { 'from': 'N2', 'to': 'N21', 'text': '上下级', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '上下级' }}, { 'from': 'N8', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '勾结' }}, { 'from': 'N3', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '勾结' }}, { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5', 'data': { 'type': '勾结' }}] };

      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        setTimeout(() => {
          graphInstance.stopAutoLayout();
        }, 1000);
      });
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
      const allLinks = this.$refs.seeksRelationGraph.getLinks();
      allLinks.forEach(link => { // 还原所有样式
        link.relations.forEach(line => {
          if (line.data.orignColor) {
            line.color = line.data.orignColor;
          }
          if (line.data.orignFontColor) {
            line.fontColor = line.data.orignColor;
          }
          if (line.data.orignLineWidth) {
            line.lineWidth = line.data.orignLineWidth;
          }
        });
      });
      // 让与{nodeObject}相关的所有连线高亮
      allLinks.filter(link => (link.fromNode === nodeObject || link.toNode === nodeObject)).forEach(link => {
        link.relations.forEach(line => {
          console.log('line:', line);
          line.data.orignColor = line.color;
          line.data.orignFontColor = line.fontColor || line.color;
          line.data.orignLineWidth = line.lineWidth || 1;
          line.color = '#ff0000';
          line.fontColor = '#ff0000';
          line.lineWidth = 3;
        });
      });
      // 有时候更改一些属性后，并不能马上同步到视图，这需要以下方法让视图强制根据数据同步到最新
      this.$refs.seeksRelationGraph.getInstance().dataUpdated();
    },
    onLineClick(lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
      this.$notify({
        title: '点击连线：',
        type: 'success',
        message: '点击了线:' + linkObject.fromNode.text + ' to ' + linkObject.toNode.text
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .c-my-node2{
    border:none;
    background-position: center center;
    background-size: 100%;
    height:74px;
    width:74px;
    border-radius: 40px;
  }
  .c-node-name2{
    width:160px;margin-left:-40px;text-align:center;margin-top:85px;
    position: absolute;
  }
</style>
