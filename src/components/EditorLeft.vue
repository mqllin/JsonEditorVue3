<!-- EditorLeft.vue -->
<template>
  <div>
    <MonacoEditor class="monaco" @onChangeCode="onChangeCode"/>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editorStore';
import MonacoEditor from './Monaco.vue';
const store = useEditorStore();

const onChangeCode = (code: string) => {
  console.log('[onChangeCode]', code)
  store.updateCode(code);
}
</script>

<style>
.monaco {
  height: 100%;
}
</style>
