<template>
  <div>
    <el-divider content-position="left">自定义【节点】插槽</el-divider>
    <div style="padding-bottom:100px;">
      <div class="c-slot-teamplate" :class="[!slotTeamplateId?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('')">无</div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot1'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot1')"><img src="/images/slot1.png" style="width:100%" /></div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot2'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot2')"><img src="/images/slot2.png" style="width:100%" /></div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot3'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot3')"><img src="/images/slot3.png" style="width:100%" /></div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot4'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot4')"><img src="/images/slot4.png" style="width:100%" /></div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot5'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot5')"><img src="/images/slot5.png" style="width:100%" /></div>
      <div class="c-slot-teamplate" :class="[slotTeamplateId==='slot6'?'c-slot-teamplate-checked':'']" @click="setSlotTeamplate('slot6')"><img src="/images/slot6.png" style="width:100%" /></div>
    </div>
    <div style="clear:both;border-bottom:1px solid #efefef;height:10px;"></div>
    <div style="height:calc(100vh - 300px);">
      <relation-graph ref="seeksRelationGraph" :options="userGraphOptions">
        <template v-if="slotTeamplateId" slot="node" slot-scope="{node}">
          <Slot1 v-if="slotTeamplateId === 'slot1'" :node="node" />
          <Slot2 v-if="slotTeamplateId === 'slot2'" :node="node" />
          <Slot3 v-if="slotTeamplateId === 'slot3'" :node="node" />
          <Slot4 v-if="slotTeamplateId === 'slot4'" :node="node" />
          <Slot5 v-if="slotTeamplateId === 'slot5'" :node="node" />
          <Slot6 v-if="slotTeamplateId === 'slot6'" :node="node" />
        </template>
      </relation-graph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
import Slot1 from '../options-tools/components/node-slot/slot1';
import Slot2 from '../options-tools/components/node-slot/slot2';
import Slot3 from '../options-tools/components/node-slot/slot3';
import Slot4 from '../options-tools/components/node-slot/slot4';
import Slot5 from '../options-tools/components/node-slot/slot5';
import Slot6 from '../options-tools/components/node-slot/slot6';

export default {
  name: 'Demo',
  components: { Slot1, Slot2, Slot3, Slot4, Slot5, Slot6 },
  data() {
    return {
      slotTeamplateId: '',
      userGraphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          {
            'id': 'a',
            'text': 'a',
            'data': {
              'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014',
              'name': '侯亮平',
              'slotType': 'slot1',
              'myicon': 'el-icon-star-on'
            }
          },
          {
            'id': 'b',
            'text': 'b',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062',
              'name': '李达康',
              'slotType': 'slot2',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'c',
            'text': 'c',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092',
              'name': '祁同伟',
              'slotType': 'slot3',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'd',
            'text': 'd',
            'data': {
              'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021',
              'name': '陈岩石',
              'slotType': 'slot4',
              'myicon': 'el-icon-star-on'
            }
          },
          {
            'id': 'e',
            'text': 'e',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060',
              'name': '陆亦可',
              'slotType': 'slot5',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'f',
            'text': 'f',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
              'name': '高育良',
              'myicon': 'el-icon-setting'
            }
          }
        ],
        'lines': [
          {
            'from': 'a',
            'to': 'b'
          },
          {
            'from': 'a',
            'to': 'c'
          },
          {
            'from': 'a',
            'to': 'd'
          },
          {
            'from': 'a',
            'to': 'e'
          },
          {
            'from': 'a',
            'to': 'f'
          }
        ]
      };
      if (this.slotTeamplateId === 'slot6') {
        Object.assign(__graph_json_data.nodes[0], { color: '#67C23A', borderColor: '#90EE90', nodeShape: 0, borderWidth: 5 });
        Object.assign(__graph_json_data.nodes[1], { color: '#409EFF', borderColor: '#409EFF', nodeShape: 1, borderWidth: 1 });
        Object.assign(__graph_json_data.nodes[2], { color: '', borderColor: '', nodeShape: 0, borderWidth: 0 });
        Object.assign(__graph_json_data.nodes[3], { color: '#409EFF', borderColor: '#409EFF', nodeShape: 1, borderWidth: 1 });
        Object.assign(__graph_json_data.nodes[4], { color: '', borderColor: '#409EFF', nodeShape: 0, borderWidth: 0 });
      }
      console.log(this.slotTeamplateId, __graph_json_data);
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    resetGraphOptions() {
      console.log('options update:resetGraphOptions:', this.userGraphOptions);
      this.$refs.seeksRelationGraph.setOptions(this.userGraphOptions, (seeksRGGraph) => {
        // this.initData();
        if (this.slotTeamplateId === 'slot6') {
          this.showSeeksGraph();
        }
      });
    },
    setSlotTeamplate(slotTeamplateId) {
      this.slotTeamplateId = slotTeamplateId;
      if (this.slotTeamplateId === '') {
        this.userGraphOptions.defaultNodeColor = '#67C23A';
        this.userGraphOptions.defaultNodeBorderColor = '#90EE90';
        this.userGraphOptions.defaultNodeShape = 0;
        this.userGraphOptions.defaultNodeBorderWidth = 5;
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot1') {
        this.userGraphOptions.defaultNodeColor = '#67C23A';
        this.userGraphOptions.defaultNodeBorderColor = '#90EE90';
        this.userGraphOptions.defaultNodeShape = 0;
        this.userGraphOptions.defaultNodeBorderWidth = 5;
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot2') {
        this.userGraphOptions.defaultNodeColor = '#409EFF';
        this.userGraphOptions.defaultNodeShape = 1;
        this.userGraphOptions.defaultNodeBorderWidth = 0;
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot3') {
        this.userGraphOptions.defaultNodeColor = '';
        this.userGraphOptions.defaultNodeShape = 0;
        this.userGraphOptions.defaultNodeBorderWidth = 0;
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot4') {
        this.userGraphOptions.defaultNodeColor = '#409EFF';
        this.userGraphOptions.defaultNodeShape = 1;
        this.userGraphOptions.defaultNodeBorderWidth = 1;
        this.userGraphOptions.defaultNodeBorderColor = '#409EFF';
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot5') {
        this.userGraphOptions.defaultNodeColor = '';
        this.userGraphOptions.defaultNodeShape = 0;
        this.userGraphOptions.defaultNodeBorderWidth = 0;
        this.userGraphOptions.defaultNodeBorderColor = '#409EFF';
        this.resetGraphOptions(this.userGraphOptions);
      }
      if (this.slotTeamplateId === 'slot6') {
        this.userGraphOptions.defaultNodeColor = '#eeeeee';
        this.userGraphOptions.defaultNodeShape = 1;
        this.userGraphOptions.defaultNodeBorderWidth = 1;
        this.userGraphOptions.defaultNodeBorderColor = '#eeeeee';
        this.resetGraphOptions(this.userGraphOptions);
      }
    }
  }
};
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
.c-slot-teamplate{
  border: 1px solid #efefef;
  border-radius: 8px;
  padding:10px;
  width: 150px;
  height: 150px;
  float: left;
  margin-left:10px;
  margin-top:10px;
  cursor: pointer;
  font-size:12px;
}
.c-slot-teamplate:hover{
  border: 1px solid #00bb00;
}
.c-slot-teamplate-checked{
  border: 1px solid #409EFF;
}
</style>
