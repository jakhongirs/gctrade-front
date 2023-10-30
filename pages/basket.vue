<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container my-12">
      <UISectionTitle title="basket" class="mb-6" />
      <div class="grid grid-cols-12 gap-6">
        <div class="lg:col-span-8 col-span-12 bg-white shadow p-5 rounded">
          <div>
            <template v-for="(item, index) in 4" :key="index">
              <CardsBasket />
              <hr v-if="index !== 3" class="h-0.5 bg-gray-400/20 w-full my-2" />
            </template>
          </div>
        </div>
        <div
          class="lg:col-span-4 col-span-12 bg-white shadow p-5 rounded h-fit"
        >
          <h2 class="text-lg font-semibold text-dark-400">
            {{ $t('your_order') }}
          </h2>
          <hr class="h-0.5 bg-gray-400/20 w-full my-2" />
          <ul>
            <li
              class="flex items-center justify-between py-2 border-b border-b-gray-100/40"
            >
              <p class="text-sm text-dark-400">{{ $t('products_count') }}:</p>
              <p class="text-sm text-dark-400 font-medium">
                {{ formatMoneyDecimal(24) }}
              </p>
            </li>
            <li
              class="flex items-center justify-between py-2 border-b border-b-gray-100/40"
            >
              <p class="text-sm text-dark-400">{{ $t('total') }}:</p>
              <p class="text-sm text-dark-400 font-medium">
                {{ formatMoneyDecimal(600000) }} UZS
              </p>
            </li>
            <li class="flex items-center justify-between py-2">
              <p class="text-sm text-red">{{ $t('discount') }}:</p>
              <p class="text-sm text-red font-medium">
                {{ formatMoneyDecimal(600000) }} UZS
              </p>
            </li>
          </ul>
          <hr class="h-0.5 bg-gray-400/20 w-full my-2" />
          <UIButton :text="$t('send_order')" size="small" class="w-full mt-6" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const breadcrumbs = computed(() => {
  return [
    {
      title: 'basket',
      url: '/basket',
    },
  ]
})
</script>
