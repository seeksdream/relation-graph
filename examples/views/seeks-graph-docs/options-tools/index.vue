<template>
  <div>
    <rg-header title="Relation Graph 配置工具" />
    <div style="clear:both;">
      <el-tabs v-if="userGraphOptions" v-model="checkedTab" type="card" style="border-bottom:0px;margin-top:0px;margin:5px;">
        <el-tab-pane label="配置" name="配置" />
        <el-tab-pane label="数据" name="数据" />
        <el-tab-pane label="界面化配置 & 预览" name="预览" />
      </el-tabs>
      <div style="padding-left:10px;padding-right:10px;">
        <div v-show="checkedTab !== '预览'" style="padding:10px;">
          <el-button type="primary" icon="el-icon-success" @click="applyUserOptionAndData">预览"配置"和"数据"</el-button>
        </div>
        <textarea v-show="checkedTab === '配置'" v-model="option_string" type="textarea" class="c-textarea" style="" />
        <textarea v-show="checkedTab === '数据'" v-model="data_json_string" type="textarea" class="c-textarea" style="" />
      </div>
      <div v-show="checkedTab === '预览'" style="margin-top:-5px;">
        <div style="float:left;width: 500px;height:calc(100vh - 100px);overflow: auto;background-color: #ffffff;">
          <div style="font-size:12px;background-color:#67C23A;line-height:30px;padding:5px;border-radius:5px;color:#ffffff;padding-left:10px;margin:10px;opacity: 0.8;">
            <i class="el-icon-info" /> 通过以下UI界面更改图谱设置后，配置内容会同步到【配置】文本框中：
          </div>
          <OptionsView ref="optionView" :on-options-change="onOptionsChange" />
        </div>
        <div style="float:right;width: calc(100vw - 520px);height:calc(100vh - 100px);background-color: #4dd9d5;border:#ff0000 solid 0px;">
          <div v-if="g_loading" style="text-align: center;line-height: 800px;">数据加载中...</div>
          <SeeksRelationGraph v-if="userGraphOptions" ref="seeksRelationGraph" :options="userGraphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
        </div>
      </div>
    </div>
    <el-drawer
      title="node option:"
      direction="ltr"
      custom-class="c-drawer-window"
      :modal="false"
      :visible.sync="isShowNodeOptionPanel"
      :with-header="false"
    >
      <NodeView ref="nodeView" :on-node-change="onNodeChange" />
    </el-drawer>
    <el-drawer
      title="link option:"
      direction="ltr"
      custom-class="c-drawer-window"
      :modal="false"
      :visible.sync="isShowLineOptionPanel"
      :with-header="false"
    >
      <LinkView ref="linkView" :on-line-change="onLineChange" :on-add-line="onAddLine" />
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import RgHeader from '../rg-header';
import LinkView from './components/link-view';
import NodeView from './components/node-view';
import OptionsView from './components/options-view';
import { appendDefaultOptions4Layout, createDefaultConfig } from '@/models/RGOptions';
import { getGraphData, getGraphOptions } from './data';

