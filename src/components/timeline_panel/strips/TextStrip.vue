<template>
  <div class="text-strip">
    {{ strip.text }}
  </div>
</template>

<script setup lang="ts">
import { TextStrip } from '../../../models'
const props = defineProps<{
  strip: TextStrip
}>()
</script>

<style scoped>
.text-strip {
  background-color: green;
  width: 100%;
  height: 100%;
  padding-left: 6px;
}
</style>
