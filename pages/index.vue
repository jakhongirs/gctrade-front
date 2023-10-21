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
</script>
