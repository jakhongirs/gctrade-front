<template>
  <div
    v-if="isOpen"
    class="fixed min-h-screen w-full inset-0 bg-white z-[998] pt-[76px]"
  >
    <div class="container py-16 grid grid-cols-12 gap-6 h-full">
      <div class="lg:col-span-3 col-span-4 overflow-y-auto">
        <ul class="px-4 py-2">
          <li
            v-for="(item, index) in data"
            :key="index"
            :class="{ '!text-red': activeCatgeory === item.id }"
            class="text-lg cursor-pointer text-dark py-2 transition-200 hover:text-red flex justify-between items-center"
            @click="onClickCategory(item.id)"
            @mouseenter="defineSubCategories(item.id)"
          >
            {{ item.title }} <i class="icon-chevron-right"></i>
          </li>
        </ul>
      </div>
      <div class="lg:col-span-9 col-span-8 px-16 py-4 overflow-y-auto">
        <ul class="columns-2">
          <li
            v-for="(item, index) in subCategories || data?.[0]?.categories"
            :key="index"
            class="text-base text-dark mb-3 transition-200 hover:text-red"
          >
            <NuxtLink :to="`/category/${item.slug}?category=${item.id}`">
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
import { useHomeStore } from '~/store/home'
import { ICategory } from '~/types'

export interface Props {
  isOpen: boolean
}
defineProps<Props>()
const store = useHomeStore()
const router = useRouter()
const data = computed((): ICategory[] => store.categories)
const subCategories = ref(data.value[0]?.categories)
const activeCatgeory = ref(1)
function defineSubCategories(id: number) {
  subCategories.value = data.value.find(
    (element) => element.id === id
  )?.categories

  activeCatgeory.value = id
}
function onClickCategory(id: number) {
  router.push(`/category/${id}`)
}
</script>
