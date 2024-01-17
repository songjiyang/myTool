<template>
	<div>
		<n-input
			@change="makeTreeFromArrayStr"
			placeholder="[
	1,2,3,4,5,6
]"
		></n-input>
		<div
			ref="rootContainer"
			style="margin: 10px; height: 100%; display: flex; overflow: auto"
		></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, h, render,  VNodeArrayChildren } from "vue";
let rootContainer = ref<Element>();

let doc = "[0, 2, 4, 1, null, 3, -1, 5, 1, null, 6, null, 8]";
// for(let i = 0; i < doc.length; i++) {
// 	doc[i] = i+1;
// }

let maxDepth = Math.ceil(Math.log2(doc.length));

onMounted(() => {
	makeTreeFromArrayStr(doc);
});

function renderNode(data: number[], i: number, depth: number, left: boolean) {
	// no left node and right node
	if (2 * i + 1 > data.length - 1) {
		// do render

		return renderOneNode(data[i], left, depth);
	} else {
		let nowContainer = h(
			"div",
			{
				style: "display: flex;overflow: auto",
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

		let parentContainer = h("div", null, []);

		(parentContainer.children as VNodeArrayChildren).push(newNode);
		(parentContainer.children as VNodeArrayChildren).push(nowContainer);
		return parentContainer;
	}
}

function renderOneNode(oneData: number, left: boolean, depth: number) {
	let textNode = h("div", { class: "text" }, oneData);
	let circleNode = h(
		"div",
		{ class: oneData || oneData == 0 ? "circle" : "circle-empty" },
		textNode
	);
	let wholeNode = h("div", null, []);
	if (left != null && (oneData || oneData == 0)) {
		let width = Math.pow(2, maxDepth - depth) * 50;
		let linkNode = h(
			"div",
			{
				style: `width: ${width}px; height: 50px; overflow: auto`,
				class: left ? "left-line" : "right-line",
			},
			undefined
		);
		(wholeNode.children as VNodeArrayChildren).push(linkNode);
	} else {
		let width = Math.pow(2, maxDepth - depth) * 50;
		let linkNode = h(
			"div",
			{
				style: `width: ${width}px; height: 50px; overflow: auto`,
			},
			undefined
		);
		(wholeNode.children as VNodeArrayChildren).push(linkNode);
	}
	(wholeNode.children as VNodeArrayChildren).push(circleNode);

	return wholeNode;
}

function makeTreeFromArrayStr(arrayStr: string) {
	arrayStr = arrayStr.replace("[", "").replace("]", "").replaceAll(" ", "");
	let split = arrayStr.split(",");
	let numbers: Array<number | null> = [];
	debugger;
	for (let i = 0; i < split.length; i++) {
		if ("null" === split[i]) {
			numbers.push(null);
		} else {
			numbers.push(parseInt(split[i]));
		}
	}


	console.log(numbers);

	let rs: Array<TreeNode | null> = [];
	rs.push(new TreeNode(numbers[0], null, null));

	for (let i = 0; i < (numbers.length - 1) / 2; i++) {
		while (rs.length < 2 * i + 3) {
			rs.push(null);
		}
		if (rs[i] == null) {
			rs.splice(2 * i + 1, 0, null);
			rs.splice(2 * i + 2, 0, null);
			numbers.splice(2 * i + 1, 0, null);
			numbers.splice(2 * i + 2, 0, null);
			continue;
		}
		if (numbers[2 * i + 1] == null) {
			rs[i].left = null;
		} else {
			rs[i].left = new TreeNode(numbers[2 * i + 1], null, null);
			rs.splice(2 * i + 1, 0, rs[i].left);
		}

		if (numbers[2 * i + 2] == null) {
			rs[i].right = null;
		} else {
			rs[i].right = new TreeNode(numbers[2 * i + 2], null, null);
			rs.splice(2 * i + 2, 0, rs[i].right);
		}
	}
	 maxDepth = parseInt(Math.log(numbers.length) / Math.log(2)) + 1;
	let pow = Math.pow(2, maxDepth);
	for (let i = numbers.length; i < pow - 1; i++) {
		numbers.push(null);
	}
	let root = renderNode(numbers, 0, 1, null);

	render(root, rootContainer.value as Element);
}
class TreeNode {
	val;
	left;
	right;

	constructor(
		val: number | null,
		left: TreeNode | null,
		right: TreeNode | null
	) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}
</script>
<style>
.circle {
	position: relative;
	background-color: "white";
	margin: 0px auto;
	width: 50px;
	height: 50px;
	border-radius: 25px;
	border-width: 1px;
	border-style: solid;
}

.circle-empty {
	position: relative;
	background-color: "white";
	margin: 0px auto;
	width: 50px;
	height: 50px;
	border-radius: 25px;
}

.text {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: "black";
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
</style>
