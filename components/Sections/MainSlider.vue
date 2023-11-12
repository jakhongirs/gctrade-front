<template>
  <ClientOnly>
    <Transition name="fade" mode="out-in">
      <div
        :key="loading"
        class="md:!h-[420px] h-[200px] overflow-hidden container"
      >
        <Swiper
          v-if="!loading"
          v-bind="settings"
          class="!pb-8 h-full"
          @slide-change="onChangeSlide"
        >
          <SwiperSlide
            v-for="(item, idx) in banners"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative !w-full md:!h-max"
          >
            <div
              class="inner_slider_main !w-full h-full image-preloader relative"
            >
              <img
                :src="item?.image"
                alt="banner"
                class="object-cover transition-200 rounded-lg !w-full md:h-[420px] h-[200px]"
              />
              <a
                target="_blank"
                :href="item?.url"
                class="bg-white/10 absolute top-0 left-0 w-full h-full layer rounded-lg flex flex-col justify-end px-10 py-6"
              >
                <h2 class="text-[32px] font-medium text-white">
                  {{ item?.title }}
                </h2>
                <p class="text-base text-white mt-2">{{ item?.sub_title }}</p>
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
        <UISkeleton v-else class="w-full h-full" v-bind="{ loading }" />
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

import { useHomeStore } from '~/store/home'

const store = useHomeStore()

const banners = computed(() => store.banner)
const loading = computed(() => store.bannerLoading)
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

store.fetchBanner()
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid hsla(220, 4%, 48%, 0.3);
}
.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 16px;
  color: #040e1a;
}
.swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.5) !important;
}
.layer {
  background: linear-gradient(
    180deg,
    rgba(2, 5, 20, 0) 0%,
    rgba(2, 5, 20, 0.7) 51.34%,
    #020514 100%
  );
}
</style>
