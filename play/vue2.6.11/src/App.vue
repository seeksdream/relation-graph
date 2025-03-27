<template>
  <div>
    <CurrentDemo />
  </div>
</template>

<script>
// 以下，你想使用哪个demo，打开对应的注释即可
// import CurrentDemo from './demo/treeCondition';
// import CurrentDemo from './demo/autoExpandAnimation';
// import CurrentDemo from './demo/DynamicData';
// import CurrentDemo from './demo/MultiGroup';
// import CurrentDemo from './demo/ObjectEdit';
import CurrentDemo from './demo/autoExpandAnimation';
// import CurrentDemo from './demo/SwitchLayout';
// import CurrentDemo from './demo/20230408';
// import CurrentDemo from './demo/VisiblePanelInFullScreen';
// import CurrentDemo from './demo/DiyToolBar';
// import CurrentDemo from './demo/Simple1';
// import CurrentDemo from './demo/Layout-force';
// import CurrentDemo from './demo/Demo4AdvLineSlot';
// 所有的demo都在../demo文件中，你想要使用哪个，像上面一样引入即可
export default {
  name: 'App',
  components: { CurrentDemo },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>
