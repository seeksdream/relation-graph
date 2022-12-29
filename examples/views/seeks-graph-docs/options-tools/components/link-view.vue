<template>
  <div>
    <div v-if="currentLink" style="height:calc(100vh);overflow:auto;">
      <div style="padding:20px;font-size:12px;color:#666666;">
        <el-input v-model="currentLink.toNode.id" disabled size="mini" style="width:160px;" />
        与
        <el-input v-model="currentLink.fromNode.id" disabled size="mini" style="width:160px;" />
        之间的所有关系：
      </div>
      <el-form label-width="170px" size="medium">
        <div style="line-height:30px;padding-left:10px;font-size:12px;padding-bottom:10px;color:#666666;background-color: #ffffff;">
          <el-button type="success" icon="el-icon-circle-plus" size="mini" @click="addNewLink()">添加</el-button>
        </div>
        <el-tabs v-model="currentLineIndex" style="border-bottom:0px;padding-left:10px;" type="card" @tab-click="switchCurrentLink">
          <el-tab-pane v-for="(thisLink, _link_index) in currentLines" :key="_link_index + ''" :label="'link-' + _link_index" :name="_link_index + ''" />
        </el-tabs>
        <el-form-item label="自定义样式名(class)">
          <el-input v-model="currentLine.styleClass" size="mini" style="width:270px;" @change="onlineOptionChanged" />
        </el-form-item>
        <el-form-item label="连线文字">
          <el-input v-model="currentLine.text" size="mini" style="width:270px;" @change="onlineOptionChanged" />
        </el-form-item>
        <el-form-item label="线条粗细">
          <el-radio-group v-model="currentLine.lineWidth" size="mini" @change="onlineOptionChanged">
            <!--              <el-radio-button :label="0">0</el-radio-button>-->
            <el-radio-button :label="1">1</el-radio-button>
            <el-radio-button :label="2">2</el-radio-button>
            <el-radio-button :label="3">3</el-radio-button>
            <el-radio-button :label="4">4</el-radio-button>
            <el-radio-button :label="5">5</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="线条颜色">
          <el-input v-model="currentLine.color" style="width:270px;" @change="onlineOptionChanged">
            <template slot="append">
              <el-color-picker v-model="currentLine.color" show-alpha size="mini" :predefine="predefineColors" @change="onlineOptionChanged" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="线条形状">
          <el-radio-group v-model="currentLine.lineShape" size="mini" @change="onlineOptionChanged">
            <el-radio-button :label="1">直线</el-radio-button>
            <el-radio-button :label="2">简洁</el-radio-button>
            <el-radio-button :label="3">生动</el-radio-button>
            <el-radio-button :label="5">鱼尾</el-radio-button>
            <el-radio-button :label="4">折线</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="currentLine.fontColor" style="width:270px;" @change="onlineOptionChanged">
            <template slot="append">
              <el-color-picker v-model="currentLine.fontColor" show-alpha size="mini" :predefine="predefineColors" @change="onlineOptionChanged" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="反向">
          <el-switch v-model="currentLine.isReverse" @change="onlineOptionChanged" />
        </el-form-item>
        <el-form-item label="隐藏箭头">
          <el-switch v-model="currentLine.isHideArrow" @change="onlineOptionChanged" />
        </el-form-item>
        <el-form-item label="data">
          <div style="padding:0px;padding-right:10px;">
            <pre style="color:#444444;font-size:12px;padding:8px;border-radius:5px;border:1px solid #efefef;line-height:14px;">{{ JSON.stringify(currentLine.data, null, 2) }}</pre>
          </div>
        </el-form-item>
      </el-form>
      <div style="padding:20px;padding-top:0px;">
        <div style="font-size:12px;color:#444444;line-height:30px;padding-left:20px;">
          当前关系的属性:
        </div>
        <pre style="color:#444444;font-size:12px;padding:10px;border-radius:10px;border:1px solid #efefef;line-height:14px;">{{ currentLinkJsonString }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { json2Line } from '@/models/RGLink';
import { predefineColors, predefineColorsBorder } from '../data';

export default {
  name: 'SeeksRelationGraphDemo',
  components: { },
  props: {
    onLineChange: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    },
    onAddLine: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    }
  },
  data() {
    return {
      currentLink: null,
      currentLinkJsonString: null,
      currentLines: [],
      currentLineIndex: '0',
      currentLine: null,
      predefineColors,
      predefineColorsBorder
    };
  },
  computed: mapState({
  }),
  created() {
  },
  mounted() {
  },
  methods: {
    setLink(link) {
      const jsonLink = this.getLinkOptions(link);
      this.currentLink = link;
      this.currentLinkJsonString = JSON.stringify(jsonLink, null, 2);

      this.currentLines = this.currentLink.relations;
      console.log('currentLines:', this.currentLines);
      this.currentLineIndex = '0';
      this.currentLine = this.currentLines[0];
      const _line_json = this.getLinkOptions(this.currentLink);
      _line_json['from'] = this.currentLink.fromNode.id;
      _line_json['to'] = this.currentLink.toNode.id;
      this.currentLinkJsonString = JSON.stringify(_line_json, null, 2);
    },
    getLinkOptions(link) {
      return {
        from: link.from,
        to: link.to,
        text: link.text || undefined,
        color: link.color,
        styleClass: link.styleClass || undefined,
        isHide: link.isHide || undefined,
        isHideArrow: link.isHideArrow || undefined,
        isReverse: link.isReverse || undefined,
        fontColor: link.fontColor,
        lineWidth: link.lineWidth,
        lineShape: link.lineShape,
        data: link.data
      };
    },
    addNewLink(tab, event) {
      const _new_link = json2Line({
        id: this.currentLink.seeks_id + '-' + this.currentLink.relations.length,
        from: this.currentLink.fromNode.id,
        to: this.currentLink.toNode.id,
        textPositon: { x: 0, y: 0, rotate: 0 },
        text: 'new line'
      });
      this.currentLink.relations.push(_new_link);
      this.onAddLine(_new_link);
    },
    switchCurrentLink(tab, event) {
      this.currentLine = this.currentLines[parseInt(this.currentLineIndex)];
      this.refreshLineJsonString();
    },
    refreshLineJsonString() {
      this.currentLine = this.currentLines[parseInt(this.currentLineIndex)];
      const _line_json = this.getLinkOptions(this.currentLine);
      _line_json['from'] = this.currentLink.fromNode.id;
      _line_json['to'] = this.currentLink.toNode.id;
      this.currentLinkJsonString = JSON.stringify(_line_json, null, 2);
      return _line_json;
    },
    onlineOptionChanged() {
      console.log('new line json:', this.currentLine);
      const jsonLine = this.refreshLineJsonString();
      this.onLineChange(jsonLine, parseInt(this.currentLineIndex));
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
