<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-10">
      <div class="flex items-center gap-2">
        <UISectionTitle title="categories" />
        <span class="text-gray-600 text-xl"> ({{ count }}) </span>
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <CardsCategory
          v-for="(item, index) in data"
          :key="index"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import { useHomeStore } from '~/store/home'
import { ICategory } from '~/types'

const store = useHomeStore()

const data = computed((): ICategory[] => store.categories)
const count = computed(() => store.categoriesCount)

const breadcrumbs = computed(() => {
  return [
    {
      title: 'categories',
      url: '/products',
    },
  ]
})
</script>
