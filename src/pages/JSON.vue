<template>
  <div class="row" style="height: 500px">
    <div class="q-pa-md" style="width: 50%">
      <q-input
        v-model="text"
        filled
        type="textarea"
        hide-bottom-space
        :input-style="{ minHeight: '600px', maxHeight: '100%' }"
      />
    </div>
    <div class="q-pa-md" style="width: 50%">
      <div ref="jsoneditorNode" style="height: 600px" class=".col-5"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'jsoneditor/dist/jsoneditor.min.css';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import { watch, ref, onMounted } from 'vue';
const text = ref('{"message":"example json string"}');
let jsoneditorNode = ref<HTMLElement>();
let editor: JSONEditor;
const editorOptions: JSONEditorOptions = {
  modes: ['tree', 'code'],
};
watch(text, () => {
  setJsonValue();
});
onMounted(() => {
  if (jsoneditorNode.value) {
    editor = new JSONEditor(jsoneditorNode.value, editorOptions);
  }
});
function setJsonValue() {
  try {
    editor.set(JSON.parse(text.value));
  } catch (e) {
    editor.set(text.value);
  }
}
</script>
