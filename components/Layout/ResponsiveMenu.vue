<template>
  <div
    :class="{ '!translate-x-0': isOpen }"
    class="fixed min-h-screen w-full inset-0 bg-white z-[998] sm:pt-[76px] pt-[120px] transition-300 transform translate-x-[-100%]"
  >
    <div class="container py-8 h-full filter-group overflow-y-auto">
      <div class="flex flex-col h-full">
        <UILanguageSwitcher class="max-w-[180px] -ml-3 mb-6" />
        <h2 class="text-base font-semibold mb-2">{{ $t('categories') }}</h2>
        <ul class="">
          <li
            v-for="(item, index) in categories"
            :key="index"
            class="cursor-pointer rounded mb-2 border-b border-dashed border-b-gray-100/50"
            @click="
              activeCategory === item.id
                ? (activeCategory = null)
                : (activeCategory = item.id)
            "
          >
            <div
              class="text-base font-medium text-dark transition-200 flex justify-between items-center"
              :class="{ '!text-dark-400': activeCategory === item.id }"
            >
              {{ item.title }}
              <i
                class="icon-chevron-right transform"
                :class="{ '!rotate-90': activeCategory === item.id }"
              ></i>
            </div>
            <CollapseTransition>
              <ul
                v-if="activeCategory === item.id"
                class="pl-4 mt-2 list-disc"
                :class="{ p: activeCategory === item.id }"
              >
                <li
                  v-for="(el, ind) in item.categories"
                  :key="ind"
                  class="text-base text-dark mb-3 block w-full transition-200 hover:text-red list-disc"
                >
                  <NuxtLink :to="`/category/${el.slug}?category=${el.id}`">
                    {{ el.title }}
                  </NuxtLink>
                </li>
              </ul>
            </CollapseTransition>
          </li>
        </ul>
        <ul class="mt-8">
          <li class="py-1">
            <NuxtLink to="/about" class="text-base font-medium text-dark-400">
              {{ $t('about') }}
            </NuxtLink>
          </li>
          <li class="py-1">
            <NuxtLink to="/contact" class="text-base font-medium text-dark-400">
              {{ $t('contacts') }}
            </NuxtLink>
          </li>
          <li class="py-1">
            <NuxtLink to="/basket" class="text-base font-medium text-dark-400">
              {{ $t('basket') }}
            </NuxtLink>
          </li>
          <li class="py-1">
            <NuxtLink to="/saved" class="text-base font-medium text-dark-400">
              {{ $t('saved_products') }}
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-auto mb-10">
          <a
            href="/"
            class="flex items-center w-full transition-200 text-sm mb-2"
          >
            <i
              class="icon-map-square text-gray text-2xl mr-1 transition-200"
            ></i>
            Toshkent
          </a>
          <a
            href="https://t.me/bozor_com"
            class="flex items-center w-full transition-200 text-sm mb-2"
          >
            <i
              class="icon-telegram text-xl text-gray mr-2 group-hover:text-red transition-200"
            ></i
            >t.me/bozor_com</a
          >
          <a
            href="tel:+998955156515"
            class="flex items-center w-full transition-200 text-sm mb-2"
            ><i
              class="icon-phone text-2xl text-gray mr-2 group-hover:text-red transition-200"
            ></i>
            +998 95 515 65 15</a
          >
        </div>
      </div>
      <div class="col-span-9 px-16 py-4 overflow-y-auto"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import { useHomeStore } from '~/store/home'

export interface Props {
  isOpen: boolean
}
defineProps<Props>()
const store = useHomeStore()
const categories = computed(() => store.categories)
const activeCategory = ref(1)
</script>
