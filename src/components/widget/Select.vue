<template>
  <select @change="change">
    <option
      v-for="(item, i) in items"
      :key="i"
      :value="item.value"
      :disabled="item.disabled"
      :selected="item.value == id"
    >
      {{ item.text }}
    </option>
  </select>
</template>

<script setup lang="ts">
export interface OptionKeyValue {
  value: string
  text: string
  disabled?: boolean
}
const props = defineProps<{
  items: OptionKeyValue[]
  id: string
}>()
const emit = defineEmits<{
  (e: 'change', value: OptionKeyValue): void
}>()
const change = (e: Event) => {
  const target = e.target as HTMLInputElement
  const item = props.items.find(item => item.value == target.value)
  if (item) emit('change', item)
}
</script>

<style scoped></style>
