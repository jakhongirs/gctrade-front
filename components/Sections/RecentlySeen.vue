<template>
  <div class="container py-14">
    <UISectionTitle
      title="recent_products"
      link="/products?recent=true"
      link-text="all_recent_products"
      class="mb-6"
    />
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
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
