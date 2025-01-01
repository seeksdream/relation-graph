import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createServer as createViteServer } from 'vite';
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
  }
})
