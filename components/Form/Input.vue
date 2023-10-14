<template>
  <div class="w-full">
    <div
      class="w-full flex items-center bg-blue/[0.05] dark:bg-dark-500 rounded-lg relative outline-0 border-2 border-solid border-transparent focus-within:border-blue main-transition"
      :class="[
        { '!border-red focus-within:!border-red': error },
        { 'focus-within:!border-transparent': readonly },
      ]"
    >
      <div :class="prefixClass">
        <slot name="prefix"></slot>
      </div>
      <div class="relative w-full">
        <input
          :id="id"
          v-model="inputValue"
          :type="type"
          :area-label="areaLabel"
          placeholder=""
          :maxLength="maxLength"
          :minLength="minLength"
          :readonly="readonly"
          :disabled="disabled"
          class="py-3 px-4 text-dark read-only:!text-dark-400 focus:border-0 dark:text-white leading-21 text-lg border-0 outline-0 bg-transparent w-full z-[1] relative"
          :class="inputClass"
          @input="sanitizeInput"
          @blur="(e: Event) => emit('blur', e)"
        />
        <span
          class="absolute top-0 py-3 px-4 left-0 z-0 text-dark-400 dark:text-white opacity-20 leading-21 text-lg origin-left scale-100 transition-all duration-150"
          :class="[
            { '!scale-75 !opacity-0': inputValue?.length },
            placeholderClass,
          ]"
        >
          {{ placeholder }}
        </span>
      </div>
      <div :class="postfixClass">
        <slot name="postfix"></slot>
      </div>
    </div>
    <p v-if="error" class="text-red text-xs mt-1 absolute">
      {{ errorMessage }}
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  id?: string
  type: string
  error?: boolean
  errorMessage?: string
  placeholder: string
  areaLabel?: string
  maxLength?: number
  minLength?: number
  prefixClass?: string
  postfixClass?: string
  inputClass?: string
  placeholderClass?: string
  defaultValue?: string
  validation?: boolean
  isArticlePage?: boolean
  readonly?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', value: Event): void
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
function sanitizeInput(input) {
  if (props.validation) {
    input.target.value = input.target.value.replace(/[^a-zA-Z0-9@_]/g, '')
    if (input.target.value.charAt(0) !== '@') {
      inputValue.value = '@' + inputValue.value
    }
  }
}
</script>
<style>
/* Apply styles to autofill input field */
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:focus-visible,
input:-webkit-autofill:hover {
  background-color: transparent !important;
  border: none;
  border-radius: 8px !important;
  color: #040e1a !important;
  -webkit-text-fill-color: #040e1a !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  transition: background-color 5000s ease-in-out 0s; /* delay the change of input background color */
}

input:-moz-placeholder {
  color: #040e1a !important;
}

input:-ms-input-placeholder {
  color: #040e1a !important;
}
</style>
