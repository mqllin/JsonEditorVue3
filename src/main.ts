import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as monaco from 'monaco-editor';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



declare global {
    interface Window { MonacoEnvironment: any; }
}

window.MonacoEnvironment = {
    getWorker: function (_workerId: string, label: string): Worker {
        const getWorkerModule = (moduleUrl: string, label: string): Worker => {
            return new Worker(new URL(moduleUrl, import.meta.url), {
                name: label,
                type: 'module'
            });
        };

        switch (label) {
            case 'json':
                return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', 'json');
            case 'css':
            case 'scss':
            case 'less':
                return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', 'css');
            case 'typescript':
            case 'javascript':
                return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', 'typescript');
            default:
                return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', 'editor');
        }
    }
};
