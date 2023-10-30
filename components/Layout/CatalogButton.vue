<template>
  <div
    v-if="isOpen"
    class="fixed min-h-screen w-full inset-0 bg-white z-[998] pt-[128px]"
  >
    <div class="container py-16 grid grid-cols-12 gap-6 h-full">
      <div class="col-span-3 overflow-y-auto">
        <ul class="px-4 py-2">
          <li
            v-for="(item, index) in categories"
            :key="index"
            :class="{ '!text-red': activeCatgeory === item.id }"
            class="text-lg cursor-pointer text-dark py-2 transition-200 hover:text-red flex justify-between items-center"
            @click="defineSubCategories(item.id)"
            @mouseenter="defineSubCategories(item.id)"
          >
            {{ item.title }} <i class="icon-chevron-right"></i>
          </li>
        </ul>
      </div>
      <div class="col-span-9 px-16 py-4 overflow-y-auto">
        <ul class="columns-2">
          <li
            v-for="(item, index) in subCategories"
            :key="index"
            class="text-base text-dark mb-3 transition-200 hover:text-red"
          >
            <NuxtLink :to="`/products?category=${item.id}`">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { categories } from '~/data'

export interface Props {
  isOpen: boolean
}
defineProps<Props>()

const subCategories = ref(categories[0].categories || [])
const activeCatgeory = ref(1)
function defineSubCategories(id: number) {
  subCategories.value = categories.find(
    (element) => element.id === id
  )?.categories

  activeCatgeory.value = id
}
</script>
