<template>
  <h2>Audio</h2>
  <el-form label-width="50px" size="small">
    <el-form-item label="Asset">
      <Select :items="getSelectItems" :id="currentAssetId" @change="changeAsset" />
    </el-form-item>
    <el-form-item label="Start">
      <el-input-number v-model="strip.start" :precision="3" :min="0" />
    </el-form-item>
    <el-form-item label="Length">
      <el-input-number v-model="strip.length" :precision="3" :min="0" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { Asset, AudioAsset, AudioStrip } from '../../models'
import { OptionKeyValue } from '../widget/Select.vue'
const props = defineProps<{
  strip: AudioStrip
  assets: Asset[]
}>()
const getAudioAsset = computed((): AudioAsset[] => {
  return props.assets.filter(item => item instanceof AudioAsset) as AudioAsset[]
})
const getSelectItems = computed(() => {
  const items: OptionKeyValue[] = [{ value: '', text: 'No selected', disabled: true }]
  return items.concat(
    getAudioAsset.value.map((va: AudioAsset) => {
      return {
        value: va.id,
        text: va.name
      }
    })
  )
})
const currentAssetId = computed(() => {
  if (props.strip.asset) {
    return props.strip.asset.id
  }
  return ''
})

const changeAsset = (val: OptionKeyValue | undefined) => {
  if (val) {
    const target = props.assets.find(item => item.id === val.value)
    if (!target || !(target instanceof AudioAsset)) return
    props.strip.updateAsset(target)
    console.log(props.strip)
  }
}
</script>

<style scoped></style>
