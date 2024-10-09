<template>
  <div class="editor-right-container">
    <MonacoEditor
        class="monaco"
        @onInit="onInit"
        @onChangeCode="onChangeCode"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useEditorStore } from '@/stores/editorStore';
import MonacoEditor from "./Monaco.vue";

const editorStore = useEditorStore();
const editorValue = ref(editorStore.selectedNodeData);

// 更新代码
const onInit = (e: monaco.editor.IStandaloneCodeEditor) => {
  editorStore.setMonacoRight(e);
};

// 更新代码
const onChangeCode = (code: string) => {
  editorValue.value = code;
};

// 保存数据并更新中间的节点
function handleSave() {
  try {
    // 尝试将编辑器中的值解析为JSON并更新节点
    const updatedValue = JSON.parse(editorValue.value);

    // 更新当前选中节点的数据
    editorStore.updateSelectedNodeData(updatedValue);

    // 将修改同步回 parsedData
    editorStore.updateNodeInParsedData(updatedValue);

    console.log('保存成功');
  } catch (error) {
    console.error('JSON 格式有误，无法保存', error);
    alert("JSON 格式有误，无法保存");
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

// 监听快捷键 (Ctrl + S 或 Cmd + S)
function handleKeyDown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    handleSave();
  }
}
</script>

<style>
.editor-right-container {
  height: 100%;
}

.monaco {
  height: 100%;
}
</style>
