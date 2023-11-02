<template>
  <div v-if="loading || data?.length" class="container sm:py-16 py-5">
    <UISectionTitle
      title="sale_products"
      link="/products?sale=true"
      link-text="all_sale_products"
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
import { IProduct, IResponse } from '~/types'

const loading = ref(true)
const data = ref<IProduct[]>([])
try {
  loading.value = true
  const list = useAsyncData('on_sale', () =>
    useApi().$get<IResponse<IProduct>>(`product/list/`, {
      params: {
        limit: 10,
        is_sale: true,
      },
    })
  )
  if (list.data.value) {
    data.value = list.data.value?.results
  }
} catch (err) {
  console.log(err)
} finally {
  loading.value = false
}
</script>
