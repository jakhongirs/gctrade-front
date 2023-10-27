<template>
  <div class="flex items-center justify-between w-full">
    <button
      class="w-10 h-10 rounded border border-red-100 flex items-center justify-center active:scale-95 transition-200 hover:bg-red-100"
      :disabled="disableDecrease"
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
        type="text"
        readonly
        :min="min"
        :max="max"
        class="text-center flex-center w-16 outline-none"
        :class="[{ error }]"
        @input="onChangeCount"
      />
    </div>
    <button
      class="w-10 h-10 rounded border border-dark-500/30 flex items-center justify-center active:scale-95 transition-200 hover:bg-gray-100/50"
      :disabled="disableIncrease"
      :class="[
        { '!bg-gray-400 !border-gray-400 !cursor-not-allowed': max === count },
      ]"
      @click="increase"
    >
      <span
        class="md:text-2xl text-xl leading-6 text-green icon-add-circle transition-300"
        :class="{ '!text-gray-300': max === count }"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  defaultCount?: number
  disableIncrease?: boolean
  disableDecrease?: boolean
  error?: boolean
  readonly?: boolean
  residentValidation?: boolean
  inputMask?: string
  max?: number
  min?: number
  // counterClass?: string
  // inputStyle?: string
}
const props = withDefaults(defineProps<Props>(), {
  defaultCount: 0,
  min: 0,
  max: 999,
  inputMask: '###',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'decrease', value: number): void
}>()

const count = ref(0)

watch(
  () => props.defaultCount,
  (newValue) => {
    if (newValue) {
      count.value = newValue
    }
  },
  { immediate: true }
)

watch(
  () => count.value,
  () => {
    if (count.value < props.min) {
      count.value = props.min
    }
    if (count.value > props.max) {
      count.value = props.max
    }
    // debounce('count', () => emit('update:modelValue', count.value), 300)
  },
  { immediate: true, deep: true }
)

const decrease = () => {
  if (
    count.value > 0 &&
    !props.disableDecrease &&
    ((props.residentValidation && count.value - 1 >= props.defaultCount) ||
      !props.residentValidation)
  ) {
    count.value--
    emit('decrease', count.value)
  }
}
const increase = () => {
  if (!props.disableIncrease) {
    count.value++
  }
}
const onChangeCount = (event: InputEvent) => {
  const target = event.target as HTMLInputElement

  if (target?.value.includes('-') || event.data?.includes('-')) {
    return event.preventDefault()
  }
}
</script>
