<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-10">
      <div class="flex items-center gap-2">
        <UISectionTitle title="saved_products" />
        <span class="text-gray-600 text-xl"> ({{ count }}) </span>
      </div>
      <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <CardsProduct
          v-for="(item, index) in data"
          :key="index"
          :ind="index"
          :data="item.product"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import { useI18n } from 'vue-i18n'

import { useSavedStore } from '~/store/saved'

const store = useSavedStore()
const { t } = useI18n()

const data = computed(() => store.data)
const loading = computed(() => store.loading)
const count = computed(() => store.count)
const breadcrumbs = computed(() => {
  return [
    {
      title: 'saved_products',
      url: t('/products'),
    },
  ]
})

store.fetchSavedProducts()
</script>
