<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-10">
      <div class="flex items-center gap-2">
        <UISectionTitle title="saved_products" />
        <span class="text-gray-600 text-xl"> ({{ count }}) </span>
      </div>
      <Transition mode="out-in">
        <div>
          <div
            v-if="loading"
            class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
          >
            <CardsProduct
              v-for="(item, index) in 12"
              :key="index"
              :ind="index"
              loading
              :data="{} as IProduct"
            />
          </div>
          <div v-else>
            <div
              v-if="data?.length"
              class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
            >
              <CardsProduct
                v-for="(item, index) in data"
                :key="index"
                :ind="index"
                :loading="loading"
                :data="item.product"
              />
            </div>
            <SectionsNoData v-else />
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import { useI18n } from 'vue-i18n'

import { useSavedStore } from '~/store/saved'
import { IProduct } from '~/types'

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

store.fetchSavedProducts(true)
</script>
