<template>
  <div
    class="pt-3 md:pt-5 bg-white rounded-2xl flex items-start justify-between gap-2 h-32 overflow-hidden category-card transition-300 cursor-pointer group"
    :class="{ 'pointer-events-none': loading }"
  >
    <div
      class="pl-3 md:pl-5 flex flex-col justify-between h-full pb-3 md:pb-4 w-fu;;"
    >
      <h3
        class="font-semibold text-sm md:text-xl text-dark leading-130 w-[80px] md:w-full"
      >
        {{ data.title }}
      </h3>
      <NuxtLink
        :to="`/products?parent_category=${data.id}`"
        class="inline-flex items-center gap-1 transition-300 md:opacity-0 group-hover:opacity-100"
      >
        <p class="text-red text-sm leading-130">{{ $t('more') }}</p>
        <i class="icon-arrow-right text-red text-base leading-4" />
      </NuxtLink>
    </div>
    <ClientOnly>
      <div class="h-full self-end shrink-0">
        <img
          class="w-full max-w-[106px] translate-y-4 h-full"
          :src="data.icon"
          alt="card"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ICategory } from '~/types'

export interface Props {
  loading?: boolean
  data: ICategory
}
defineProps<Props>()
</script>

<style scoped>
.category-card:hover {
  box-shadow: 0 8px 40px rgba(40, 40, 40, 0.12);
}
</style>
