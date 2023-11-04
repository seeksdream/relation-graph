<template>
  <div id="home" ref="home">
    <div style="text-align:center">
      <el-button @click="save" type="primary">数据保存</el-button>
    </div>
    <div v-loading="g_loading" ref="myPage"  style="height:800px;width:500px;background:red" @click="isShowNodeMenuPanel = false">
      <relation-graph
          ref="seeksRelationGraph"
          :options="graphOptions"
          :on-node-click="onNodeClick"
          :on-line-click="onLineClick">
        <div slot="node" slot-scope="{node}">
          <!--
              @mouseover="nodeSlotOver(node, $event)"
              @mouseout="nodeSlotOut(node, $event)"
              @click="showNodeMenus(node, $event)"
               -->
          <div
              style="cursor: pointer;background:#B0C4DE;"
              @contextmenu.prevent.stop="showNodeMenus(node, $event)"
          >

            <!-- <div v-if="node.data.text == '中'" style="width:100px;height:30px;background:green"></div>
            <div v-else-if="node.data.text == '国'" style="width:100px;height:30px;background:red"></div> -->
            <div v-if="node.data.type == 'condition'" >
              <el-select placeholder="且/或" v-model="node.data.info" style="width:78px">
                <el-option value="1">且</el-option>
                <el-option value="0">或</el-option>
              </el-select>
            </div>
            <div v-if="node.data.type == 'conditionData'" style="width:460px">
              <el-select v-model="node.data.info"  style="width:150px;margin-left:8px">
                <el-option value="1">猪猪侠</el-option>
                <el-option value="2">喜羊羊</el-option>
                <el-option value="3">喜羊羊</el-option>
              </el-select>
              <el-select v-model="node.data.info" style="width:80px;margin-left:8px">
                <el-option  value="1">大于</el-option>
                <el-option value="2">等于</el-option>
                <el-option  value="3">小于</el-option>
              </el-select>
              <el-select v-model="node.data.info"  style="width:150px;margin-left:8px">
                <el-option value="1">猪猪侠</el-option>
                <el-option value="2">喜羊羊</el-option>
                <el-option value="3">喜羊羊</el-option>
              </el-select>
            </div>
            <!-- <div v-else-if="node.data.text == '龙'" style="width:100px;height:30px;background:yellow"></div>
            <div v-else-if="node.data.text == '你'" style="width:100px;height:30px;background:orange"></div>
            <div v-else-if="node.data.text == '我'" style="width:100px;height:30px;background:blue"></div>
            <div v-else-if="node.data.text == '人'" style="width:100px;height:30px;background:black"></div>
            <div v-else style="width:100px;height:30px;background:purple"></div> -->
          </div>
        </div>
      </relation-graph>
    </div>
    <div v-show="isShowNodeMenuPanel"
         :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
         style="z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;">
      <div style="line-height: 25px;padding-left: 10px;color: #888888;font-size: 12px;">对这个节点进行操作：</div>
      <!-- <div class="c-node-menu-item" @click.stop="doAction('操作1')">添加</div> -->
      <div class="c-node-menu-item" @click.stop="doAction('操作1')">添加</div>
      <!-- <div class="c-node-menu-item" @click.stop="doActiondel('操作1')">删除·</div> -->
      <div class="c-node-menu-item" @click.stop="doActiondel('操作1')">删除</div>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
