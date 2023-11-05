<template>
  <div class="lg:mt-0 mt-6">
    <h2 class="text-xl text-dark font-medium lg:block hidden">Filter</h2>
    <hr class="h-0.5 w-full bg-gray-100/50 my-4 sm:block hidden" />
    <div>
      <p class="text-base text-dark font-bold mb-3">
        {{ $t('price') }}
      </p>
      <div>
        <label for="min_price" class="text-dark text-sm">
          {{ $t('min_price') }}
        </label>
        <input
          v-model="minValue"
          type="text"
          :placeholder="$t('enter_min_price')"
          class="bg-transparent text-sm py-2 px-3 mt-1 border border-gray w-full focus:border-blue-900 rounded outline-none"
        />
      </div>
      <div class="mt-2 mb-4">
        <label for="min_price" class="text-dark text-sm">
          {{ $t('max_price') }}
        </label>
        <input
          v-model="maxValue"
          type="text"
          :placeholder="$t('enter_max_price')"
          class="bg-transparent text-sm py-2 px-3 mt-1 border border-gray w-full focus:border-blue-900 rounded outline-none"
        />
      </div>
    </div>
    <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
    <p class="text-base text-dark font-bold mb-3">
      {{ $t('categories') }}
    </p>
    <div
      class="filter-group max-h-[300px] overflow-y-auto lg:pr-4 lg:-mr-4 transition-200"
    >
      <template v-if="loading">
        <UISkeleton
          v-for="(item, index) in 10"
          v-bind="{ loading }"
          :key="index"
          width="80%"
          height="24px"
          class="mb-2"
        />
      </template>
      <template v-else>
        <div
          v-for="(item, index) in categories"
          :key="index"
          class="first:mt-0 mt-3"
        >
          <p class="text-base text-dark font-medium mb-3">
            {{ item.title }}
          </p>
          <template v-for="(category, ind) in item.categories" :key="ind">
            <FormCheckbox
              :value="category.id"
              :label="category.title"
              name="checkbox_group"
              class="py-1 block w-full"
              :checked="group.includes(category?.id)"
              @update:model-value="handleChange(category.id)"
            />
          </template>
        </div>
      </template>
    </div>
    <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
    <p
      v-if="loading || manufacturer?.length"
      class="text-base text-dark font-bold mb-3"
    >
      {{ $t('manufacturer') }}
    </p>
    <div
      class="filter-group max-h-[300px] overflow-y-auto lg:pr-4 lg:-mr-4 transition-200"
    >
      <template v-if="loading">
        <UISkeleton
          v-for="(item, index) in 10"
          v-bind="{ loading }"
          :key="index"
          width="80%"
          height="24px"
          class="mb-2"
        />
      </template>
      <template v-else>
        <div
          v-for="(item, index) in manufacturer"
          :key="index"
          class="first:mt-0 mt-3"
        >
          <FormCheckbox
            :value="item.id"
            :label="item.title"
            name="checkbox_group"
            class="py-1 block w-full"
            :checked="manufacturers.includes(item?.id)"
            @update:model-value="handleManufacturer(item.id)"
          />
        </div>
      </template>
    </div>
    <hr
      v-if="loading || manufacturer?.length"
      class="h-0.5 w-full bg-gray-100/50 my-4"
    />
    <div class="">
      <p class="text-base text-dark font-bold mb-3">
        {{ $t('other_filters') }}
      </p>
      <FormCheckbox
        v-model="extraFilters.sale_products"
        name="checkbox_group"
        class="py-1 block w-full"
        :label="$t('sale_products')"
        :checked="extraFilters.sale_products"
        @update:model-value="
          (e) => updateQueries({ is_sale: e ? e : undefined })
        "
      />
      <FormCheckbox
        v-model="extraFilters.top_products"
        name="checkbox_group"
        class="py-1 block w-full"
        :label="$t('top_products')"
        :checked="extraFilters.top_products"
        @update:model-value="
          (e) => updateQueries({ ordering: e ? '-views_count' : undefined })
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'
import { ICategory, IManufacture } from '~/types'
import { debounce } from '~/utils'

interface Props {
  categories: ICategory[]
  manufacturer: IManufacture[]
}
defineProps<Props>()
const store = useHomeStore()

const loading = computed(() => store.loading)
const route = useRoute()
const router = useRouter()
const group = ref<number[]>([])
const manufacturers = ref<number[]>([])
const minValue = ref(route.query?.min_price ?? 100)
const maxValue = ref(route.query?.max_price ?? 1000000)
const extraFilters = reactive({
  top_products: !!route.query?.ordering || false,
  sale_products: !!route.query?.is_sale || false,
  recent_products: false,
})

watch(
  () => [minValue.value, maxValue.value],
  () => {
    debounce('range', () => {
      updateQueries({ min_price: minValue.value, max_price: maxValue.value })
    })
  }
)
const handleManufacturer = (id: number) => {
  if (manufacturers.value.includes(id)) {
    manufacturers.value.splice(group.value.indexOf(id), 1)
  } else {
    manufacturers.value.push(id)
  }
  debounce('manufacturer', () => {
    updateQueries({ manufacturer: manufacturers.value.join(',') })
  })
}
// working with checkbox group
const handleChange = (id: number) => {
  if (group.value.includes(id)) {
    group.value.splice(group.value.indexOf(id), 1)
  } else {
    group.value.push(id)
  }
  debounce('category', () => {
    updateQueries({ category: group.value.join(',') })
  })
}
function updateQueries(queries) {
  const query = route.query
  router.replace({ query: { ...query, ...queries } })
}
onMounted(() => {
  // Parent category
  // if (!isNaN(route.params.id) && categories.value) {
  //   const parent = categories.value.find(
  //     (el) => el?.id === Number(route.params.id)
  //   )
  //   if (parent?.categories?.length) {
  //     group.value = parent?.categories?.map((el) => el.id)
  //   }
  // }
  // child category
  if (route.query?.category) {
    group.value = route.query?.category
      ?.split(',')
      ?.map((el: string) => Number(el))
  }
  if (route.query?.manufacturer) {
    manufacturers.value = route.query?.manufacturer
      ?.split(',')
      ?.map((el: string) => Number(el))
  }
})
</script>
<style>
.filter-group::-webkit-scrollbar {
  width: 4px;
}

.filter-group::-webkit-scrollbar-track {
  background: #ebeef5;
}

.filter-group::-webkit-scrollbar-thumb {
  background: rgba(213, 216, 220, 0.5);
  border-radius: 12px;
}
</style>
