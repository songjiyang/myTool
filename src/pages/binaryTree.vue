<template>
  <div ref="rootContianer" class="root"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, h, render, VNode, VNodeArrayChildren } from 'vue';
let rootContianer = ref<Element>();

let doc = [1, 3, 2, null, 6, 4, 5, null, null, null, null, 8, 7];
let maxDepth = Math.ceil(Math.log2(doc.length));
let paddingLength = Math.pow(2, maxDepth);
for (let i = doc.length; i < paddingLength; i++) {
  doc.push(null);
}
console.log(doc);

onMounted(() => {
  let root = renderNode(doc, 0, 1, null);
  render(root, rootContianer.value as Element);
});

function renderNode(data, i, depth, left) {
  // no left node and right node
  if (2 * i + 1 > data.length - 1) {
    // do render

    return renderOneNode(data[i], left, depth);
  } else {
    let nowContainer = h(
      'div',
      {
        style: 'display: flex;align-content: center;justify-content: center',
      },
      []
    );
    let leftNode = renderNode(data, 2 * i + 1, depth + 1, true);
    (nowContainer.children as VNodeArrayChildren).push(leftNode);
    if (2 * i + 2 <= data.length - 1) {
      let rightNode = renderNode(data, 2 * i + 2, depth + 1, false);
      (nowContainer.children as VNodeArrayChildren).push(rightNode);
    }

    let newNode = renderOneNode(data[i], left, depth);

    let parentContainer = h('div', null, []);

    (parentContainer.children as VNodeArrayChildren).push(newNode);
    (parentContainer.children as VNodeArrayChildren).push(nowContainer);
    return parentContainer;
  }
}

function renderOneNode(oneData: number, left: boolean, depth: number) {
  let textNode = h('div', { class: 'text' }, oneData);
  let circleNode = h(
    'div',
    { class: oneData ? 'circle' : 'circle-empty' },
    textNode
  );
  let wholeNode = h('div', null, []);
  if (left != null && oneData) {
    let width = Math.pow(2, maxDepth - depth) * 50;
    let linkNode = h(
      'div',
      {
        style: `width: ${width}px; height: 50px; overflow: auto`,
        class: left ? 'left-line' : 'right-line',
      },
      undefined
    );
    (wholeNode.children as VNodeArrayChildren).push(linkNode);
  }
  (wholeNode.children as VNodeArrayChildren).push(circleNode);
  return wholeNode;
}
</script>
<style>
.circle {
  position: relative;
  background-color: 'white';
  margin: 0px auto;
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
.left-line {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='50' y1='100' x2='100' y2='0' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%, auto;
  margin-left: auto;
  margin-right: 0;
}
.right-line {
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><line x1='0' y1='0' x2='50' y2='100' stroke='black' vector-effect='non-scaling-stroke'/></svg>");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%, auto;
}
.root {
  margin-top: 30px;
}
</style>
