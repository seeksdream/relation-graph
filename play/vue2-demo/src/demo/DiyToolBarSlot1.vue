<template>
  <div :style="{'margin-left':(options.viewELSize.width-160)+'px','margin-top':(options.viewELSize.height-260)/2+'px'}" style="" class="c-mini-toolbar">
    <div class="c-mb-button" style="border-top-left-radius: 18px;border-top-right-radius: 18px;" @click="about">
      <svg t="1690563415378" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2885" width="16" height="16"><path d="M836.608 675.84q41.984 59.392 96.256 76.8-23.552 72.704-74.752 151.552-78.848 118.784-155.648 118.784-28.672 0-84.992-19.456-52.224-19.456-91.136-19.456t-86.016 20.48q-49.152 19.456-80.896 19.456-92.16 0-181.248-156.672-89.088-154.624-89.088-304.128 0-138.24 67.584-226.304 69.632-88.064 172.032-88.064 22.528 0 50.176 5.632t57.344 20.992q31.744 17.408 52.224 24.064t31.744 6.656q13.312 0 40.96-6.144t55.296-22.528q29.696-16.384 51.2-24.576t44.032-8.192q71.68 0 129.024 38.912 30.72 20.48 62.464 60.416-47.104 40.96-68.608 71.68-39.936 57.344-39.936 124.928 0 74.752 41.984 135.168z m-205.824-478.208q-35.84 33.792-65.536 44.032-10.24 3.072-26.112 5.632t-36.352 4.608q1.024-90.112 47.104-155.648T701.44 6.144q2.048 10.24 3.072 14.336v11.264q0 36.864-17.408 82.944-18.432 45.056-56.32 82.944z" fill="#515151" p-id="2886"></path></svg>
      <span class="c-mb-text">Apple</span>
    </div>
    <div style="float:left;margin-top:0px;height:30px;width:100%;border-top:0px;border-bottom:0px;background-color: #00bb00;color: #ffffff;font-size: 10px;text-align: center;line-height: 30px;" @click="printGraphJsonData">{{ options.canvasZoom }}%</div>
    <div class="c-mb-button" style="margin-top:0px;" @click="zoomToFit()">
      <svg t="1690565818186" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7654" width="16" height="16"><path d="M695.3216 232.531968l66.466816-118.808576c4.381696-7.83872 1.589248-17.7408-6.250496-22.119424-7.85408-4.380672-17.741824-1.5872-22.119424 6.25152l-67.070976 119.912448c-47.051776-21.433344-99.311616-33.370112-154.348544-33.370112-55.04 0-107.300864 11.935744-154.351616 33.368064L290.578432 97.85344c-4.379648-7.83872-14.280704-10.631168-22.119424-6.25152-7.83872 4.379648-10.631168 14.281728-6.25152 22.119424l66.466816 118.807552C215.026688 296.830976 138.28096 419.081216 138.28096 559.415296c0 207.125504 167.325696 375.054336 373.71904 375.054336 206.37696 0 373.71904-167.927808 373.71904-375.054336C885.71904 419.083264 808.967168 296.833024 695.3216 232.531968zM351.116288 512.004096c-22.38976 0-40.621056-18.168832-40.621056-40.62208 0-22.436864 18.234368-40.621056 40.621056-40.621056 22.388736 0 40.621056 18.184192 40.621056 40.621056C391.737344 493.835264 373.505024 512.004096 351.116288 512.004096zM672.883712 512.004096c-22.376448 0-40.62208-18.168832-40.62208-40.62208 0-22.436864 18.245632-40.621056 40.62208-40.621056 22.500352 0 40.621056 18.184192 40.621056 40.621056C713.504768 493.835264 695.384064 512.004096 672.883712 512.004096z" p-id="7655" fill="#707070"></path></svg>      <span class="c-mb-text">适应</span>
    </div>
    <div class="c-mb-button">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-hj2"></use></svg>
      <span class="c-mb-text">比例</span>
      <div class="c-mb-child-panel" style="width:256px;margin-left:-255px;">
        <div :class="{'c-mb-button-on':options.canvasZoom===40}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.setZoom(40)">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-hj2"></use></svg>
          <span class="c-mb-text">40</span>
        </div>
        <div :class="{'c-mb-button-on':options.canvasZoom===60}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.setZoom(60)">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjieliu"></use></svg>
          <span class="c-mb-text">60</span>
        </div>
        <div :class="{'c-mb-button-on':options.canvasZoom===80}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.setZoom(80)">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjieliu"></use></svg>
          <span class="c-mb-text">80</span>
        </div>
        <div :class="{'c-mb-button-on':options.canvasZoom===100}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.setZoom(100)">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-lianjieliu"></use></svg>
          <span class="c-mb-text">100</span>
        </div>
        <div :class="{'c-mb-button-on':options.canvasZoom===150}" class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.setZoom(150)">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-hj2"></use></svg>
          <span class="c-mb-text">150</span>
        </div>
      </div>
    </div>
    <div v-if="options.allowShowDownloadButton" class="c-mb-button" style="border-bottom-left-radius: 18px;border-bottom-right-radius: 18px;">
      <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ziyuan"></use></svg>
      <span class="c-mb-text">下载</span>
      <div :style="{width:'256px','margin-left':'-256px'}" class="c-mb-child-panel">
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.downloadAsImage('png')">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
          <span class="c-mb-text">PNG</span>
        </div>
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="relationGraph.downloadAsImage('jpg')">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-tupian"></use></svg>
          <span class="c-mb-text">JPG</span>
        </div>
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="downloadAsFile('excel')">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ziyuan"></use></svg>
          <span class="c-mb-text">Excel</span>
        </div>
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="downloadAsFile('excel')">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ziyuan"></use></svg>
          <span class="c-mb-text">Word</span>
        </div>
        <div class="c-mb-button c-mb-button-c" style="width: 50px;" @click="downloadAsFile('excel')">
          <svg class="rg-icon" aria-hidden="true"><use xlink:href="#icon-ziyuan"></use></svg>
          <span class="c-mb-text">Pdf</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GraphMiniToolBar',
  data() {
    return {
      height: 275,
      hits: 0
    };
  },
  inject: ['graph'],
  computed: {
    relationGraph() {
      return this.graph.instance;
    },
    options() {
      return this.graph.options;
    }
  },
  mounted() {
    console.log('relationGraph:', this.relationGraph);
    if (this.options.layouts.length > 1) {
      this.height -= 40;
    }
  },
  methods: {
    about() {
      alert('Welcome to Apple Products !');
    },
    refresh() {
      this.relationGraph.refresh();
    },
    switchLayout(layoutConfig) {
      this.relationGraph.switchLayout(layoutConfig, this.options);
      this.refresh();
    },
    toggleAutoLayout() {
      // devLog('this.options.autoLayouting', this.options.autoLayouting)
      this.relationGraph.toggleAutoLayout();
    },
    downloadAsFile(format) {
      // devLog('this.options.autoLayouting', this.options.autoLayouting)
      alert('download as :' + format);
    },
    async zoomToFit() {
      await this.relationGraph.setZoom(100);
      await this.relationGraph.moveToCenter();
      await this.relationGraph.zoomToFit();
    },
    printGraphJsonData() {
      this.hits++;
      setTimeout(() => {
        if (this.hits > 0) this.hits--;
      }, 2000);
      if (this.hits > 5) {
        this.hits = 0;
        this.relationGraph.printGraphJsonData();
      }
    }
  }
};
</script>

