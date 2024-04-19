import * as fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue'
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import VitePluginStyleInject from 'vite-plugin-style-inject';
import ts from 'typescript';

const input = resolve(__dirname, "src/index.ts");


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginStyleInject(),
    {
      name: "emit-dts",
      buildEnd() {
        const program = ts.createProgram([input], {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          moduleResolution: ts.ModuleResolutionKind.NodeJs,
          // jsx实现 根据自己的需求改
          jsx: ts.JsxEmit.Preserve,
          jsxImportSource: "solid-js",
          allowSyntheticDefaultImports: true,
          esModuleInterop: true,
          // js 源码输出的文件夹
          outDir: `dist/source`,
          // d.ts 输出的文件夹
          declarationDir: `../types/types`,
          declaration: true,
          // true 只输出 dts 到 declarationDir,
          // false 同时输出js源码到 outDir
          emitDeclarationOnly: true,
          allowJs: true,
        });
        program.emit();
      },
    },
    {
      name: "seeks-copy-types",
      writeBundle() {
        setTimeout(() => {
          console.log('[relation-graph]seeks-copy-types.....');
          // console.log('[relation-graph]copy types.ts to types/types/');
          const typesTsFile = resolve(__dirname, "../lib/vue2/relation-graph.js");
          if (fs.existsSync(typesTsFile)) {
            const typesTsFileInLib = resolve(__dirname, "../lib/vue2/relation-graph.common.js");
            fs.renameSync(typesTsFile, typesTsFileInLib);
            console.log('[relation-graph]seeks-copy-types done!');
          }
        }, 3000);
      },
    }
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      // 为了使@导入别名像在 Vue CLI 中那样工作，我们需要添加这一点。
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    target: ['es2016'],
    cssTarget: ['es2016'],
    lib: {
      formats: ['es', 'umd', 'cjs'],
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RelationGraph',
      // the proper extensions will be added
      fileName: 'relation-graph'
    },
    outDir: resolve(__dirname, '../lib/vue2'),
    emptyOutDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'screenfull', 'html2canvas'],
      output: {
        // format: 'cjs', // 生成CommonJS模块
        format: 'es', // 生成ES模块
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          screenfull: 'screenfull',
          html2canvas: 'html2canvas'
        }
      }
    }
  }
});
