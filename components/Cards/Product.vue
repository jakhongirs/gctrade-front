<template>
  <ClientOnly>
    <div
      class="shadow rounded-lg hover:shadow-2xl flex flex-col min-h-fit group transition-200"
    >
      <UISkeleton v-bind="{ loading }" height="200px" width="100%">
        <div
          class="max-h-[200px] min-h-[200px] h-full rounded-t-lg overflow-hidden relative"
        >
          <UILikeButton class="top-4 right-4" @click.stop.prevent="addCart" />
          <img
            :src="data?.gallery?.[0]"
            :alt="data?.title"
            class="h-full w-full object-cover relative z-0 aspect-square rounded-t-lg transition-200 group-hover:scale-105"
          />
        </div>
      </UISkeleton>
      <NuxtLink
        :to="`/products/${data?.slug}`"
        class="px-2 pt-4 pb-2 grow active:outline-none active:bg-transparent flex flex-col"
      >
        <UISkeleton v-bind="{ loading }" width="70%" height="16px">
          <span
            v-if="data?.sale_price"
            class="text-red-400 text-xs line-through"
            >{{ formatMoneyDecimal(data?.sale_price) }} UZS</span
          >
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="80%"
          height="24px"
          margin="4px 0"
        >
          <h3 class="font-bold text-base text-dark">
            {{ formatMoneyDecimal(data?.price) }} UZS
          </h3>
        </UISkeleton>
        <UISkeleton v-bind="{ loading }" width="96%" height="24px">
          <p class="text-dark text-base transition-200 line-clamp-2">
            {{ data?.title }}
          </p>
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="88%"
          height="24px"
          margin="16px 0"
        >
          <p
            v-if="data?.manufacturer"
            class="my-4 text-sm font-medium text-dark"
          >
            {{ data?.manufacturer?.title }},
            <span class="text-gray-400 font-normal">Tashkent</span>
          </p>
        </UISkeleton>

        <UISkeleton v-bind="{ loading }" width="100%" height="32px">
          <UIAddButton :saved="data?.is_in_cart" />
        </UISkeleton>
      </NuxtLink>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { IProduct } from '~/types'
import { formatMoneyDecimal } from '~/utils'

interface Props {
  ind: number
  loading?: boolean
  data: IProduct | number
}
defineProps<Props>()

function addCart() {
  console.log('add cart')
}
</script>
