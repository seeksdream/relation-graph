<a href="http://relation-graph.com" target="_blank"><img src="http://relation-graph.com/website/logo" width="60" /></a>

*relation-graph*
---
当前版本：v2.0.12 (支持vue2和vue3)

----
**2023-02-19 最新版本v2.0.12起开始支持vue3**

vue2使用方法： import RelationGraph from 'relation-graph'

vue3使用方法： import RelationGraph from 'relation-graph/vue3'

vue3完整小示例：https://github.com/seeksdream/relation-graph-vue3-demo


---

这是一个Vue关系图谱组件，可以展示如组织机构图谱、股权架构图谱、集团关系图谱等知识图谱，可提供多种图谱布局，包括树状布局、中心布局、力学布局自动布局等。

这个项目使用典型的vue编程方式，代码简单易懂。如果需要实现一些自定义的高级功能，你可以直接使用源码作为一个component放到你的项目中去用，轻松、任意的修改。

*详细使用方法、配置选项、在线demo，以及可视化的配置工具，可以访问这个网址：*

[http://relation-graph.com](http://relation-graph.com)  （国内用户，无需科学上网）

[https://seeksdream.github.io](https://seeksdream.github.io)（For regions outside of China）

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
         // 这里可以参考"Graph 图谱"中的参数进行设置:http://relation-graph.com/#/docs/graph
       }
     }
   },
   mounted() {
     this.showSeeksGraph()
   },
   methods: {
     showSeeksGraph() {
       var __graph_json_data = {
         rootId: 'a',
         nodes: [
            // node配置选项：http://relation-graph.com/#/docs/node
            // node支持通过插槽slot完全自定义，示例：http://relation-graph.com/#/demo/adv-slot
           { id: 'a', text: 'A', borderColor: 'yellow' },
           { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
           { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
           { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
         ],
         lines: [
            // link配置选项：http://relation-graph.com/#/docs/link
           { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
           { from: 'a', to: 'c', text: '关系2' },
           { from: 'a', to: 'e', text: '关系3' },
           { from: 'b', to: 'e', color: '#67C23A' }
         ]
       }
       this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
         // Called when the relation-graph is completed 
       })
     },
     onNodeClick(nodeObject, $event) {
       console.log('onNodeClick:', nodeObject)
     },
     onLineClick(linkObject, $event) {
       console.log('onLineClick:', linkObject)
     }
   }
 }
 </script>
```

完整的、可运行的示例项目：

https://github.com/seeksdream/relation-graph-vue2-demo



*上面代码的效果：*
![简单示例效果图](doc/images/relation-graph-simple.png)
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

[http://relation-graph.com](http://relation-graph.com)  （国内用户，无需科学上网）

[https://seeksdream.github.io](https://seeksdream.github.io)（For regions outside of China）

---

**最新版本v2.0.3：**

修改问题：
* 对v1.x代码重构，结构更清晰，方便大家修改，欢迎一起完善
* 处理了很多issues，解决不少问题
* 修改了线条文字的展示方式，现在线条文字会跟随线条轨迹走
* 新增线条插槽
* 新增画布插槽

这个项目使用典型的vue编程方式，代码简单易懂，如果需要实现一些高级功能，你还可以直接使用源码作为一个component放到你的项目中去用，如果有一些优化或者新特性，欢迎提交pull request。

如果这个项目能帮到大家，有更多的人关注，后续我会开发用于小程序、react、angular的版本，以及基于canvas的实现。

**有问题可以加QQ：3235808353，提bug、提建议、一起交流分享前端开发心得，第一获取新版本发布消息。**


