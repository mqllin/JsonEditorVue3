<template>
  <div class="editor-bar">JSON编辑器</div>
  <div class="workbench">
    <editor-left class="editor-window"></editor-left>
    <div class="node-columns" id="node-columns">
      <div
          class="node-column"
          v-for="(nodes, index) in nodeColumns"
          :key="index"
          :class="{ empty: nodes.length === 0 }"
      >
        <node-selector
            :nodes="nodes"
            :selectedIndex="editorStore.selectedIndices[index]"
            :title="getKeynameForLevel(index)"
            @nodeSelected="(node, nodeIndex,isControlOrCommand) => handleNodeSelected(node, nodeIndex, index,isControlOrCommand)"
        ></node-selector>
      </div>
    </div>
    <editor-right
        class="editor-window"
        v-if="editorStore.selectedNodeData"
    ></editor-right>
  </div>
</template>

<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { useEditorStore } from '@/stores/editorStore';
import EditorLeft from '@/components/EditorLeft.vue';
import EditorRight from '@/components/EditorRight.vue';
import NodeSelector from '@/components/NodeSelector.vue';

const editorStore = useEditorStore();

// 计算每列的节点
const nodeColumns = computed(() => {
  const columns = [];
  let currentData = editorStore.parsedData;

  if (typeof currentData === 'object' && currentData !== null) {
    columns.push(
        Object.entries(currentData).map(([key, value]) => ({
          key,
          value,
        }))
    );
  } else {
    columns.push([{key: 'Root', value: currentData}]);
  }

  for (let i = 0; i < editorStore.selectedPath.length; i++) {
    const selectedNode = editorStore.selectedPath[i];
    if (selectedNode && typeof selectedNode.value === 'object' && selectedNode.value !== null) {
      currentData = selectedNode.value;
      columns.push(Object.entries(currentData).map(([key, value]) => ({key, value})));
    } else {
      break;
    }
  }

  while (columns.length < 3) {
    columns.push([]);
  }

  return columns;
});

// 获取每一层的 keyname
function getKeynameForLevel(index) {
  if (index === 0) {
    return 'Root';
  }
  const selectedNode = editorStore.selectedPath[index - 1];
  return selectedNode ? selectedNode.key : 'N/A';
}

// 处理节点选择
function handleNodeSelected(node, nodeIndex, columnIndex, isControlOrCommand:boolean) {
  console.log('isControlOrCommand',isControlOrCommand)

  if (isControlOrCommand) {
    // 按住了 Ctrl 或 Command 键，直接编辑当前节点
    editorStore.selectedNodeData = JSON.stringify(node.value, null, 2);
    console.log('editorStore.selectedNodeData',editorStore.selectedNodeData)
    setTimeout(() => {
      toRaw(useEditorStore().monacoRight)?.setValue(editorStore.selectedNodeData);
    }, 100);
  } else {
    // 正常点击，展开下一层
    editorStore.selectedPath = editorStore.selectedPath.slice(0, columnIndex);
    editorStore.selectedPath.push(node);
    editorStore.selectedIndices = editorStore.selectedIndices.slice(0, columnIndex);
    editorStore.selectedIndices.push(nodeIndex);

    if (typeof node.value !== 'object' || node.value === null || Object.keys(node.value).length === 0) {
      editorStore.selectedNodeData = JSON.stringify(node.value, null, 2);
      setTimeout(() => {
        toRaw(useEditorStore().monacoRight)?.setValue(editorStore.selectedNodeData);
      }, 100);
    } else {
      editorStore.selectedNodeData = '';
    }
  }
}

</script>

<style scoped lang="scss">
.workbench {
  display: flex;
  width: 100%;
  height: calc(100vh - 26px - 50px);
  overflow: hidden;
}

.editor-bar {
  height: 50px;
  background-color: #f1f2f3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #999;
}

.editor-window {
  width: 400px;
  height: calc(100vh - 26px - 50px);
  overflow-y: auto;
}

.node-columns {
  display: flex;
  overflow-x: auto;
  flex: 1;
}

.node-column {
  width: 200px;
  border-right: 1px solid #ddd;
}

.node-column.empty {
  background-color: #f0f0f0; /* Gray background */
}
</style>
