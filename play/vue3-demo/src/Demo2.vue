<template>
  <div>
    <img ref="$img" />
    <div class="relation-graph-model" style="border: #efefef solid 1px; height: calc(100vh - 50px);width: 100%;transform: rotate(90deg)">
      <RelationGraph ref="relationGraph$" :options="options">
        <template #node="{ node }">
          <div :class="'each-card'">
            <template v-if="Number(node.id) === houseOriginData.id">
              <template v-if="houseOriginData.cardNoList?.length">
                <div class="card-num-wrap">
                  <div class="num">
                    {{ houseOriginData.cardNoList?.length }}
                  </div>
                  <div class="line-1"></div>
                  <div class="line-2"></div>
                </div>
              </template>
              <div v-else class="not-get-wrap">
                <img class="not-get-icon" src="/img/card-not-get-icon.png" />
              </div>
            </template>
            <template v-else>
              <div v-if="node.data.cardNums" class="card-num-wrap">
                <div class="num">{{ node.data.cardNums }}</div>
                <div class="line-1"></div>
                <div class="line-2"></div>
              </div>
              <div v-else class="have-not"></div>
            </template>
            <img class="card-item" :src="node.data.picUrl" />
            <div class="card-name">{{ node.text }}</div>
          </div>
        </template>
      </RelationGraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// import RelationGraph from 'relation-graph/vue3'
