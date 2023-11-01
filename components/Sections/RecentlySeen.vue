<template>
  <div class="container sm:py-14 py-5">
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
        v-for="(item, index) in list ? list : 8"
        :key="index"
        :ind="index"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  list: number
}
defineProps<Props>()
</script>
