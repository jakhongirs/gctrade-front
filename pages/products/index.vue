<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="lg:col-span-3 col-span-12 lg:sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit"
      >
        <SectionsFilter />
      </aside>
      <div class="lg:col-span-9 col-span-12">
        <div class="flex items-center gap-2">
          <UISectionTitle title="products" />
          <span class="text-gray-600 text-xl"> (125) </span>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
          <CardsProduct v-for="(item, index) in 9" :key="index" :ind="index" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const breadcrumbs = computed(() => {
  return [
    {
      title: 'products',
      url: '/products',
    },
  ]
})
</script>
