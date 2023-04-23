<template>
  <div class="menu" v-if="openItem" :style="GetMenuStyle">
    <div v-for="(item, i) in items" :key="i">
      <el-button type="text" size="small" @click="e => handleAction(e, item)">{{ item.text }}</el-button>
    </div>
  </div>
  <div class="menu" v-if="openHandle" :style="GetMenuStyle">
    <div v-for="(item, i) in handles" :key="i">
      <el-button type="text" size="small" @click="e => handleAction(e, item)">{{ item.text }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VideoStrip } from '../../models'
import { StyleValue } from 'vue'
import { useStore } from '../../store/project'
const store = useStore()
class ContextMenuItem {
  text: string = ''
  action: () => void = () => {}
}
const items = computed(() => {
  const items: ContextMenuItem[] = [
    { text: 'Add Text', action: store.addTextStrip },
    { text: 'Add Video', action: store.addVideoStrip },
    { text: 'Add Image', action: store.addImageStrip },
    { text: 'Add Audio', action: store.addAudioStrip }
  ]
  return items
})

const handles = computed((): ContextMenuItem[] => {
  if (store.selectedStrip instanceof VideoStrip) {
    return [
      { text: 'Split', action: store.split },
      { text: 'Delete', action: store.deleteStrip }
    ]
  }
  return [{ text: 'Delete', action: store.deleteStrip }]
})

const x = ref(0)
const y = ref(0)
const openItem = ref(false)
const openHandle = ref(false)
const open1 = (e: MouseEvent) => {
  x.value = e.pageX
  y.value = e.pageY
  openItem.value = true
  console.log('openMenu')
}
const open2 = (e: MouseEvent) => {
  x.value = e.pageX
  y.value = e.pageY + 15
  openHandle.value = true
  console.log('openHandle')
}
defineExpose({
  open1,
  open2,
  openHandle,
  openItem
})

const GetMenuStyle = computed((): StyleValue => {
  return {
    left: x.value + 'px',
    top: y.value + 'px'
  }
})

const handleAction = (e: Event, item: ContextMenuItem) => {
  item.action()
  openItem.value = false
  openHandle.value = false
}
</script>

<style scoped>
.menu {
  padding: 5px;
  position: fixed;
  background-color: rgb(36 36 40);
  border-radius: 10px;
}
</style>
