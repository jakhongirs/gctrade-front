<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="lg:col-span-3 col-span-12 lg:sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit lg:block hidden"
      >
        <SectionsFilter />
      </aside>
      <div class="lg:col-span-9 col-span-12">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UISectionTitle title="products" class="!px-0" />
            <span class="text-gray-600 text-xl"> ({{ count }}) </span>
          </div>
          <div
            class="lg:hidden flex items-center gap-2 text-lg text-dark-400"
            @click="openModal"
          >
            <i class="icon-checklist text-2xl text-dark-400"></i>
            Filter
          </div>
        </div>
        <div
          class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
        >
          <CardsProduct
            v-for="(item, index) in loading ? 9 : products"
            :key="index"
            :ind="index"
            :loading="loading"
            :data="item"
          />
        </div>
      </div>
    </div>
    <UIModal
      id="filter_modal"
      :show="filterModal"
      with-header
      title="Filter"
      @close="filterModal = false"
    >
      <div class="max-h-[600px] overflow-y-auto">
        <SectionsFilter />
      </div>
    </UIModal>
  </div>
</template>
<script setup lang="ts">
import { useProductStore } from '~/store/products'

const store = useProductStore()
const products = computed(() => store.products)
const count = computed(() => store.count)
const loading = computed(() => store.loading)
const breadcrumbs = computed(() => {
  return [
    {
      title: 'products',
      url: '/products',
    },
  ]
})

const filterModal = ref(false)
function openModal() {
  filterModal.value = true
}

Promise.allSettled([store.fetchProducts()])
</script>
