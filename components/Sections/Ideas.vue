<template>
  <ClientOnly>
    <div class="sm:py-14 pt-5 sm:block hidden container">
      <UISectionTitle title="partners_ideas" center class="sm:mb-8 mb-4" />
      <div class="relative ideas-swiper">
        <Swiper v-bind="settings" class="!pt-6 !pb-16 h-full overflow-hidden">
          <SwiperSlide
            v-for="(item, idx) in loading ? 10 : data"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative sm:max-w-[350px] max-w-[260px] w-full md:!h-max"
          >
            <CardsIdea :data="item" />
          </SwiperSlide>
        </Swiper>
        <div class="w-full absolute top-[45%] z-10 flex justify-between">
          <button
            class="swiper-btn-prev icon-chevron-right rotate-180 !-left-16 transition-200 hover:opacity-80 relative hover:text-red"
          ></button>
          <button
            class="swiper-btn-next icon-chevron-right !-right-16 transition-200 hover:opacity-80 relative hover:text-red"
          ></button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { IIdeas, IResponse } from '~/types'
import { generateItem } from '~/utils'

const settings = {
  slidesPerView: 'auto',
  // centeredSlides: true,
  pauseOnMouseEnter: true,
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Autoplay, Navigation],
}
const loading = ref(true)
const data = ref<IIdeas[]>([])
async function fetchData() {
  try {
    loading.value = true
    const list = await useApi().$get<IResponse<IIdeas>>(`partners/feedback/`, {
      params: {
        limit: 50,
      },
    })
    if (list) {
      data.value = list.results
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
fetchData()
</script>
<style>
.ideas-swiper .swiper-btn-next,
.ideas-swiper .swiper-btn-prev {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #d4dfff;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ideas-swiper .swiper-btn-next:after,
.ideas-swiper .swiper-btn-prev:after {
  display: none;
}
</style>
