import { defineStore } from 'pinia';
import { ref, computed, toRaw } from 'vue';
import * as monaco from "monaco-editor";

export const useEditorStore = defineStore('editor', () => {
    const code = ref('{}');
    const parsedData = computed(() => {
        try {
            return JSON.parse(code.value);
        } catch (e) {
            return {};
        }
    });

    const selectedPath = ref([]);  // 保存选中的路径
    const selectedIndices = ref([]); // 保存选中节点的索引
    const selectedNodeData = ref(''); // 保存选中的节点数据
    const monacoLeft = ref<monaco.editor.IStandaloneCodeEditor>();
    const monacoRight = ref<monaco.editor.IStandaloneCodeEditor>();

    function setMonacoLeft(newCode: monaco.editor.IStandaloneCodeEditor) {
        monacoLeft.value = newCode;
    }

    function setMonacoRight(newCode: any) {
        monacoRight.value = newCode;
    }

    function updateCode(newCode: string) {
        code.value = newCode;
    }

    function updateSelectedPath(path: any[]) {
        selectedPath.value = path;
    }

    function updateSelectedNodeData(newData: string) {
        selectedNodeData.value = newData;
    }

    function resetSelection() {
        selectedPath.value = [];
        selectedNodeData.value = '';
    }

    // 将修改后的数据同步回 parsedData
    function updateNodeInParsedData(newValue: any) {
        let currentNode = parsedData.value;

        for (let i = 0; i < selectedPath.value.length - 1; i++) {
            const { key } = selectedPath.value[i];
            currentNode = currentNode[key];
        }

        const lastNode = selectedPath.value[selectedPath.value.length - 1];
        currentNode[lastNode.key] = newValue;

        // 同步更新代码
        const updatedCode = JSON.stringify(parsedData.value, null, 4);
        updateCode(updatedCode);

        // 使用 monaco 编辑器更新左侧的代码视图
        if (monacoLeft.value) {
            toRaw(monacoLeft.value)?.setValue(updatedCode);
        }
    }


    return {
        code,
        parsedData,
        selectedPath,
        monacoLeft,
        monacoRight,
        setMonacoLeft,
        setMonacoRight,
        selectedIndices,
        selectedNodeData,
        updateCode,
        updateSelectedPath,
        updateSelectedNodeData,
        resetSelection,
        updateNodeInParsedData,
    };
});
