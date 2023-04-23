<template>
  <div class="timeline-strip" :class="rootClass" :style="lineStyle" @pointerdown="dragStart">
    <div :style="over"></div>
    <div class="strip">
      <component :is="stripComponentName" :strip="strip" :scale="scale" />
    </div>
    <div class="left-handle" @pointerdown="pdLeftHandle"></div>
    <div class="right-handle" @pointerdown="pdRightHandle"></div>
  </div>
</template>

<script setup lang="ts">
import { Strip } from '../../models'
import { StyleValue } from 'vue'
import TextStrip from './strips/TextStrip.vue'
import VideoStrip from './strips/VideoStrip.vue'
import ImageStrip from './strips/ImageStrip.vue'
import AudioStrip from './strips/AudioStrip.vue'
import { roundToFrame } from '../../plugins/roundToFrame'
import { addDragEventOnce } from '../../plugins/mouse'

const props = defineProps<{
  strip: Strip
  scale: number
  offset: number
  valid: boolean
  fps: number
  selected: boolean
  layers: HTMLElement[]
}>()

// 样式计算属性函数
const rootClass = computed((): String[] => {
  return props.selected ? ['timeline-strip--selected'] : []
})
const timelineStart = ref(0)
const lineStyle = computed((): StyleValue => {
  const left = (props.strip.start - timelineStart.value) * props.scale
  return {
    left: `${props.offset + left}px`,
    width: `${props.strip.length * props.scale}px`,
    top: `${props.strip.layer * 31 + 3}px`,
    outline: props.selected ? `2px black solid` : ''
  }
})

const over = computed((): StyleValue => {
  return {
    position: 'absolute',
    width: `${props.strip.length * props.scale}px`,
    height: `30px`,
    outline: props.selected ? '1px solid white' : '',
    background: props.selected ? 'rgba(255 255 255 / .2)' : props.valid ? '' : 'rgba(255 0 0 / .2)'
  }
})

const stripComponentName = computed(() => {
  switch (props.strip.type) {
    case 'Text':
      return TextStrip
    case 'Video':
      return VideoStrip
    case 'Image':
      return ImageStrip
    case 'Audio':
      return AudioStrip
    default:
      break
  }
})

// strip拖动相关参数和处理函数
const emit = defineEmits<{
  // (e: 'submitStart', value: number): void
  (e: 'changeStart', value: number): void
  (e: 'changeLength', value: number): void
}>()
interface pos {
  x: number
  y: number
}
const start = reactive<pos>({
  x: 0,
  y: 0
})
const tmpStart = ref(0)
const tmpLayer = ref(0)
const isDraging = ref(false)
const dragStart = (e: MouseEvent) => {
  start.x = e.pageX
  start.y = e.pageY
  tmpStart.value = props.strip.start
  tmpLayer.value = props.strip.layer
  isDraging.value = true
  document.body.addEventListener('mousemove', drag)
  const pu = () => {
    isDraging.value = false
    // emit('submitStart', props.strip.start)
    document.body.removeEventListener('mousemove', drag)
    document.body.removeEventListener('pointerup', pu)
  }
  document.body.addEventListener('pointerup', pu)
}
const drag = (e: MouseEvent) => {
  const t = tmpStart.value + (e.pageX - start.x) / props.scale
  const rt = roundToFrame(t, props.fps)
  emit('changeStart', rt)
}

// 拉伸strip处理函数
const pdLeftHandle = (e: MouseEvent) => {
  e.stopPropagation()
  const startX = e.pageX
  const startL = props.strip.length
  const startS = props.strip.start
  addDragEventOnce(e => {
    const d = (e.pageX - startX) / props.scale
    emit('changeStart', roundToFrame(startS + d, props.fps))
    emit('changeLength', roundToFrame(startL - d, props.fps))
  })
}
const pdRightHandle = (e: MouseEvent) => {
  e.stopPropagation()
  const startX = e.pageX
  const startL = props.strip.length
  addDragEventOnce(e => {
    let newL = (e.pageX - startX) / props.scale
    newL += startL
    emit('changeLength', roundToFrame(newL, props.fps))
  })
}

// layers切换，为8条layer轴设置事件监听
onMounted(() => {
  for (let i = 0; i < props.layers.length; i++) {
    const tmp = i
    const event = (e: MouseEvent) => {
      if (isDraging.value) {
        props.strip.layer = tmp
      }
    }
    props.layers[i].addEventListener('mouseenter', event)
  }
})
</script>

<style scoped>
.timeline-strip {
  display: flex;
  position: absolute;
  cursor: pointer;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  color: white;
  font-family: Ricty;
}
.timeline-strip--selected {
  z-index: 1;
}
.left-handle {
  position: absolute;
  width: 4px;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #00000088;
  cursor: ew-resize;
}
.right-handle {
  position: absolute;
  width: 4px;
  right: 0;
  top: 0;
  height: 100%;
  background-color: #00000088;
  cursor: ew-resize;
}
.strip {
  background-color: lightgreen;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border-radius: 2px;
}
</style>
