<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="col-span-3 sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit"
      >
        <h2 class="text-xl text-dark font-medium">Filter</h2>
        <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
        <div class="">
          <p class="text-base text-dark font-medium mb-3">
            {{ $t('categories') }}
          </p>
          <FormCheckboxGroup
            v-model="group"
            :items="filters"
            label-key="label"
            value-key="id"
          />
        </div>
        <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
        <div>
          <p class="text-base text-dark font-medium mb-3">
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
          <VueSlider
            :key="`${minValue}-${maxValue}`"
            v-model="range"
            :min="0"
            :max="10000000"
            :interval="100"
            :tooltip-formatter="
              (v) => `${('' + v).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
            "
          />
        </div>
      </aside>
      <div class="col-span-9">
        <div class="flex items-center gap-2">
          <UISectionTitle title="products" />
          <span class="text-gray-600 text-xl"> (125) </span>
        </div>
        <div class="grid grid-cols-3 gap-6 mt-6">
          <CardsProduct v-for="(item, index) in 9" :key="index" :ind="index" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'

import { filters } from '~/data'
import { debounce } from '~/utils'

const group = ref([5, 10])
const minValue = ref(0)
const maxValue = ref(1000000)
const range = ref([1000, 1000000])
const breadcrumbs = computed(() => {
  return [
    {
      title: 'products',
      url: '/products',
    },
  ]
})

watch(
  () => [minValue.value, maxValue.value],
  () => {
    debounce('range', () => {
      range.value[0] = +minValue.value
      range.value[1] = +maxValue.value
    })
  }
)
watch(
  () => range.value,
  () => {
    debounce('range', () => {
      minValue.value = range.value[0]
      maxValue.value = range.value[1]
    })
  },
  {
    deep: true,
  }
)
</script>
