<template>
  <div class="video-strip">
    <canvas ref="waveCanvas" class="wave" :width="canvasWidth" height="26"></canvas>
    <span v-if="strip.videoAsset">
      {{ strip.videoAsset.name }}
    </span>
    <StripError v-if="!strip.loaded" />
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue'
import { VideoStrip } from '../../../models'
const props = defineProps<{
  strip: VideoStrip
  scale: number
}>()

const canvasWidth = computed(() => {
  return props.strip.length * props.scale
})

const waveStyle = ref<StyleValue>()

const watchViodeOffset = () => {
  waveStyle.value = {
    left: -props.strip.videoOffset * props.scale + 'px',
    width: props.strip.videoDuration * props.scale + 'px'
  }
  // // zoom depend on dom width
  // nextTick(() => {
  //   wave?.value.zoom(props.scale)
  // })
}
watch(
  () => [props.strip.videoOffset, props.strip.videoDuration],
  () => {
    watchViodeOffset()
  }
)
const ctx = ref<CanvasRenderingContext2D>()
const waveCanvas = ref<HTMLCanvasElement>()
onMounted(() => {
  ctx.value = waveCanvas.value?.getContext('2d') as CanvasRenderingContext2D
  watchViodeOffset()
  // update()
})
const cancel = ref(0)
// const update = () => {
//   const srcX = props.strip.videoOffset * 10 * 2
//   const c = props.strip.videoAsset?.getcanvas(srcX)
//   if (c) {
//     if (waveCanvas.value) {
//       ctx.value?.clearRect(0, 0, waveCanvas.value.width, waveCanvas.value.height)
//     }
//     ctx.value?.drawImage(
//       c,
//       props.strip.videoAsset?.getSrcX(srcX) || 0,
//       0,
//       props.strip.length * 10 * 2,
//       26,
//       0,
//       0,
//       canvasWidth.value,
//       26
//     )
//   }
//   cancel.value = window.requestAnimationFrame(update)
// }

onBeforeUnmount(() => {
  if (cancel.value !== 0) {
    window.cancelAnimationFrame(cancel.value)
  }
})
</script>

<style scoped>
.video-strip {
  width: 100%;
  height: 100%;
  background: rgb(72, 72, 197);
  font-size: 12px;
}

.wave {
  width: 100%;
  position: absolute;
  background-color: var(--blue);
  top: 0;
  left: 0;
}

/* Override wavesurfer overflow because scroll bar is appeared */
:deep(.wave) {
  overflow: hidden !important;
  z-index: 0;
}
</style>
