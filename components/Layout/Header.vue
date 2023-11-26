<template>
  <header open class="w-full bg-white fixed top-0 z-[999]">
    <CollapseTransition easing="linear" dimension="height">
      <div
        v-if="!windowIsScrolled"
        class="bg-white-100 w-full py-1 lg:block hidden"
      >
        <div class="container flex items-center justify-between">
          <div class="group">
            <a
              href="/"
              class="flex items-center transition-200 text-sm group-hover:text-red"
            >
              <i
                class="icon-map-square text-gray text-xl mr-1 transition-200 group-hover:text-red"
              ></i>
              {{ contact.address }}
            </a>
          </div>
          <div class="flex items-center gap-4">
            <a
              :href="`tel:${contact?.phone?.[0]?.phone}`"
              class="flex items-center text-sm transition-200 group hover:text-red"
              ><i
                class="icon-phone text-2xl text-gray mr-2 group-hover:text-red transition-200"
              ></i>
              {{ formatPhone(contact?.phone?.[0]?.phone) }}</a
            >
            <UILanguageSwitcher />
            <!--          <UIThemeSwitcher />-->
          </div>
        </div>
      </div>
    </CollapseTransition>
    <div
      class="container bg-white w-full flex items-center justify-between py-4"
    >
      <div class="flex items-center">
        <NuxtLink to="/" class="text-3xl">
          <img src="/svg/logo.svg" alt="" class="max-w-[140px]" />
        </NuxtLink>
      </div>
      <div class="lg:min-w-[600px] flex">
        <UIButton
          :text="$t('catalog')"
          size="small"
          variant="custom"
          class="mr-6 header-burger lg:min-w-[150px] -ml-20 md:flex hidden"
          @click="$emit('on-open')"
        >
          <div class="flex items-center justify-center gap-2 w-full text-white">
            <i
              class="text-xl text-white"
              :class="
                open ? 'icon-close-circle-regular' : 'icon-hamburger-menu'
              "
            ></i>
            <span class="lg:block hidden">{{ $t('catalog') }}</span>
          </div>
        </UIButton>
        <UISearch class="sm:block hidden" />
      </div>
      <div class="md:hidden block" @click="$emit('on-open')">
        <i
          class="text-3xl text-dark"
          :class="open ? 'icon-close-circle-regular' : 'icon-hamburger-menu'"
        ></i>
      </div>
      <div class="md:flex hidden items-center gap-2">
        <NuxtLink
          to="/saved"
          class="w-8 h-8 rounded-lg bg-white-100 flex items-center justify-center group cursor-pointer relative"
        >
          <div
            v-if="savedCount"
            class="flex items-center justify-center rounded-full bg-red text-white text-xs absolute w-5 h-5 -top-3 -right-4 z-10 font-medium"
          >
            {{ savedCount }}
          </div>
          <i
            class="icon-heart text-2xl text-gray-600 group-hover:text-red transition-200"
          ></i>
        </NuxtLink>
        <NuxtLink
          to="/basket"
          class="w-8 h-8 relative rounded-lg bg-white-100 flex items-center justify-center group cursor-pointer"
        >
          <div
            v-if="count"
            class="flex items-center justify-center rounded-full bg-red text-white text-xs absolute w-5 h-5 -top-3 -right-4 font-medium"
          >
            {{ count }}
          </div>
          <i
            class="icon-basket text-2xl text-gray-600 group-hover:text-red transition-200"
          ></i>
        </NuxtLink>
      </div>
    </div>
    <div class="sm:hidden block py-2 px-4 border-t border-t-gray-100">
      <UISearch />
    </div>
  </header>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useWindowScroll } from '@vueuse/core'

import { useBasketStore } from '~/store/basket'
import { useHomeStore } from '~/store/home'
import { useSavedStore } from '~/store/saved'

interface Props {
  open: boolean
}
defineProps<Props>()
defineEmits<{
  (e: 'on-open'): void
}>()

const homeStore = useHomeStore()
const store = useBasketStore()
const savedStore = useSavedStore()
const count = computed(() => store.count)
const savedCount = computed(() => savedStore.count)
const contact = computed(() => homeStore.contact)
const scroll = useWindowScroll()
const scrollTop = scroll.y
const windowIsScrolled = ref(false)
//
watch(
  () => scrollTop.value,
  (value) => {
    if (value > 300) {
      windowIsScrolled.value = true
    }
    if (value < 150) {
      windowIsScrolled.value = false
    }
  }
)

Promise.allSettled([
  homeStore.fetchCategories(),
  savedStore.fetchSavedProducts(),
  homeStore.fetchContact(),
]).catch((err) => {
  console.log(err)
})
</script>
<style>
header {
  filter: drop-shadow(0 8px 44px rgba(56, 56, 56, 0.12));
}
.header-burger {
  background: linear-gradient(84.8deg, #383838 0%, #6f6f6f 131.39%);
}
</style>
