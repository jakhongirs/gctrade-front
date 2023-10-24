<template>
  <ClientOnly>
    <NuxtLink
      to="/products/top_product"
      class="shadow rounded-lg hover:shadow-2xl flex flex-col min-h-fit group transition-200"
    >
      <div class="max-h-[280px] h-full rounded-t-lg overflow-hidden relative">
        <UILikeButton class="top-4 right-4" @click.stop.prevent="addCart" />
        <img
          :src="`https://picsum.photos/400/50${ind}`"
          alt=""
          class="h-full w-full object-cover relative z-0 aspect-square rounded-t-lg transition-200 group-hover:scale-105"
        />
      </div>
      <div class="px-4 pt-6 pb-4 grow flex flex-col">
        <span v-if="ind % 2 === 0" class="text-red-400 text-xs line-through"
          >160 000 UZS</span
        >
        <h3 class="font-bold text-xl text-dark">120 000 UZS</h3>
        <p class="text-dark text-base transition-200">Product name come here</p>

        <p class="my-4 text-base font-medium text-dark">
          Manufacturer, <span class="text-gray-400 font-normal">Tashkent</span>
        </p>

        <UIButton
          :text="$t('to_cart')"
          size="small"
          class="w-full mt-auto"
          @click.stop.prevent="addCart"
        />
      </div>
    </NuxtLink>
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
