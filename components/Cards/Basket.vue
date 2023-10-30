<template>
  <div class="flex h-full sm:flex-row flex-col relative">
    <div class="max-w-[140px] w-full rounded-md shrink-0 relative">
      <img
        src="https://picsum.photos/200/200"
        alt=""
        class="object-cover w-full h-full rounded-md"
      />
    </div>
    <div class="sm:ml-4 sm:min-h-[140px] flex flex-col py-4 h-full grow">
      <p class="text-xl text-dark-400 font-semibold">{{ 'Product title' }}</p>
      <p class="mt-auto">
        <span class="font-medium mr-2">{{ $t('products_count') }}:</span
        >{{ formatMoneyDecimal(101) }}
      </p>
    </div>
    <div
      class="max-w-[180px] min-w-[178px] w-full shrink-0 sm:relative sm:pl-6 sm:border-l sm:border-l-gray-100/50 flex flex-col"
    >
      <UILikeButton class="!right-0 top-0" />
      <div
        class="w-8 h-8 cursor-pointer flex items-center justify-center rounded absolute right-0 top-8"
      >
        <i class="icon-trash text-xl transition-200 hover:text-red"></i>
      </div>
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
