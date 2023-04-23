<template>
  <div
    ref="root"
    class="seekline"
    @pointerdown="mouseDown"
    @pointermove="mouseMove"
    @pointerup="isDrag = false"
    @pointerleave="isDrag = false"
  >
    <div v-for="(s, i) in array" :key="i" :style="getTimesStyle(s)">
      <div class="text">
        {{ timeView(s) }}
        <div class="time-bar"></div>
      </div>
    </div>
    <!-- 游标 -->
    <div class="seekbar" :style="style">
      <div class="seekbar1"></div>
      <div class="seekbar2"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StyleValue } from 'vue'
import { useStore } from '../../store/project'
import { roundToFrame } from '../../plugins/roundToFrame'
const store = useStore()

// timeView
// 不适用计算属性，因为计算属性无法传递参数
const timeView = (s: number) => {
  if (s < 0) {
    return '-' + new Date(-s * 1000).toISOString().substring(11, 19)
  }
  return new Date(s * 1000).toISOString().substring(11, 23)
}

// getTimeStyle
const getTimesStyle = (s: number): StyleValue => {
  return {
    left: store.scale * (s - store.start) + 'px',
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: '10px'
  }
}

// showLength
// 页面渲染完成时，获取ref：root元素，在onMounted中更新showLength
const root = ref<HTMLElement | null>(null)
onMounted(() => {
  store.updateShowLength(root.value)
})
const TIME_TEXT_MAX_WIDTH = 100
const array = computed((): number[] => {
  const a = []
  const s = TIME_TEXT_MAX_WIDTH / store.scale
  const l = Math.floor(store.start / s)
  const ss = s * l

  for (let x = 0; x < store.showLength; x += TIME_TEXT_MAX_WIDTH / store.scale) {
    a.push(ss + x)
  }
  return a
})
// 有待商榷 //
// watch(store.scale.valueOf, () => {
//   store.updateShowLength(root.value)
// })

// 拖动事件处理函数，待补充 //
const isDrag = ref(false)
const mouseDown = (e: MouseEvent) => {
  isDrag.value = true
  store.changeCurrentTime(roundToFrame(store.start + e.offsetX / store.scale, store.project.fps) + 0.0001)
}
const mouseMove = (e: MouseEvent) => {
  if (isDrag.value) {
    store.changeCurrentTime(roundToFrame(store.start + e.offsetX / store.scale, store.project.fps) + 0.0001)
  }
}

// 根据currentTime、start、scale、offest的值，来更改游标的位置
const style = computed((): StyleValue => {
  return {
    left: (store.currentTime - store.start) * store.scale + store.offset + 'px'
  }
})

const upScale = () => {
  store.upScale(root.value)
}
const downScale = () => {
  store.downScale(root.value)
}
defineExpose({
  upScale,
  downScale
})
</script>

<style scoped>
.seekline {
  height: 20px;
  background-color: #2a2b31;
  cursor: pointer;
  width: 100%;
}
.text {
  position: relative;
  padding-left: 4px;
  color: gray;
}
.time-bar {
  top: 0;
  left: 0;
  width: 1px;
  background-color: #ccc;
  height: 20px;
  position: absolute;
}
.seekbar {
  pointer-events: none;
  position: absolute;
}
.seekbar1 {
  pointer-events: none;
  position: absolute;
  width: 10px;
  height: 10px;
  left: -4px;
  background: pink;
  z-index: 2;
}
.seekbar2 {
  pointer-events: none;
  transform-origin: center;
  left: 0;
  top: 0;
  transform: translate(-2.7px, 6px) rotate(45deg);
  position: absolute;
  width: 7px;
  height: 7px;
  background: pink;
  z-index: 2;
}
.line {
  position: absolute;
  height: 32vh;
  width: 2px;
  background: pink;
  z-index: 2;
}
</style>
