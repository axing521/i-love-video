<template>
  <div class="app-bar">
    <AppBar @open-renderer="rendererDialog = true" />
  </div>
  <div class="main">
    <el-row>
      <el-col :span="5" class="asset-window">
        <AssetWindow />
      </el-col>
      <el-col :span="13" class="preview-window">
        <PreviewWindow ref="previewWindow" />
      </el-col>
      <el-col :span="5" class="strip-inspect">
        <StripInspectWindow />
      </el-col>
    </el-row>
  </div>
  <div class="timeline-panel">
    <TimelinePanel />
  </div>
  <RendererWindow
    ref="rendererWindow"
    v-model:dialogVisible="rendererDialog"
    :project="store.project"
    :scene="store.scene"
    :camera="camera"
  />
</template>

<script setup lang="ts">
import * as T from 'three'
import { FontAsset } from './models'
import { useStore } from './store/project'
import PreviewWindow from './components/preview_window/PreviewWindow.vue'
import RendererWindow from './components/renderer_window/RendererWindow.vue'
const store = useStore()
window.oncontextmenu = (e: MouseEvent) => {
  e.preventDefault()
}
const camera = reactive(new T.OrthographicCamera(0, store.project.width, store.project.height, 0))
camera.position.set(0, 0, 10)
const previewWindow = ref<typeof PreviewWindow>()
const rendererWindow = ref<typeof RendererWindow>()
const lastUpdate = ref(0)
const lastAnimationTime = ref(0)

const rendererDialog = ref(false)
watch(rendererDialog, () => {
  store.changeDuration()
})
onMounted(() => {
  // await FontAsset.init()
  // 调用update函数，进行数据更新
  update()
})

const update = (time: number = 0) => {
  if (rendererWindow.value && rendererWindow.value.isEncoding) {
    window.requestAnimationFrame(update)
    return
  }

  if (time - lastUpdate.value + 0.02 <= 1000 / store.project.fps) {
    window.requestAnimationFrame(update)
    return
  }

  let delta = time - lastAnimationTime.value
  lastAnimationTime.value = time

  if (store.isPlay) {
    store.currentTime += delta / 1000
  }

  store.updateStrip(delta)

  previewWindow.value?.renderPreview(store.rawScene, camera)

  camera.top = store.project.height
  camera.right = store.project.width
  camera.updateProjectionMatrix()
  previewWindow.value?.resize()

  lastUpdate.value = time
  // 该windowAPI实现了计时功能，且循环这段upadte代码
  window.requestAnimationFrame(update)
}
</script>

<style scoped>
.app-bar {
  display: flex;
  height: 5vh;
  background-color: rgb(28 29 32);
}
.main {
  height: 60vh;
}
.asset-window {
  background-color: rgb(49 50 58);
  border-radius: 10px;
  padding: 0 10px 10px 10px;
  margin-left: 20px;
  margin-top: 10px;
  overflow-x: hidden;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.preview-window {
  height: 60vh;
  overflow: hidden;
  margin-left: 10px;
}
.strip-inspect {
  background-color: rgb(49 50 58);
  border-radius: 10px;
  padding: 0 10px 10px 10px;
  margin-left: 20px;
  margin-top: 10px;
  box-sizing: border-box;
  height: 60vh;
  overflow-x: hidden;
}
.timeline-panel {
  /* height: 50vh; */
  overflow-y: hidden;
}
</style>
