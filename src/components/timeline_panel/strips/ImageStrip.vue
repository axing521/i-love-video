<template>
  <div class="image-strip">
    <span v-if="strip.imageAsset">
      <img class="image-preview" :src="strip.imageAsset.path" />
      <div class="preview-name">
        {{ strip.imageAsset.name }}
      </div>
    </span>
    <StripError v-if="!strip.imageAsset" />
  </div>
</template>

<script setup lang="ts">
import { ImageStrip } from '../../../models'

defineProps<{
  strip: ImageStrip
}>()
</script>

<style scoped>
.image-strip {
  background-color: rgb(152, 92, 8);
  width: 100%;
  height: 100%;
  padding-left: 4px;
}

.image-preview {
  pointer-events: none;
  height: 24px;
  position: absolute;
  left: 5px;
  top: 1px;
}

.preview-name {
  pointer-events: none;
  margin-left: 26px;
}
</style>
