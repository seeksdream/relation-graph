<template>
  <div style="position: relative;padding:0px;margin:0px;">
    <!-- 消息盒子 -->
    <div style="height: calc(100vh - 50px);width:280px;position: absolute;right:0px;top:0px;background-color:#efefef;padding:5px;box-sizing: border-box;font-size:12px;">
      <div v-for="notice of noticeList" :key="notice.id" style="border:#eeeeee solid 1px;background-color:#ffffff;border-radius:5px;padding:10px;">
        <div style="font-weight: bold;">{{notice.title}}</div>
        <div>{{notice.message}}</div>
      </div>
    </div>
    <div
        style="height: calc(100vh - 50px);width: calc(100vw - 300px);"
        element-loading-text="正在检测您的登录状态..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.6)"
    >
      <RelationGraph
          ref="graphRef"
          :options="graphOptions"
          :on-contextmenu="onContextmenu"
      >
        <template #graph-plug>
          <MyGraphToolbarByGpt />
          <div
              v-if="isShowNodeTipsPanel"
              :style="{left: nodeMenuPanelPosition.x + 'px', top: nodeMenuPanelPosition.y + 'px' }"
              class="c-right-menu-panel"
          >
            <div class="c-object-info">
              <div>当前右键事件信息：</div>
              <div>类型：{{currentObjectType}}</div>
              <div v-if="currentObjectType==='link'">{{currentObject.fromNode.text}} -> {{currentObject.toNode.text}}</div>
              <div v-if="currentObjectType==='node'">ID:{{currentObject.id}}</div>
              <div v-if="currentObjectType==='node'">Text:{{currentObject.text}}</div>
              <div>你可以对这个对象做以下操作：</div>
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import RelationGraph, {
  JsonLine,
  RGJsonData,
  RGLink,
  RGNode,
  RGOptions,
  RGPosition,
  RGUserEvent
} from "../relation-graph-agent";
import MyGraphToolbarByGpt from "./MyGraphToolbar-by-gpt.vue";
const staticJsonData = {
  rootId: '2',
  nodes: [
    { id: '1', text: '节点-1', myicon: 'el-icon-star-on' },
    { id: '2', text: '节点-2', myicon: 'el-icon-setting' },
    { id: '3', text: '节点-3', myicon: 'el-icon-setting' },
    { id: '4', text: '节点-4', myicon: 'el-icon-star-on' },
    { id: '6', text: '节点-6', myicon: 'el-icon-setting' },
    { id: '7', text: '节点-7', myicon: 'el-icon-setting' },
    { id: '8', text: '节点-8', myicon: 'el-icon-star-on' },
    { id: '9', text: '节点-9', myicon: 'el-icon-headset' },
    { id: '71', text: '节点-71', myicon: 'el-icon-headset' },
    { id: '72', text: '节点-72', myicon: 'el-icon-s-tools' },
    { id: '73', text: '节点-73', myicon: 'el-icon-star-on' },
    { id: '81', text: '节点-81', myicon: 'el-icon-s-promotion' },
    { id: '82', text: '节点-82', myicon: 'el-icon-s-promotion' },
    { id: '83', text: '节点-83', myicon: 'el-icon-star-on' },
    { id: '84', text: '节点-84', myicon: 'el-icon-s-promotion' },
    { id: '85', text: '节点-85', myicon: 'el-icon-sunny' },
    { id: '91', text: '节点-91', myicon: 'el-icon-sunny' },
    { id: '92', text: '节点-82', myicon: 'el-icon-sunny' },
    { id: '5', text: '节点-5', myicon: 'el-icon-sunny' }
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

// const userInfo = computed(() => store.state.user.userInfo);
// 这里的userInfo需要获取当前用户信息
// const userInfo = computed(() => ({ account: 'zhangsan', userId: 'id-zhangsan'}));
const userInfo = computed(() => undefined);
const userNickName = computed(() => userInfo.value && userInfo.value?.account || '');

const noticeList = ref<MessageObject[]>([]);
const isShowNodeTipsPanel = ref(false);
const savingToServer = ref(false);
const nodeMenuPanelPosition = ref({ x: 0, y: 0 });
const currentObjectType = ref('');
const currentObject = ref();
const newNodeIdIndex = ref(1);
const newLineIdIndex = ref(1);
const docId = ref('');
const loading = ref(true);
const graphOptions = ref<RGOptions>({
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowDownloadButton: true,
  defaultJunctionPoint: 'border',
  layout: {
    layoutName: 'center'
  }
});
const graphOptionsForUserGraph:RGOptions = {
  allowSwitchLineShape: true,
  allowSwitchJunctionPoint: true,
  allowShowDownloadButton: true,
  defaultJunctionPoint: 'border',
  layout: {
    layoutName: 'fixed'
  }
}
const graphRef = ref<RelationGraph>();

onMounted(() => {
  setTimeout(() => {
    showGraph();
  }, 2000);
});
const postRequest = async (url:string, data:any) => {
  // 这里需要自己实现，发送post请求，但是需要携带当前系统的token、应用当前系统的加密方式等之类的内容
  /**
   * // 示例代码：
   * return await axios({
   *       method: 'post',
   *       url: url,
   *       data: data,
   *       headers: {
   *         'Content-Type': 'application/json'
   *       }
   *     })
   */
};
type MessageObject = {
  id?:number
  title?:string
  message: string,
  type: string,
  duration: number
};
const showNotice = (msgObject:MessageObject) => {
  msgObject.id = noticeList.value.length;
  noticeList.value.push(msgObject);
}
const showGraph = async () => {
  showNotice({
    title: '提示：',
    message: '这是一个示例，可以对图谱内容、位置进行更改并保存，在以后打开时重新展示为保存时的状态。',
    type: 'success',
    duration: 20000
  });
  if (!userInfo.value) {
    await showNotice({
      title: '这个示例需要您登录',
      message: '这个示例需要您登录才能演示保存，并在下次打开时重新还原保存时的状态。',
      type: 'success',
      duration: 20000
    });
    await showDataOnGraph(staticJsonData);
  } else {
    docId.value = userInfo.value.userId + '-my-demo';
    await loadUserGraphData(docId.value);
  }
}
const loadUserGraphData = async (docId:string) => {
  const userGraphJsonDataFromCloud = await loadGraphDataFromCloudByDocId(docId);
  if (!userGraphJsonDataFromCloud) {
    await showNotice({
      title: '您第一次打开图谱',
      message: '您之前还未保存过这个图谱，所以当前展示的是默认数据，且数据会被布局器分配位置。',
      type: 'success',
      duration: 20000
    });
    // 当用户没有保存过此图谱时，则使用staticJsonData，使用此数据时需要使用center布局
    await showDataOnGraph(staticJsonData);
  } else {
    await showNotice({
      title: '展示您之前保存的图谱状态',
      message: '您之前保存过这个图谱，现在将还原您之前保存的数据状态。',
      type: 'success',
      duration: 20000
    });
    // 当用户之前保存过此图谱时，则可以从后台数据库获取保存的图谱数据userGraphJsonDataFromCloud
    const graphInstance = graphRef.value!.getInstance();
    // 由于要重新还原保存时的状态，那么需要使用到fixed布局，它可以根据保存在节点中的位置重新还原他们的位置
    await graphInstance.setOptions(graphOptionsForUserGraph);
    await showDataOnGraph(userGraphJsonDataFromCloud);
    await graphInstance.moveToCenter();
    await graphInstance.zoomToFit();
  }
}
const loadGraphDataFromCloudByDocId = async (docId:string) => {
  const response:any = await postRequest('/my-graph/get-graph', { docId, ignoreErrors: true });
  if (response.data && response.data.data) {
    const graphInfo = response.data.data;
    const { docContent } = graphInfo;
    console.log('graphInfo:', graphInfo);
    const graphJsonData = JSON.parse(docContent);
    console.log('graphJsonData.jsonData:', graphJsonData.jsonData);
    console.log('graphJsonData.options:', graphJsonData.options);
    return graphJsonData.jsonData;
  } else {
    // 之前未保存过
    return null;
  }
}
const showDataOnGraph = async (jsonData:RGJsonData) => {
  await graphRef.value!.setJsonData(jsonData, async(graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码.
      }
  );
}
const saveGraph = async () => {
  if (!userNickName.value) {
    await showNotice({
      title: '请先登录',
      message: '这个示例在演示【保存】功能时需要您登录，这样才可以避免不同使用者的操作冲突。',
      type: 'success',
      duration: 20000
    });
    return;
  }
  if (savingToServer.value) {
    return;
  }
  savingToServer.value = true;
  setTimeout(() => {
    savingToServer.value = false;
  }, 15000); // 15秒之后可以重新保存，避免因网络暂时异常导致永远不能重新提交
  const graphInstance = graphRef.value!.getInstance();
  const jsonData = graphInstance.getGraphJsonData();
  const saveResult:any = await postRequest('/my-graph/save-graph', {
    docId: docId.value,
    name: 'My demo graph',
    docContent: JSON.stringify({
      options: undefined, // 不需要保存图谱设置，因为下次打开的时候使用的是固定的fixed布局的图谱设置：graphOptionsForUserGraph
      jsonData: jsonData
    })
  });
  savingToServer.value = false;
  const data = saveResult.data.data;
  console.log('saveResult:', data);
  if (!data.updated) { // 当保存失败时，后台需要返回属性updated = false, 且data中需要包含失败原因message
    alert(data.message);
    return;
  }
  await showNotice({
    title: '文档保存成功！',
    message: '您可以尝试刷新页面重新访问这个图谱，它将还原您保存时的数据状态。',
    type: 'success',
    duration: 20000
  });
}
const onContextmenu = ($event:MouseEvent|TouchEvent, objectType:string, object:any) => {
  const graphInstance = graphRef.value!.getInstance();
  currentObjectType.value = objectType;
  currentObject.value = object;
  const _base_position = graphInstance.getBoundingClientRect();
  console.log('showNodeMenus:', $event, _base_position);
  isShowNodeTipsPanel.value = true;
  const mouseEvent = $event as MouseEvent;
  nodeMenuPanelPosition.value.x = mouseEvent.clientX - _base_position.x + 10;
  nodeMenuPanelPosition.value.y = mouseEvent.clientY - _base_position.y + 10;
  const hideContentMenu = () => {
    isShowNodeTipsPanel.value = false;
    document.body.removeEventListener('click', hideContentMenu);
  };
  document.body.addEventListener('click', hideContentMenu);
}
const addNode = ($event:MouseEvent|TouchEvent) => {
  const graphInstance = graphRef.value!.getInstance();
  const _base_position = graphInstance.getBoundingClientRect();
  const canvasCoordinate = graphInstance.getCanvasCoordinateByClientCoordinate({
    x: nodeMenuPanelPosition.value.x - 10 + _base_position.x,
    y: nodeMenuPanelPosition.value.y - 10 + _base_position.y
  });
  const newId = newNodeIdIndex.value++;
  graphInstance.addNodes([{
    id: 'addFromCanvas-' + newId,
    text: 'New-' + newId,
    color: '#5da0f8',
    x: canvasCoordinate.x,
    y: canvasCoordinate.y
  }]);
}
const deleteNode = ($event:MouseEvent|TouchEvent) => {
  const graphInstance = graphRef.value!.getInstance();
  graphInstance.removeNodeById(currentObject.value.id);
}
const deleteLink = ($event:MouseEvent|TouchEvent) => {
  const graphInstance = graphRef.value!.getInstance();
  const currentLink = currentObject.value as RGLink;
  graphInstance.removeLinkById(currentLink.seeks_id);
}
const createLineFromNode = (e:MouseEvent|TouchEvent) => {
  const graphInstance = graphRef.value!.getInstance();
  graphInstance.startCreatingLinePlot(e, {
    template: {
      from: '',
      to: '',
      lineWidth: 3,
      color: '#e85f84',
      text: '新连线'
    },
    fromNode: currentObject.value,
    onCreateLine: (from:RGNode, to:RGNode|RGPosition, template: JsonLine) => {
      const toNode = to as RGNode;
      console.log('新增连线：', from, to);
      if (toNode.id) { // 创建的连线的起点一定是节点，但终点可以是空白处，终点没有选择成节点时to不是一个节点，to.id不会有值，这里做了判断，只处理to为节点的情况
        const newLineId = newLineIdIndex.value++;
        graphInstance.addLines([{
          from: from.id,
          to: toNode.id,
          lineWidth: 3,
          color: '#e85f84',
          text: '新连线' + newLineId
        }]);
      }
    }
  });
}
</script>
<style scoped>
.c-node-menu-item{
  line-height: 30px;padding-left: 10px;cursor: pointer;color: #444444;font-size: 14px;border-top:#efefef solid 1px;
}
.c-node-menu-item:hover{
  background-color: rgba(66,187,66,0.2);
}
.c-object-info{
  line-height: 18px;padding-left: 10px;color: #888888;font-size: 12px;
}
.c-right-menu-panel{
  z-index: 999;padding:10px;background-color: #ffffff;border:#eeeeee solid 1px;box-shadow: 0px 0px 8px #cccccc;position: absolute;
  border-radius: 10px;
  width:200px;
}
</style>
