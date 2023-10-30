<template>
  <ClientOnly>
    <Transition name="fade" mode="out-in">
      <div
        :key="loading"
        class="md:!h-[487px] h-[200px] overflow-hidden md:pb-[52px]"
      >
        <Swiper
          v-bind="settings"
          class="!pb-8 h-full"
          @slide-change="onChangeSlide"
        >
          <SwiperSlide
            v-for="(item, idx) in data"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative md:max-w-[1000px] max-w-[350px] w-full md:!h-max"
          >
            <div
              class="inner_slider_main lg:min-w-[1000px] min-w-[320px] h-full image-preloader"
            >
              <img
                :src="item?.image_src"
                alt="banner"
                class="object-cover transition-200 rounded-lg sm:w-full w-[350px] md:h-full h-[200px]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Autoplay, Pagination } from 'swiper/modules'
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
  breakpoints: {
    450: {
      spaceBetween: 20,
    },
  },
}

const activeSlide = ref(0)
function onChangeSlide(newValue: { activeIndex: number }) {
  activeSlide.value = newValue.activeIndex
}
</script>

<style>
.swiper-wrapper {
  display: flex;
}
.main-slider .swiper-pagination-bullet {
  height: 4px !important;
  width: 30px;
  background-color: #d4d5d7;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  opacity: 1 !important;
}

.main-slider
  .swiper-pagination-bullet:not(.swiper-pagination-bullet-active):hover {
  opacity: 100;
}

.main-slider .swiper-slide::before {
  content: '';
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    #f7f8fa -28.78%,
    rgba(247, 248, 250, 0) 100%
  );
  transform: matrix(-1, 0, 0, 1, 0, 0);
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 8px;
}

.main-slider .swiper-slide {
  //opacity: 40%;
  //min-width: 80vw;
  transition: all 0.3s ease-in-out;
}

.main-slider .swiper-slide-active::before {
  background-image: linear-gradient(
    180deg,
    rgba(2, 5, 20, 0) 0%,
    rgba(2, 5, 20, 0.7) 51.34%,
    #020514 100%
  );
  transition: all 0.3s ease-in-out;
  bottom: 0;
  height: 60%;
  border-radius: 0 0 8px 8px;
}

.main-slider .swiper-slide-active {
  opacity: 100%;
  transition: all 0.3s ease-in-out;
}

.main-slider .swiper-slide:not(.swiper-slide-active) .inner_slider_main {
  @apply pointer-events-none;
}

.main-slider .swiper-pagination-bullet-active {
  position: relative;
  background-color: #d4d5d7 !important;
  border-radius: 5px;
  overflow: hidden;
  opacity: 1 !important;
}

.main-slider .swiper-pagination-bullet-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #383838;
  border-radius: 5px;
  animation-name: countingBar;
  animation-duration: 2.9s;
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-direction: alternate;
  animation-fill-mode: forwards;
}

@keyframes countingBar {
  0% {
    width: 0;
    height: 0;
  }
  10% {
    height: 100%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>
