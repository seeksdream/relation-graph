import { createApp } from 'vue'
import App from './src/App.vue'
;(async () => {
  // const apps = import.meta.glob('./src/*.vue')
  // const name = location.pathname.replace(/^\//, '') || 'App'
  // console.log('Vue app path:', name);
  // const file = apps[`./src/${name}.vue`]
  // if (!file) {
  //   location.pathname = 'App'
  //   console.log('miss file:', `./src/${name}.vue`);
  //   return
  // }
  // console.log('Go to:', `./src/${name}.vue`);
  // const App = (await file()).default
  const app = createApp(App)

  app.mount('#app')
})()
