<template>
  <el-button :icon="Upload" @click="input?.click()">
    Upload
    <input type="file" ref="input" style="display: none" @change="change" />
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { throwNotice } from '../../plugins/notice'
import { Upload } from '@element-plus/icons-vue'
const input = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'addAsset', value: File): void
}>()
const change = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  if (target.files.length > 1) throw throwNotice('error', 'Not support multiple files.')
  const file = target.files[0]
  emit('addAsset', file)
}
</script>

<style scoped></style>
