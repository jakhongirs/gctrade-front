<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="lg:col-span-3 col-span-12 lg:sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit lg:block hidden"
      >
        <SectionsFilter
          :categories="categories"
          :manufacturer="manufacturers"
        />
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
        <Transition mode="out-in">
          <div>
            <div
              v-if="loading"
              class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-6 gap-3 mt-6"
            >
              <CardsProduct
                v-for="(item, index) in 12"
                :key="index"
                :ind="index"
                loading
                :data="{} as IProduct"
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
        <div class="flex justify-end mt-8">
          <UIPagination
            v-if="count > pagination.limit"
            :total="count"
            :current-page="pagination.page"
            :limit="pagination.limit"
            @input="handlePagination"
          />
        </div>
      </div>
    </div>
    <UIModal
      :show="filterModal"
      with-header
      title="Filter"
      @close="filterModal = false"
    >
      <div class="max-h-[600px] overflow-y-auto filter-group -mr-2 pr-2">
        <SectionsFilter
          :categories="categories"
          :manufacturer="manufacturers"
        />
      </div>
    </UIModal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import { useManufacturerStore } from '~/store/manufacturer'
import { useProductStore } from '~/store/products'
import { IProduct } from '~/types'
import { debounce } from '~/utils'

const store = useProductStore()
const homeStore = useHomeStore()
const manStore = useManufacturerStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const products = computed(() => store.products)
const categories = computed(() => homeStore.categories)
const manufacturers = computed(() => manStore.data)
const count = computed(() => store.count)
const loading = computed(() => store.loading)
const pagination = reactive({
  page: route.query?.page ? Number(route?.query?.page) : 1,
  limit: 12,
  offset: 0,
})
const breadcrumbs = computed(() => {
  return [
    {
      title: t('products'),
      url: '/products',
    },
  ]
})

const filterModal = ref(false)
function openModal() {
  filterModal.value = true
}
function handlePagination(e: number) {
  pagination.page = e
}
function updateQueries(queries) {
  const query = route.query
  router.replace({ query: { ...query, ...queries } })
}
watch(
  () => pagination.page,
  (val) => {
    pagination.offset = (pagination.page - 1) * pagination.limit
    updateQueries({ page: pagination.page })
  },
  {
    immediate: true,
  }
)
watch(
  () => [
    route.query.category,
    route.query.ordering,
    route.query.is_sale,
    route.query.min_price,
    route.query.max_price,
    route.query.manufacturer,
  ],
  (val) => {
    const value = val.find((el) => el != undefined)
    if (value) {
      pagination.page = 1
    }
  }
)
watch(
  () => route.query,
  () => {
    if (route.query?.is_sale) {
      route.query.is_sale = true
    }
    debounce('query', () => {
      store.fetchProducts({
        ...route.query,
        ...pagination,
      })
    })
  },
  {
    deep: true,
    immediate: true,
  }
)
manStore.fetchManufacturer({})
</script>
