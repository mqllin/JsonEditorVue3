<!-- NodeSelector.vue -->
<template>
  <div class="node-selector">
    <ul v-if="nodes.length > 0">
      <li
          v-for="node in nodes"
          :key="node.key"
          @click="selectNode(node)"
      >
        {{ node.key }}
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
});

const emits = defineEmits(['nodeSelected']);

function selectNode(node) {
  emits('nodeSelected', node);
}
</script>

<style scoped>
.node-selector {
  background: #fff;
  height: 100%;
  overflow-y: auto;
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
.empty-message {
  padding: 8px 16px;
  color: #999;
}
</style>
