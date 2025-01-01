import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      // 为了使@导入别名像在 Vue CLI 中那样工作，我们需要添加这一点。
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        /**如果引入多个文件，可以使用
         * '@import "@/assets/scss/globalVariable1.scss";
         **/
        // additionalData: '@import "@/style/globalVar.scss";',
      }
    }
  }
})
