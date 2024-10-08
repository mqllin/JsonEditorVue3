<template>
  <div class="root-nodes">
    rootNodesData={{rootNodesData}}
    <ul>

      <li v-for="node in rootNodesData" :key="node.id" @click="selectNode(node)">
        {{ node.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// RootNodes.vue
import { defineProps } from 'vue';

const props = defineProps({
  rootNodesData: Array
});

function selectNode(node) {
  console.log(node);
}
</script>

<style scoped>
.root-nodes {
  background: #fff;
  flex: 1;
  border: 1px solid #eee;
}
.root-nodes li {
  cursor: pointer;
}
</style>
