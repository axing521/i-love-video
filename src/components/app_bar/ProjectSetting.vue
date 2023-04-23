<template>
  <el-dialog
    v-model="dialogVisible"
    title="Project Setting"
    width="20%"
    :show-close="false"
    :before-close="beforeClose"
    :lock-scroll="false"
  >
    <el-form label-width="120px" size="default">
      <el-form-item label="Project Name">
        <el-input v-model="project.name" />
      </el-form-item>
      <el-form-item label="Fps">
        <el-input-number v-model="project.fps" :max="60" />
      </el-form-item>
      <el-form-item label="Width">
        <el-input-number v-model="project.width" />
      </el-form-item>
      <el-form-item label="Height">
        <el-input-number v-model="project.height" />
      </el-form-item>
      <el-form-item label="Duration">
        <el-input-number v-model="project.duration" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="emit('update:dialogVisible', false)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
// pinia的基本使用，从store中解构出project
import { useStore } from '../../store/project'
import { storeToRefs } from 'pinia'
const store = useStore()
const { project } = storeToRefs(store)

interface Props {
  dialogVisible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false
})
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: boolean): void
}>()

const beforeClose = () => {
  emit('update:dialogVisible', false)
}
</script>

<style scoped></style>
