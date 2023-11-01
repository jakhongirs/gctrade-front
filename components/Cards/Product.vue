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
            :src="`https://picsum.photos/400/50${ind}`"
            alt=""
            class="h-full w-full object-cover relative z-0 aspect-square rounded-t-lg transition-200 group-hover:scale-105"
          />
        </div>
      </UISkeleton>
      <NuxtLink
        to="/products/top_products"
        class="px-2 pt-4 pb-2 grow active:outline-none active:bg-transparent flex flex-col"
      >
        <UISkeleton v-bind="{ loading }" width="120px" height="16px">
          <span v-if="ind % 2 === 0" class="text-red-400 text-xs line-through"
            >160 000 UZS</span
          >
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="160px"
          height="24px"
          margin="4px 0"
        >
          <h3 class="font-bold text-base text-dark">120 000 UZS</h3>
        </UISkeleton>
        <UISkeleton v-bind="{ loading }" width="180px" height="24px">
          <p class="text-dark text-base transition-200">
            Product name come here
          </p>
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="150px"
          height="24px"
          margin="16px 0"
        >
          <p class="my-4 text-sm font-medium text-dark">
            Manufacturer,
            <span class="text-gray-400 font-normal">Tashkent</span>
          </p>
        </UISkeleton>

        <UISkeleton v-bind="{ loading }" width="100%" height="32px">
          <UIAddButton :saved="ind % 2 === 0" />
        </UISkeleton>
      </NuxtLink>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
interface Props {
  ind: number
  loading?: boolean
}
defineProps<Props>()

function addCart() {
  console.log('add cart')
}
</script>
