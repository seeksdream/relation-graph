*relation-graph*
---

这是一个Vue关系图谱组件，可以展示如组织机构图谱、股权架构图谱、集团关系图谱等知识图谱，可提供多种图谱布局，包括树状布局、中心布局、力学布局自动布局等。


*详细使用方法、配置选项、在线demo，以及可视化的配置工具：*

http://relation-graph.com

---
*快速使用：*
```shell script
npm install --save relation-graph
```
```vue
<template>
   <div>
     <div style="height:calc(100vh - 50px);">
        <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
     </div>
   </div>
 </template>
 
 <script>
 import RelationGraph from 'relation-graph'
 export default {
   name: 'Demo',
   components: { RelationGraph },
   data() {
     return {
       graphOptions: {
         allowSwitchLineShape: true,
         allowSwitchJunctionPoint: true,
         defaultJunctionPoint: 'border'
         // 这里可以参考"Graph 图谱"中的参数进行设置
       }
     }
   },
   mounted() {
     this.showSeeksGraph()
   },
   methods: {
     showSeeksGraph(query) {
       var __graph_json_data = {
         rootId: 'a',
         nodes: [
           { id: 'a', text: 'A', borderColor: 'yellow' },
           { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
           { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
           { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
         ],
         links: [
           { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
           { from: 'a', to: 'c', text: '关系2' },
           { from: 'a', to: 'e', text: '关系3' },
           { from: 'b', to: 'e', color: '#67C23A' }
         ]
       }
       // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       console.log('onNodeClick:', nodeObject)
     },
     onLineClick(lineObject, $event) {
       console.log('onLineClick:', lineObject)
     }
   }
 }
 </script>
```
*上面代码的效果：*
![简单示例效果图](doc/relation-graph-simple.png)
![简单示例效果图](doc/images/d1.png)
![简单示例效果图](doc/images/d2.png)
![简单示例效果图](doc/images/d3.png)
![简单示例效果图](doc/images/d4.png)
![简单示例效果图](doc/images/d5.png)
![简单示例效果图](doc/images/d6.png)
![简单示例效果图](doc/images/d7.png)
![简单示例效果图](doc/images/d8.png)
![简单示例效果图](doc/images/d9.png)
![简单示例效果图](doc/images/d10.png)
![简单示例效果图](doc/images/d11.png)
![简单示例效果图](doc/images/d12.png)
![简单示例效果图](doc/images/d13.png)

*更多效果及使用方法：*
http://relation-graph.com


这个项目使用典型的vue编程方式，代码简单易懂，如果需要实现一些高级功能，你还可以直接使用源码作为一个component放到你的项目中去用，如果有一些优化或者新特性，欢迎提交pull request。

如果这个项目能帮到大家，有更多的人关注，后续我会开发用于小程序、react、angular的版本，以及基于canvas的实现。

有问题可以加QQ：3235808353，提bug、提建议、一起交流分享前端开发心得。


