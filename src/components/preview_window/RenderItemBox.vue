<template>
  <div v-show="strip" ref="boxRef" class="render-box" :style="style"></div>
</template>

<script setup lang="ts">
import { Strip, VideoStrip, TextStrip, ImageStrip } from '../../models'
import { StyleValue } from 'vue'
import { addDragEventOnce, LEFT } from '../../plugins/mouse'
import { StripUtil } from '../../plugins/strip'

onMounted(() => {
  // 添加鼠标左键按下拖动事件
  if (boxRef.value) {
    boxRef.value.addEventListener('mousedown', e => {
      if (e.button != LEFT) return
      addDragEventOnce(e => {
        if (e.button != LEFT) return
        if (props.strip === null) return
        if (canDrawStrip(props.strip)) {
          const iface = props.strip.toInterface()
          const x = iface.position.x + e.movementX * 2.5
          const y = iface.position.y - e.movementY * 2.5
          // 改变strip的位置信息
          if (props.strip && StripUtil.isThreeJsStrip(props.strip)) {
            props.strip.position.set(x, y, iface.position.z)
          }
        }
      })
    })
  }
})
// 注意这个类型说明
const canDrawStrip = (strip: Strip): strip is VideoStrip | TextStrip | ImageStrip => {
  return strip instanceof VideoStrip || strip instanceof TextStrip || strip instanceof ImageStrip
}

const boxRef = ref<HTMLElement>()

const props = defineProps<{
  strip: Strip | null
  width: number
  height: number
  scale: number
}>()

const style = computed((): StyleValue => {
  if (!props.strip) return {}
  if (canDrawStrip(props.strip)) {
    const px = props.strip.position.x
    const py = props.height - props.strip.position.y

    let width = 0
    let height = 0
    let top = 0
    let left = 0

    top = py * props.scale
    left = px * props.scale

    // const rect = $el.parentElement?.parentElement?.getBoundingClientRect()
    // if (!rect) return {}

    if (props.strip instanceof VideoStrip) {
      width = (props.strip.video.videoWidth * props.scale * props.strip.percent) / 100
      height = (props.strip.video.videoHeight * props.scale * props.strip.percent) / 100
      width = width < 100 ? 100 : width
      height = height < 100 ? 100 : height
      top = py * props.scale - height / 2
      left = px * props.scale - width / 2
    } else if (props.strip instanceof TextStrip) {
      width = props.strip.canvas.width * props.scale
      height = props.strip.canvas.height * props.scale
      top = py * props.scale - height / 2
      left = px * props.scale - width / 2
    } else if (props.strip instanceof ImageStrip) {
      width = (props.strip.width * props.scale * props.strip.percent) / 100
      height = (props.strip.height * props.scale * props.strip.percent) / 100
      top = py * props.scale - height / 2
      left = px * props.scale - width / 2
    }
    return {
      top: top - 1 + 'px',
      left: left - 1 + 'px',
      width: width - 2 + 'px',
      height: height - 2 + 'px'
    }
  }
  return {}
})
</script>

<style scoped>
.render-box {
  border: 2px solid green;
  cursor: move;
  position: absolute;
  box-sizing: content-box;
  transform: translate(-1px, -1px);
  padding: 1px;
}
</style>
