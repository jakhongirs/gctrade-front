<template>
  <div>
    <h2 class="text-xl text-dark font-medium">Filter</h2>
    <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
    <div class="max-h-[500px] overflow-y-auto filter-group pr-4 -mr-4">
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
            :checked="group.includes(category.id)"
            @update:model-value="handleChange(category.id)"
          />
        </template>
      </div>
    </div>
    <hr class="h-0.5 w-full bg-gray-100/50 my-4" />
    <div class="">
      <p class="text-base text-dark font-medium mb-3">
        {{ $t('other_filters') }}
      </p>
      <FormCheckboxGroup
        v-model="others"
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
  </div>
</template>
<script setup lang="ts">
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'

import { categories, filters } from '~/data'
import { debounce } from '~/utils'

const route = useRoute()
const group = ref([])
const others = ref([])
const minValue = ref(0)
const maxValue = ref(1000000)
const range = ref([1000, 1000000])

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
// working with checkbox group

const handleChange = (id: number) => {
  if (group.value.includes(id)) {
    group.value.splice(group.value.indexOf(id), 1)
  } else {
    group.value.push(id)
  }
}
onMounted(() => {
  if (route.query?.category) {
    group.value.push(Number(route.query?.category))
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
