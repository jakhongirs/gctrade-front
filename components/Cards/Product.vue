<template>
  <ClientOnly>
    <div
      class="shadow rounded-lg hover:shadow-2xl flex flex-col min-h-fit group transition-200"
    >
      <div
        class="sm:max-h-[250px] sm:min-h-[250px] max-h-[200px] min-h-[200px] h-full rounded-t-lg overflow-hidden relative"
      >
        <UILikeButton class="top-4 right-4" @click.stop.prevent="addCart" />
        <img
          :src="`https://picsum.photos/400/50${ind}`"
          alt=""
          class="h-full w-full object-cover relative z-0 aspect-square rounded-t-lg transition-200 group-hover:scale-105"
        />
      </div>
      <NuxtLink
        to="/products/top_products"
        class="sm:px-4 sm:pt-6 sm:pb-4 px-2 pt-4 pb-2 grow active:outline-none active:bg-transparent flex flex-col"
      >
        <span v-if="ind % 2 === 0" class="text-red-400 text-xs line-through"
          >160 000 UZS</span
        >
        <h3 class="font-bold sm:text-xl text-base text-dark">120 000 UZS</h3>
        <p class="text-dark text-base transition-200">Product name come here</p>

        <p class="my-4 sm:text-base text-sm font-medium text-dark">
          Manufacturer, <span class="text-gray-400 font-normal">Tashkent</span>
        </p>

        <UIAddButton :saved="ind % 2 === 0" />
      </NuxtLink>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
interface Props {
  ind: number
}
defineProps<Props>()

function addCart() {
  console.log('add cart')
}
</script>
