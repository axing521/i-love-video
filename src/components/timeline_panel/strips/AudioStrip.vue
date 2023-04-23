<template>
  <div class="audio-strip">
    <div class="wave" :style="style"></div>
    <span v-if="strip.asset">
      {{ strip.asset.name }}
    </span>
    <strip-error v-if="!strip.loaded" />
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue'
// import WaveSufer from 'wavesurfer.js'
import { AudioStrip } from '../../../models'
const props = defineProps<{
  strip: AudioStrip
  scale: number
}>()

const style = computed((): StyleValue => {
  return {
    width: Math.round(props.strip.audio.duration * props.scale) + 'px'
  }
})

// const wave = ref<WaveSufer>()
// watch(
//   () => props.scale,
//   (n: number) => {
//     wave.value?.zoom(n)
//   }
// )

// const wave2 = ref<HTMLElement>()
// onMounted(() => {
//   wave.value = WaveSufer.create({
//     container: wave2.value as HTMLElement,
//     height: 26,
//     waveColor: '#ff9800',
//     interact: false
//   })
//   if (props.strip.audio.src) wave.value.load(props.strip.audio)
// })
</script>

<style scoped>
.audio-strip {
  width: 100%;
  height: 100%;
  background: rgb(211, 111, 128);
  font-size: 12px;
}

.wave {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

/* Override wavesurfer overflow because scroll bar is appeared */
:deep(.wave) {
  overflow: hidden !important;
  z-index: 0;
}
</style>
