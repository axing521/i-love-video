<!-- 对于Asset和selectedAsset的三种操作：select，delete，add都在该组件中完成 -->
<!-- select(change)和add都是其他组件发送的自定义事件处理，看似麻烦一点，但避免了其他组件import pinia的工作，且易于后期维护 -->
<!-- 但是strip的资产选择操作并不在pinia中，考虑到不同strip具有不同类asset，难以复用 -->

<template>
  <h2 @click="store.selectedAsset = null">Asset window</h2>
  <div class="assets-list">
    <el-scrollbar>
      <AssetListItem
        v-for="(asset, index) in project.assets"
        :key="index"
        :asset="asset"
        :selected="store.selectedAsset?.id === asset.id"
        @select-asset="store.changeSelectedAsset(asset)"
      />
    </el-scrollbar>
  </div>
  <div class="assets-button">
    <input ref="refUpdateAsset" type="file" style="display: none" @change="(e: Event) => store.updateAsset(e)" />
    <el-button :icon="UploadFilled" type="success" @click="refUpdateAsset?.click()" v-if="store.selectedAsset"
      >Update</el-button
    >
    <FileButton @add-asset="store.addAsset" />
    <el-button :icon="Delete" @click="store.deleteSelectedAsset" :disabled="store.selectedAsset?.id === undefined"
      >Delete</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { Delete, UploadFilled } from '@element-plus/icons-vue'

// pinia的基本使用，从store中解构出project
import { useStore } from '../../store/project'
import { storeToRefs } from 'pinia'
import FileButton from '../widget/FileButton.vue'
const store = useStore()
const { project } = storeToRefs(store)

const refUpdateAsset = ref<HTMLInputElement>()
// 定义selected变量，完成被选中资产的css样式变化
// const selected = ref<Asset | null>()
</script>

<style scoped>
.assets-list {
  height: 45vh;
}
.assets-button {
  float: right;
}
</style>
