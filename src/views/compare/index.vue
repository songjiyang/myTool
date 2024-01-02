<template>
  <div ref="body" style="height: 100%" class="q-pa-md" ></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MergeView } from '@codemirror/merge';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
let body = ref<HTMLElement>();

let doc = `one
two
three
four
five`;

onMounted(() => {
  new MergeView({
    a: {
      doc,
      extensions: basicSetup,

    },
    b: {
      doc: doc.replace(/t/g, 'T') + '\nSix',
      extensions: [
        basicSetup,
        EditorView.editable.of(true),
        EditorState.readOnly.of(false),
      ],
    },
    parent: body.value,
  });
});
</script>
