<template>
  <el-dialog
    :lock-scroll="false"
    v-model="dialogVisible"
    title="Introduction"
    width="30%"
    :show-close="false"
    :before-close="beforeClose"
  >
    <div class="introduction-card">
      <div class="previous">
        <el-button size="large" type="text" :icon="ArrowLeftBold" @click="preview"></el-button>
      </div>
      <div class="next">
        <el-button size="large" type="text" :icon="ArrowRightBold" @click="next"></el-button>
      </div>
      <IntroCard :step="step" />
    </div>
    <el-steps :space="200" :active="step" simple>
      <el-step title="Step 1" :icon="Upload" />
      <el-step title="Step 2" :icon="Plus" />
      <el-step title="Step 3" :icon="Edit" />
    </el-steps>
  </el-dialog>
</template>

<script setup lang="ts">
import { Edit, Plus, UploadFilled, ArrowLeftBold, ArrowRightBold, Upload } from '@element-plus/icons-vue'
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

const step = ref(1)
const preview = () => {
  step.value = step.value === 1 ? 1 : step.value - 1
}
const next = () => {
  step.value = step.value === 3 ? 3 : step.value + 1
}
</script>

<style scoped>
.introduction-card {
  height: 40vh;
}
.introduction-card:hover .previous {
  visibility: visible;
}
.introduction-card:hover .next {
  visibility: visible;
}
.previous {
  position: absolute;
  top: 40%;
  visibility: hidden;
}
.next {
  position: absolute;
  top: 40%;
  right: 20px;
  visibility: hidden;
}
</style>
