<template>
  <div>
    <swiper
      v-if="images?.length"
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      v-bind="settings"
      :thumbs="{ swiper: thumbsSwiper }"
      class="flex"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in images"
        :key="index"
        class="aspect-square product overflow-hidden cursor-pointer"
      >
        <div
          class="w-full h-full flex items-center justify-center bg-white rounded border zoomer"
        >
          <vue-image-zoomer
            class="w-full h-full object-cover !rounded"
            :regular="item"
            :zoom="item"
          />
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      v-if="images?.length > 1"
      :space-between="8"
      slides-per-view="5"
      centered-slides
      centered-slides-bounds
      center-insufficient-slides
      class="mySwiper mt-2"
      @swiper="setThumbsSwiper"
    >
      <swiper-slide v-for="(item, index) in images" :key="index" class="!w-fit">
        <div
          class="rounded border sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] active"
        >
          <img
            :src="item"
            width="110"
            height="110"
            alt="product-thumbnail"
            class="rounded w-full h-full object-cover"
          />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/zoom'
import 'vue-image-zoomer/dist/style.css'

import {
  Autoplay,
  EffectCreative,
  FreeMode,
  Navigation,
  Thumbs,
  Zoom,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { VueImageZoomer } from 'vue-image-zoomer'

const modules = reactive([
  Navigation,
  Autoplay,
  EffectCreative,
  FreeMode,
  Thumbs,
  Zoom,
])
const settings = {
  effect: 'creative',
  grabCursor: true,
  draggable: true,
  spaceBetween: 10,
  loop: true,
  zoom: true,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
  modules,
}

const thumbsSwiper = ref()
const onSwiper = (swiper) => {
  console.log(swiper)
}
const setThumbsSwiper = (swiper) => {
  // if (Image) {
  thumbsSwiper.value = swiper
  // }
}
const onSlideChange = () => {
  console.log('slide change')
}
const images = ref([
  '/fake/20_2.webp',
  'https://picsum.photos/600/601',
  '/fake/20_2.webp',
  '/fake/20_2.webp',
  '/fake/20_2.webp',
])
</script>
<style>
.swiper-slide-thumb-active .active {
  border: 1px solid #388cc9 !important;
}
.product img {
  max-width: none;
  width: 100%;
}
</style>
