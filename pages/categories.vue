<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-10">
      <div class="flex items-center gap-2">
        <UISectionTitle title="categories" />
        <span class="text-gray-600 text-xl"> (125) </span>
      </div>
      <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        <CardsCategory v-for="(item, index) in 9" :key="index" :ind="index" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

const breadcrumbs = computed(() => {
  return [
    {
      title: 'categories',
      url: '/products',
    },
  ]
})
</script>
