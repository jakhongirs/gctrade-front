<template>
  <div v-if="loading" aria-hidden="true" aria-label="skeleton" @click.stop>
    <div
      v-for="(i, index) in count"
      :key="i"
      class="bg-gray-100 animate-pulse rounded-md cursor-progress"
      :class="itemClass"
      :style="{
        width: getWidth(index),
        height,
      }"
    ></div>
  </div>
  <slot v-else />
</template>

<script lang="ts" setup>
interface Props {
  loading?: boolean
  width?: string
  height?: string
  itemClass?: string | string[]
  count?: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 1,
  width: '100%',
  height: '',
  itemClass: '',
})

function getWidth(index: number) {
  if (props.width.includes(',')) {
    return props.width.split(',')[index]
  }
  return props.width
}
</script>
