<template>
  <div ref="graphPanel" style="width: calc(100vw - 10px);height:800px;">
    <div v-if="g_loading" style="text-align: center;line-height: 800px;">数据加载中...</div>
    <SeeksRelationGraph ref="seeksRelationGraph" :user-graph-setting="userGraphSetting" :on-node-click="onNodeClick" />
  </div>
</template>

<script>
// import SeeksRelationGraph from '../../SeeksRelationGraph';
// import SeeksRGStore from '../core4vue/SeeksRGStore'
// import { mapState } from 'vuex'
import { json2Node } from '@/models/RGNode';

export default {
  components: { },
  data() {
    return {
      g_loading: true,
      userGraphSetting: {
        defaultLineShape: 4
      }
    };
  },
  // computed: mapState({
  //   graphSetting: () => SeeksRGStore.state.graphSetting
  // }),
  mounted() {
    setTimeout(function() {
      this.g_loading = false;
      this.loadGraphJsonData({
        invs: [
          { id: 'inv1', name: '北京龙信数据科技有限公司', desc: '40%' },
          { id: 'inv2', name: '张军', desc: '30%' },
          { id: 'inv3', name: '如花', desc: '10%' },
          { id: 'inv4', name: '路人甲', desc: '10%' },
          { id: 'inv5', name: '路人乙', desc: '10%' }
        ],
        persons: [
          { id: 'person1', name: '张军', desc: '董事长' },
          { id: 'person2', name: '鲍涛', desc: '总经理' },
          { id: 'person3', name: '路人甲', desc: '监事' },
          { id: 'person4', name: '路人乙', desc: '董事' }
        ],
        asInvs: [
          { id: 'asinv1', name: '北京小橘科技有限公司', desc: '80%' },
          { id: 'asinv2', name: '北京小蚂蚁科技有限公司', desc: '70%' },
          { id: 'asinv3', name: '北京不知名科技有限公司', desc: '20%' }
        ],
        branchs: [
          { id: 'branch1', name: '中数智汇（北京）科技股份有限公司', desc: '80%' },
          { id: 'branch2', name: '中数智汇（天津）科技股份有限公司', desc: '70%' },
          { id: 'branch4', name: '中数智汇（成都）科技股份有限公司', desc: '70%' },
          { id: 'branch5', name: '中数智汇（武汉）科技股份有限公司', desc: '20%' }
        ]
      });
    }.bind(this), 1000);
  },
  methods: {
    loadGraphJsonData(jsonData) {
      const graphData = {
        // rootId: this.currentOrgId,
        nodes: [],
        links: []
      };
      const _graphSetting = this.$refs.seeksRelationGraph.graphSetting;
      const _center = {
        x: (_graphSetting.viewSize.width) / 2 - _graphSetting.canvasOffset.x,
        y: (_graphSetting.viewSize.height) / 2 - _graphSetting.canvasOffset.y
      };
      this.$refs.seeksRelationGraph.graphSetting.defaultLineShape = 1;
      const rootNode = json2Node({ id: 'root', name: '中数智汇数据科技股份有限公司', styleClass: 'c-g-center', color: '#A4C1FF', lot: { parent: undefined }});
      const invRootNode = json2Node({ id: 'invRoot', name: '股东', styleClass: 'c-g-group-node', color: '#FFC5A6', lot: { parent: rootNode }});
      const personRootNode = json2Node({ id: 'personRoot', name: '高管xxx', styleClass: 'c-g-group-node', color: '#B9FFA7', lot: { parent: rootNode }});
      const asinvRootNode = json2Node({ id: 'asinvRoot', name: '对外投资', styleClass: 'c-g-group-node', color: '#FFBEC1', lot: { parent: rootNode }});
      const branchRootNode = json2Node({ id: 'branchRoot', name: '分支机构', styleClass: 'c-g-group-node', color: '#FFA1F8', lot: { parent: rootNode }});
      console.log(invRootNode);
      rootNode.lot.childs.push(invRootNode);
      rootNode.lot.childs.push(personRootNode);
      rootNode.lot.childs.push(asinvRootNode);
      rootNode.lot.childs.push(branchRootNode);
      graphData.nodes.push(rootNode);
      graphData.nodes.push(invRootNode);
      graphData.nodes.push(personRootNode);
      graphData.nodes.push(asinvRootNode);
      graphData.nodes.push(branchRootNode);
      graphData.links.push({ id: 's-static-line-1', from: rootNode, to: invRootNode, text: '', styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 1 });
      graphData.links.push({ id: 's-static-line-2', from: rootNode, to: personRootNode, text: '', styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 1 });
      graphData.links.push({ id: 's-static-line-3', from: rootNode, to: asinvRootNode, text: '', styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 1 });
      graphData.links.push({ id: 's-static-line-4', from: rootNode, to: branchRootNode, text: '', styleClass: 'c-g-l-group', color: '#C7E9FF', lineShape: 1 });
      console.log(rootNode.el.offsetWidth);
      console.log(invRootNode.el.offsetWidth);
      console.log(personRootNode.el.offsetWidth);
      jsonData.invs.forEach((thisNode, _index) => {
        thisNode = json2Node(thisNode);
        thisNode.lot.parent = invRootNode;
        invRootNode.lot.childs.push(thisNode);
        graphData.nodes.push(thisNode);
        graphData.links.push({ id: 'inv-' + thisNode.id, from: invRootNode, to: thisNode, text: thisNode.desc, color: '#FFC5A6', arrow: 'none', lineShape: 4 });
      });
      jsonData.persons.forEach((thisNode, _index) => {
        thisNode = json2Node(thisNode);
        thisNode.lot.parent = personRootNode;
        personRootNode.lot.childs.push(thisNode);
        graphData.nodes.push(thisNode);
        graphData.links.push({ id: 'inv-' + thisNode.id, from: personRootNode, to: thisNode, text: thisNode.desc, color: '#B9FFA7', arrow: 'none', lineShape: 4 });
      });
      jsonData.asInvs.forEach((thisNode, _index) => {
        thisNode = json2Node(thisNode);
        thisNode.lot.parent = asinvRootNode;
        asinvRootNode.lot.childs.push(thisNode);
        graphData.nodes.push(thisNode);
        graphData.links.push({ id: 'inv-' + thisNode.id, from: asinvRootNode, to: thisNode, text: thisNode.desc, color: '#FFBEC1', lineShape: 4 });
      });
      jsonData.branchs.forEach((thisNode, _index) => {
        thisNode = json2Node(thisNode);
        thisNode.lot.parent = branchRootNode;
        branchRootNode.lot.childs.push(thisNode);
        graphData.nodes.push(thisNode);
        graphData.links.push({ id: 'inv-' + thisNode.id, from: branchRootNode, to: thisNode, text: thisNode.desc, color: '#FFA1F8', lineShape: 4 });
      });

      this.$refs.seeksRelationGraph.setJsonData(graphData, (seeksRGGraph) => {
        // this.graphSetting.checkedNodeId = this.currentOrgId
        // seeksRGGraph.doLayout() //不使用布局工具
        this.$nextTick(() => { // 元素渲染完成后才可以获取其真实的宽度高度，所以要使用$nextTick
          rootNode.x = _center.x - rootNode.el.offsetWidth / 2;
          rootNode.y = _center.y - rootNode.el.offsetHeight / 2;
          invRootNode.x = _center.x - 100 - invRootNode.el.offsetWidth;
          invRootNode.y = _center.y - 130;
          personRootNode.x = _center.x - 100 - personRootNode.el.offsetWidth;
          personRootNode.y = _center.y + 90;
          asinvRootNode.x = _center.x + 100;
          asinvRootNode.y = _center.y - 130;
          branchRootNode.x = _center.x + 100;
          branchRootNode.y = _center.y + 90;
          jsonData.invs.forEach((thisNode, _index) => {
            thisNode.x = invRootNode.x - 100 - thisNode.el.offsetWidth;
            thisNode.y = invRootNode.y + _index * 30 * -1 + 30;
          });
          jsonData.persons.forEach((thisNode, _index) => {
            thisNode.x = personRootNode.x - 100 - thisNode.el.offsetWidth;
            thisNode.y = personRootNode.y + _index * 30;
          });
          jsonData.asInvs.forEach((thisNode, _index) => {
            thisNode.x = asinvRootNode.x + 200;
            thisNode.y = asinvRootNode.y + _index * 30 * -1 + 30;
          });
          jsonData.branchs.forEach((thisNode, _index) => {
            thisNode.x = branchRootNode.x + 200;
            thisNode.y = branchRootNode.y + _index * 30;
          });
        });
      });
    },
    onNodeClick(nodeData, e) {
      console.log('click node:', nodeData);
      // for (let i = 0; i < graphData.links.length; i++) {
      //   var thisLine = graphData.links[i]
      //   if (thisLine.from.id === nodeData.id || thisLine.to.id === nodeData.id) {
      //     thisLine.flash = thisLine.flash + 1
      //   }
      // }
    }
  }
};
</script>
<style>
  .c-g-center{
    width:150px;
    height:50px;
    text-align: center;
  }
  .c-g-group-node{
    width:100px;
    height:40px;
    text-align: center;
    padding-top:12px;
  }
  .rel-map .c-g-l-group{
    /*stroke: #C7E9FF;*/
    /*marker-end: url('#group-arrow');*/
    /*marker-mid: url('#group-arrow');*/
    stroke-width: 3px;
    stroke-linecap: round;
  }
</style>
<style scoped>

</style>
