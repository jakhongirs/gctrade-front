<template>
  <div
    :class="{ '!translate-x-0': isOpen }"
    class="fixed min-h-screen w-full inset-0 bg-white z-[998] pt-[68px] transition-300 transform translate-x-[-100%]"
  >
    <div class="container py-8 h-full">
      <div class="flex flex-col h-full">
        <h2 class="text-base font-semibold mb-2">{{ $t('categories') }}</h2>
        <ul class="">
          <li
            v-for="(item, index) in categories"
            :key="index"
            class="cursor-pointer rounded mb-2 border-b border-b-gray-100"
            @click="
              activeCategory === item.id
                ? (activeCategory = null)
                : (activeCategory = item.id)
            "
          >
            <div
              class="text-lg text-dark transition-200 flex justify-between items-center"
              :class="{ '!text-red': activeCategory === item.id }"
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
                class="pl-4 mt-2"
                :class="{ p: activeCategory === item.id }"
              >
                <li
                  v-for="(el, ind) in item.categories"
                  :key="ind"
                  class="text-base text-dark mb-3 block w-full transition-200 hover:text-red"
                >
                  <NuxtLink :to="`/products?category=${el.id}`">
                    {{ el.title }}
                  </NuxtLink>
                </li>
              </ul>
            </CollapseTransition>
          </li>
        </ul>
        <ul>
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
        <UILanguageSwitcher class="max-w-[180px] -ml-3" />
        <div class="mt-auto">
          <a
            href="/"
            class="flex items-center w-full transition-200 text-base mb-3"
          >
            <i
              class="icon-map-square text-gray text-2xl mr-1 transition-200"
            ></i>
            Toshkent
          </a>
          <a
            href="https://t.me/bozor_com"
            class="flex items-center w-full transition-200 text-base mb-3"
          >
            <i
              class="icon-telegram text-xl text-gray mr-2 group-hover:text-red transition-200"
            ></i
            >t.me/bozor_com</a
          >
          <a
            href="tel:+998955156515"
            class="flex items-center w-full transition-200 text-base mb-3"
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

import { categories } from '~/data'

export interface Props {
  isOpen: boolean
}
defineProps<Props>()

const activeCategory = ref(1)
</script>
