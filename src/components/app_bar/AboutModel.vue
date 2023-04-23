<template>
  <el-dialog
    :lock-scroll="false"
    v-model="dialogVisible"
    title="About"
    width="20%"
    :show-close="false"
    :before-close="beforeClose"
  >
    <h2>NAME : {{ _NAME_ }}</h2>
    <h2>VERSION : {{ _VERSION_ }}</h2>
    <h2>AUTHOR : {{ _AUTHOR_ }}</h2>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
        <el-button type="primary" @click="emit('update:dialogVisible', false)">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { _VERSION_, _AUTHOR_, _NAME_ } from '../../models'
interface Props {
  dialogVisible: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dialogVisible: false
})
const emit = defineEmits<{
  (e: 'update:dialogVisible', value: boolean): void
}>()
const beforeClose = () => {
  emit('update:dialogVisible', false)
}
</script>

<style scoped></style>
