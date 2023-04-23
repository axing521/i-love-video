<template>
  <div style="margin-top: 1px"></div>
  <div v-for="(_, i) in [...Array(8)]" :ref="setLayers" :key="i" @contextmenu="openMenu1" @click="closeMenu">
    <!-- 八条资产轴 -->
    <div class="line"></div>
    <div class="linehr"></div>
  </div>

  <div class="strips" @contextmenu="openMenu2">
    <TimelineStrip
      v-for="(strip, j) in store.showStrips"
      :key="j"
      :strip="strip"
      :offset="store.offset"
      :scale="store.scale"
      :fps="store.project.fps"
      :valid="store.getValid(strip)"
      :selected="store.isSelectedStrip(strip)"
      :layers="layers"
      @mousedown="store.changeSelectedStrip(strip)"
      @change-start="n => store.changeStart(n, strip)"
      @change-length="n => store.changeLength(strip, n)"
    />
  </div>
  <!-- <div class="offset" :style="offsetStyle"></div> -->

  <ContextMenu ref="RefContextMenu" />
</template>

<script setup lang="ts">
import ContextMenu from '../../components/widget/ContextMenu.vue'
import { useStore } from '../../store/project'
const store = useStore()

// vue3 在v-for中使用ref获取html元素的方法，与vue2不兼容
let layers: any[] = []
const setLayers = (el: any) => {
  if (el) {
    layers.push(el)
  }
}
onBeforeUpdate(() => {
  layers = []
})

// 右键菜单处理函数
const RefContextMenu = ref()
const openMenu1 = (e: MouseEvent) => {
  e.preventDefault()
  RefContextMenu.value.openHandle = false
  RefContextMenu.value.open1(e)
}
const openMenu2 = (e: MouseEvent) => {
  e.preventDefault()
  RefContextMenu.value.openItem = false
  RefContextMenu.value.open2(e)
}
const closeMenu = () => {
  RefContextMenu.value.openHandle = false
  RefContextMenu.value.openItem = false
}
</script>

<style scoped>
.linehr {
  height: 1px;
  width: 100%;
  background-color: #ccc;
}

.line {
  height: 30px;
  display: flex;
  box-sizing: border-box;
}
.offset {
  background-color: rgba(0 0 0 / 0.5);
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  pointer-events: none;
}
.strips {
  position: absolute;
  top: 0px;
}
</style>
