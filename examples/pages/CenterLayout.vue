<template>
  <div style="background-color: blueviolet">
    <div style="height:300px;color: #ffffff;font-size: 25px;">
      {{contact_cn}}
    </div>
    <div>
      <button @click="actionShow">show</button>
      <button @click="resizeGraph(300, 300)">action1</button>
      <button @click="resizeGraph(500, 300)">action2</button>
      <button @click="resizeGraph(500, 500)">action3</button>
      <button @click="resizeGraph(900, 500)">action3</button>
      <button @click="resizeGraph(1600, 1600)">action3</button>
    </div>
    <div :style="{width:graphSize.width + 'px',height:graphSize.height + 'px'}" style="height:600px;width:800px;border:#efefef solid 1px;padding-left:400px;background-color: #2E74B5;">
<!--      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :relation-graph-core="MyRelationGraphCore" :on-node-click="onNodeClick" :on-line-click="onLineClick">-->
<!--        <div slot="node" slot-scope="{node}">-->
<!--          xxxxxx: {{node.text}}-->
<!--        </div>-->
<!--&lt;!&ndash;        <g slot="line" slot-scope="{line}" v-if="line.isHide === false">&ndash;&gt;-->
<!--&lt;!&ndash;            <text :key="'t-'+line.id" :x="0" :y="0" :style="{fill:(line.fontColor?line.fontColor:(line.color?line.color:undefined))}" class="c-rg-link-text">&ndash;&gt;-->
<!--&lt;!&ndash;              &lt;!&ndash;<textPath :xlink:href="'#'+lineProps.id">{{ lineProps.text }}</textPath>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;              line:{{ line.text }}&ndash;&gt;-->
<!--&lt;!&ndash;            </text>&ndash;&gt;-->
<!--&lt;!&ndash;        </g>&ndash;&gt;-->
<!--        <div-->
<!--            slot="canvas-plug"-->
<!--           slot-scope="{relationGraph}"-->
<!--           style="text-align:left;z-index:100;position:absolute;user-select: none;">-->
<!--          <div style="height:50px;background-color:#7BA8FF;width:3000px;margin-left:-1500px;"></div>-->
<!--          <div style="height:50px;background-color:#ff8c00;width:3000px;margin-left:-1500px;"></div>-->
<!--          <div style="height:50px;background-color:#C03639;width:3000px;margin-left:-1500px;"></div>-->
<!--          instanceId: {{relationGraph.instanceId}}-->
<!--        </div>-->
<!--      </SeeksRelationGraph>-->
      <SeeksRelationGraph ref="seeksRelationGraph" :options="graphOptions" :relation-graph-core="MyRelationGraphCore" :on-node-click="onNodeClick" :on-line-click="onLineClick">
      </SeeksRelationGraph>
    </div>
  </div>
</template>

<script>
import { MyRelationGraphCore } from './MyRelationGraphCore';
import SeeksRelationGraph, { CenterLayouter, BidirectionalTreeLayouter } from '../../src';