import RelationGraph from '../relation-graph-agent'
import type { RGNode } from '../relation-graph-agent'
const relationGraph$ = ref()
const $img = ref()
const houseOriginData = {};
const options = {
  debug: false, // 是否使用编译模式
  showDebugPanel: true,
  // allowShowMiniToolBar: false, // 是否显示工具栏
  useAnimationWhenRefresh: true, // 刷新时使用动画
  placeSingleNode: true, // 为孤点分配位置
  // backgrounImage:
  //   'https://join.da.mgtv.com/act/card-web-static/img/card-house/house-bg.png', // 画布背景图
  // backgrounImageNoRepeat: true, // 背景图不重复
  defaultNodeShape: 1, // 默认的节点形状，0:圆形；1:矩形
  defaultNodeColor: 'transparent', // 默认的节点背景颜色
  defaultNodeFontColor: '#fff', // 默认的节点文字颜色
  defaultNodeBorderColor: '#fff', // 默认的节点边框颜色
  defaultNodeBorderWidth: 0, // 默认的节点边框粗细（像素）
  zoomToFitWhenRefresh: false, // 刷新时自动缩放到合适比例
  defaultFocusRootNode: false, // 默认选中根节点
  disableNodeClickEffect: true, // 禁用节点选中效果
  disableLineClickEffect: false, // 禁用线条选中效果
  moveToCenterWhenRefresh: false, // 展示图谱时居中
  isMoveByParentNode: false, // 是否在拖动节点后让子节点跟随: 需要禁用，因为加了定时器自动跟随
  layouts: [ // 自动跟随需要定时调用，详情见：https://github.com/seeksdream/relation-graph/issues/43
    {
      label: '自动',
      layoutName: 'center',
      layoutClassName: 'seeks-layout-center',
      force_node_repulsion: 0.6, // 全局设置，节点之间的斥力系数，默认为1，建议合理的取值范围:0.1 -- 10
      force_line_elastic: 0.6, // 全局设置，线条的牵引系数，默认为1, 建议合理的取值范围:0.1 -- 10
    }
  ],
  useHorizontalView: true
}
const left_and_right_force_elastic = 2;
const onMouseOverNode = (node: RGNode) => {
  console.log('----onMouseOverNode:', node.text);
}
const onMouseOutNode = (node: RGNode) => {
  console.log('----onMouseOutNode:', node.text);
}
onMounted(() => {
  const jsonData = {
    "rootId": "28",
    "nodes": [
      {
        "id": "28",
        "text": "光芒卡-谢之遥",
        force_weight: 10,
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "root-node",
        "opacity": 1,
        "fixed": false,
        "x": -30,
        "y": -45,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "picUrl": "https://ugc.hitv.com/14/23091509540547705dbd43655601cd6a1169098b4801/DSG92a0.jpeg",
          "id": 28,
          "cardHouseName": "谢之遥-所需6张星芒卡",
          "totalNum": 100,
          "collectedNum": 5,
          "cardHouseNum": 6,
          "gloryCardId": 388,
          "cardNoList": [],
          "gloryCardName": "光芒卡-谢之遥",
          "cardHouseCardDetailList": [
            {
              "cardId": 9,
              "cardName": "谢之遥",
              "picUrl": "https://ugc.hitv.com/14/23022715051947705dbd43655601cd6a1169098b4801/M6CkmK0.jpeg",
              "cardLvId": 4,
              "relation": "11",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 42,
                  "taskName": "系统2"
                }
              ],
              "cardNums": 0
            },
            {
              "cardId": 15,
              "cardName": "大张伟",
              "picUrl": "https://ugc.hitv.com/14/23030614525247705dbd43655601cd6a1169098b4801/CwweYG0.jpg",
              "cardLvId": 4,
              "relation": "22",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 42,
                  "taskName": "系统2"
                }
              ],
              "cardNums": 1
            },
            {
              "cardId": 22,
              "cardName": "罗予欣",
              "picUrl": "https://ugc.hitv.com/14/23031122171247705dbd43655601cd6a1169098b4801/BJg2Lj0.jpg",
              "cardLvId": 4,
              "relation": "33",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 41,
                  "taskName": "获取卡牌任"
                }
              ],
              "cardNums": 1
            },
            {
              "cardId": 23,
              "cardName": "文韬",
              "picUrl": "https://ugc.hitv.com/14/23031122183247705dbd43655601cd6a1169098b4801/no9FNQ0.jpeg",
              "cardLvId": 4,
              "relation": "44",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 41,
                  "taskName": "获取卡牌任"
                }
              ],
              "cardNums": 2
            },
            {
              "cardId": 24,
              "cardName": "齐思钧",
              "picUrl": "https://ugc.hitv.com/14/23031122214747705dbd43655601cd6a1169098b4801/ffpaRj0.jpg",
              "cardLvId": 4,
              "relation": "55",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 47,
                  "taskName": "福袋获取卡"
                },
                {
                  "taskId": 35,
                  "taskName": "卡牌系统1"
                },
                {
                  "taskId": 41,
                  "taskName": "获取卡牌任"
                }
              ],
              "cardNums": 0
            },
            {
              "cardId": 13,
              "cardName": "声声",
              "picUrl": "https://ugc.hitv.com/14/23030210223447705dbd43655601cd6a1169098b4801/6eTRqK0.png",
              "cardLvId": 4,
              "relation": "66",
              "relationDesc": "",
              "taskList": [
                {
                  "taskId": 42,
                  "taskName": "系统2"
                }
              ],
              "cardNums": 0
            }
          ],
          "upTotalNum": 6,
          "upCollectedNum": 3,
          "prize": null
        },
        "isShow": true
      },
      {
        "id": "28_9_4",
        "text": "谢之遥",
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": 77.99999999999999,
        "y": -234.13328398716325,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 9,
          "cardName": "谢之遥",
          "picUrl": "https://ugc.hitv.com/14/23022715051947705dbd43655601cd6a1169098b4801/M6CkmK0.jpeg",
          "cardLvId": 4,
          "relation": "11",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 0
        },
        "isShow": true
      },
      {
        "id": "28_15_4",
        "text": "大张伟",
        force_weight: 1,
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": 188,
        "y": -45.000000000000014,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 15,
          "cardName": "大张伟",
          "picUrl": "https://ugc.hitv.com/14/23030614525247705dbd43655601cd6a1169098b4801/CwweYG0.jpg",
          "cardLvId": 4,
          "relation": "22",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 1
        },
        "isShow": true
      },
      {
        "id": "28_22_4",
        "text": "罗予欣",
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": 77.99999999999999,
        "y": 144.13328398716325,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 22,
          "cardName": "罗予欣",
          "picUrl": "https://ugc.hitv.com/14/23031122171247705dbd43655601cd6a1169098b4801/BJg2Lj0.jpg",
          "cardLvId": 4,
          "relation": "33",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 1
        },
        "isShow": true
      },
      {
        "id": "28_23_4",
        "text": "文韬",
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": -138.00000000000003,
        "y": 144.13328398716322,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 23,
          "cardName": "文韬",
          "picUrl": "https://ugc.hitv.com/14/23031122183247705dbd43655601cd6a1169098b4801/no9FNQ0.jpeg",
          "cardLvId": 4,
          "relation": "44",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 2
        },
        "isShow": true
      },
      {
        "id": "28_24_4",
        "text": "齐思钧",
        force_weight: 1,
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": -248,
        "y": -44.999999999999964,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 24,
          "cardName": "齐思钧",
          "picUrl": "https://ugc.hitv.com/14/23031122214747705dbd43655601cd6a1169098b4801/ffpaRj0.jpg",
          "cardLvId": 4,
          "relation": "55",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 47,
              "taskName": "福袋获取卡"
            },
            {
              "taskId": 35,
              "taskName": "卡牌系统1"
            },
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 0
        },
        "isShow": true
      },
      {
        "id": "28_13_4",
        "text": "声声",
        "isHide": false,
        "expanded": true,
        "selected": false,
        "styleClass": "",
        "opacity": 1,
        "fixed": false,
        "x": -138.00000000000009,
        "y": -234.13328398716317,
        "offset_x": 0,
        "offset_y": 0,
        "disableDrag": false,
        "singleNode": false,
        "data": {
          "cardId": 13,
          "cardName": "声声",
          "picUrl": "https://ugc.hitv.com/14/23030210223447705dbd43655601cd6a1169098b4801/6eTRqK0.png",
          "cardLvId": 4,
          "relation": "66",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 0
        },
        "isShow": true
      }
    ],
    "lines": [
      {
        "seeks_id": "2-3-0",
        "from": "28",
        "to": "28_9_4",
        "text": "11",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 9,
          "cardName": "谢之遥",
          "picUrl": "https://ugc.hitv.com/14/23022715051947705dbd43655601cd6a1169098b4801/M6CkmK0.jpeg",
          "cardLvId": 4,
          "relation": "11",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 0
        }
      },
      {
        "seeks_id": "2-4-0",
        "from": "28",
        "to": "28_15_4",
        force_elastic: left_and_right_force_elastic,
        "text": "22",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 15,
          "cardName": "大张伟",
          "picUrl": "https://ugc.hitv.com/14/23030614525247705dbd43655601cd6a1169098b4801/CwweYG0.jpg",
          "cardLvId": 4,
          "relation": "22",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 1
        }
      },
      {
        "seeks_id": "2-5-0",
        "from": "28",
        "to": "28_22_4",
        "text": "33",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 22,
          "cardName": "罗予欣",
          "picUrl": "https://ugc.hitv.com/14/23031122171247705dbd43655601cd6a1169098b4801/BJg2Lj0.jpg",
          "cardLvId": 4,
          "relation": "33",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 1
        }
      },
      {
        "seeks_id": "2-6-0",
        "from": "28",
        "to": "28_23_4",
        "text": "44",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 23,
          "cardName": "文韬",
          "picUrl": "https://ugc.hitv.com/14/23031122183247705dbd43655601cd6a1169098b4801/no9FNQ0.jpeg",
          "cardLvId": 4,
          "relation": "44",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 2
        }
      },
      {
        "seeks_id": "2-7-0",
        "from": "28",
        "to": "28_24_4",
        force_elastic: left_and_right_force_elastic,
        "text": "55",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 24,
          "cardName": "齐思钧",
          "picUrl": "https://ugc.hitv.com/14/23031122214747705dbd43655601cd6a1169098b4801/ffpaRj0.jpg",
          "cardLvId": 4,
          "relation": "55",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 47,
              "taskName": "福袋获取卡"
            },
            {
              "taskId": 35,
              "taskName": "卡牌系统1"
            },
            {
              "taskId": 41,
              "taskName": "获取卡牌任"
            }
          ],
          "cardNums": 0
        }
      },
      {
        "seeks_id": "2-8-0",
        "from": "28",
        "to": "28_13_4",
        "text": "66",
        "opacity": 1,
        "isHide": false,
        "showStartArrow": false,
        "disableDefaultClickEffect": false,
        "showEndArrow": false,
        "useTextPath": false,
        "isHideArrow": false,
        "data": {
          "cardId": 13,
          "cardName": "声声",
          "picUrl": "https://ugc.hitv.com/14/23030210223447705dbd43655601cd6a1169098b4801/6eTRqK0.png",
          "cardLvId": 4,
          "relation": "66",
          "relationDesc": "",
          "taskList": [
            {
              "taskId": 42,
              "taskName": "系统2"
            }
          ],
          "cardNums": 0
        }
      }
    ]
  }
  const normalNodeWidth = 120;
  const normalNodeHeight = 180;
  jsonData.nodes.forEach(n => {
    n.width = normalNodeWidth;
    n.height = normalNodeHeight;
  })
  const rootNode = jsonData.nodes.find(n => n.id === jsonData.rootId);
  rootNode.width = normalNodeWidth * 1.5;
  rootNode.height = normalNodeHeight * 1.5;
  relationGraph$.value.setJsonData(jsonData, (rgInstance) => {
    console.log('setJsonData ok:', rgInstance.options.instanceId);
    setTimeout(async () => {
      rgInstance.startAutoLayout();
    }, 500)
  })
})

