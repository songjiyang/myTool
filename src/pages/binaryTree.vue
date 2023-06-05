<template>
  <div ref="rootContianer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, h, render, VNode } from 'vue';
import { MergeView } from '@codemirror/merge';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
let rootContianer = ref<Element>();

let doc = [1, 2, 3, 4, null, 5, 6, 7, 8];
let paddingLength = Math.pow(2, Math.ceil(Math.log2(doc.length)));
for (let i = doc.length; i < paddingLength; i++) {
  doc.push(null);
}
console.log(doc);
let depthContianer: VNode[] = [];
let depthContianerDone: boolean[] = [];
onMounted(() => {
  debugger;
  depthContianer;
  let root = renderNode(doc, 0, 0);
  render(root, rootContianer.value);
});

function renderNode(data, i, depth) {
  let newContainer;
  if (depthContianer[depth]) {
    newContainer = depthContianer[depth];
  } else {
    newContainer = h(
      'div',
      {
        style:
          'display: flex;align-content: space-around;justify-content: space-around',
      },
      []
    );
    depthContianer[depth] = newContainer;
  }

  // no left node and right node
  if (2 * i + 1 > data.length - 1) {
    // do render
    let textNode = h('div', { class: 'text' }, data[i]);
    let newNode = h(
      'div',
      { class: data[i] ? 'circle' : 'circle-empty' },
      textNode
    );

    return newNode;
  } else {
    let nowContainer = h(
      'div',
      {
        style:
          'display: flex;align-content: space-around;justify-content: space-around',
      },
      []
    );
    let leftNode = renderNode(data, 2 * i + 1, depth + 1);
    nowContainer.children.push(leftNode);
    if (2 * i + 2 <= data.length - 1) {
      let rightNode = renderNode(data, 2 * i + 2, depth + 1);
      nowContainer.children.push(rightNode);
    }

    let textNode = h('div', { class: 'text' }, data[i]);
    let newNode = h(
      'div',
      { class: data[i] ? 'circle' : 'circle-empty' },
      textNode
    );
    // newContainer.children.push(newNode);

    let parentContainer = h('div', null, []);

    parentContainer.children.push(newNode);
    parentContainer.children.push(nowContainer);
    return parentContainer;
  }
}
</script>
<style>
.circle {
  position: relative;
  background-color: 'white';
  margin: 20px auto;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border-width: 1px;
  border-style: solid;
}
.circle-empty {
  position: relative;
  background-color: 'white';
  margin: 20px auto;
  width: 50px;
  height: 50px;
  border-radius: 25px;
}
.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: 'black';
}
</style>
