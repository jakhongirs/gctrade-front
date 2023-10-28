<template>
  <div
    v-if="isOpen"
    class="fixed min-h-screen w-full inset-0 bg-white z-[998] pt-[128px]"
  >
    <div class="container pt-16">
      <ul @click="$emit('on-click')">
        <li class="text-xl text-dark font-medium mb-4">
          <NuxtLink to="/"> {{ $t('pages') }} </NuxtLink>
        </li>
        <li class="text-base text-dark mb-2 transition-200 hover:text-red">
          <NuxtLink to="/about"> {{ $t('about') }} </NuxtLink>
        </li>
        <li class="text-base text-dark mb-2 transition-200 hover:text-red">
          <NuxtLink to="/products"> {{ $t('products') }} </NuxtLink>
        </li>
        <li class="text-base text-dark mb-2 transition-200 hover:text-red">
          <NuxtLink to="/categories"> {{ $t('categories') }} </NuxtLink>
        </li>
        <li class="text-base text-dark mb-2 transition-200 hover:text-red">
          <NuxtLink to="/contact"> {{ $t('contacts') }} </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  isOpen: boolean
}
defineProps<Props>()
</script>
