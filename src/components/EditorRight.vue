<template>
  <div>
    <MonacoEditor
        class="monaco"
        v-model="editorValue"
        @change="onDataChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import MonacoEditor from "./Monaco.vue";

const props = defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue", "dataChanged"]);

const editorValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
      editorValue.value = newVal;
    }
);

function onDataChange(newValue) {
  emits("update:modelValue", newValue);
  emits("dataChanged", newValue);
}
</script>

<style>
.monaco {
  height: 100%;
}
</style>
