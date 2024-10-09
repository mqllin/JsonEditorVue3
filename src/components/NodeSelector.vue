<template>
  <div class="node-selector">
    <div class="title">{{ title }}</div>
    <ul v-if="nodes.length > 0">
      <li
          v-for="(node, nodeIndex) in nodes"
          :key="node.key"
          @click="(event) => selectNode(node, nodeIndex, event)"
          :class="{ 'selected': nodeIndex === selectedIndex }"
      >
        <span>{{ node.key }}</span>
        <span class="type">{{ getType(node) }}</span>
      </li>
    </ul>
    <div v-else class="empty-message">
      无数据
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  nodes: Array,
  title: String,
  selectedIndex: Number, // 接收选中的索引
});

const emits = defineEmits(['nodeSelected']);

function selectNode(node, nodeIndex, event) {
  const isControlOrCommand = event.ctrlKey || event.metaKey;  // 检测是否按下 Ctrl 或 Command 键
  emits('nodeSelected', node, nodeIndex, isControlOrCommand);
}

function getType(node) {
  if (node.value === null) {
    return 'null';
  }
  if (Array.isArray(node.value)) {
    return `array[${node.value.length}]`;
  }
  return typeof node.value;
}
</script>

<style scoped>
.node-selector {
  background: #fff;
  height: 100%;
  overflow-y: auto;
}

.title {
  font-weight: bold;
  background: #f1f2f3;
  padding: 8px 16px;
  border-bottom: 1px solid #ddd;
}

.node-selector ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.node-selector li {
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.node-selector li:hover {
  background-color: #f5f5f5;
}

.node-selector li.selected {
  background-color: #d0eaff; /* 高亮显示选中的节点 */
}

.empty-message {
  padding: 8px 16px;
  color: #999;
}

.type {
  background: #f1f2f3;
  border-radius: 3px;
  color: #777;
  text-align: center;
  margin-left: 10px;
  font-size: 12px;
  line-height: 14px;
  padding: 3px 5px;
  font-weight: bold;
}
</style>
