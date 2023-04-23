<template>
  <div ref="preview" class="preview-canvas" @mousewheel="onWheel" @mousedown="down">
    <!-- class：canvas画布为该区域的窗口，截取视频 -->
    <!-- 该div是为Gizom设计，为了隐藏视图溢出的部分(待商榷) -->
    <div class="canvas" :style="canvasContainerStyle">
      <!-- render-canvas即为捕获窗口 -->
      <!-- canvas被renderer挂载后就变成纯黑画布了 -->
      <canvas ref="renderCanvas" class="render-canvas" />
      <!-- box为selectedStrip的区域在整块屏幕的显示，css样式随移动动态变化 -->
      <!-- 可以把box看做渲染的strip的盒子，没有这个盒子，渲染的strip将无法移动 -->
      <!-- 只有这个盒子，不去渲染strip，显然便只能看到空盒子 -->
      <!-- 注意由于box的外层盒子是canvas窗口，所以最多显示该窗口区域大小的画面（又像是renderer size的原因） -->
      <RenderItemBox
        ref="renderItemBoxComp"
        :strip="store.selectedStrip"
        :width="project.width"
        :height="project.height"
        :scale="scale"
      />
    </div>

    <div class="time-show">{{ timeFormat }}</div>
  </div>
</template>

<script setup lang="ts">
import * as T from 'three'
import { useStore } from '../../store/project'
import { storeToRefs } from 'pinia'
import { addDragEventOnce } from '../../plugins/mouse'
import RenderItemBox from './RenderItemBox.vue'
const store = useStore()
const { project } = storeToRefs(store)
// const canvas = ref<HTMLElement>()

onMounted(() => {
  // renderer创建时便将其挂载到了dom：renderCanvas上
  // 由于renderCanvas区域有限，所以即使渲染的视图比该区域大，也只能看到区域内的视图部分
  renderer.value = new T.WebGLRenderer({
    canvas: renderCanvas.value
  })
  // 当调整浏览器窗口的大小时，发生 resize 事件
  window.addEventListener('resize', resize)
  // canvas.value = renderCanvas.value
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

const top = ref(32)
const left = ref(32)
const scale = ref(0.4)
const canvasContainerStyle = computed(() => {
  return {
    width: project.value.width * scale.value + 'px',
    height: project.value.height * scale.value + 'px',
    top: top.value + 'px',
    left: left.value + 'px'
  }
})
const timeFormat = computed(() => {
  let s = store.currentTime
  if (s < 0) {
    s = -s
  }
  const sec = s.toFixed(4)
  const ms = sec.substr(sec.length - 4, 4)
  const hhmmss = new Date(s * 1000).toISOString().substr(11, 8)

  let sign = ''
  if (store.currentTime < 0) sign = '-'
  return `${sign}${hhmmss}.${ms}`
})

// const previewScale = ref(1)
const wheelScale: number = 0.0001
const renderer = ref<T.WebGLRenderer | null>(null)
const resize = () => {
  renderer.value?.setSize(project.value.width, project.value.height)
  resizeCanvas()
}
const renderCanvas = ref<HTMLCanvasElement>()

// 该函数调整视图面积，利用transform的scale()属性
const resizeCanvas = () => {
  if (!renderCanvas.value) return
  const transform = `scale(${scale.value})`
  renderCanvas.value.style.transform = transform
}
watch(
  () => [project.value.width, project.value.height],
  () => {
    resize
  }
)

// 鼠标滚轮等比例放大或缩小canvas窗口和strip的box审视区域
const onWheel = (e: WheelEvent) => {
  top.value += e.deltaY * project.value.height * scale.value * wheelScale
  left.value += e.deltaY * project.value.width * scale.value * wheelScale
  scale.value += -e.deltaY * wheelScale
  if (scale.value < 0.1) scale.value = 0.1
  else if (scale.value > 1) scale.value = 1
  resize()
}
// 鼠标右键按住时，MouseEvent.button = 2，满足函数条件
// 可以对屏幕进行拖动操作，常见的可改变窗口的相对屏幕位置
const down = (e: MouseEvent) => {
  if (e.button != 2) return
  e.preventDefault()
  addDragEventOnce(e => {
    top.value += e.movementY
    left.value += e.movementX
    e.preventDefault()
  })
}

const preview = ref<HTMLElement>()
const prevRect = ref<DOMRect>()
const renderPreview = (scene: T.Scene, camera: T.Camera) => {
  // console.log(scene)
  renderer.value?.render(scene, camera)
  if (preview.value) {
    // Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置
    const rect = preview.value.getBoundingClientRect()
    if (prevRect.value) {
      if (prevRect.value.height != rect.height) {
        resize()
      }
    } else {
      resize()
    }
    prevRect.value = rect
  }
}
defineExpose({
  renderCanvas,
  renderPreview,
  resize
})
</script>

<style scoped>
.preview-canvas {
  position: relative;
  margin: 0 30px;
  /* background-color: rgb(24, 22, 22); */
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.canvas {
  border: 1px solid white;
  position: relative;
  box-sizing: content-box;
}
.render-canvas {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform-origin: left top;
}
.time-show {
  color: white;
  position: absolute;
  bottom: 10px;
  left: 50px;
}
</style>
