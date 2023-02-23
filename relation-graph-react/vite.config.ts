import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginStyleInject from 'vite-plugin-style-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginStyleInject()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      // 为了使@导入别名像在 Vue CLI 中那样工作，我们需要添加这一点。
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/relation-graph/index.tsx'),
      name: 'RelationGraph',
      // the proper extensions will be added
      fileName: 'relation-graph'
    },
    outDir: resolve(__dirname, '../react'),
    emptyOutDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'screenfull', 'html2canvas'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'react',
        },
      },
    },
  },
})
