<template>
  <div class="current-level-nodes">
    <div class="tools"></div>
    <ul>
      <li v-for="node in nodes" :key="node.id" @click="selectNode(node)">
        {{ node.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// CurrentLevelNodes.vue
import { ref, watch, defineProps, defineEmits, computed } from 'vue';

// 使用 defineProps 来定义 props
const props = defineProps({
  selectedNode: Object
});

// 定义 emits
const emits = defineEmits(['update:modelValue', 'nodeSelected','select-parent']);

// 计算 nodes 从 selectedNode
const nodes = computed(() => {
  if (props.selectedNode && props.selectedNode.value && typeof props.selectedNode.value === 'object') {
    return Object.entries(props.selectedNode.value).map(([key, value]) => ({
      id: key,
      title: key,
      value: value
    }));
  }
  return [];
});

// selectNode 方法发射选择的节点
const selectNode = (node) => {
  emits('select-parent', node);
};

// 监听 selectedNode 的变化
watch(() => props.selectedNode, (newVal) => {
  if (newVal) {
    // 可以在这里处理对 selectedNode 的反应，如果需要的话
  }
});
</script>

<style scoped>
.current-level-nodes {
  background: #fff;
  flex: 1;
  border: 1px solid #ddd;
}
.current-level-nodes li {
  cursor: pointer;
}
</style>