<style scoped>
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1440deg); }
}
  .rg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
  }
  .c-mini-toolbar{
    width:44px;
    position: absolute;
    margin-top:170px;
    margin-right:10px;
    z-index: 222;
    border: rgba(0, 187, 0, 0.51) solid 1px;
    background-color: #ffffff;
    box-shadow: 0px 0px 18px rgba(0, 187, 0, 0.4);
    box-sizing:border-box;
    border-radius: 18px;
    animation-name: rotate;
    animation-duration: 2s;
    animation-timing-function: ease-out; /* 慢慢减速 */
  }
  .c-fixedLayout{
    position: fixed;
    top:100px;
  }
  .c-mb-button{
    height:44px;
    width:42px;
    margin-top:0px;
    background-color: #ffffff;
    border-top: #efefef solid 1px;
    opacity: 1;
    text-align: center;
    padding-top:3px;
    cursor: pointer;
    color: #999999;
    font-size: 18px;
    float: left;
    box-sizing:border-box;
    line-height: 21px;
    position: relative;
  }
  .c-mb-button .c-mb-text{
    display: inline-block;
    height:14px;
    width:42px;
    font-size: 12px;
    line-height: 12px;
    margin-top:24px;
    margin-left:-28px;
    position: absolute;
    color: #262626;
  }
  .c-mb-button-on{
    background-color: #2E74B5;
    border-top: #2E4E8F solid 1px;
    color: #ffffff;
  }
  .c-mb-button:hover{
    background-color: #00bb00;
    border-top: #00bb00 solid 1px;
    color: #ffffff;
  }
  .c-mb-button:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff;
  }
  .c-mb-button .c-mb-child-panel{
    height:46px;
    position: absolute;
    top: 0px;
    z-index: 999;
    background-color: #ffffff;
    display: none;
    border: #bbbbbb solid 1px;
    box-shadow: 0px 0px 8px #cccccc;
    box-sizing:border-box;
  }
  .c-mb-button:hover .c-mb-child-panel{
    display: block;
  }
  .c-mb-button .c-mb-button{
    height:44px;
    width: 42px;
    margin:0px;
    border: none;
  }
  .c-mb-button-c .c-mb-text{
    color: #262626 !important;
  }
  .c-mb-button-c:hover .c-mb-text,.c-mb-button-on .c-mb-text{
    color: #ffffff !important;
  }
  .c-loading-icon{
    animation:turn 1s linear infinite;
  }
  @keyframes turn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
</style>