export default {
  name: 'SeeksRelationGraphDemo',
  components: { RgHeader, LinkView, NodeView, OptionsView },
  data() {
    return {
      checkedTab: '预览',
      option_string: '',
      data_json_string: '',
      isShowNodeOptionPanel: false,
      isShowLineOptionPanel: false,
      userGraphOptions: null,
      g_loading: true
    };
  },
  computed: mapState({
  }),
  created() {
  },
  mounted() {
    this.initAll();
  },
  methods: {
    initAll() {
      try {
        this.option_string = getGraphOptions();
        this.data_json_string = getGraphData();
      } catch (e) {
        this.$message('无法解析的graphOptions');
        return;
      }
      this.resetGraphOptions();
    },
    resetGraphOptions() {
      const new_options = JSON.parse(this.option_string);
      const userGraphOptions = createDefaultConfig(new_options);
      this.userGraphOptions = userGraphOptions;
      this.$refs.optionView.setOptions(this.userGraphOptions);
      setTimeout(() => {
        this.g_loading = false;
        console.log('options update:final:_new_options:', this.userGraphOptions);
        this.$refs.seeksRelationGraph.setOptions(this.userGraphOptions, (seeksRGGraph) => {
          this.initData();
        });
      }, 500);
    },
    initData(disableEffict) {
      const json_data = JSON.parse(this.data_json_string);
      this.data_json_string = JSON.stringify(json_data, null, 2);
      const graphInstance = this.$refs.seeksRelationGraph.getInstance();
      if (disableEffict) {
        // graphInstance.options.moveToCenterWhenRefresh = false;
        // graphInstance.options.zoomToFitWhenRefresh = false;
        graphInstance.resetViewSizeWhenSetData = false;
        graphInstance.setJsonData(json_data, (seeksRGGraph) => {
          // seeksRGGraph.doLayout()
        });
      } else {
        // graphInstance.options.moveToCenterWhenRefresh = true;
        // graphInstance.options.zoomToFitWhenRefresh = true;
        this.$refs.seeksRelationGraph.setJsonData(json_data, (seeksRGGraph) => {
          // seeksRGGraph.doLayout()
        });
      }
    },
    applyUserOptionAndData() {
      try {
        JSON.parse(this.option_string);
      } catch (e) {
        this.$message('无法解析的配置选项，请检查格式!');
        return;
      }
      try {
        JSON.parse(this.data_json_string);
      } catch (e) {
        this.$message('无法解析的数据，请检查格式!');
        return;
      }
      this.checkedTab = '预览';
      this.$nextTick(() => {
        this.resetGraphOptions();
      });
    },
    onOptionsChange(newOptions) {
      // TODO check options and data format
      console.log('onOptionsChange', newOptions);
      const easyOptions = this.getEasyOptions(newOptions);
      this.option_string = JSON.stringify(easyOptions, null, 2);
      this.resetGraphOptions();
    },
    getEasyOptions(fullOptions) {
      const _ignore_keys = ['canvasOffset', 'canvasSize', 'canvasNVInfo', 'viewNVInfo', 'viewELSize', 'viewSize', 'canvasZoom', 'isNeedShowAutoLayoutButton',
        'autoLayouting', 'layoutDirection', 'layoutClassName', 'layoutName', 'layoutLabel', 'showSingleNode', 'showNodeShortLabel',
        'instanceId', 'debug', 'fullscreen', 'checkedNodeId', 'checkedLineId'];
      const optionsWithDefaultValue = createDefaultConfig({});
      const easyOptions = {};
      Object.keys(fullOptions).forEach(thisKey => {
        if (_ignore_keys.indexOf(thisKey) === -1) {
          const _default_value = optionsWithDefaultValue[thisKey];
          const _new_value = fullOptions[thisKey];
          if (typeof _new_value === 'function') {
            // do nothing
          } else if (typeof _new_value === 'object') {
            if (thisKey === 'layouts') {
              const _layouts = [];
              _new_value.forEach((thisLayout, _index) => {
                const thisLayoutTemp = {
                  label: thisLayout.label,
                  layoutName: thisLayout.layoutName,
                  layoutClassName: thisLayout.layoutClassName
                };
                console.log('update layout:current:', thisLayout, 'default:', thisLayoutTemp, 'this.currentLayout:', this.currentLayout);
                appendDefaultOptions4Layout(thisLayoutTemp, easyOptions);
                console.log('options update:layout[' + _index + ']diff:', thisLayout, thisLayoutTemp);
                const thisLayoutCore = {
                  label: thisLayout.label,
                  layoutName: thisLayout.layoutName,
                  layoutClassName: thisLayout.layoutClassName
                };
                  // this.mergeOptions(thisLayoutCore, thisLayoutTemp, null, null, 'layout[' + _index + ']')
                Object.keys(thisLayoutTemp).forEach(thisSubKey => {
                  if (thisSubKey !== 'layoutDirection' && JSON.stringify(thisLayout[thisSubKey]) !== JSON.stringify(thisLayoutTemp[thisSubKey])) {
                    console.log('options update:layout[' + _index + '].' + thisSubKey, thisLayout[thisSubKey], thisLayoutTemp[thisSubKey]);
                    thisLayoutCore[thisSubKey] = thisLayout[thisSubKey];
                  }
                });
                if (thisLayoutCore.layoutName === 'center') {
                  if (thisLayoutCore['distance_coefficient'] === undefined) thisLayoutCore['distance_coefficient'] = thisLayout['distance_coefficient'] || 1;
                }
                _layouts.push(thisLayoutCore);
              });
              easyOptions[thisKey] = _layouts;
            } else {
              if (JSON.stringify(_default_value) !== JSON.stringify(_new_value)) {
                easyOptions[thisKey] = _new_value;
              }
            }
          } else {
            if (_default_value !== _new_value) {
              easyOptions[thisKey] = _new_value;
              console.log('option:' + thisKey, ' = ', _new_value);
            }
          }
        }
      });
      return easyOptions;
    },
    onNodeClick(node) {
      console.log('onNodeClick:', node, this.$refs.nodeView);
      this.isShowNodeOptionPanel = true;
      this.$nextTick(() => {
        this.$refs.nodeView.setNode(node);
      });
    },
    onLineClick(line) {
      console.log('onLineClick:', line);
      this.isShowLineOptionPanel = true;
      this.$nextTick(() => {
        this.$refs.linkView.setLink(line);
      });
    },
    onNodeChange(jsonNode) {
      console.log('onNodeChange', jsonNode);
      const json_data = JSON.parse(this.data_json_string);
      json_data.nodes.forEach(node => {
        if (node.id === jsonNode.id) {
          Object.assign(node, jsonNode);
        }
      });
      this.data_json_string = JSON.stringify(json_data, null, 2);
      this.initData(true);
    },
    onLineChange(lineJson, lineIndex) {
      console.log('onLineChange', lineJson, lineIndex);
      const json_data = JSON.parse(this.data_json_string);
      let matchedIndex = 0;
      const lines = json_data.lines || json_data.links;
      lines.forEach(line => {
        if (
          (line.from === lineJson.from && line.to === lineJson.to) ||
            (line.from === lineJson.to && line.to === lineJson.from)
        ) {
          if (matchedIndex === lineIndex) {
            Object.assign(line, lineJson);
          }
          matchedIndex++;
        }
      });
      this.data_json_string = JSON.stringify(json_data, null, 2);
      this.initData(true);
    },
    onAddLine(lineJson) {
      console.log('onAddLine', lineJson);
      const json_data = JSON.parse(this.data_json_string);
      const lines = json_data.lines || json_data.links;
      lines.push(lineJson);
      this.data_json_string = JSON.stringify(json_data, null, 2);
      this.initData(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .c-textarea{
    height:calc(100vh - 180px);width:100%;font-size:12px;
    border:#efefef solid 1px;
    background-color: rgba(255,245,187,0.5);
  }
  /deep/ .el-tabs__header{
    margin: 0px;
  }
</style>
