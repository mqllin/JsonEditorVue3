<template>
  <div>
    <MonacoEditor class="monaco" @onInit="onInit" @onChangeCode="onChangeCode"
                  @onCursorPositionChange="onCursorPositionChange"/>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore';
import MonacoEditor from './Monaco.vue';
import { ref } from "vue";
import * as monaco from "monaco-editor";

const store = useEditorStore();

// 更新代码
const onInit = (e: monaco.editor.IStandaloneCodeEditor) => {
  store.setMonacoLeft(e);
  e.setValue(`{"status":"success"}`)
};
const onChangeCode = (code: string) => {
  store.updateCode(code);

};

// 处理光标位置变化
const onCursorPositionChange = (position: { lineNumber: number; column: number }) => {

};

</script>

<style>
.monaco {
  height: 100%;
}
</style>