</script>

<style scoped lang="scss">
.relation-graph-model {
  position: relative;
  width: 100%;
  height: 100%;

  :deep(.rel-map) {
    background: transparent;
  }

  :deep(.rel-node-peel) {
    padding: 0;
  }

  :deep(.rel-node) {
    // width: 120px;
    // height: 220px;
  }

  :deep(.root-node) {
    .each-card {
      //transform: scale(2) translateY(0);
      //transform-origin: center;
      .card-name {
        top: 180px;
        transform: scale(0.5) translateX(-100%);
      }

      .notice {
        top: 200px;
        transform: scale(0.5) translateX(-100%);
      }

      .card-num-wrap {
        right: -5px;
        top: -5px;
        transform: scale(0.5);
      }
    }

    .card-name {
      width: 240px;
    }
  }
  .each-card {
    position: relative;
    z-index: 1;
    //width: 120px;
    //height: 180px;
    width:100%;
    height:100%;
    text-align: left;
    background-size: 100% 100%;
    overflow: hidden;
    border-radius: 10px;
    .card-item {
      position: relative;
      z-index: 10;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    .card-name {
      position: absolute;
      z-index: 1;
      top: 190px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      white-space: nowrap;
      text-align: center;
    }

    .notice {
      // width: 156px;
      // height: 32px;
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
    }

    .have-not {
      position: absolute;
      z-index: 20;
      top: 0;
      left: 0;
      width: 120px;
      height: 180px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  :deep(.seeks-layout-center) {
    // background-size: 1780px 1623px;
    background-size: auto 100%;
    background-position: center;
  }
}

.card-num-wrap {
  position: absolute;
  z-index: 20;
  top: 4px;
  right: 4px;
  .num {
    padding: 0 6px;
    min-width: 28px;
    height: 28px;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .line-1 {
    margin-top: 2px;
    width: 24px;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }

  .line-2 {
    margin-top: 2px;
    width: 20px;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
  }
}

.not-get-wrap {
  position: absolute;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);

  .not-get-icon {
    width: 37%;
  }
}
</style>

