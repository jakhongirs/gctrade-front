<template>
  <div>
    <div
      class="w-full flex items-center bg-blue/[0.05] dark:bg-dark-500 rounded-lg relative outline-0 border-2 border-solid transition duration-200 ease-in-out"
      :class="[
        error
          ? 'border-red focus-within:border-red'
          : 'border-transparent focus-within:border-blue',
      ]"
    >
      <div class="relative w-full">
        <textarea
          :id="id"
          v-model="inputValue"
          placeholder=""
          :maxLength="maxLength"
          :minLength="minLength"
          class="py-3 px-4 resize-none text-dark dark:text-white leading-21 text-lg border-0 outline-0 bg-transparent w-full z-1 relative"
          :class="textareaClass"
          @blur="$emit('blur')"
        />
        <span
          class="absolute top-0 py-3 px-4 left-0 z-0 text-dark-400 dark:text-white opacity-20 leading-21 text-lg origin-left scale-100 transition-all duration-150"
          :class="{ '!scale-75 !opacity-0': inputValue?.length }"
        >
          {{ placeholder }}
        </span>
      </div>
    </div>
    <p v-if="error" class="text-red text-xs mt-1">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  id?: string
  error?: boolean
  errorMessage?: string
  placeholder: string
  maxLength?: number
  minLength?: number
  defaultValue?: string
  textareaClass?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
const inputValue = ref('')
watch(
  () => inputValue.value,
  () => {
    emit('update:modelValue', inputValue.value)
  }
)
watch(
  () => props.defaultValue,
  () => {
    inputValue.value = props.defaultValue
  },
  {
    immediate: true,
  }
)
</script>
