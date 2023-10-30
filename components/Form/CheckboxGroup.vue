<template>
  <div v-if="items && Object.keys(items).length > 0" :class="wrapperClass">
    <FormCheckbox
      v-for="(item, index) in items"
      :key="index"
      class="w-full"
      :checked="modelValue.includes(item[valueKey])"
      :label="item[labelKey]"
      :value="item[valueKey]"
      :disabled="disabled ? !modelValue?.includes(item[valueKey]) : false"
      :name="name"
      @update:model-value="onChange($event, item[valueKey])"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number | object
  items: { [key: string]: string | number }[]
  labelKey?: string
  valueKey?: string
  wrapperClass?: string
  name?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: 'flex flex-wrap gap-2',
  labelKey: 'name',
  valueKey: 'id',
  name: `k-checkbox-${Math.floor(Math.random() * 1000)}`,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object): void
}>()

const values = ref<any>([...props.modelValue])
function onChange(newValue: boolean, itemValue: number) {
  if (values.value.includes(itemValue)) {
    values.value.splice(values.value.indexOf(itemValue), 1)
  } else {
    values.value.push(itemValue)
  }
  emit('update:modelValue', values.value)
}
</script>
