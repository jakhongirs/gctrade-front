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
      <div class="flex justify-end mt-8">
        <UIPagination
          v-if="count > pagination.limit"
          :total="count"
          :current-page="pagination.page"
          :limit="pagination.limit"
          @input="handlePagination"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import { ICategory } from '~/types'

const store = useHomeStore()
const route = useRoute()
const data = computed((): ICategory[] => store.categories)
const count = computed(() => store.categoriesCount)
const { t } = useI18n()

const breadcrumbs = computed(() => {
  return [
    {
      title: t('categories'),
      url: '/products',
    },
  ]
})
const pagination = reactive({
  page: route.query?.page ? Number(route?.query?.page) : 1,
  limit: 12,
  offset: 0,
})
const handlePagination = (e: number) => {
  pagination.page = e
  pagination.offset = (e - 1) * pagination.limit
  store.fetchCategories(pagination)
}
useSeoMeta({
  title: `GC Trade - ${t('categories')}`,
  description: 'GC Trade is a base ecommerce',
})
</script>
