<template>
  <div>
    <div style="line-height: 30px;">数据格式：</div>
    <div style="line-height: 20px;color: #888888;padding:10px;">通过设置一个json对象的nodes、lines、rootId来定义图谱中要展示的节点、关系线、根节点</div>
    <div style="padding:10px;border:#cccccc dashed 1px;background-color: #fdf9ec;border-radius: 0px;">
      <div class="highlight highlight-text-html-vue"><pre>
<span class="pl-s1">       <span class="pl-k">const</span> __graph_json_data <span class="pl-k">=</span> {</span>
<span class="pl-s1">         rootId<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>,</span>
<span class="pl-s1">         nodes<span class="pl-k">:</span> [</span>
<span class="pl-s1">           { id<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>A<span class="pl-pds">'</span></span>, borderColor<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>yellow<span class="pl-pds">'</span></span> },</span>
<span class="pl-s1">           { id<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>b<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>B<span class="pl-pds">'</span></span>, color<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>#43a2f1<span class="pl-pds">'</span></span>, fontColor<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>yellow<span class="pl-pds">'</span></span> },</span>
<span class="pl-s1">           { id<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>c<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>C<span class="pl-pds">'</span></span>, nodeShape<span class="pl-k">:</span> <span class="pl-c1">1</span>, width<span class="pl-k">:</span> <span class="pl-c1">80</span>, height<span class="pl-k">:</span> <span class="pl-c1">60</span> },</span>
<span class="pl-s1">           { id<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>e<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>E<span class="pl-pds">'</span></span>, nodeShape<span class="pl-k">:</span> <span class="pl-c1">0</span>, width<span class="pl-k">:</span> <span class="pl-c1">150</span>, height<span class="pl-k">:</span> <span class="pl-c1">150</span> }</span>
<span class="pl-s1">         ],</span>
<span class="pl-s1">         lines<span class="pl-k">:</span> [</span>
<span class="pl-s1">           { from<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>, to<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>b<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>关系1<span class="pl-pds">'</span></span>, color<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>#43a2f1<span class="pl-pds">'</span></span> },</span>
<span class="pl-s1">           { from<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>, to<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>c<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>关系2<span class="pl-pds">'</span></span> },</span>
<span class="pl-s1">           { from<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>a<span class="pl-pds">'</span></span>, to<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>e<span class="pl-pds">'</span></span>, text<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>关系3<span class="pl-pds">'</span></span> },</span>
<span class="pl-s1">           { from<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>b<span class="pl-pds">'</span></span>, to<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>e<span class="pl-pds">'</span></span>, color<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>#67C23A<span class="pl-pds">'</span></span> }</span>
<span class="pl-s1">         ]</span>
<span class="pl-s1">       }</span>
      </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Data',
  components: { },
  data() {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      },
      checkedRoute: null,
      codeString: ''
    };
  },
  computed: {
    ...mapState({
    })
  },
  mounted() {
  },
  methods: {
  }
};
/**
 */
</script>

<style>
  .pl-c {
    color: #6a737d
  }

  .pl-c1,.pl-s .pl-v {
    color: #005cc5
  }

  .pl-e,.pl-en {
    color: #6f42c1
  }

  .pl-s .pl-s1,.pl-smi {
    color: #24292e
  }

  .pl-ent {
    color: #22863a
  }

  .pl-k {
    color: #d73a49
  }

  .pl-pds,.pl-s,.pl-s .pl-pse .pl-s1,.pl-sr,.pl-sr .pl-cce,.pl-sr .pl-sra,.pl-sr .pl-sre {
    color: #032f62
  }

  .pl-smw,.pl-v {
    color: #e36209
  }

  .pl-bu {
    color: #b31d28
  }

  .pl-ii {
    color: #fafbfc;
    background-color: #b31d28
  }

  .pl-c2 {
    color: #fafbfc;
    background-color: #d73a49
  }

  .pl-c2:before {
    content: "^M"
  }

  .pl-sr .pl-cce {
    font-weight: 700;
    color: #22863a
  }

  .pl-ml {
    color: #735c0f
  }

  .pl-mh,.pl-mh .pl-en,.pl-ms {
    font-weight: 700;
    color: #005cc5
  }

  .pl-mi {
    font-style: italic;
    color: #24292e
  }

  .pl-mb {
    font-weight: 700;
    color: #24292e
  }

  .pl-md {
    color: #b31d28;
    background-color: #ffeef0
  }

  .pl-mi1 {
    color: #22863a;
    background-color: #f0fff4
  }

  .pl-mc {
    color: #e36209;
    background-color: #ffebda
  }

  .pl-mi2 {
    color: #f6f8fa;
    background-color: #005cc5
  }

  .pl-mdr {
    font-weight: 700;
    color: #6f42c1
  }

  .pl-ba {
    color: #586069
  }

  .pl-sg {
    color: #959da5
  }

  .pl-corl {
    text-decoration: underline;
    color: #032f62
  }

  .CodeMirror {
    font-family: monospace;
    height: 300px;
    color: #000;
    direction: ltr
  }

  .CodeMirror-lines {
    padding: 4px 0
  }

  .CodeMirror pre {
    padding: 0 4px
  }

  .CodeMirror-gutter-filler,.CodeMirror-scrollbar-filler {
    background-color: #fff
  }

  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap
  }

  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap
  }

  .CodeMirror-guttermarker {
    color: #000
  }

  .CodeMirror-guttermarker-subtle {
    color: #999
  }

  .CodeMirror-cursor {
    border-left: 1px solid #000;
    border-right: none;
    width: 0
  }

  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver
  }

  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0!important;
    background: #7e7
  }

  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1
  }

  .cm-fat-cursor-mark {
    background-color: rgba(20,255,20,.5);
    animation: blink 1.06s steps(1) infinite
  }

  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7
  }

  @keyframes blink {
    50% {
      background-color: initial
    }
  }

  .cm-tab {
    display: inline-block;
    text-decoration: inherit
  }

  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: -20px;
    overflow: hidden
  }

  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute
  }

  .cm-s-default .cm-header {
    color: #00f
  }

  .cm-s-default .cm-quote {
    color: #090
  }

  .cm-negative {
    color: #d44
  }

  .cm-positive {
    color: #292
  }

  .cm-header,.cm-strong {
    font-weight: 700
  }

  .cm-em {
    font-style: italic
  }

  .cm-link {
    text-decoration: underline
  }

  .cm-strikethrough {
    text-decoration: line-through
  }

  .cm-s-default .cm-keyword {
    color: #708
  }

  .cm-s-default .cm-atom {
    color: #219
  }

  .cm-s-default .cm-number {
    color: #164
  }

  .cm-s-default .cm-def {
    color: #00f
  }

  .cm-s-default .cm-variable-2 {
    color: #05a
  }

  .cm-s-default .cm-type,.cm-s-default .cm-variable-3 {
    color: #085
  }

  .cm-s-default .cm-comment {
    color: #a50
  }

  .cm-s-default .cm-string {
    color: #a11
  }

  .cm-s-default .cm-string-2 {
    color: #f50
  }

  .cm-s-default .cm-meta,.cm-s-default .cm-qualifier {
    color: #555
  }

  .cm-s-default .cm-builtin {
    color: #30a
  }

  .cm-s-default .cm-bracket {
    color: #997
  }

  .cm-s-default .cm-tag {
    color: #170
  }

  .cm-s-default .cm-attribute {
    color: #00c
  }

  .cm-s-default .cm-hr {
    color: #999
  }

  .cm-s-default .cm-link {
    color: #00c
  }

  .cm-invalidchar,.cm-s-default .cm-error {
    color: red
  }

  .CodeMirror-composing {
    border-bottom: 2px solid
  }

  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0
  }

  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22
  }

  .CodeMirror-matchingtag {
    background: rgba(255,150,0,.3)
  }

  .CodeMirror-activeline-background {
    background: #e8f2ff
  }

  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: #fff
  }

  .CodeMirror-scroll {
    overflow: scroll!important;
    margin-bottom: -30px;
    margin-right: -30px;
    padding-bottom: 30px;
    height: 100%;
    outline: none;
    position: relative
  }

  .CodeMirror-sizer {
    position: relative;
    border-right: 30px solid transparent
  }

  .CodeMirror-gutter-filler,.CodeMirror-hscrollbar,.CodeMirror-scrollbar-filler,.CodeMirror-vscrollbar {
    position: absolute;
    z-index: 6;
    display: none
  }

  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll
  }

  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll
  }

  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0
  }

  .CodeMirror-gutter-filler {
    left: 0;
    bottom: 0
  }

  .CodeMirror-gutters {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3
  }

  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -30px
  }

  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: none!important;
    border: none!important
  }

  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4
  }

  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4
  }

  .CodeMirror-gutter-wrapper ::selection {
    background-color: initial
  }

  .CodeMirror-gutter-wrapper ::-moz-selection {
    background-color: initial
  }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px
  }

  .CodeMirror pre {
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: inherit;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    font-variant-ligatures: contextual
  }

  .CodeMirror-wrap pre {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0
  }

  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: .1px
  }

  .CodeMirror-rtl pre {
    direction: rtl
  }

  .CodeMirror-code {
    outline: none
  }

  .CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber,.CodeMirror-scroll,.CodeMirror-sizer {
    box-sizing: initial
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none
  }

  .CodeMirror-measure pre {
    position: static
  }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3
  }

  .CodeMirror-focused div.CodeMirror-cursors,div.CodeMirror-dragcursors {
    visibility: visible
  }

  .CodeMirror-selected {
    background: #d9d9d9
  }

  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0
  }

  .CodeMirror-crosshair {
    cursor: crosshair
  }

  .CodeMirror-line::selection,.CodeMirror-line>span::selection,.CodeMirror-line>span>span::selection {
    background: #d7d4f0
  }

  .CodeMirror-line::-moz-selection,.CodeMirror-line>span::-moz-selection,.CodeMirror-line>span>span::-moz-selection {
    background: #d7d4f0
  }

  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255,255,0,.4)
  }

  .cm-force-border {
    padding-right: .1px
  }

  @media print {
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden
    }
  }

  .cm-tab-wrap-hack:after {
    content: ""
  }

  span.CodeMirror-selectedtext {
    background: none
  }

  .CodeMirror-dialog {
    position: absolute;
    left: 0;
    right: 0;
    background: inherit;
    z-index: 15;
    padding: .1em .8em;
    overflow: hidden;
    color: inherit
  }

  .CodeMirror-dialog-top {
    border-bottom: 1px solid #eee;
    top: 0
  }

  .CodeMirror-dialog-bottom {
    border-top: 1px solid #eee;
    bottom: 0
  }

  .CodeMirror-dialog input {
    border: none;
    outline: none;
    background: transparent;
    width: 20em;
    color: inherit;
    font-family: monospace
  }

  .CodeMirror-dialog button {
    font-size: 70%
  }

  .CodeMirror-merge {
    position: relative;
    border: 1px solid #ddd;
    white-space: pre
  }

  .CodeMirror-merge,.CodeMirror-merge .CodeMirror {
    height: 350px
  }

  .CodeMirror-merge-2pane .CodeMirror-merge-pane {
    width: 47%
  }

  .CodeMirror-merge-2pane .CodeMirror-merge-gap {
    width: 6%
  }

  .CodeMirror-merge-3pane .CodeMirror-merge-pane {
    width: 31%
  }

  .CodeMirror-merge-3pane .CodeMirror-merge-gap {
    width: 3.5%
  }

  .CodeMirror-merge-pane {
    display: inline-block;
    white-space: normal;
    vertical-align: top
  }

  .CodeMirror-merge-pane-rightmost {
    position: absolute;
    right: 0;
    z-index: 1
  }

  .CodeMirror-merge-gap {
    z-index: 2;
    display: inline-block;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    position: relative;
    background: #f8f8f8
  }

  .CodeMirror-merge-scrolllock-wrap {
    position: absolute;
    bottom: 0;
    left: 50%
  }

  .CodeMirror-merge-scrolllock {
    position: relative;
    left: -50%;
    cursor: pointer;
    color: #555;
    line-height: 1
  }

  .CodeMirror-merge-scrolllock:after {
    content: "\21db\00a0\00a0\21da"
  }

  .CodeMirror-merge-scrolllock.CodeMirror-merge-scrolllock-enabled:after {
    content: "\21db\21da"
  }

  .CodeMirror-merge-copybuttons-left,.CodeMirror-merge-copybuttons-right {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    line-height: 1
  }

  .CodeMirror-merge-copy {
    z-index: 3
  }

  .CodeMirror-merge-copy,.CodeMirror-merge-copy-reverse {
    position: absolute;
    cursor: pointer;
    color: #44c
  }

  .CodeMirror-merge-copybuttons-left .CodeMirror-merge-copy {
    left: 2px
  }

  .CodeMirror-merge-copybuttons-right .CodeMirror-merge-copy {
    right: 2px
  }

  .CodeMirror-merge-l-inserted,.CodeMirror-merge-r-inserted {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQI12MwuCXy3+CWyH8GBgYGJgYkAABZbAQ9ELXurwAAAABJRU5ErkJggg==);
    background-position: 0 100%;
    background-repeat: repeat-x
  }

  .CodeMirror-merge-l-deleted,.CodeMirror-merge-r-deleted {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAYAAACddGYaAAAAGUlEQVQI12M4Kyb2/6yY2H8GBgYGJgYkAABURgPz6Ks7wQAAAABJRU5ErkJggg==);
    background-position: 0 100%;
    background-repeat: repeat-x
  }

  .CodeMirror-merge-r-chunk {
    background: #ffffe0
  }

  .CodeMirror-merge-r-chunk-start {
    border-top: 1px solid #ee8
  }

  .CodeMirror-merge-r-chunk-end {
    border-bottom: 1px solid #ee8
  }

  .CodeMirror-merge-r-connect {
    fill: #ffffe0;
    stroke: #ee8;
    stroke-width: 1px
  }

  .CodeMirror-merge-l-chunk {
    background: #eef
  }

  .CodeMirror-merge-l-chunk-start {
    border-top: 1px solid #88e
  }

  .CodeMirror-merge-l-chunk-end {
    border-bottom: 1px solid #88e
  }

  .CodeMirror-merge-l-connect {
    fill: #eef;
    stroke: #88e;
    stroke-width: 1px
  }

  .CodeMirror-merge-l-chunk.CodeMirror-merge-r-chunk {
    background: #dfd
  }

  .CodeMirror-merge-l-chunk-start.CodeMirror-merge-r-chunk-start {
    border-top: 1px solid #4e4
  }

  .CodeMirror-merge-l-chunk-end.CodeMirror-merge-r-chunk-end {
    border-bottom: 1px solid #4e4
  }

  .CodeMirror-merge-collapsed-widget:before {
    content: "(...)"
  }

  .CodeMirror-merge-collapsed-widget {
    cursor: pointer;
    color: #88b;
    background: #eef;
    border: 1px solid #ddf;
    font-size: 90%;
    padding: 0 3px;
    border-radius: 4px
  }

  .CodeMirror-merge-collapsed-line .CodeMirror-gutter-elt {
    display: none
  }

  /*!
   * GitHub Light v0.4.2
   * Copyright (c) 2012 - 2017 GitHub, Inc.
   * Licensed under MIT (https://github.com/primer/github-syntax-theme-generator/blob/master/LICENSE)
   */
  .cm-s-github-light.CodeMirror {
    background: #fff;
    color: #24292e
  }

  .cm-s-github-light .CodeMirror-gutters {
    background: #fff;
    border-right-width: 0
  }

  .cm-s-github-light .CodeMirror-guttermarker {
    color: #fff
  }

  .cm-s-github-light .CodeMirror-guttermarker-subtle {
    color: #d0d0d0
  }

  .cm-s-github-light .CodeMirror-linenumber {
    color: #959da5;
    padding: 0 16px
  }

  .cm-s-github-light .CodeMirror-cursor {
    border-left: 1px solid #24292e
  }

  .cm-s-github-light .CodeMirror-line::-moz-selection,.cm-s-github-light .CodeMirror-line::selection,.cm-s-github-light .CodeMirror-line>span::-moz-selection,.cm-s-github-light .CodeMirror-line>span::selection,.cm-s-github-light .CodeMirror-line>span>span::-moz-selection,.cm-s-github-light .CodeMirror-line>span>span::selection,.cm-s-github-light div.CodeMirror-selected {
    background: #c8c8fa
  }

  .cm-s-github-light .CodeMirror-activeline-background {
    background: #fafbfc
  }

  .cm-s-github-light .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: #24292e!important
  }

  .cm-s-github-light .CodeMirror-lines {
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    font-size: 12px;
    background: #fff;
    line-height: 1.5
  }

  .cm-s-github-light .cm-comment {
    color: #6a737d
  }

  .cm-s-github-light .cm-constant {
    color: #005cc5
  }

  .cm-s-github-light .cm-entity {
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: #6f42c1
  }

  .cm-s-github-light .cm-keyword {
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: #d73a49
  }

  .cm-s-github-light .cm-storage {
    color: #d73a49
  }

  .cm-s-github-light .cm-string {
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: #032f62
  }

  .cm-s-github-light .cm-support {
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: #005cc5
  }

  .cm-s-github-light .cm-variable {
    font-weight: 400;
    font-style: normal;
    text-decoration: none;
    color: #e36209
  }

  details-dialog {
    position: fixed;
    margin: 10vh auto;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    max-height: 80vh;
    max-width: 90vw;
    width: 448px
  }

  image-crop {
    display: block
  }

  image-crop.nesw {
    cursor: nesw-resize
  }

  image-crop.nwse {
    cursor: nwse-resize
  }

  image-crop.nesw .crop-box,image-crop.nwse .crop-box {
    cursor: inherit
  }

  image-crop[loaded] .crop-image {
    display: block
  }

  image-crop .crop-image,image-crop[loaded] [data-loading-slot] {
    display: none
  }

  image-crop .crop-wrapper {
    position: relative;
    font-size: 0
  }

  image-crop .crop-container {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: absolute;
    overflow: hidden;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%
  }

  image-crop .crop-box {
    position: absolute;
    border: 1px dashed #fff;
    box-sizing: border-box;
    cursor: move
  }

  image-crop .crop-outline {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    outline: 600px solid rgba(0,0,0,.3)
  }

  image-crop .handle {
    position: absolute
  }

  image-crop .handle:before {
    position: absolute;
    display: block;
    padding: 4px;
    transform: translate(-50%,-50%);
    content: " ";
    background: #fff;
    border: 1px solid #767676
  }

  image-crop .ne {
    top: 0;
    right: 0;
    cursor: nesw-resize
  }

  image-crop .nw {
    top: 0;
    left: 0;
    cursor: nwse-resize
  }

  image-crop .se {
    bottom: 0;
    right: 0;
    cursor: nwse-resize
  }

  image-crop .sw {
    bottom: 0;
    left: 0;
    cursor: nesw-resize
  }

  .user-select-contain {
    -ms-user-select: element;
    -ms-user-select: contain;
    -webkit-user-select: contain;
    -moz-user-select: contain;
    user-select: contain
  }

  .ajax-pagination-form .ajax-pagination-btn {
    width: 100%;
    padding: 6px;
    margin-top: 20px;
    font-weight: 600;
    color: #0366d6;
    background: #fff;
    border: 1px solid #e1e4e8;
    border-radius: 6px
  }

  .ajax-pagination-form .ajax-pagination-btn:focus,.ajax-pagination-form .ajax-pagination-btn:hover {
    color: #0366d6;
    background-color: #f6f8fa
  }

  .ajax-pagination-form.loading .ajax-pagination-btn {
    text-indent: -3000px;
    background-color: #f6f8fa;
    background-image: url(/images/spinners/octocat-spinner-16px-EAF2F5.gif);
    background-repeat: no-repeat;
    background-position: 50%;
    border-color: #d1d5da
  }

  @media only screen and (-moz-min-device-pixel-ratio: 2),only screen and (-webkit-min-device-pixel-ratio:2),only screen and (min--moz-device-pixel-ratio:2),only screen and (min-device-pixel-ratio:2),only screen and (min-resolution:2dppx),only screen and (min-resolution:192dpi) {
    .ajax-pagination-form.loading .ajax-pagination-btn {
      background-image:url(/images/spinners/octocat-spinner-32-EAF2F5.gif);
      background-size: 16px auto
    }
  }

  body.intent-mouse [role=button]:focus,body.intent-mouse [role=tabpanel][tabindex="0"]:focus,body.intent-mouse a:focus,body.intent-mouse button:focus,body.intent-mouse summary:focus {
    outline: none;
    box-shadow: none
  }

  .CodeMirror {
    height: calc(100vh - 1px)
  }

</style>
<style lang="scss" scoped>
.c-doc-title{
  margin-top:30px;
  font-size:22px;
  line-height:30px;
  padding-left:0px;
}
/deep/ .el-table__row a{
  color:#1989fa;
}
</style>
