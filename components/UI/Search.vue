<template>
  <div ref="target" class="w-full relative">
    <FormInput
      :model-value="search"
      :placeholder="$t('search_for_product')"
      input-class="!py-2"
      @update:model-value="handleSearch"
      @focus="handleFocus"
    />
    <CollapseTransition easing="linear" dimension="height" :duration="200">
      <div
        v-if="showResult"
        class="w-full absolute mt-4 bg-white shadow rounded-lg max-h-[400px] overflow-y-auto filter-group pr-2"
      >
        <ul v-if="history?.length && !search" class="mb-3 py-2 px-3">
          <li class="text-base text-dark-400 font-medium">
            {{ $t('search_history') }}
          </li>
          <li
            v-for="(item, index) in history"
            :key="index"
            class="text-dark-400 text-sm group last:border-none border-b border-dashed border-b-gray-100 transition-200 flex justify-between items-center"
          >
            <p
              class="grow py-2 transition-200 group-hover:text-red cursor-pointer"
              @click="search = item.query"
            >
              {{ item?.query }}
            </p>
            <i
              class="icon-close-circle text-dark-400 text-lg opacity-0 group-hover:opacity-100 transition-200 cursor-pointer hover:text-red"
              @click="deleteQuery(item?.id)"
            ></i>
          </li>
        </ul>
        <ul v-if="popular?.length && !search" class="mb-3 py-2 px-3">
          <li class="text-base text-dark-400 font-medium">
            {{ $t('popular_search') }}
          </li>
          <li
            v-for="(item, index) in popular"
            :key="index"
            class="text-dark-400 text-sm group last:border-none border-b border-dashed border-b-gray-100 transition-200 flex justify-between items-center"
          >
            <p
              class="grow py-2 transition-200 group-hover:text-red cursor-pointer"
              @click="search = item.query"
            >
              {{ item?.query }}
            </p>
          </li>
        </ul>
        <ul v-if="search" class="py-2 px-3" @click="handleAction">
          <li class="text-base text-dark-400 font-medium">
            {{ $t('search_results') }}
          </li>
          <template v-if="!loading && !data?.length && search">
            <li
              class="text-dark-400 py-10 text-center text-sm last:border-none border-b border-dashed border-b-gray-100 transition-200 hover:text-red"
            >
              {{ $t('no_data_for_search') }}
            </li>
          </template>
          <template v-else>
            <li
              v-for="(item, index) in loading ? 3 : data"
              :key="index"
              class="text-dark-400 text-sm last:border-none border-b border-dashed border-b-gray-100 transition-200 hover:text-red"
            >
              <UISkeleton
                width="100%"
                height="20px"
                class="my-2"
                v-bind="{ loading }"
              >
                <NuxtLink
                  :to="`/products/${item?.slug}`"
                  class="w-full py-2 flex items-center"
                >
                  <i
                    class="icon-search-regular text-gray-400 text-base mr-4"
                  ></i>
                  {{ item?.title }}
                </NuxtLink>
              </UISkeleton>
            </li>
          </template>
        </ul>
      </div>
    </CollapseTransition>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { onClickOutside } from '@vueuse/core'

import { useSearchStore } from '~/store/search'
import { debounce } from '~/utils'

const store = useSearchStore()

const data = computed(() => store.data)
const history = computed(() => store.history)
const popular = computed(() => store.popular)
const loading = computed(() => store.loading)

const search = ref('')
const showResult = ref(false)

const target = ref(null)

onClickOutside(target, () => {
  showResult.value = false
})
watch(
  () => search.value,
  () => {
    debounce('search', () => {
      store.fetchSearchData(search.value)
    })
  }
)
function handleSearch(e: string) {
  search.value = e
}
function handleFocus() {
  showResult.value = true
  store.fetchSearchHistory()
}
function createQueryHistory() {
  try {
    useApi().$post('product/search-history/create/', {
      body: {
        query: search.value,
        fingerprint: useCookie('visitorId').value,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
async function deleteQuery(id: number) {
  await useApi().$delete(`product/search-history/delete/${id}/`)
  await store.fetchSearchHistory()
}
function handleAction() {
  createQueryHistory()
  showResult.value = false
  search.value = ''
  setTimeout(() => {
    store.data = []
    store.loading = true
  }, 1000)
}
onMounted(() => {
  store.fetchSearchHistory()
  store.fetchPopularSearch()
})
</script>
