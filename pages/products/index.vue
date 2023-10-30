<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="lg:col-span-3 col-span-12 lg:sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit md:block hidden"
      >
        <SectionsFilter />
      </aside>
      <div class="lg:col-span-9 col-span-12">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UISectionTitle title="products" class="!px-0" />
            <span class="text-gray-600 text-xl"> (125) </span>
          </div>
          <div
            class="sm:hidden flex items-center gap-2 text-lg text-dark-400"
            @click="openModal"
          >
            <i class="icon-checklist text-2xl text-dark-400"></i>
            Filter
          </div>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6">
          <CardsProduct v-for="(item, index) in 9" :key="index" :ind="index" />
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
</script>
