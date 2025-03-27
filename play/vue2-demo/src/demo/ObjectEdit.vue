<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
        :on-contextmenu="onContextmenu"
      >
        <template #tool-bar>
          <ObjectEditToolBar />
        </template>
        <template #graph-plug>
          <div
              v-if="isShowNodeTipsPanel"
              :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
              style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;"
          >
            <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">
              你点击了：{{currentObjectType}}
              <div v-if="currentObjectType==='link'">{{currentObject.fromNode.text}} -> {{currentObject.toNode.text}}</div>
              <div v-if="currentObjectType==='node'">ID:{{currentObject.id}}</div>
              <div v-if="currentObjectType==='node'">Text:{{currentObject.text}}</div>
            </div>
            <div v-if="currentObjectType==='canvas'" class="c-node-menu-item" @click="addNode">添加节点</div>
            <div v-if="currentObjectType==='node'" class="c-node-menu-item" @click="deleteNode">删除节点</div>
            <div v-if="currentObjectType==='node'" class="c-node-menu-item" @click="createLineFromNode">添加连线</div>
            <div v-if="currentObjectType==='link'" class="c-node-menu-item" @click="deleteLink">删除关系</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from "relation-graph";
import ObjectEditToolBar from './ObjectEditToolBar';
export default {
  name: 'ObjectEdit',
  components: { ObjectEditToolBar },
  data() {
    return {
      isShowNodeTipsPanel: false,
      nodeMenuPanelPosition: { x: 0, y: 0 },
      currentObjectType: null,
      currentObject: '',
      newNodeIdIndex: 1,
      newLineIdIndex: 1,
      graphOptions: {
        'backgrounImageNoRepeat': true,
        'moveToCenterWhenRefresh': true,
        'zoomToFitWhenRefresh': true,
        // defaultLineShape: 4,
        useAnimationWhenExpanded: true,
        placeOtherGroup: true,
        defaultNodeWidth: 150,
        defaultNodeHeight: 30,
        debug: true,
        showDebugPanel: true,
        'layouts': [
          {
            'label': '树状',
            'layoutName': 'tree',
            from: 'left',
            'layoutClassName': 'seeks-layout-center',
            'defaultExpandHolderPosition': 'hide',
            'defaultJunctionPoint': 'border'
          }
        ]
      },
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph() {
      const __graph_json_data = {
        "rootId": "2",
        "nodes": [
          {
            "id": "2",
            "text": "ALTXX"
          },
          {
            "id": "3",
            "text": "CH2 TTN"
          },
          {
            "id": "4",
            "text": "CH1 AlCu"
          },
          {
            "id": "5",
            "text": "MainFrame"
          },
          {
            "id": "10",
            "text": "卓立制造"
          },
          {
            "id": "14",
            "text": "ArHigh"
          },
          {
            "id": "15",
            "text": "ArLow",
          },
          {
            "id": "16",
            "text": "ShowerHead"
          },
          {
            "id": "17",
            "text": "CrypoPump"
          },
          {
            "id": "18",
            "text": "DryPump"
          },
          {
            "id": "19",
            "text": "Ti Target"
          },
          {
            "id": "20",
            "text": "N2"
          },
          {
            "id": "21",
            "text": "Shutter"
          },
          {
            "id": "22",
            "text": "Cool Chbr"
          },
          {
            "id": "23",
            "text": "Transfer Chbr"
          },
          {
            "id": "24",
            "text": "Alignment Unit"
          },
          {
            "id": "27",
            "text": "原材料检验"
          },
          {
            "id": "28",
            "text": "地板RTV硅胶密封"
          },
          {
            "id": "29",
            "text": "热保护焊接"
          },
          {
            "id": "30",
            "text": "电热管导线焊接"
          },
          {
            "id": "31",
            "text": "温控器安装"
          },
          {
            "id": "32",
            "text": "蒸汽硅胶座配装"
          },
          {
            "id": "33",
            "text": "温度调试"
          }
        ],
        "lines": [
          {
            "from": "2",
            "to": "5",
            "text": "子系统"
          },
          {
            "from": "2",
            "to": "3",
            "text": "子系统"
          },
          {
            "from": "2",
            "to": "4",
            "text": "子系统"
          },
          {
            "from": "3",
            "to": "21",
            "text": "子系统"
          },
          {
            "from": "3",
            "to": "20",
            "text": "子系统"
          },
          {
            "from": "3",
            "to": "19",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "18",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "17",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "16",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "15",
            "text": "子系统"
          },
          {
            "from": "4",
            "to": "14",
            "text": "子系统"
          },
          {
            "from": "5",
            "to": "24",
            "text": "子系统"
          },
          {
            "from": "5",
            "to": "23",
            "text": "子系统"
          },
          {
            "from": "5",
            "to": "22",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "33",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "32",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "31",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "30",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "29",
            "text": "子系统"
          },
          {
            "from": "10",
            "to": "28",
            "text": "子系统"
          }
        ]
      };
      const rgInstanceRef = this.$refs.seeksRelationGraph
      rgInstanceRef.setJsonData(__graph_json_data, (graphInstance) => {
          // 这些写上当图谱初始化完成后需要执行的代码.
        }
      );
    },
    onNodeClick(nodeObject, $event) {
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    onContextmenu($event, objectType, object) {
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      this.currentObjectType = objectType;
      this.currentObject = object;
      const _base_position = graphInstance.getBoundingClientRect();
      console.log('showNodeMenus:', $event, _base_position);
      this.isShowNodeTipsPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x + 10;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y + 10;
      const hideContentMenu = () => {
        this.isShowNodeTipsPanel = false;
        document.body.removeEventListener('click', hideContentMenu)
      }
      document.body.addEventListener('click', hideContentMenu)
    },
    addNode($event) {
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      const _base_position = graphInstance.getBoundingClientRect();
      const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
        x: this.nodeMenuPanelPosition.x - 10 + _base_position.x,
        y: this.nodeMenuPanelPosition.y - 10 + _base_position.y
      });
      const newId = this.newNodeIdIndex++
      graphInstance.addNodes([{
        id: 'addFromCanvas-' + newId,
        text: 'New-' + newId,
        color: '#5da0f8',
        x: canvasCoordinate.x,
        y: canvasCoordinate.y
      }]);
    },
    deleteNode($event) {
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      graphInstance.removeNodeById(this.currentObject.id);
    },
    deleteLink($event) {
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      graphInstance.removeLinkById(this.currentObject.seeks_id);
    },
    createLineFromNode(e) {
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      graphInstance.startCreatingLinePlot(e, {
        template: {
          lineWidth: 3,
          color: '#e85f84',
          text: '新连线'
        },
        fromNode: this.currentObject,
        onCreateLine: (from, to) => {
          console.log('新增连线：', from, to);
          if (to.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
            const newLineId = this.newLineIdIndex++;
            graphInstance.addLines([{
              from: from.id,
              to: to.id,
              lineWidth: 3,
              color: '#e85f84',
              text: '新连线' + newLineId
            }]);
          }
        }
      });
    }
  },
};
</script>

<style>
</style>

<style scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
</style>
