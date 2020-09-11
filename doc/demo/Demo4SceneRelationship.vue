<template>
  <div>
    <div style="margin-top:50px;width: calc(100% - 10px);height:calc(100vh - 140px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4SceneRelationship.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SeeksRelationGraph },
  data() {
    return {
      g_loading: true,
      demoname: '---',
      graphOptions: {
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
    }
  },
  created() {
  },
  mounted() {
    this.demoname = this.$route.params.demoname
    this.setGraphData()
  },
  methods: {
    setGraphData() {
      var __graph_json_data = { 'rootId': 'N13', 'nodes': [{ 'id': 'N1', 'text': '侯亮平', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">侯亮平</div></div>' }, { 'id': 'N2', 'text': '李达康', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">李达康</div></div>' }, { 'id': 'N3', 'text': '祁同伟', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">祁同伟</div></div>' }, { 'id': 'N4', 'text': '陈岩石', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陈岩石</div></div>' }, { 'id': 'N5', 'text': '陆亦可', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陆亦可</div></div>' }, { 'id': 'N6', 'text': '高育良', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高育良</div></div>' }, { 'id': 'N7', 'text': '沙瑞金', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3722686698,2547355567&fm=58&app=83&f=JPEG?w=250&h=250&s=BF8A356E04E1B2BCEFA45D860100E0E1);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">沙瑞金</div></div>' }, { 'id': 'N8', 'text': '高小琴', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4266886844,1791850012&fm=58&s=66B01AC758BB67960834B8FA0300C011);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高小琴</div></div>' }, { 'id': 'N9', 'text': '高小凤', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2747443453,2680399969&fm=58&app=83&f=JPEG?w=150&h=150&s=DB8828C1562265150814ADFE03007012);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">高小凤</div></div>' }, { 'id': 'N10', 'text': '赵东来', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3301823375,1282024443&fm=58&app=83&f=JPG?w=250&h=250&s=2BC2834F2C22A25D12C06CA80300E013);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">赵东来</div></div>' }, { 'id': 'N11', 'text': '程度', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=134233720,666111889&fm=58&app=83&f=JPG?w=250&h=250&s=4DE5A844801F1BD461E039A20300C0C3);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">程度</div></div>' }, { 'id': 'N12', 'text': '吴惠芬', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1215039713,3597142764&fm=58&app=83&f=JPEG?w=250&h=250&s=1A20E0018E3B6E9CD10C7DA30300E081);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">吴惠芬</div></div>' }, { 'id': 'N13', 'text': '赵瑞龙', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1140839330,2922201597&fm=58&app=83&f=JPEG?w=250&h=250&s=CDF9A844D45AB87512C8508B0100F080);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">赵瑞龙</div></div>' }, { 'id': 'N14', 'text': '赵立春', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">赵立春</div></div>' }, { 'id': 'N15', 'text': '陈海', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1416498138,2265298708&fm=58&app=83&f=JPEG?w=250&h=250&s=F906CF1C0E1356D046AC3CEB0300B0A0);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">陈海</div></div>' }, { 'id': 'N16', 'text': '梁璐', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3749144697,3456463661&fm=58&app=83&f=JPEG?w=250&h=250&s=783823D3FE621E94138CC08B030070C2);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">梁璐</div></div>' }, { 'id': 'N17', 'text': '刘新建', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2263876103,310235844&fm=58&app=83&f=JPEG?w=250&h=250&s=6CE2A944CC1223DC632CC09203009082);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">刘新建</div></div>' }, { 'id': 'N18', 'text': '欧阳菁', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3590139977,3135325708&fm=58&app=83&f=JPEG?w=250&h=250&s=2F1C8B46C4A214BCE100A81A03004091);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">欧阳菁</div></div>' }, { 'id': 'N19', 'text': '吴心怡', 'color': '#ec6941', 'borderColor': '#ff875e', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2110325119,1633583088&fm=58&app=83&f=JPEG?w=120&h=120&s=971E35C05A43305DCA7C1C0B030080C);border:#ff875e solid 3px;"><div class="c-node-name" style="color:#ff875e">吴心怡</div></div>' }, { 'id': 'N20', 'text': '蔡成功', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4153440298,254451173&fm=58&app=83&f=JPEG?w=250&h=250&s=07C2B4488C42D355548CC41F010080D1);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">蔡成功</div></div>' }, { 'id': 'N21', 'text': '丁义珍', 'color': 'rgba(0, 206, 209, 1)', 'borderColor': '#6cc0ff', 'innerHTML': '<div class="c-my-node" style="background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=842795163,1346447987&fm=58&app=83&f=JPEG?w=250&h=250&s=2BC3736EE499247D41C0B4820100E093);border:#6cc0ff solid 3px;"><div class="c-node-name" style="color:#6cc0ff">丁义珍</div></div>' }], 'links': [{ 'from': 'N6', 'to': 'N1', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N6', 'to': 'N3', 'text': '师生', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N14', 'to': 'N6', 'text': '前领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N14', 'to': 'N13', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N14', 'to': 'N17', 'text': '前部队下属', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N2', 'to': 'N14', 'text': '前任秘书', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N8', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N4', 'to': 'N15', 'text': '父子', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N5', 'to': 'N15', 'text': '属下', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N7', 'to': 'N4', 'text': '故人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N15', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N1', 'text': '师哥', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N1', 'to': 'N15', 'text': '同学，生死朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N6', 'to': 'N12', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N15', 'to': 'N10', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N8', 'to': 'N9', 'text': '双胞胎', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N10', 'to': 'N5', 'text': '爱慕', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N6', 'to': 'N9', 'text': '情人', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N3', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N2', 'to': 'N10', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N11', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N7', 'to': 'N2', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N7', 'to': 'N6', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N16', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N12', 'to': 'N16', 'text': '朋友', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N2', 'to': 'N18', 'text': '夫妻', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N17', 'text': '洗钱工具', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N8', 'text': '勾结，腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N9', 'text': '腐化', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N19', 'to': 'N5', 'text': '母女', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N19', 'to': 'N12', 'text': '姐妹', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N20', 'to': 'N1', 'text': '发小', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N20', 'to': 'N18', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' }, { 'from': 'N18', 'to': 'N17', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' }, { 'from': 'N17', 'to': 'N13', 'text': '举报', 'color': '#ed724d', 'fontColor': '#ed724d' }, { 'from': 'N2', 'to': 'N21', 'text': '领导', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N8', 'to': 'N21', 'text': '策划出逃', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N3', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }, { 'from': 'N13', 'to': 'N21', 'text': '勾结', 'color': '#d2c0a5', 'fontColor': '#d2c0a5' }] }

      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .c-my-node{
    background-position: center center;
    background-size: 100%;
    border:#ff8c00 solid 2px;
    height:80px;
    width:80px;
    border-radius: 40px;
  }
  .c-node-name{
    width:160px;margin-left:-40px;text-align:center;margin-top:85px;
  }
</style>
