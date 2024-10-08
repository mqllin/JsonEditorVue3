<template>
  <div class="editor" ref="editorContainer" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref, watch } from "vue";
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker()
    if (label === 'json') return new JsonWorker()
    if (label === 'css') return new CssWorker()
    if (label === 'html') return new HtmlWorker()
    return new EditorWorker()
  }
}
const editorContainer = ref(null);

defineProps({
  height: {
    type: String,
    default: 'calc(100% - 24px)',
  },
  width: {
    type: String,
    default: '300px',
  },

});

const emits = defineEmits(['update:modelValue', 'onChangeCode']);

let editor:monaco.editor.IStandaloneCodeEditor;

onMounted(() => {
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: '{"status":"code load"}',
      language: 'json',
      theme: 'vs-dark',
      automaticLayout: true, // 确保编辑器布局自动更新
      // 禁用可能影响性能的配置项
      minimap: {enabled: false},
      scrollbar: {vertical: 'auto'},
      scrollBeyondLastLine: false,
      readOnly: false  // 仅在必要时设为只读以提高性能
    });
    editor.onDidChangeModelContent((event) => {
      const currentCode = editor.getValue();
      emits('onChangeCode', currentCode);  // Emitting the current code to parent
    });
    emits('update:modelValue', editor); // 初始化时立即发送编辑器实例
  }
});
</script>

<style>
.editor {
  display: block;
}
</style>
