<template>
  <div class="flex h-full">
    <div class="max-w-[140px] w-full rounded-md shrink-0 relative">
      <div
        class="absolute top-2 left-2 w-10 h-10 rounded bg-white/40 flex items-center justify-center"
      >
        <FormCheckbox />
      </div>
      <img
        src="https://picsum.photos/200/200"
        alt=""
        class="object-cover w-full h-full rounded-md"
      />
    </div>
    <div class="ml-4 min-h-[140px] flex flex-col py-4 h-full grow">
      <p class="text-xl text-dark-400 font-semibold">{{ 'Product title' }}</p>
      <p class="mt-auto">
        <span class="font-medium mr-2">{{ $t('products_count') }}:</span
        >{{ formatMoneyDecimal(101) }}
      </p>
    </div>
    <div
      class="max-w-[180px] min-w-[178px] w-full shrink-0 relative pl-6 border-l border-l-gray-100/50 flex flex-col"
    >
      <UILikeButton class="!right-0" />
      <div>
        <p class="text-base font-semibold">
          {{ formatMoneyDecimal(150000) }} UZS
        </p>
        <p class="text-red line-through text-xs">
          {{ formatMoneyDecimal(170000) }} UZS
        </p>
      </div>
      <UICounter class="mt-auto" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatMoneyDecimal } from '@/utils'
</script>
