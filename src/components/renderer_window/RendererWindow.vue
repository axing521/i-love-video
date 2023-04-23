<template>
  <el-dialog
    v-model="dialogVisible"
    title="ExportCard"
    width="30%"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :show-close="false"
    :lock-scroll="false"
  >
    <el-scrollbar height="410px">
      <!-- <canvas ref="renderCanvas1" style="width: 400px; height: 225px; background-color: black"></canvas> -->
      <!-- <button @click="guazai">click</button> -->
      <!-- 渲染预览窗口 -->
      <div class="render-view">
        <div :style="canvasWrapStyle">
          <!-- 修改ref的canvas数据来达到预览的效果 -->
          <canvas ref="renderCanvas" :style="canvasStyle" />
        </div>
      </div>
      <!-- 进度条及提示卡片，仅具有显示提示功能，无逻辑作用 -->
      <ExportingCard
        :mode="mode"
        :ffmpegProgress="ffmpegProgress"
        :ccaptureProgress="ccaptureProgress"
        :mediaRecorderProgress="mediaRecorderProgress"
      />
    </el-scrollbar>

    <el-divider />

    <el-radio-group v-model="mode">
      <el-radio :label="'FFmpeg'">FFmpeg</el-radio>
      <el-radio :label="'MediaRecorder'">MediaRecorder</el-radio>
    </el-radio-group>
    <!-- <Select :id="mode" :items="modeItems" :disabled="isEncoding" @change="changeMode" /> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button v-if="!isEncoding" @click="emit('update:dialogVisible', false)">Back</el-button>
        <el-button v-else @click="cancel">Cancel</el-button>
        <el-button v-if="!isEncoding" type="primary" :disabled="!isSupportBrowser()" @click="startEncode">
          Start
        </el-button>
        <el-button
          v-else
          type="primary"
          @click="downloader"
          :disabled="ffmpegProgress != 1 && mediaRecorderProgress != 1"
          >Download</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import * as T from 'three'
import { Project } from '../../models/Project'
import { isSupportBrowser } from '../../plugins/browser'
import Encoder from '../../models/Encoder'
import Recorder from '../../models/Recorder'
import MediaRecorder from '../../models/MediaRecorderRecorder'
import { download } from '../../plugins/download'

const renderCanvas = ref<HTMLCanvasElement>()
const renderer = ref<T.WebGLRenderer>()
const resize = () => {
  renderer.value?.setSize(props.project.width, props.project.height)
}

const mode = ref('FFmpeg')
const isEncoding = ref(false)
defineExpose({
  isEncoding
})

interface Props {
  dialogVisible: boolean
  project: Project
  scene: T.Scene
  camera: T.OrthographicCamera
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false
})
// const props = defineProps<{
//   dialogVisible: false
//   project: Project
//   scene: T.Scene
//   camera: T.OrthographicCamera
// }>()
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: boolean): void
}>()
const beforeClose = () => {
  emit('update:dialogVisible', false)
}

const canvasWrapStyle = computed(() => {
  let width = 400
  let height = 400
  if (props.project.height > props.project.width) {
    width = (width * props.project.width) / props.project.height
  } else {
    height = (height * props.project.height) / props.project.width
  }
  return {
    width: width + 'px',
    height: height + 'px',
    backgroundColor: 'black',
    margin: 'auto'
  }
})
const canvasStyle = computed(() => {
  return {
    transform: `scale(${getScale.value})`,
    transformOrigin: 'left top',
    width: props.project.width + 'px',
    height: props.project.height + 'px'
  }
})
const getScale = computed((): number => {
  if (props.project.height > props.project.width) {
    return 400 / props.project.height
  }
  return 400 / props.project.width
})

const ccaptureProgress = ref(0)
// const ffmpegProgressPreparation = ref(0)
const ffmpegProgress = ref(0)
const mediaRecorderProgress = ref(0)

const recorder = ref<Recorder>()
const encoder = ref<Encoder>()
const mediaRecorder = ref<MediaRecorder>()
const mediaRecorderResult = ref<Blob>()
const startEncode = async () => {
  renderer.value = new T.WebGLRenderer({
    canvas: renderCanvas.value,
    preserveDrawingBuffer: true
  })
  resize()
  isEncoding.value = true
  if (!renderer.value) return
  if (mode.value === 'MediaRecorder') {
    if (!mediaRecorder.value) {
      mediaRecorder.value = new MediaRecorder(
        renderCanvas.value!,
        props.scene,
        props.camera,
        renderer.value,
        props.project.fps,
        Math.ceil(props.project.duration * props.project.fps),
        props.project.strips,
        r => {
          mediaRecorderProgress.value = r
        },
        blob => {
          mediaRecorderProgress.value = 1
          mediaRecorderResult.value = blob
        }
      )
    }
    mediaRecorder.value.start()
    return
  }
  if (!recorder.value) {
    recorder.value = new Recorder(
      renderCanvas.value!,
      props.scene,
      props.camera,
      renderer.value,
      props.project.fps,
      Math.ceil(props.project.duration * props.project.fps),
      props.project.strips,
      r => {
        ccaptureProgress.value = r
      },
      data => {
        encoder.value?.encode(data)
      }
    )
  }
  if (!encoder.value) {
    encoder.value = new Encoder(
      props.project.width,
      props.project.height,
      props.project.fps,
      props.project.strips,
      props.project.duration,
      ratio => {
        ffmpegProgress.value = ratio
      }
      // ratio => {
      //   ffmpegProgressPreparation.value = ratio
      // }
    )
  }
  await recorder.value.start()
}
const cancel = async () => {
  isEncoding.value = false
  ccaptureProgress.value = 0
  // ffmpegProgressPreparation.value = 0
  ffmpegProgress.value = 0
  mediaRecorderProgress.value = 0
  await recorder.value?.cancel()
  encoder.value?.cancel()
  await mediaRecorder.value?.cancel()
}
const downloader = () => {
  if (mode.value === 'FFmpeg') {
    encoder.value?.downloadOutput()
  } else {
    if (mediaRecorderResult.value) download(mediaRecorderResult.value, props.project.name + '.webm')
  }
}
</script>

<style scoped>
.render-view {
  display: flex;
  padding: 16px;
  overflow: hidden;
}
</style>