// import RelationGraph from 'relation-graph';
// import {nanoid} from 'nanoid' // 引入
export default {
  name: 'Demo',
  components: {},
  data() {
    return {
      g_loading:false,
      graphData: {
        rootId: '2',

        nodes: [
          // 注意：在节点配置信息中，你的自定义属性需要像下面这样放到data标签中，否则数据会丢失
          // {nodeShape: 1, id: '1', text: '节点-1', data: {myicon: 'el-icon-star-on'}},
          // {nodeShape: 1, id: '2', text: '节点-2', data: {myicon: 'el-icon-setting'}},
          // {nodeShape: 1, id: '3', text: '节点-3', data: {myicon: 'el-icon-setting'}},
          // {nodeShape: 1, id: '4', text: '节点-4', data: {myicon: 'el-icon-star-on'}},
          // {nodeShape: 1, id: '6', text: '节点-6', data: {myicon: 'el-icon-setting'}},
          {nodeShape: 1, id: '7', borderColor:"transition", text: '节点-7', data: {myicon: 'el-icon-setting', text: "龙",type:'condition',info:''}},
          // {nodeShape: 1, id: '8', text: '节点-8', data: {myicon: 'el-icon-star-on'}},
          // {nodeShape: 1, id: '9', text: '节点-9', data: {myicon: 'el-icon-headset'}},
          {nodeShape: 1, id: '71', borderColor:"transition",text: '节点-71', data: {myicon: 'el-icon-headset', text: "人",type:'conditionData',info:''}},
          {nodeShape: 1, id: '72',borderColor:"transition", text: '节点-72', data: {myicon: 'el-icon-s-tools', text: "国",type:'conditionData',info:''}},
          {nodeShape: 1, id: '73',borderColor:"transition", text: '节点-73', data: {myicon: 'el-icon-star-on', text: "中",type:'conditionData',info:''}},
          // {nodeShape: 1, id: '81', text: '节点-81', data: {myicon: 'el-icon-s-promotion'}},
          // {nodeShape: 1, id: '82', text: '节点-82', data: {myicon: 'el-icon-s-promotion'}},
          // {nodeShape: 1, id: '83', text: '节点-83', data: {myicon: 'el-icon-star-on'}},
          // {nodeShape: 1, id: '84', text: '节点-84', data: {myicon: 'el-icon-s-promotion'}},
          // {nodeShape: 1, id: '85', text: '节点-85', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '91', text: '节点-91', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '92', text: '节点-82', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '51', text: '节点-51', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '52', text: '节点-52', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '53', text: '节点-53', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '54', text: '节点-54', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '55', text: '节点-55', data: {myicon: 'el-icon-sunny'}},
          // {nodeShape: 1, id: '5', text: '节点-5', data: {myicon: 'el-icon-sunny'}}


        ],
        lines: [
          {from: '7', to: '71', text: '',color:'#2b2d79', lineWidth: 1, opacity: 0},
          {from: '7', to: '72', text: '',color:'#2b2d79', lineWidth: 1},
          {from: '7', to: '73', text: '',color:'#2b2d79', lineWidth: 1},
          // {from: '71', to: '711', text: '线-'},
          // {from: '71', to: '712', text: '线-'},
          // {from: '8', to: '81', text: '投资'},
          // {from: '8', to: '82', text: '投资'},
          // {from: '8', to: '83', text: '投资'},
          // {from: '8', to: '84', text: '投资'},
          // {from: '8', to: '85', text: '投资'},
          // {from: '9', to: '91', text: '投资'},
          // {from: '9', to: '92', text: '投资'},
          // {from: '5', to: '51', text: '投资1'},
          // {from: '5', to: '52', text: '投资'},
          // {from: '5', to: '53', text: '投资3'},
          // {from: '5', to: '54', text: '投资4'},
          // {from: '5', to: '55', text: '投资'},
          // {from: '1', to: '2', text: '投资'},
          // {from: '3', to: '1', text: '高管'},
          // {from: '4', to: '2', text: '高管'},
          // {from: '6', to: '2', text: '高管'},
          // {from: '7', to: '2', text: '高管'},
          // {from: '8', to: '2', text: '高管'},
          // {from: '9', to: '2', text: '高管'},
          // {from: '1', to: '5', text: '投资'}
        ]
      },

      isShowCodePanel: false,
      isShowNodeMenuPanel: false,
      nodeMenuPanelPosition: {x: 0, y: 0},
      graphOptions: {
        layouts: [
          {
            layoutName: 'tree',
            layoutDirection: 'h',
            from: 'left',
            centerOffset_x: 0,
            centerOffset_y: 0
          }
        ],
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        nodeObject:{}
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
      lineViewList:[],
      nodeViewList:[]
    };
  },
  mounted() {
    this.showSeeksGraph();
  },
  methods: {
    save(){
      console.log(this.graphData.nodes);
      console.log(this.graphData.lines);
    },
    showSeeksGraph() {
      const __graph_json_data = this.graphData;
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    onNodeClick(nodeObject, $event) {
      this.nodeObject = nodeObject
      console.log('onNodeClick:', nodeObject);
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    },
    nodeSlotOver(nodeObject) {
      console.log('nodeSlotOver:', nodeObject);
    },
    nodeSlotOut(nodeObject) {
      console.log('nodeSlotOut:', nodeObject);
    },
    showNodeMenus(nodeObject, $event) {
      this.currentNode = nodeObject;
      console.log(this.currentNode);
      const _base_position = this.$refs.myPage.getBoundingClientRect();
      console.log('showNodeMenus:', $event, _base_position);
      this.isShowNodeMenuPanel = true;
      this.nodeMenuPanelPosition.x = $event.clientX - _base_position.x;
      this.nodeMenuPanelPosition.y = $event.clientY - _base_position.y;

    },
    //函数封装
    resArr(arr1, arr2) {
      return arr1.filter((v) => arr2.every((val) => val.id!= v.id));
    },
    // 删除
    doActiondel(){
      console.log(this.graphData);
      console.log(this.currentNode,'this.currentNode');
      let instance = this.$refs.seeksRelationGraph.getInstance();
      let rootNode = instance.graphData.rootNode;
      // let nodeViewList = instance.nodeViewList//节点的数组集合
      // console.log(nodeViewList);

      ////首先过滤出当前要删的那个// 节点操作(实例的节点)
      // let currentArr = []
      // currentArr = nodeViewList.filter((item,index)=>{
      //   return item.id == this.currentNode.id
      // })
      // 判断看他子集有没有节点，有的话也删了它们
      // if (currentArr.length>0 && currentArr[0].targetTo.length >0) {
      //   lineArr = currentArr[0].targetTo
      //   nodeViewList = this.resArr(nodeViewList,currentArr[0].targetTo)
      // }
      //
      // 再把当前选中的的给删了
      // nodeViewList = nodeViewList.filter((item,index)=>{
      //   return item.id != this.currentNode.id//过滤出当前要删的那个
      // })


      // new nodes
      // 删有子代的情况下
      this.nodeViewList = this.graphData.nodes;
      if (this.currentNode.lot.childs.length>0) {
        // this.nodeViewList = this.resArr(this.nodeViewList,this.currentNode.lot.childs)
        this.delnodedigui(this.currentNode.lot.childs)
      }
      // 同时删除当前的节点
      this.nodeViewList = this.nodeViewList.filter((item,index)=>{
        return item.id != this.currentNode.id
      })
      // 也要把data的节点（传输到后端的数据）也删除了
      this.graphData.nodes = this.nodeViewList

      // new lines
      this.lineViewList = this.graphData.lines
      // 删的有子代的中间段（自己后面的线条，递归）
      if (this.currentNode.lot.childs.length>0) {
        debugger
        this.deldigui(this.currentNode.lot.childs,this.currentNode.id)
      }
      // 自己前面的线条
      if (this.currentNode.lot.parent && this.currentNode.lot.parent.id) {
        console.log(this.lineViewList);
        this.lineViewList.forEach((item,index)=>{
          if (item.from == this.currentNode.lot.parent.id && item.to == this.currentNode.id) {
            this.lineViewList.splice(index,1)
            console.log(this.lineViewList);
            console.log('删了没峨眉米南沙街的巴萨举报混动是吧的哈神经病的疤痕就斯巴达说不定就');
          }
        })
      }




      let lineViewListInstance = instance.lineViewList//线条的数组集合//item.relations[0].from  item.relations[0].to
      console.log(lineViewListInstance);
      console.log(this.lineViewList);
      console.log(this.nodeViewList);
      //也要把data的线条（传输到后端的数据）也删除了
      // (三种情况:1、删除的节点最末端的，那我们就要删掉上一级的id，to我这个节点的id)
      // (三种情况:2、删除的节点中间的，那我们就要删掉当前的from到子集的所有线条都要删除，
      // 而且上一个到我这的也要删除)
      // (三种情况:3、删除的节点最前端的，那我们就要别让删除吧)
      this.graphData.lines = this.lineViewList


      this.$refs.seeksRelationGraph.setJsonData({
        rootId: rootNode.id,
        nodes:this.nodeViewList,
        links:this.lineViewList,
      }, () => {
        console.log("hello")
        this.$refs.seeksRelationGraph.refresh();
      })
      this.$notify({
        title: '提示',
        message: '对节点【' + this.currentNode.text + '】进行了：' + '删除操作',
        type: 'success'
      });
      // 关闭弹窗
      this.isShowNodeMenuPanel = false;

      //
    },
    delnodedigui(arr){
      for (let i = 0; i < this.nodeViewList.length; i++) {
        for (let q = 0; q < arr.length; q++) {
          console.log(this.nodeViewList[i] + '外层');
          console.log(arr[q] + '内层');
          if (this.nodeViewList[i].id == arr[q].id) {
            this.nodeViewList.splice(i,1)
          }
          if (arr[q].lot.childs.length>0) {
            this.delnodedigui(arr[q].lot.childs)
          }
        }
      }
    },
    deldigui(arr,id){

      console.log(this.lineViewList);
      // // for循环双重
      // for (let i = 0; i < this.lineViewList.length; i++) {
      //   for (let q = 0; q < arr.length; q++) {
      //     console.log(this.lineViewList[i] + '外层');
      //     console.log(arr[q] + '内层');
      //     if (this.lineViewList[i].from == this.currentNode.id && this.lineViewList[i].to ==arr[q].id) {
      //       this.lineViewList.splice(i,1)
      //     }
      //     if (arr[q].lot.childs.length>0) {
      //       this.deldigui(arr[q].lot.childs)
      //     }
      //   }
      // }

      // for循环双重
      for (let i = 0; i < this.lineViewList.length; i++) {
        for (let q = 0; q < arr.length; q++) {
          console.log(this.lineViewList[i] + '外层');
          console.log(arr[q] + '内层');
          let tempId
          if (this.lineViewList[i].to == arr[q].id) {
            this.lineViewList.splice(i,1)
          }
          if (arr[q].lot.childs.length>0) {
              // tempId = this.lineViewList[i].id
              this.deldigui(arr[q].lot.childs,tempId)
            }
        }
      }
      // this.lineViewList.forEach((ele,i)=>{
      //   arr.forEach((item,index)=>{
      //     console.log(ele+ 'ele');
      //     console.log(item + 'item');
      //     if (ele.from == this.currentNode.id && ele.to ==item.id) {
      //       this.lineViewList.splice(i,1)
      //     }
      //     if (item.lot.childs.length>0) {
      //       console.log(item);
      //       debugger
      //       this.deldigui(item.lot.childs)
      //     }
      //   })
      // })
    },
    // 增加
    doAction: function (actionName,) {
      this.g_loading = true

      console.log(this.currentNode,'this.currentNode');
      let instance = this.$refs.seeksRelationGraph.getInstance();
      console.log(instance);
      let nodes = this.graphData.nodes;
      let links = this.graphData.lines;
      nodes.forEach((item,index)=>{
        if (item.id == this.currentNode.id) {
          item.data.type = 'condition'
        }
      })

      let rootNode = instance.graphData.rootNode;
      let temId = nanoid() // 函数调用
      nodes.push({nodeShape: 1,borderColor:"transition", id:temId, text: '', data: {myicon: 'el-icon-plus', text: "我",type:'conditionData',}},)
      links.push({from: this.currentNode.id, to: temId, text: '',color:'#2b2d79'})
      //  // setJsonData
      console.log(nodes);
      console.log(links);
      this.$refs.seeksRelationGraph.setJsonData({
        rootId: rootNode.id,
        nodes,
        links,
      }, () => {
        console.log("hello")
        this.g_loading = false
        this.$refs.seeksRelationGraph.refresh();
      })


      // appendJsonData
      // this.$refs.seeksRelationGraph.appendJsonData({
      //   rootId: rootNode.id,
      //   nodes: [
      //     {nodeShape: 1, id: '7-1', text: '节点-6幺xx幺幺幺幺幺幺幺幺幺幺xxxx', data: {myicon: 'el-icon-plus', text: "我"}},
      //     {nodeShape: 1, id: '7-2', text: '节点-6幺xx幺幺幺幺幺幺幺幺幺幺xxxx', data: {myicon: 'el-icon-plus', text: "你"}}
      //   ],
      //   lines: [
      //     {from: '71', to: '7-1', text: '线-'},
      //     {from: '71', to: '7-2', text: '线-'}
      //   ]
      // }, () => {
      //   console.log("hello")
      //   this.$refs.seeksRelationGraph.refresh();
      // })


      console.log(instance, "instance")
      this.$notify({
        title: '提示',
        message: '对节点【' + this.currentNode.text + '】进行了：' + actionName,
        type: 'success'
      });
      this.isShowNodeMenuPanel = false;
    }
  }
};
</script>
<style scoped>
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}

.c-node-menu-item:hover {
  background-color: rgba(66, 187, 66, 0.2);
}
</style>
