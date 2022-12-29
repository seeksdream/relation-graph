<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const title = 'Vue Element Admin';

const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
};
export default {
  name: 'App',
  watch: {
    $route(to, from) {
      console.log('$route change to:', to.path);
      if (to.meta && to.meta.title) {
        document.title = getPageTitle(to.meta.title);
      }
    }
  },
  mounted() {
    console.log('welcome:', this.$route.path);
  },
  methods: {
  }
};
</script>

<style>
html,body{
  padding:0px;
  margin:0px;
}
#app {
  padding:0px;
  margin:0px;
}
</style>
