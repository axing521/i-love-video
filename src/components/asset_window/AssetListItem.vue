<template>
  <div @click="emit('select-asset')" :style="getStyle">
    <el-icon v-if="asset.type === 'Image'"><picture-filled /></el-icon>
    <el-icon v-else-if="asset.type === 'Video'"><film /></el-icon>
    <el-icon v-else><microphone /></el-icon>
    {{ asset.name }}
  </div>
  <hr />
</template>

<script setup lang="ts">
import { StyleValue } from 'vue'
import { Asset } from '../../models'
import { PictureFilled, Film, Microphone } from '@element-plus/icons-vue'
const props = defineProps<{
  asset: Asset
  selected: boolean
}>()
const getStyle = computed((): StyleValue => {
  if (props.selected)
    return {
      // backgroundColor: 'yellow',
      color: 'green',
      cursor: 'pointer',
      borderRight: '2px solid green'
    }
  return {
    cursor: 'pointer'
  }
})

const emit = defineEmits<{
  (e: 'select-asset'): void
}>()
// const handleMouse = (e: MouseEvent) => {
//   if (e.button === 0) {
//     emit('select-asset')
//   }
//   if (e.button === 2) {
//     console.log('delete')
//   }
// }
</script>

<style scoped></style>
