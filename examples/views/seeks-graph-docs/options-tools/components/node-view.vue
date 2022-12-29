<template>
  <div>
    <div v-if="currentNode" style="height:calc(100vh);overflow:auto;">
      <el-form label-width="170px" size="medium">
        <el-form-item label="id">
          <el-input v-model="currentNode.id" disabled size="mini" style="width:160px;" />
        </el-form-item>
        <el-form-item label="节点文字">
          <el-input v-model="currentNode.text" size="mini" style="width:270px;" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="自定义样式名(class)">
          <el-input v-model="currentNode.styleClass" size="mini" style="width:270px;" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="节点颜色">
          <el-input v-model="currentNode.color" style="width:270px;" @change="onNodeOptionChanged">
            <template slot="append">
              <el-color-picker v-model="currentNode.color" show-alpha size="mini" :predefine="predefineColors" @change="onNodeOptionChanged" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="文字颜色">
          <el-input v-model="currentNode.fontColor" style="width:270px;" @change="onNodeOptionChanged">
            <template slot="append">
              <el-color-picker v-model="currentNode.fontColor" show-alpha size="mini" :predefine="predefineColors" @change="onNodeOptionChanged" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="边框粗细">
          <el-radio-group v-model="currentNode.borderWidth" size="mini" @change="onNodeOptionChanged">
            <!--              <el-radio-button :label="0">0</el-radio-button>-->
            <el-radio-button :label="1">1</el-radio-button>
            <el-radio-button :label="2">2</el-radio-button>
            <el-radio-button :label="3">3</el-radio-button>
            <el-radio-button :label="4">4</el-radio-button>
            <el-radio-button :label="5">5</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="边框颜色">
          <el-input v-model="currentNode.borderColor" style="width:270px;" @change="onNodeOptionChanged">
            <template slot="append">
              <el-color-picker v-model="currentNode.borderColor" show-alpha size="mini" :predefine="predefineColors" @change="onNodeOptionChanged" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="节点形状">
          <el-radio-group v-model="currentNode.nodeShape" size="mini" @change="onNodeOptionChanged">
            <el-radio-button :label="0">圆形</el-radio-button>
            <el-radio-button :label="1">矩形</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="节点大小">
          宽度：<el-input v-model="currentNode.width" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
          高度：<el-input v-model="currentNode.height" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="透明度">
          <el-slider v-model="currentNode.opacity" :max="1" :min="0." :step="0.1" @change="onNodeOptionChanged">
          </el-slider>
        </el-form-item>
        <el-form-item label="展开/关闭按钮位置">
          <el-radio-group v-model="currentNode.expandHolderPosition" size="mini" @change="onNodeOptionChanged">
            <el-radio-button label="top">上</el-radio-button>
            <el-radio-button label="bottom">下</el-radio-button>
            <el-radio-button label="left">左</el-radio-button>
            <el-radio-button label="right">右</el-radio-button>
            <el-radio-button label="hide">隐藏</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="currentNode.expandHolderPosition&&currentNode.expandHolderPosition!=='hide'" label="默认是未展开的样式">
          <el-switch v-model="currentNode.expanded" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="固定位置">
          <el-switch v-model="currentNode.fixed" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="禁止拖动">
          <el-switch v-model="currentNode.disableDrag" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="在点击后不加选中样式">
          <el-switch v-model="currentNode.disableDefaultClickEffect" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item v-if="currentNode.fixed" label="固定坐标">
          x：<el-input v-model="currentNode.x" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
          y：<el-input v-model="currentNode.y" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="位置偏移">
          x：<el-input v-model="currentNode.offset_x" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
          y：<el-input v-model="currentNode.offset_y" style="width:80px;" size="mini" @change="onNodeOptionChanged" />
        </el-form-item>
        <el-form-item label="innerHTML">
          <el-input v-model="currentNode.innerHTML" style="width:100%;" size="mini" @change="onNodeOptionChanged" />
          <div style="color: #888888;font-size: 12px;line-height: 16px;">此属性的优先级高于text</div>
        </el-form-item>
        <el-form-item label="html">
          <el-input v-model="currentNode.html" style="width:100%;" size="mini" @change="onNodeOptionChanged" />
          <div style="color: #888888;font-size: 12px;line-height: 16px;">此属性的优先级高于innerHTML,并会使节点的所有样式属性失效</div>
        </el-form-item>
        <!--          <el-form-item label="反向">-->
        <!--            <el-switch v-model="currentLink.isReverse" @change="onlineOptionChanged" />-->
        <!--          </el-form-item>-->
        <!--          <el-form-item label="隐藏箭头">-->
        <!--            <el-switch v-model="currentLink.isHideArrow" @change="onlineOptionChanged" />-->
        <!--          </el-form-item>-->
        <el-form-item label="data">
          <div style="padding:0px;padding-right:10px;">
            <pre style="color:#444444;font-size:12px;padding:8px;border-radius:5px;border:1px solid #efefef;line-height:14px;">{{ JSON.stringify(currentNode.data, null, 2) }}</pre>
          </div>
        </el-form-item>
      </el-form>
      <div style="padding:20px;padding-top:0px;">
        <div style="font-size:12px;color:#444444;line-height:30px;padding-left:20px;">
          当前节点的属性:
        </div>
        <pre style="color:#444444;font-size:12px;padding:10px;border-radius:10px;border:1px solid #efefef;line-height:14px;">{{ currentNodeJsonString }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { predefineColors, predefineColorsBorder } from '../data';

export default {
  name: 'NodeView',
  components: { },
  props: {
    onNodeChange: {
      mustUseProp: false,
      default: () => { return () => {}; },
      type: Function
    }
  },
  data() {
    return {
      currentNode: null,
      currentNodeJsonString: null,
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
    setNode(node) {
      const jsonNode = this.getNodeOptions(node);
      this.currentNode = jsonNode;
      this.currentNodeJsonString = JSON.stringify(jsonNode, null, 2);
    },
    getNodeOptions(node) {
      return {
        id: node.id,
        text: node.text,
        styleClass: node.styleClass || undefined,
        color: node.color,
        fontColor: node.fontColor,
        borderWidth: node.borderWidth,
        borderColor: node.borderColor,
        nodeShape: node.nodeShape,
        width: node.width,
        height: node.height,
        fixed: node.fixed || undefined,
        offset_x: node.offset_x ? parseInt(node.offset_x) : undefined,
        offset_y: node.offset_y ? parseInt(node.offset_y) : undefined,
        isHide: node.isHide || undefined,
        opacity: node.opacity === 1 || node.opacity === undefined ? 1 : node.opacity,
        disableDrag: node.disableDrag || undefined,
        disableDefaultClickEffect: node.disableDefaultClickEffect || undefined,
        expanded: node.expanded === false ? false : undefined,
        innerHTML: node.innerHTML || undefined,
        html: node.html || undefined,
        x: node.fixed ? node.x : undefined,
        y: node.fixed ? node.y : undefined,
        data: node.data
      };
    },
    onNodeOptionChanged() {
      console.log('new node json:', this.currentNode);
      const jsonNode = this.getNodeOptions(this.currentNode);
      if (jsonNode === 1)jsonNode.opacity = undefined;
      this.currentNodeJsonString = JSON.stringify(jsonNode, null, 2);
      this.onNodeChange(jsonNode);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
