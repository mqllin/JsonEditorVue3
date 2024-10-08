<!-- EditorView.vue -->
<template>
  <div class="editor-bar">JSON编辑器</div>
  <div class="workbench">
    <editor-left class="editor-window"></editor-left>
    <div class="node-columns">
      <div
          class="node-column"
          v-for="(nodes, index) in nodeColumns"
          :key="index"
          :class="{ empty: nodes.length === 0 }"
      >
        <node-selector
            :nodes="nodes"
            @nodeSelected="(node) => handleNodeSelected(node, index)"
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
import { computed, watch } from 'vue';
import { useEditorStore } from '@/stores/editorStore';
import EditorLeft from '@/components/EditorLeft.vue';
import EditorRight from '@/components/EditorRight.vue';
import NodeSelector from '@/components/NodeSelector.vue';

const editorStore = useEditorStore();

// Compute the node columns based on the selected path
const nodeColumns = computed(() => {
  const columns = [];
  let currentData = editorStore.parsedData;

  console.log('currentData',currentData)
  // First column: root nodes
  columns.push(
      Object.entries(currentData).map(([key, value]) => ({
        key,
        value,
      }))
  );

  // Subsequent columns based on selected path
  for (let i = 0; i < editorStore.selectedPath.length; i++) {
    const selectedNode = editorStore.selectedPath[i];
    if (
        selectedNode &&
        typeof selectedNode.value === 'object' &&
        selectedNode.value !== null
    ) {
      currentData = selectedNode.value;
      const entries = Object.entries(currentData);
      if (entries.length > 0) {
        columns.push(
            entries.map(([key, value]) => ({
              key,
              value,
            }))
        );
      } else {
        columns.push([]);
      }
    } else {
      break;
    }
  }

  // Ensure at least 3 columns
  while (columns.length < 3) {
    columns.push([]);
  }

  return columns;
});

// Handle node selection
function handleNodeSelected(node, index) {
  editorStore.selectedPath = editorStore.selectedPath.slice(0, index);
  editorStore.selectedPath.push(node);
  if (
      typeof node.value !== 'object' ||
      node.value === null ||
      Object.keys(node.value).length === 0
  ) {
    editorStore.selectedNodeData = JSON.stringify(node.value, null, 2);
  } else {
    editorStore.selectedNodeData = '';
  }
}

// Watch for changes in code to reset selection
watch(
    () => editorStore.code,
    () => {
      editorStore.resetSelection();
    }
);
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
}

.editor-window {
  height: calc(100vh - 26px - 50px);
  overflow-y: auto;
}

.node-columns {
  display: flex;
  overflow-x: auto;
}

.node-column {
  width: 200px;
  border-right: 1px solid #ddd;
}

.node-column.empty {
  background-color: #f0f0f0; /* Gray background */
}
</style>
