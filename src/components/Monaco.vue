<template>
  <div class="editor" ref="editorContainer" :style="{ height, width }"></div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref, toRaw } from "vue";
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TsWorker();
    if (label === 'json') return new JsonWorker();
    return new EditorWorker();
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
    default: '100%',
  },
});

const emits = defineEmits(['update:modelValue', 'onChangeCode', 'onCursorPositionChange', 'onInit']);

let editor: monaco.editor.IStandaloneCodeEditor;

onMounted(() => {
  if (editorContainer.value) {
    editor = monaco.editor.create(editorContainer.value, {
      value: '',
      language: 'json',
      theme: 'vs-dark',
      automaticLayout: true,
      minimap: {enabled: false},
      scrollbar: {vertical: 'auto'},
      scrollBeyondLastLine: false,
      readOnly: false
    });
    emits('onInit', editor);

    editor.onDidChangeModelContent(() => {
      const currentCode = toRaw(editor).getValue();
      emits('onChangeCode', currentCode);
    });
    // 按下 Ctrl+S 时触发
    window.addEventListener('keydown', handleKeyDown);

    // 监听光标位置变化
    editor.onDidChangeCursorPosition(() => {
      const position = editor.getPosition();
      if (position) {
        emits('onCursorPositionChange', position);
      }
    });
  }
});


// 监听快捷键 (Ctrl + S 或 Cmd + S)
function handleKeyDown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    editor.getAction('editor.action.formatDocument')?.run();
  }
}
</script>

<style>
.editor {
  display: block;
}
</style>
