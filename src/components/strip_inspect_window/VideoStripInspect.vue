<template>
  <h2>Video</h2>
  <el-form label-width="50px" size="small">
    <el-form-item label="Asset">
      <Select :items="getSelectItems" :id="currentAssetId" @change="changeAsset" />
    </el-form-item>
    <el-form-item label="Start">
      <el-input-number :precision="3" v-model="strip.start" :min="0" />
    </el-form-item>
    <el-form-item label="Offset">
      <el-input-number :precision="3" v-model="strip.videoOffset" :min="0" />
    </el-form-item>
    <el-form-item label="Length">
      <el-input-number :precision="3" v-model="strip.length" :min="0" />
    </el-form-item>
    <el-form-item label="Pos-X">
      <el-input-number :precision="3" v-model="strip.position.x" />
    </el-form-item>
    <el-form-item label="Pos-Y">
      <el-input-number :precision="3" v-model="strip.position.y" />
    </el-form-item>
    <el-form-item label="Percent (%)">
      <el-input-number :step="10" v-model="strip.percent" :min="0" @change="strip.fixPercent(strip.percent)" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Asset, VideoAsset, VideoStrip } from '../../models'
import { OptionKeyValue } from '../widget/Select.vue'
const props = defineProps<{
  strip: VideoStrip
  assets: Asset[]
}>()
const getVideoAsset = computed((): VideoAsset[] => {
  return props.assets.filter(item => item instanceof VideoAsset) as VideoAsset[]
})
const getSelectItems = computed(() => {
  const items: OptionKeyValue[] = [{ value: '', text: 'No selected', disabled: true }]
  return items.concat(
    getVideoAsset.value.map((va: VideoAsset) => {
      return {
        value: va.id,
        text: va.name
      }
    })
  )
})
const currentAssetId = computed(() => {
  if (props.strip.videoAsset) {
    return props.strip.videoAsset.id
  }
  return ''
})

const changeAsset = (val: OptionKeyValue | undefined) => {
  if (val) {
    const target = props.assets.find(item => item.id === val.value)
    if (!target || !(target instanceof VideoAsset)) return
    props.strip.updateAsset(target)
    console.log(props.strip)
  }
}
</script>

<style scoped></style>
