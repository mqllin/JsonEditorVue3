// src/stores/editorStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useEditorStore = defineStore('editor', () => {
    // The code content from the editor
    const code = ref('{}');

    // Parsed JSON data
    const parsedData = computed(() => {
        try {
            if (code.value) {
                return JSON.parse(code.value);
            } else {
                console.error('无效的JSON',code.value)
                return code.value;
            }
        } catch (e) {
            console.error('Invalid JSON:', e);
            return {};
        }
    });

    // Selected path in the node columns
    const selectedPath = ref([]);

    // Data for the selected node
    const selectedNodeData = ref('');

    // Function to update the code
    function updateCode(newCode: string) {
        code.value = newCode;
    }

    // Function to update the selected node data
    function updateSelectedNodeData(newData: string) {
        selectedNodeData.value = newData;
    }

    // Function to reset selected path and node data when code changes
    function resetSelection() {
        selectedPath.value = [];
        selectedNodeData.value = '';
    }

    return {
        code,
        parsedData,
        selectedPath,
        selectedNodeData,
        updateCode,
        updateSelectedNodeData,
        resetSelection,
    };
});
