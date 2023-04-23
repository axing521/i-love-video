<template>
  <!-- <el-button :icon="VideoPlay" size="default" circle v-if="!store.isPlay" @click="store.isPlay = !store.isPlay" />
  <el-button :icon="VideoPause" size="default" circle v-else @click="store.isPlay = !store.isPlay" />-->
  <div style="cursor: pointer; margin-left: 49vw">
    <el-icon :size="26" v-if="!store.isPlay" @click="store.isPlay = !store.isPlay"><video-play /></el-icon>
    <el-icon :size="26" v-else @click="store.isPlay = !store.isPlay"><video-pause /></el-icon>
  </div>
  <div style="position: absolute; right: 40px; cursor: pointer">
    <!-- <el-button :icon="ZoomIn" size="default" circle @click="emit('up-scale')" />
    <el-button :icon="ZoomOut" size="default" circle @click="emit('down-scale')" /> -->
    <el-icon :size="26" @click="emit('up-scale')"><zoom-in /></el-icon>
    <el-icon :size="26" @click="emit('down-scale')"><zoom-out /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { VideoPlay, VideoPause, ZoomIn, ZoomOut } from '@element-plus/icons-vue'
import { useStore } from '../../store/project'
const store = useStore()

const emit = defineEmits<{
  (e: 'up-scale'): void
  (e: 'down-scale'): void
}>()
</script>

<style scoped></style>
