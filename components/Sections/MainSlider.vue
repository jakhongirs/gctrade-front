<template>
  <ClientOnly>
    <Transition name="fade" mode="out-in">
      <div
        :key="loading"
        class="md:!h-[420px] h-[200px] overflow-hidden container"
      >
        <Swiper
          v-bind="settings"
          class="!pb-8 h-full"
          @slide-change="onChangeSlide"
        >
          <SwiperSlide
            v-for="(item, idx) in data"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative !w-full md:!h-max"
          >
            <div class="inner_slider_main !w-full h-full image-preloader">
              <img
                :src="item?.image_src"
                alt="banner"
                class="object-cover transition-200 rounded-lg !w-full md:h-[420px] h-[200px]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  data?: any[]
  loading?: boolean
}
defineProps<Props>()
const settings = {
  pagination: {
    clickable: true,
  },
  effect: 'fade',
  navigation: true,
  slidesPerView: 1,
  centeredSlides: true,
  // centeredSlidesBounds: true,
  // centerInsufficientSlides: true,
  pauseOnMouseEnter: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Autoplay, Pagination, EffectFade, Navigation],
}

const activeSlide = ref(0)
function onChangeSlide(newValue: { activeIndex: number }) {
  activeSlide.value = newValue.activeIndex
}
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d4dfff;
  border: 1px solid hsla(220, 4%, 48%, 0.3);
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 16px;
}
</style>
