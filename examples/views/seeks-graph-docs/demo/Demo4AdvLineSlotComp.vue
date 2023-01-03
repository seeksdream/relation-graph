<template>
  <g
      @click="onLineClick(line, $event)"
  >
    <path
        :d="pathData"
        stroke="rgba(153, 77, 22, 1)"
        :style="{'stroke-width': 1 + 'px'}"
        fill="none"
    />
    <g
        ref="flower"
    />
  </g>
</template>

<script>
import { createRandomParams, Flower } from './Demo4AdvLineSlotCompFlower';

export default {
  name: 'MyLine',
  components: { },
  props: {
    relationGraph: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    link: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    relationIndex: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    },
    line: {
      mustUseProp: true,
      default: () => { return {}; },
      type: Object
    }
  },
  computed: {
    pathData() {
      const fx = this.link.fromNode.x + 50;
      const fy = this.link.fromNode.y + 50;
      const tx = this.link.toNode.x + 50;
      const ty = this.link.toNode.y + 50;
      return 'M ' + fx + ' ' + fy + ' L ' + (tx) + ' ' + (ty);
    }
  },
  data() {
    return {
    };
  },
  mounted() {
    this.task = setInterval(() => {
      this.updateFlower();
    }, 500);
  },
  beforeDestroy() {
    clearInterval(this.task);
  },
  methods: {
    getPositon() {
      const fx = this.link.fromNode.x + 50;
      const fy = this.link.fromNode.y + 50;
      const tx = this.link.toNode.x + 50;
      const ty = this.link.toNode.y + 50;
      const x = fx + (tx - fx) / 2;
      const y = fy + (ty - fy) / 2;
      return { x, y };
    },
    createFlower() {
      if (!this.link.fromNode) {
        return;
      }
      const params = createRandomParams(this.position.x, this.position.y, this.$refs.flower);
      const layerSize = this.$refs.flower.childNodes.length;
      console.log(this.link, this.position.x, this.position.y, layerSize);
      for (let i = 0; i < this.$refs.flower.childNodes.length; i++) {
        this.$refs.flower.removeChild(this.$refs.flower.childNodes[i]);
      }
      for (let i = 0; i < this.$refs.flower.childNodes.length; i++) {
        this.$refs.flower.removeChild(this.$refs.flower.childNodes[i]);
      }
      for (let i = 0; i < this.$refs.flower.childNodes.length; i++) {
        this.$refs.flower.removeChild(this.$refs.flower.childNodes[i]);
      }
      // 看到这里不会要紧张，这里只是引用了一个外部类来生成一个炫酷的花朵
      // 你完全可以根据自己的需求用少量的代码来生成你自己的svg
      new Flower(params);
    },
    updateFlower() {
      const position = this.getPositon();
      if (this.position && this.position.x === position.x && this.position.y === position.y) {
        return;
      }
      this.position = position;
      this.createFlower();
    },
    onLineClick(lineObject, $event) {
      console.log('onLineClick:', lineObject);
    }
  }
};
</script>

<style lang="scss">
.flower path {
  stroke-linecap: round;
  stroke-linejoin: round;
}
.layer {
  animation-name: layerAnim1;
  animation-duration: 4s;
  animation-fill-mode: both;
  transform-box: fill-box;
  transform-origin: center center;
}
.layer path {
  stroke: rgba(0, 0, 0, 0.7);
  stroke-width: 0.75px;
}
@-moz-document url-prefix() {
  .layer {
    filter: drop-shadow(0 0 3px #000);
  }
}
@keyframes layerAnim1 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes layerAnim2 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: scale3d(0.2, 0.2, 0.2);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes layerAnim3 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: rotateZ(-270deg);
  }
  to {
    opacity: 1;
    opacity: 1;
    transform: rotateZ(0deg);
  }
}
@keyframes layerAnim4 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: rotateZ(360deg) scale3d(0.2, 0.2, 0.2);
  }
  to {
    opacity: 1;
    opacity: 1;
    transform: rotateZ(0deg) scale3d(1, 1, 1);
  }
}
@keyframes layerAnim5 {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  60% {
    transform: scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes layerAnim6 {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: rotateZ(180deg) scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: rotateZ(-25.71deg) scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: rotateZ(25.71deg) scale3d(0.9, 0.9, 0.9);
  }
  60% {
    transform: rotateZ(-7.71deg) scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: rotateZ(7.71deg) scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg) scale3d(1, 1, 1);
  }
}
@keyframes layerAnim7 {
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: rotateZ(-180deg) scale3d(0.3, 0.3, 0.3);
  }
  20% {
    transform: rotateZ(25.71deg) scale3d(1.1, 1.1, 1.1);
  }
  40% {
    transform: rotateZ(-25.71deg) scale3d(0.9, 0.9, 0.9);
  }
  60% {
    transform: rotateZ(7.71deg) scale3d(1.03, 1.03, 1.03);
  }
  80% {
    transform: rotateZ(-7.71deg) scale3d(0.97, 0.97, 0.97);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg) scale3d(1, 1, 1);
  }
}
@keyframes layerAnim8 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: rotate3d(1, 1, 1, 360deg);
  }
  to {
    opacity: 1;
    transform: rotate3d(1, 1, 1, 0deg);
  }
}
@keyframes layerAnim9 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: rotate3d(1, 1, 1, 360deg) scale3d(0.1, 0.1, 0.1);
  }
  to {
    opacity: 1;
    transform: rotate3d(1, 1, 1, 0deg) scale3d(1, 1, 1);
  }
}
@keyframes layerAnim10 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: scale3d(2, 2, 2);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes layerAnim11 {
  from, to {
    animation-timing-function: ease-out;
  }
  from {
    opacity: 0;
    transform: rotateZ(-360deg) scale3d(2, 2, 2);
  }
  to {
    opacity: 1;
    transform: rotateZ(0deg) scale3d(1, 1, 1);
  }
}
</style>

<style lang="scss" scoped>
</style>
