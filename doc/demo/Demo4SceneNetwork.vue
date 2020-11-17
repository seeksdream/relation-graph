<template>
  <div>
    <div v-loading="g_loading" style="width: calc(100% - 2px);height:calc(100vh - 50px);">
      <SeeksRelationGraph ref="seeksRelationGraph" :options="userGraphOptions" />
    </div>
    <el-button type="success" class="c-show-code-button"><el-link href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4SceneNetwork.vue" target="_blank" style="color: #ffffff;">查看代码</el-link></el-button>
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
      userGraphOptions: {
        'backgrounImage': '',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'max_per_height': '60',
            'levelDistance': '200,300,200',
            'centerOffset_x': 300,
            'centerOffset_y': -100,
            'from': 'left'
          }
        ],
        'defaultNodeBorderWidth': 0,
        'defaultNodeShape': 1,
        'allowShowMiniNameFilter': false,
        'allowShowMiniToolBar': false,
        'defaultJunctionPoint': 'lr',
        'defaultLineShape': 2
      }
    }
  },
  created() {
  },
  mounted() {
    this.setGraphData()
  },
  methods: {
    setGraphData() {
      var __graph_json_data = {
        'nodes': [
          { 'text': '采集管理中心', 'id': 'centre', nodeShape: 0, width: 120, height: 120, junctionPoint: 'border', color: '#34A0CE' },
          { 'text': '《数据收集服务》<br> 2355条/分钟', 'id': 'data', nodeShape: 1, width: 330, height: 50, fixed: true, x: 0, y: 250 },
          { 'text': '《代理池服务》<br> 今日剩余：32020个', 'id': 'proxy', nodeShape: 1, width: 330, height: 50, fixed: true, x: 0, y: 350 },
          { 'text': '《采集任务分发服务》<br> 112个/分钟', 'id': 'task', nodeShape: 1, width: 330, height: 50, fixed: true, x: 0, y: 450, color: '#E6A23C' },
          { 'text': '程序调度服务', 'id': 'cron', nodeShape: 1, width: 130, height: 40, color: '#34A0CE' },
          { 'text': 'ExeSvr-01@10.0.0.201 | 最后响应：3秒前', 'id': 'exe-01', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-02@10.0.0.202 | 最后响应：5秒前', 'id': 'exe-02', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-03@10.0.0.203 | 最后响应：2秒前', 'id': 'exe-03', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-04@10.0.0.204 | 最后响应：4分钟前', 'id': 'exe-04', nodeShape: 1, width: 500, height: 35, color: '#34A0CE' },
          { 'text': 'ExeSvr-05@10.0.0.205 | 最后响应：2分钟前', 'id': 'exe-05', nodeShape: 1, width: 500, height: 35, color: '#34A0CE' },
          { 'text': 'ExeSvr-06@10.0.0.206 | 最后响应：3秒前', 'id': 'exe-06', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-07@10.0.0.207 | 最后响应：3秒前', 'id': 'exe-07', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-docker-01@10.0.0.211 | 最后响应：17天前', 'id': 'exe-08', nodeShape: 1, width: 500, height: 35, color: '#F56C6C' },
          { 'text': 'ExeSvr-docker-02@10.0.0.211 | 最后响应：3秒前', 'id': 'exe-09', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-docker-03@10.0.0.211 | 最后响应：3秒前', 'id': 'exe-10', nodeShape: 1, width: 500, height: 35 }
        ],
        'links': [
          { 'from': 'data', 'to': 'centre', 'text': null, isHideArrow: true },
          { 'from': 'proxy', 'to': 'centre', 'text': null, isHideArrow: true },
          { 'from': 'task', 'to': 'centre', 'text': null, isHideArrow: true },
          { 'from': 'centre', 'to': 'cron', 'text': null, isHideArrow: true },
          { 'from': 'cron', 'to': 'exe-01', 'text': null },
          { 'from': 'cron', 'to': 'exe-02', 'text': null },
          { 'from': 'cron', 'to': 'exe-03', 'text': null },
          { 'from': 'cron', 'to': 'exe-04', 'text': null },
          { 'from': 'cron', 'to': 'exe-05', 'text': null },
          { 'from': 'cron', 'to': 'exe-06', 'text': null },
          { 'from': 'cron', 'to': 'exe-07', 'text': null },
          { 'from': 'cron', 'to': 'exe-08', 'text': null },
          { 'from': 'cron', 'to': 'exe-09', 'text': null },
          { 'from': 'cron', 'to': 'exe-10', 'text': null }
        ]
      }
      setTimeout(function() {
        this.g_loading = false
        this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
          // 这些写上当图谱初始化完成后需要执行的代码
        })
      }.bind(this), 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
