<template>
  <UIButton
    :text="$t(saved ? 'in_cart' : 'to_cart')"
    size="small"
    :variant="saved ? 'light' : 'primary'"
    class="w-full mt-auto"
    text-class="!text-xs"
    @click.stop.prevent="store.incrementCount"
  />
</template>
<script setup lang="ts">
import { useBasketStore } from '~/store/basket'

interface Props {
  saved?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-action'): void
}>()

const store = useBasketStore()
</script>
