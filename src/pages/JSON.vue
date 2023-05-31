<template>
  <div class="row q-col-gutter-none">
    <div class="q-pa-md" style="width: 50%; max-height: 60%">
      <q-input v-model="text" filled autogrow type="textarea" />
    </div>
    <div style="width: 50%">
      <q-input v-model="selectValue" type="text" />
      <json-viewer :value="jsonValue"> </json-viewer>
    </div>
  </div>
</template>

<script setup lang="ts">
import JsonViewer from 'vue-json-viewer';
import { watch, ref } from 'vue';
import jp from 'jsonpath';
const text = ref('xx');
let jsonValue = ref('');
let selectValue = ref('');
let tmpJsonValue = '';
setJsonValue();

watch(text, () => {
  setJsonValue();
});

watch(selectValue, () => {
  selectJsonValue(selectValue);
});
function selectJsonValue(selectValue) {
  try {
    if (selectValue.value) {
      if (!tmpJsonValue) {
        tmpJsonValue = JSON.parse(text.value);
      }
      let nodes = jp.nodes(tmpJsonValue, selectValue.value);
      let sv = [];
      for (let one of nodes) {
        sv.push(one['value']);
      }
      jsonValue.value = sv;
    } else {
      setJsonValue();
      tmpJsonValue = '';
    }
  } catch (e) {}
}
function setJsonValue() {
  try {
    jsonValue.value = JSON.parse(text.value);
    debugger;
    if (
      jsonValue.value instanceof String ||
      typeof jsonValue.value === 'string'
    ) {
      jsonValue.value = JSON.parse(jsonValue.value);
    }
  } catch (e) {
    jsonValue.value = 'invalid json';
  }
}
</script>