export default {
  name: 'Demo',
  components: { SeeksRelationGraph },
  data() {
    return {
      MyRelationGraphCore,
      contact: '13811112222',
      isShow: false,
      graphSize: { width: 900, height: 900 },
      jsonData: null,
      graphOptions: {
        debug: true,
        showDebugPanel: true,
        allowSwitchLineShape: true,
        // allowShowMiniView: true,
        // allowShowMiniToolBar: false,
        moveToCenterWhenRefresh: false,
        allowSwitchJunctionPoint: true,
        isNeedShowAutoLayoutButton: true,
        'defaultExpandHolderPosition': 'right',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)',
        // defaultNodeShape: 1,
        // defaultNodeColor: 'transparent',
        // defaultNodeFontColor: '#000000',
        disableNodeClickEffect: true,
        disableLineClickEffect: true,
        defaultFocusRootNode: false,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'from': 'top',
            'layoutClassName': 'seeks-layout-center',
            distance_coefficient: 1.2
          }
        ]
      }
    };
  },
  computed: {
    contact_cn() {
      if (this.contact.indexOf('@') !== -1) {
        return '邮箱：' + this.contact;
      } else if (this.contact.length === 11) {
        return '手机号：' + this.contact + '/' + this.username;
      } else {
        return '联系方式：' + this.contact;
      }
    }
  },
  mounted() {
    this.showSeeksGraph();
    // this.setGraphData();
  },
  methods: {
    showSeeksGraph() {
      /**
         图谱数据__graph_json_data不要放在Vue data()中，也不要引用Vue data()中的变量，否则在当前版本中会有问题，以后版本会解决这个问题。
         如果需要__graph_json_data是一个全局变量，暂时的解决方法是把他放在 export default之前，具体问题可以加我QQ:3235808353
         **/
      // var __graph_json_data = {
      //   'rootId': 'a',
      //   'nodes': [
      //     {'id': 'a', 'text': 'a'},
      //     {'id': 'b', 'text': 'b'},
      //     {'id': 'c', 'text': 'c'},
      //     {'id': 'd', 'text': 'd' },
      //   ],
      //   'links': [
      //     {'from': 'a', 'to': 'b'},
      //     {'from': 'a','to': 'c' },
      //     {'from': 'a', 'to': 'd'},
      //   ]
      // }
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          { 'id': 'a', 'text': 'a', 'children': [
            { 'id': 'b', 'text': 'b', 'children': [
              { 'id': 'b1', 'text': 'b1', 'children': [
                { 'id': 'b1-1', 'text': 'b1-1' },
                { 'id': 'b1-2', 'text': 'b1-2' },
                { 'id': 'b1-3', 'text': 'b1-3' },
                { 'id': 'b1-4', 'text': 'b1-4' },
                { 'id': 'b1-5', 'text': 'b1-5' },
                { 'id': 'b1-6', 'text': 'b1-6' }
              ]
              },
              { 'id': 'b2', 'text': 'b2', 'children': [
                { 'id': 'b2-1', 'text': 'b2-1' },
                { 'id': 'b2-2', 'text': 'b2-2' }
              ]
              }
            ]
            },
            { 'id': 'c', 'text': 'c', 'children': [
              { 'id': 'c1', 'text': 'c1' },
              { 'id': 'c2', 'text': 'c2' },
              { 'id': 'c3', 'text': 'c3' }
            ]
            }
          ]
          }
        ],
        'links': [
          // 你仍然可以通过常规方式添加关系
        ]
      };
      this.jsonData = __graph_json_data;
      // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置
      // this.$refs.seeksRelationGraph.setLayouter(BidirectionalTreeLayouter);
      // this.$refs.seeksRelationGraph.setLayouter(CenterLayouter);
      console.log(typeof CenterLayouter, typeof BidirectionalTreeLayouter);
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, () => {
        // Called when the relation-graph is completed
      });
    },
    setGraphData() {
      this.options = {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '手工',
            'layoutName': 'fixed',
            'layoutClassName': 'seeks-layout-fixed',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1
          }
        ],
        'defaultNodeBorderWidth': 0,
        'defaultNodeShape': 1,
        'allowShowMiniNameFilter': false,
        // 'allowShowMiniToolBar': false,
        'defaultJunctionPoint': 'lr',
        'defaultLineShape': 2
      };
      const _orign_data = {
        entname: '中数智汇数据科技股份有限公司',
        invs: [
          { id: 'inv1', text: '北京某个公司科技有限公司', desc: '40%' },
          { id: 'inv2', text: '张蜈支', desc: '30%' },
          { id: 'inv3', text: '如花', desc: '10%' },
          { id: 'inv4', text: '路人甲', desc: '10%' },
          { id: 'inv5', text: '路人乙', desc: '10%' }
        ],
        persons: [
          { id: 'person1', text: '张蜈支', desc: '董事长' },
          { id: 'person2', text: '包奥曼', desc: '总经理' },
          { id: 'person3', text: '路人甲', desc: '监事' },
          { id: 'person4', text: '路人乙', desc: '董事' }
        ],
        asInvs: [
          { id: 'asinv1', text: '北京超级大橘科技有限公司', desc: '80%' },
          { id: 'asinv2', text: '北京超级大蚂蚁科技有限公司', desc: '70%' },
          { id: 'asinv3', text: '北京超级大米粒儿科技有限公司', desc: '20%' }
        ],
        branchs: [
          { id: 'branch1', text: '某个公司（北京）科技股份有限公司', desc: '80%' },
          { id: 'branch2', text: '某个公司（天津）科技股份有限公司', desc: '70%' },
          { id: 'branch4', text: '某个公司（成都）科技股份有限公司', desc: '70%' },
          { id: 'branch5', text: '某个公司（武汉）科技股份有限公司', desc: '20%' }
        ]
      };
      // const _graphSetting = this.$refs.seeksRelationGraph.graphSetting;
      // this.$refs.seeksRelationGraph.graphSetting.defaultLineShape = 1;
      // // 手工设置节点的坐标
      // const _center = {
      //   x: (_graphSetting.viewSize.width) / 2 - _graphSetting.canvasOffset.x,
      //   y: (_graphSetting.viewSize.height) / 2 - _graphSetting.canvasOffset.y
      // };
      const _center = {
        x: 0,
        y: 0
      };
      const graphData = {
        rootId: 'root',
        nodes: [],
        lines: []
      };
      // 添加根节点和虚拟节点
      const rootNode = { id: graphData.rootId, name: _orign_data.entname, styleClass: 'c-g-center', color: '#A4C1FF', width: 250, height: 50, x: _center.x - 125, y: _center.y - 25 };
      const invRootNode = { id: 'invRoot', name: '股东', styleClass: 'c-g-group-node', color: '#FFC5A6', width: 100, height: 50 };
      const personRootNode = { id: 'personRoot', name: '高管', styleClass: 'c-g-group-node', color: '#B9FFA7', width: 100, height: 50 };
      const asinvRootNode = { id: 'asinvRoot', name: '对外投资', styleClass: 'c-g-group-node', color: '#FFBEC1', width: 100, height: 50 };
      const branchRootNode = { id: 'branchRoot', name: '分支机构', styleClass: 'c-g-group-node', color: '#FFA1F8', width: 100, height: 50 };
      invRootNode.x = _center.x - 200 - invRootNode.width;
      invRootNode.y = _center.y - 130;
      personRootNode.x = _center.x - 200 - personRootNode.width;
      personRootNode.y = _center.y + 90;
      asinvRootNode.x = _center.x + 200;
      asinvRootNode.y = _center.y - 130;
      branchRootNode.x = _center.x + 200;
      branchRootNode.y = _center.y + 90;
      // 添加节点数据到graphData
      graphData.nodes.push(rootNode);
      graphData.nodes.push(invRootNode);
      graphData.nodes.push(personRootNode);
      graphData.nodes.push(asinvRootNode);
      graphData.nodes.push(branchRootNode);
      // 添加根节点和虚拟节点之间的关系，并将关系数据放入graphData
      graphData.links.push({ from: rootNode.id, to: invRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 });
      graphData.links.push({ from: rootNode.id, to: personRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 });
      graphData.links.push({ from: rootNode.id, to: asinvRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 });
      graphData.links.push({ from: rootNode.id, to: branchRootNode.id, styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 2 });
      // 将股东加入虚拟节点"股东"
      _orign_data.invs.forEach((thisNode, _index) => {
        thisNode.width = 200;
        thisNode.x = invRootNode.x - 300 - thisNode.width;
        thisNode.y = invRootNode.y + _index * 30 * -1 + 30;
        graphData.nodes.push(thisNode);
        graphData.links.push({ from: invRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFC5A6', arrow: 'none', lineShape: 4 });
      });
      // 将高管加入虚拟节点"高管"
      _orign_data.persons.forEach((thisNode, _index) => {
        thisNode.width = 200;
        thisNode.x = personRootNode.x - 200 - thisNode.width;
        thisNode.y = personRootNode.y + _index * 30;
        graphData.nodes.push(thisNode);
        graphData.links.push({ from: personRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#B9FFA7', arrow: 'none', lineShape: 4 });
      });
      // 将对外投资企业加入虚拟节点"对外投资"
      _orign_data.asInvs.forEach((thisNode, _index) => {
        thisNode.x = asinvRootNode.x + 200;
        thisNode.y = asinvRootNode.y + _index * 30 * -1 + 30;
        graphData.nodes.push(thisNode);
        graphData.links.push({ from: asinvRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFBEC1', lineShape: 4 });
      });
      // 将分支机构加入虚拟节点"分支机构东"
      _orign_data.branchs.forEach((thisNode, _index) => {
        thisNode.x = branchRootNode.x + 200;
        thisNode.y = branchRootNode.y + _index * 30;
        graphData.nodes.push(thisNode);
        graphData.links.push({ from: branchRootNode.id, to: thisNode.id, text: thisNode.desc, color: '#FFA1F8', lineShape: 4 });
      });
      this.$refs.seeksRelationGraph.setJsonData(graphData, (seeksRGGraph) => {
        seeksRGGraph.setOptions(this.options);
      });
    },
    onNodeClick(nodeObject) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject) {
      console.log('onLineClick:', lineObject);
    },
    actionShow() {
      // this.isShow = true;
      // this.contact = 'gaokui@qq.com';
      this.$refs.seeksRelationGraph.setOptions({
        debug: true,
        showDebugPanel: false,
        allowSwitchLineShape: false,
        // allowShowMiniView: true,
        // allowShowMiniToolBar: false,
        moveToCenterWhenRefresh: false,
        allowSwitchJunctionPoint: false,
        isNeedShowAutoLayoutButton: false,
        allowShowRefreshButton: false,
        'defaultExpandHolderPosition': 'right',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        defaultNodeShape: 1,
        // 'defaultNodeColor': 'rgba(0, 206, 209, 1)',
        // defaultNodeColor: 'transparent',
        // defaultNodeFontColor: '#000000',
        // disableNodeClickEffect: true,
        defaultFocusRootNode: false,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'from': 'left',
            'layoutClassName': 'seeks-layout-center',
            distance_coefficient: 1.2
          }
        ]
      });
    },
    resizeGraph(w, h) {
      this.graphSize.width = w;
      this.graphSize.height = h;
      this.$nextTick(() => {
        this.$refs.seeksRelationGraph.onGraphResize();
      });
    }
  }
};
</script>
<style scoped>
  /deep/ .rel-map-canvas{
    border:#ff0000 solid 0px !important;
  }
</style>
