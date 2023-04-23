<template>
  <!-- 自selectedStrip创建之时，便于strip实现了同步更新，详见project.ts的changeSelectedStrip() -->
  <el-scrollbar>
    <component
      :is="getStripComps"
      v-if="store.selectedStrip"
      :strip="store.selectedStrip"
      :assets="store.project.assets"
    />
  </el-scrollbar>
</template>

<script setup lang="ts">
import TextStripInspect from './TextStripInspect.vue'
import ImageStripInspect from './ImageStripInspect.vue'
import VideoStripInspect from './VideoStripInspect.vue'
import AudioStripInspect from './AudioStripInspect.vue'
import { useStore } from '../../store/project'
const store = useStore()

const getStripComps = computed(() => {
  switch (store.selectedStrip?.type) {
    case 'Text':
      return TextStripInspect
    case 'Video':
      return VideoStripInspect
    case 'Image':
      return ImageStripInspect
    case 'Audio':
      return AudioStripInspect

    default:
      break
  }
})
</script>

<style scoped></style>
