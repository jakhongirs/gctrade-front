<template>
  <div class="mt-6">
    <SectionsMainSlider :data="swiperData" />
    <SectionsCategories />
    <SectionsProducts />
    <SectionsBrands />
    <SectionsIdeas />
    <SectionsTopProducts />
    <SectionsOnSaleProducts />
    <SectionsRecentlySeen />
  </div>
</template>
<script setup lang="ts">
import { useAsyncData } from '#app'
import { useMainStore } from '~/store/main'

const store = useMainStore()
const swiperData = [
  {
    image_src: 'https://picsum.photos/800/400',
  },
  {
    image_src: 'https://picsum.photos/800/401',
  },
  {
    image_src: 'https://picsum.photos/800/402',
  },
  {
    image_src: 'https://picsum.photos/800/403',
  },
]
// useAsyncData('main', async () => {
//   await store.fetchPartners()
// })
</script>
