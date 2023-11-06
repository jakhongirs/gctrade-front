<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-16">
      <div class="grid grid-cols-12 gap-6">
        <ClientOnly>
          <SectionsSingleSlider
            v-if="single"
            :images="single.gallery"
            class="lg:col-span-5 col-span-12"
          />
        </ClientOnly>
        <div class="lg:col-span-7 col-span-12 flex flex-col h-full">
          <ClientOnly>
            <div class="flex items-start justify-between">
              <h2 class="text-dark-400 sm:text-3xl text-xl font-bold">
                {{ single?.title }}
              </h2>
              <UILikeButton
                class="!relative !top-0"
                :product-id="single?.id"
                :saved="single?.is_in_saved"
                @click.stop.prevent="single.is_in_saved = !single?.is_in_saved"
              />
            </div>
            <p class="text-dark-400 text-2xl font-medium mt-2">
              {{ formatMoneyDecimal(single?.price) }} UZS
              <span
                v-if="single?.sale_price"
                class="text-red font-normal line-through text-sm"
              >
                {{ formatMoneyDecimal(single?.sale_price) }} UZS
              </span>
            </p>
            <p
              class="text-base text-dark-400 leading-8 mt-6 line-clamp-3"
              v-html="single?.description"
            ></p>
            <p class="text-base text-dark-400 font-semibold mt-2">
              <span class="font-normal"> {{ $t('category') }}: </span>
              {{ single?.category?.title }}
            </p>
            <hr
              v-if="single?.sold_count || single?.in_stock_count"
              class="h-0.5 bg-gray-400/50 w-full rounded my-4"
            />
            <div class="grid grid-cols-2 gap-6">
              <div v-if="single?.sold_count" class="flex items-center gap-4">
                <i class="text-red text-4xl icon-delivery"></i>
                <div>
                  <p class="text-2xl font-semibold">{{ single?.sold_count }}</p>
                  <p class="text-sm text-gray-600">
                    {{ $t('order_count') }}
                  </p>
                </div>
              </div>
              <div
                v-if="single?.in_stock_count"
                class="flex items-center gap-4"
              >
                <i class="text-red text-4xl icon-box"></i>
                <div>
                  <p class="text-2xl font-semibold">
                    {{ single?.in_stock_count }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ $t('products_count') }}
                  </p>
                </div>
              </div>
            </div>

            <hr
              v-if="single?.sold_count || single?.in_stock_count"
              class="h-0.5 bg-gray-400/50 w-full rounded my-4"
            />
            <UIButton
              :text="
                $t(
                  !single?.in_stock_count
                    ? 'not_available'
                    : single.is_in_cart
                    ? 'in_cart'
                    : 'to_cart'
                )
              "
              :variant="single.is_in_cart ? 'light' : 'primary'"
              class="mt-6 sm:w-[220px] sm:h-[52px] w-full"
              :loading="loading"
              @click="addCart"
            />
          </ClientOnly>
          <!--          <hr class="h-0.5 bg-gray-400/50 w-full rounded my-4" />-->
        </div>
      </div>
      <div class="mt-16 lg:px-16">
        <h3 class="text-2xl font-medium mb-4">{{ $t('description') }}</h3>
        <div
          class="text-base text-dark-400 leading-7"
          v-html="single?.description"
        ></div>
      </div>
      <div v-if="single?.features" class="mt-8 lg:px-16">
        <h3 class="text-2xl font-medium mb-4">{{ $t('features') }}</h3>
        <div
          class="text-base text-dark-400 leading-7"
          v-html="single?.features"
        ></div>
      </div>
      <SectionsRecommendedProducts />
    </div>
  </div>
  <!-- End .main -->
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { formatMoneyDecimal } from '@/utils'
import { IProduct } from '~/types'

const single = ref<IProduct | null>(null)
const route = useRoute()
const { t } = useI18n()
const { loading, addProductToCart } = useBasketController()
const breadcrumbs = computed(() => {
  return [
    {
      title: t('products'),
      url: '/products',
    },
    {
      title: single.value?.title,
      url: '/',
    },
  ]
})
function addCart() {
  if (single.value.is_in_cart || !single.value.in_stock_count) return

  if (single.value) {
    addProductToCart(single.value.id)
    single.value.is_in_cart = !single.value.is_in_cart
  }
}
async function fetchProductSingle() {
  try {
    const data = await useApi().$get<IProduct>(
      `product/detail/${route.params.slug}/`
    )
    if (data) {
      single.value = data
    }
  } catch (err) {
    showError({
      statusCode: 404,
    })
  }
}

useAsyncData('single', async () => await fetchProductSingle())
const relatedProducts = ref([])

function fetchRelated() {
  return new Promise((resolve, reject) => {
    useApi()
      .$get(`/product/related/${route.params.slug}/`, {
        params: { limit: 4 },
      })
      .then((res) => {
        relatedProducts.value = res.results
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
</script>
<style></style>
