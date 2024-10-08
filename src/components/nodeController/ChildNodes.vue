<template>
  <div class="child-nodes">
    <div class="tools"></div>
    <ul>
      <li v-for="node in nodes" :key="node.id" @click="selectNode(node)">
        {{ node.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// ChildNodes.vue
import { computed, defineEmits, defineProps, watch } from 'vue';

// 定义接收的 props
const props = defineProps({
  childData: Object
});

// 定义可能触发的事件
const emits = defineEmits(['select-child']);

// 使用计算属性来转换 childData 为节点列表
const nodes = computed(() => {
  if (props.childData && typeof props.childData === 'object') {
    return Object.entries(props.childData).map(([key, value]) => ({
      id: key,
      title: key,
      value: value
    }));
  }
  return [];
});

// 点击节点时触发的方法
const selectNode = (node) => {
  emits('select-child', node);
};

// 监听 childData 的变化，以便可以做出响应（如果需要）
watch(() => props.childData, (newValue, oldValue) => {
  // 例如，可以在这里处理其他逻辑，如果 childData 的结构或内容变化需要额外处理时
});
</script>

<style scoped>
.child-nodes {
  background: #fff;
  flex: 1;
  border: 1px solid #ccc;
}
.child-nodes li {
  cursor: pointer;
}
</style>
