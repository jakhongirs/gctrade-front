<template>
  <div>
    <UIBreadcrumb v-if="!categoryLoading" :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="lg:col-span-3 col-span-12 lg:sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit lg:block hidden"
      >
        <SectionsFilter />
      </aside>
      <div class="lg:col-span-9 col-span-12">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <UISectionTitle
              :title="category?.title || $t('category')"
              class="!px-0"
            />
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

        <Transition mode="out-in">
          <div>
            <div
              v-if="loading"
              class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
            >
              <CardsProduct
                v-for="(item, index) in 9"
                :key="index"
                :ind="index"
                loading
                :data="{}"
              />
            </div>
            <div v-else>
              <div
                v-if="products?.length"
                class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
              >
                <CardsProduct
                  v-for="(item, index) in products"
                  :key="index"
                  :ind="index"
                  :loading="loading"
                  :data="item"
                />
              </div>
              <SectionsNoData v-else />
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <UIModal
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
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import { useProductStore } from '~/store/products'
import { debounce } from '~/utils'

const store = useProductStore()
const homeStore = useHomeStore()
const route = useRoute()
const { t } = useI18n()

const products = computed(() => store.products)
const category = computed(() => homeStore.filteredCategories?.[0])
const categoryLoading = computed(() => homeStore.loading)
const count = computed(() => store.count)
const loading = computed(() => store.loading)
const breadcrumbs = computed(() => {
  return [
    {
      title: t('categories'),
      url: '/products',
    },
    {
      title: category.value?.title,
      url: '/products',
    },
  ]
})

const filterModal = ref(false)
function openModal() {
  filterModal.value = true
}
watch(
  () => route.query,
  () => {
    if (route.query?.is_sale) {
      route.query.is_sale = true
    }
    debounce('query', () => {
      store.fetchProducts({
        parent_category: !isNaN(route.params.id) ? route.params.id : undefined,
        ...route.query,
      })
    })
  },
  {
    deep: true,
  }
)

Promise.allSettled([
  store.fetchProducts({
    parent_category: !isNaN(route.params.id) ? route.params.id : undefined,
    ...route.query,
  }),
  homeStore.fetchFilteredCategories({
    id: !isNaN(route.params.id) ? route.params.id : undefined,
    categories__id: route.query.category || undefined,
  }),
])
</script>
