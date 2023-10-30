<template>
  <label
    class="group inline-flex items-center relative select-none min-h-6"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      v-bind="{ disabled }"
      type="checkbox"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="checked"
      :value="value"
      :name="name"
      @change="handleChange"
    />
    <span
      :class="[
        {
          '!border-red': error,
          'group-hover:border-primary': !disabled,
        },
      ]"
      class="shrink-0 duration-200 ease-in-out inline-block bg-white-100 h-6 w-6 rounded-md border-2 peer-checked:-rotate-90 peer-checked:after:opacity-100 peer-checked:after:rotate-[138deg] after:transition-all after:duration-200 after:absolute after:left-2 after:top-1 after:w-[7px] after:h-3 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[0deg] after:opacity-0 peer-checked:bg-reddit border-[#C8CFD6] peer-checked:border-red-400 after:border-white peer-disabled:border-grey-100 peer-disabled:after:border-grey-100"
    />
    <span v-if="label" class="ml-2">
      <slot name="label">
        <p class="leading-130 text-dark text-sm" :class="[labelStyles]">
          {{ $t(label) }}
        </p>
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  name?: string
  value?: string | number | boolean
  disabled?: boolean
  error?: boolean
  labelStyles?: string
  checked: boolean
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', val: Event): void
}>()
const handleChange = (e: Event) => {
  emit('update:modelValue', e?.target?.value)
}
</script>
