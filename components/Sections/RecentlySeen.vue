<template>
  <div v-if="loading || data?.length" class="container sm:py-14 py-5">
    <UISectionTitle
      title="recent_products"
      link="/products?recent=true"
      link-text="all_recent_products"
      class="mb-6"
    />
    <div
      class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3"
    >
      <CardsProduct
        v-for="(item, index) in loading ? 8 : data"
        :key="index"
        :ind="index"
        :loading="loading"
        :data="item"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IProduct, IRecentProduct, IResponse } from '~/types'

const loading = ref(true)
const data = ref<IProduct[]>([])
async function fetchData() {
  try {
    loading.value = true
    const list = await useApi().$get<IResponse<IRecentProduct>>(
      `product/last-seen-products/`,
      {
        params: {
          limit: 8,
        },
      }
    )
    if (list) {
      data.value = list.results.map((el) => el.product)
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
fetchData()
</script>
