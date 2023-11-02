<template>
  <ClientOnly>
    <div class="sm:py-14 pt-5">
      <UISectionTitle title="partners_ideas" center class="sm:mb-8 mb-4" />
      <div>
        <Swiper v-bind="settings" class="!pt-6 !pb-16 h-full overflow-hidden">
          <SwiperSlide
            v-for="(item, idx) in loading ? 10 : generateItem(data)"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative sm:max-w-[350px] max-w-[260px] w-full md:!h-max"
          >
            <CardsIdea :data="item" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { IIdeas, IResponse } from '~/types'
import { generateItem } from '~/utils'

const settings = {
  pagination: {
    clickable: true,
  },
  slidesPerView: 'auto',
  centeredSlides: true,
  pauseOnMouseEnter: true,
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Autoplay],
}
const loading = ref(true)
const data = ref<IIdeas[]>([])
try {
  loading.value = true
  const ideas = useAsyncData('ideas', () =>
    useApi().$get<IResponse<IIdeas>>(`partners/feedback/`, {
      params: {
        limit: 50,
      },
    })
  )
  if (ideas.data.value) {
    data.value = ideas.data.value?.results
  }
} catch (err) {
  console.log(err)
} finally {
  loading.value = false
}
</script>
