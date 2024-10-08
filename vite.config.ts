import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteStaticCopy } from 'vite-plugin-static-copy';
const prefix = `monaco-editor/esm/vs`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/monaco-editor/min/vs/base/worker/workerMain.js',
          dest: 'assets/monaco-editor'
        },
        {
          src: 'node_modules/monaco-editor/min/vs/editor/editor.worker.js',
          dest: 'assets/monaco-editor'
        },
        {
          src: 'node_modules/monaco-editor/min/vs/language/json/json.worker.js',
          dest: 'assets/monaco-editor'
        },
        // Include additional workers as needed
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {

        manualChunks: {
          jsonWorker: [`${prefix}/language/json/json.worker`],
          cssWorker: [`${prefix}/language/css/css.worker`],
          htmlWorker: [`${prefix}/language/html/html.worker`],
          tsWorker: [`${prefix}/language/typescript/ts.worker`],
          editorWorker: [`${prefix}/editor/editor.worker`],
          'monaco-editor': ['monaco-editor']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
