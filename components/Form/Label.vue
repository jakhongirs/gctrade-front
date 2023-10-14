<template>
  <div class="flex items-center">
    <label
      :for="labelFor"
      class="text-base text-dark dark:text-white leading-19"
    >
      {{ labelText }}
    </label>
    <i v-if="required" class="icon-required text-red text-xs ml-1"></i>
  </div>
</template>
<script setup lang="ts">
interface Props {
  labelText?: string
  required?: boolean
  labelFor?: string
}
defineProps<Props>()
</script>
