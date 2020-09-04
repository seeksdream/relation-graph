*详细使用方法和在线demo，以及可视化的配置工具：*

http://relation-graph.com

---
*快速使用：*
---
```vue
<template>
   <div>
     <div style="height:calc(100vh - 50px);">
       <RelationGraph ref="seeksRelationGraph" :options="graphOptions" />
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
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     }
   }
 }
 </script>
```
*上面代码的效果：*
![RUNOOB 图标](doc/relation-graph-simple.png)
*更多效果及使用方法：*
http://relation-graph.com
