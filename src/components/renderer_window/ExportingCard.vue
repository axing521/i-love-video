<template>
  <div class="export-card">
    <el-alert
      v-if="end"
      title="Success"
      type="success"
      description="渲染完成,点击下方download进行下载"
      show-icon
      :closable="false"
    />
    <el-alert
      v-if="showWarn"
      title="Warning"
      type="warning"
      description="渲染中,请勿关闭该窗口"
      show-icon
      :closable="false"
    />
    <el-alert
      v-if="!isSupportBrowser()"
      title="Error"
      type="error"
      description="您的浏览器不支持渲染"
      show-icon
      :closable="false"
    />

    <div class="ffmpeg-step" v-if="mode === 'FFmpeg'">
      <!-- <el-progress :text-inside="true" :stroke-width="18" :percentage="progress1" status="success" />
      <br />
      <el-progress :text-inside="true" :stroke-width="18" :percentage="progress3" status="success" /> -->
      <el-progress type="circle" :percentage="progress1" status="success">
        <span class="percentage-value">{{ progress1 }}%</span>
        <span class="percentage-label">Step 1</span>
      </el-progress>
      <!-- <el-progress type="circle" :percentage="progress2" status="success" style="margin: 10px">
      <span class="percentage-value">{{ progress2 }}%</span>
      <span class="percentage-label">Step 2</span>
    </el-progress> -->
      <el-progress type="circle" :percentage="progress3" status="success">
        <span class="percentage-value">{{ progress3 }}%</span>
        <span class="percentage-label">Step 3</span>
      </el-progress>
    </div>
    <div class="media-step" v-else>
      <el-progress :text-inside="true" :stroke-width="18" :percentage="getMediaRecorderProgress" status="success" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isSupportBrowser } from '../../plugins/browser'
const props = defineProps<{
  mode: string
  ccaptureProgress: number
  // ffmpegProgressPreparation: number
  ffmpegProgress: number
  mediaRecorderProgress: number
}>()

const progress1 = computed((): number => {
  return Math.round(props.ccaptureProgress * 100)
})
// const progress2 = computed((): number => {
//   return Math.round(props.ffmpegProgressPreparation * 100)
// })
const progress3 = computed((): number => {
  return Math.round(props.ffmpegProgress * 100)
})
const getMediaRecorderProgress = computed((): number => {
  return Math.round(props.mediaRecorderProgress * 100)
})

const showWarn = computed((): boolean => {
  return props.ccaptureProgress > 0 && props.ffmpegProgress < 1
})
const end = computed((): boolean => {
  return props.ffmpegProgress >= 1 && props.ccaptureProgress >= 1
})
</script>

<style scoped>
.export-card {
  margin: auto;
  width: 80%;
}
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.ffmpeg-step {
  margin-top: 20px;
  text-align: center;
}
.media-step {
  margin-top: 20px;
}
</style>
