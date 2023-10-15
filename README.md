<img src="doc/relation-graph-yellow-small.png" width="60" />

---

**relation-graph** 支持Vue2、Vue3、React、PC & 移动端 的关系图谱展示组件，支持通过【插槽】让使用者用【html+css编写的vue/react组件】来完全自定义图形元素，使用css样式/动画来完全自定义样式效果。让你快速构建可交互的复杂图形应用。

这个项目不仅使用起来简单方便，代码也使用典型的Vue/React编程方式，代码简单易懂。 如果需要实现一些自定义的高级功能，你可以直接使用源码作为一个component放到你的项目中去用，轻松、任意的修改。

---
**relation-graph** is a relationship graph display component that supports Vue2, Vue3, React.
Allowing you to fully customize the graphical elements using HTML/CSS and Vue or React components through slots.

This project is not only easy to use, but the code also follows the typical Vue/React programming style, making it simple and understandable. If you need to implement some custom advanced features, you can directly use the source code as a component in your project, allowing for easy and flexible modifications.

---

#### Docs & Examples  文档 & 示例：

[https://relation-graph.com](https://relation-graph.com)  （国内用户，无需科学上网）

[https://relation-graph.github.io](https://seeksdream.github.io)（For regions outside of China）

上面的网站中包含使用文档、在线demo，以及可视化的配置工具。

The website above includes documentation, online demos, and a visual configuration tool for software developers.


---

#### Example Projects  完整的示例代码：
```shell
#（以下为Vue2示例代码，如果你使用的是Vue3或者React）

Vue3完整小示例：https://github.com/seeksdream/relation-graph-vue3-demo
React完整小示例：https://github.com/seeksdream/relation-graph-react-demo
vue2完整小示例：https://github.com/seeksdream/relation-graph-vue2-demo
```

#### Getting Started  快速使用：

```shell script
npm install --save relation-graph
```
```shell script
# 注意：relation-graph支持Vue2、Vue3、React, 引入的包名称都是"relation-graph"
# 
# 但在使用时，根据你的环境，需要引入不同的名称
# Vue2： import RelationGraph from 'relation-graph'
# Vue3： import RelationGraph from 'relation-graph/vue3'
# React： import RelationGraph from 'relation-graph/react'
```

```vue
<template>
  <div>
    <div style="height:calc(100vh - 50px);">
      <RelationGraph
        ref="graphRef"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
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
        // 这里可以参考"Graph 图谱"中的参数进行设置:https://relation-graph.com/#/docs/graph
      }
    }
  },
  mounted() {
    this.showGraph()
  },
  methods: {
    showGraph() {
      var graphData = {
        rootId: 'a',
        nodes: [
          // node配置选项：https://relation-graph.com/#/docs/node
          // node支持通过插槽slot完全自定义，示例：https://relation-graph.com/#/demo/adv-slot
          { id: 'a', text: 'A', borderColor: 'yellow' },
          { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
          { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
          { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
        ],
        lines: [
          // link配置选项：https://relation-graph.com/#/docs/link
          { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
          { from: 'a', to: 'c', text: '关系2' },
          { from: 'a', to: 'e', text: '关系3' },
          { from: 'b', to: 'e', color: '#67C23A' }
        ]
      }
      this.$refs.graphRef.setJsonData(graphData, (seeksRGGraph) => {
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


#### 上面代码的效果：
![简单示例效果图](doc/images/relation-graph-simple.png)

#### 更多示例图：
![简单示例效果图](doc/images/d1.png)


##基本


![线条样式](doc/demo-images/line.gif)

![节点高级用法-插槽](doc/demo-images/adv-slot2.gif)

![线条高级用法](doc/demo-images/lineAdv.gif)

![线条高级用法-插槽](doc/demo-images/adv-line-slot.gif)


##布局

![树状布局(tree)](doc/demo-images/layout-tree.gif)

![tree-层级距离&节点距离](doc/demo-images/tree-distance.gif)

![中心布局(center)](doc/demo-images/layout-center.gif)

![center-层级距离设置](doc/demo-images/distance_coefficient.gif)

![力学布局(force)](doc/demo-images/layout-force.gif)

![手工设定坐标(fixed)](doc/demo-images/layout-diy.gif)


##使用场景

![双向树-数据与线条方向](doc/demo-images/bothway-tree-faq.gif)

![集团图谱](doc/demo-images/scene-group.gif)

![组织架构图谱](doc/demo-images/scene-org.gif)

![企业图谱](doc/demo-images/scene-company.gif)

![网络拓扑](doc/demo-images/scene-network.gif)

![人物关系网络](doc/demo-images/scene-relationship.gif)


##高级 & 交互

![自定义插槽slot/右键菜单](doc/demo-images/adv-slot.gif)

![其他插槽slot](doc/demo-images/adv-other-slot.gif)

![动态追加数据](doc/demo-images/adv-dynamic-data.gif)

![节点展开/收缩的用法](doc/demo-images/adv-expand.gif)

![默认是收缩起来的图谱](doc/demo-images/adv-expand-gradually.gif)

![节点筛选 & 关系筛选](doc/demo-images/adv-data-filter.gif)

![效果、控制](doc/demo-images/adv-effect.gif)

![节点/连线点击效果2](doc/demo-images/adv-effect2.gif)

![图谱大小调整相关](doc/demo-images/graph-resize.gif)


##更多示例：
![在图谱中分区域展示](doc/demo-images/area-set.gif)

![动态加载数据与重新布局](doc/demo-images/expand-button.gif)

![指定缩放比例](doc/demo-images/zoom.gif)

![展开/收缩 时动画效果](doc/demo-images/expand-animation.gif)

![展开/收缩 时动画效果2](doc/demo-images/expand-animation2.gif)

![展开/关闭所有](doc/demo-images/open-all-close-all.gif)

![禁用拖动、缩放画布；禁用拖动、选中节点](doc/demo-images/disable-effect.gif)

![自定义工具栏](doc/demo-images/custom-toolbar.gif)

![多个关系网](doc/demo-images/multi-group.gif)

![多个关系网 2](doc/demo-images/multi-group-2.gif)

![界面拖拽添加节点、关系](doc/demo-images/object-edit.gif)

![右键菜单创建节点、关系](doc/demo-images/create-object-from-menu.gif)

![布局切换事件](doc/demo-images/before-change-layout.gif)

![展开到指定层级](doc/demo-images/open-by-level.gif)

![全屏后依然可用的右键菜单](doc/demo-images/visible-stuff-in-fullscreen.gif)

![最短路径搜索](doc/demo-images/find-min-path.gif)

![自定义连线文字位置](doc/demo-images/line-text-position.gif)

![自定义箭头](doc/demo-images/diy-line-arrow.gif)

![自定义箭头2](doc/demo-images/diy-line-arrow2.gif)

![我的关系图](doc/demo-images/my-graph-app.gif)

![线条动画1](doc/demo-images/line-style-1.gif)

![线条动画2](doc/demo-images/line-style-2.gif)

![线条动画3](doc/demo-images/line-style-3.gif)

![线条动画4](doc/demo-images/line-style-4.gif)

![线条动画5](doc/demo-images/line-style-5.gif)


#### 完整的、可运行的示例项目：

vue2完整小示例：https://github.com/seeksdream/relation-graph-vue2-demo

vue3完整小示例：https://github.com/seeksdream/relation-graph-vue3-demo

React完整小示例：https://github.com/seeksdream/relation-graph-react-demo


*更多效果及使用方法：*

[http://relation-graph.com](http://relation-graph.com)  （国内用户，无需科学上网）

[https://seeksdream.github.io](https://seeksdream.github.io)（For regions outside of China）


**有问题可以加QQ：3235808353**



