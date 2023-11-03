<template>
  <div class="flex items-center justify-between w-full">
    <button
      class="w-10 h-10 rounded border border-red-100 disabled:cursor-not-allowed disabled:active:scale-100 disabled:opacity-50 flex items-center justify-center active:scale-95 transition-200 hover:bg-red-100"
      :disabled="min >= count"
      @click="decrease"
    >
      <span class="md:text-2xl text-xl leading-6 text-red icon-minus-circle" />
    </button>
    <div
      :class="[{ readonly }]"
      class="h-full flex items-center justify-center"
    >
      <input
        v-model="count"
        v-maska
        type="text"
        data-maska="###"
        class="text-center flex-center w-16 outline-none"
        :class="[{ error }]"
        @input="onChangeCount"
      />
    </div>
    <button
      class="w-10 h-10 rounded border border-dark-500/30 disabled:cursor-not-allowed disabled:active:scale-100 disabled:opacity-50 flex items-center justify-center active:scale-95 transition-200 hover:bg-gray-100/50"
      :disabled="count >= max"
      @click="increase"
    >
      <span
        class="md:text-2xl text-xl leading-6 text-green icon-add-circle transition-300"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { debounce } from '~/utils'

interface Props {
  disableIncrease?: boolean
  disableDecrease?: boolean
  error?: boolean
  readonly?: boolean
  max?: number
  min?: number
  modelValue: number
}
const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 999,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'decrease', value: number): void
}>()

const count = ref(props.modelValue)
const decrease = () => {
  count.value--
}
const increase = () => {
  count.value++
}
watch(count, () => {
  debounce(
    'counter',
    () => {
      emit('update:modelValue', count.value)
    },
    500
  )
})
const onChangeCount = (event: InputEvent) => {
  // const target = event.target?.value
  // count.value = target.replace(/\D/g, '')
  if (count.value <= props.min) count.value = props.min
  if (count.value >= props.max) count.value = props.max
}
</script>
