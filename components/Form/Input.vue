<template>
  <div class="w-full">
    <div
      class="w-full flex items-center bg-blue/[0.05] rounded-lg relative outline-0 border border-solid border-transparent focus-within:border-blue main-transition"
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
          :value="modelValue"
          :type="type"
          :area-label="areaLabel"
          :placeholder="placeholder"
          :maxLength="maxLength"
          :minLength="minLength"
          :readonly="readonly"
          :disabled="disabled"
          class="py-2 px-4 text-dark read-only:!text-dark-400 focus:border-0 dark:text-white leading-21 text-base border-0 outline-0 bg-transparent w-full z-[1] relative"
          :class="inputClass"
          @input="handleInput($event)"
          @focus="(e: Event) => emit('focus', e)"
          @blur="(e: Event) => emit('blur', e)"
        />
      </div>
      <div :class="postfixClass">
        <slot name="postfix"></slot>
      </div>
    </div>
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
  validation?: boolean
  isArticlePage?: boolean
  readonly?: boolean
  disabled?: boolean
  modelValue?: string
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur', value: Event): void
  (e: 'focus', value: Event): void
}>()
function handleInput(e: string) {
  emit('update:modelValue', e.target.value)
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
