<template>
  <div v-if="loading || data?.length" class="container sm:py-14 py-5">
    <UISectionTitle
      title="products"
      link="/products"
      link-text="all_products"
      class="mb-6"
    />
    <div
      class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
    >
      <CardsProduct
        v-for="(item, index) in loading ? 8 : data"
        :key="index"
        :ind="index"
        :data="item"
        v-bind="{ loading }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IProduct, IResponse } from '~/types'

const loading = ref(true)
const data = ref<IProduct[]>([])
async function fetchData() {
  try {
    loading.value = true
    const list = await useApi().$get<IResponse<IProduct>>(`product/list/`, {
      params: {
        limit: 8,
      },
    })
    if (list) {
      data.value = list.results
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
fetchData()
</script>
