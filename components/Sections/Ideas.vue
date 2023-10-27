<template>
  <div class="py-14">
    <UISectionTitle title="partners_ideas" center class="mb-8" />
    <div>
      <Swiper v-bind="settings" class="!pt-6 !pb-16 h-full overflow-hidden">
        <SwiperSlide
          v-for="(item, idx) in 10"
          :key="'A' + idx"
          class="cursor-grab active:cursor-grabbing relative max-w-[350px] w-full md:!h-max"
        >
          <CardsIdea />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const settings = {
  pagination: {
    clickable: true,
  },
  slidesPerView: 'auto',
  centeredSlides: true,
  // centeredSlidesBounds: true,
  // centerInsufficientSlides: true,
  pauseOnMouseEnter: true,
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Autoplay],
}
</script>
