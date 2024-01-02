<template>
	<div>
		<div style="height: 8%"><n-space>
				<n-button type="primary" @click="newJsonTab">
					新增
				</n-button>
				<n-button type="tertiary">
					重置
				</n-button>
				</n-space></div>
		<n-grid :cols="4" x-gap="10" style="height: 92%">
			<n-gi :span="1">
				<n-input v-model:value="text" filled type="textarea" hide-bottom-space style="height: 100%" />
			</n-gi>
			<n-gi :span="3">
				<div ref="jsoneditorNode" style="height: 100%"></div>
			</n-gi>
		</n-grid>
	</div>
</template>

<script setup lang="ts">
import 'jsoneditor/dist/jsoneditor.min.css';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import { watch, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useRouterPush } from '@/composables';
import { routeName } from '@/router';
import { useAppStore, useTabStore } from '@/store';
import { useRoute } from 'vue-router';

const { routerPush } = useRouterPush();
const text = ref('{"message":"example json string"}');
const app = useAppStore();
const route = useRoute();
const tabStore = useTabStore();
let jsoneditorNode = ref<HTMLElement>();
let editor: JSONEditor;
const editorOptions: JSONEditorOptions = {
	modes: ['tree', 'code'],
	timestampFormat(node) {
		return dayjs(node.value).format('YYYY-MM-DD HH:mm:ss:SSS');
	},
};
watch(text, () => {
	setJsonValue();
});
onMounted(() => {
	if (jsoneditorNode.value) {
		editor = new JSONEditor(jsoneditorNode.value, editorOptions);
	}
	if(route.query.num){
		let newName = route.meta.title + route.query.num;
		app.setJsonPageNum();
    tabStore.setActiveTabTitle(newName);
	}
});
function setJsonValue() {
	try {
		editor.set(JSON.parse(text.value));
	} catch (e) {
		editor.set(text.value);
	}
}

function newJsonTab() {
  routerPush({ name: routeName('json_format')  , query: { num: app.getJsonPageNum() }});
}
</script>
