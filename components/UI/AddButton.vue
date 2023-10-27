<template>
  <UIButton
    :text="$t(saved ? 'in_cart' : 'to_cart')"
    size="small"
    :variant="saved ? 'light' : 'primary'"
    class="w-full mt-auto"
    @click.stop.prevent="emit('on-action')"
  />
</template>
<script setup lang="ts">
interface Props {
  saved?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-action'): void
}>()
</script>
