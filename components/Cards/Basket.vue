<template>
  <div class="flex sm:max-h-[140px] h-full sm:flex-row flex-col relative">
    <div class="flex grow">
      <div
        class="max-w-[140px] max-h-[140px] w-full rounded-md shrink-0 relative"
      >
        <UISkeleton
          v-bind="{ loading }"
          width="100%"
          height="100%"
          preloader-class="sm:min-h-auto min-h-[140px]"
        >
          <img
            :src="data?.product?.gallery?.[0]"
            alt=""
            class="object-cover w-full h-full sm:min-h-auto min-h-[140px] rounded-md"
          />
        </UISkeleton>
      </div>
      <div
        class="ml-4 min-h-[140px] sm:max-h-[140px] flex flex-col py-2 h-full grow"
      >
        <UISkeleton v-bind="{ loading }" width="70%" height="20px">
          <nuxt-link
            :to="`/products/${data?.product?.slug}`"
            class="sm:text-base text-sm text-dark-400 font-semibold line-clamp-2"
          >
            {{ data?.product?.title }}
          </nuxt-link>
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="70%"
          height="20px"
          margin="16px 0 0 0"
        >
          <p
            class="sm:text-base text-sm text-dark-400 font-medium sm:line-clamp-2 mt-4"
          >
            <span class="font-normal text-gray-400 sm:inline hidden">
              {{ $t('manufacturer') }}:
            </span>
            {{ data?.product?.manufacturer?.title }}
          </p>
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="70%"
          height="20px"
          margin="auto 0 0 0"
        >
          <p
            v-if="
              data?.product?.in_stock_count &&
              data?.product?.in_stock_count < 9000
            "
            class="mt-auto sm:text-base text-sm"
          >
            <span class="font-medium mr-2 sm:text-base text-xs"
              >{{ $t('products_count') }}:</span
            >{{ formatMoneyDecimal(data?.product?.in_stock_count) }}
          </p>
        </UISkeleton>
      </div>
    </div>
    <div
      class="sm:mt-0 mt-6 sm:py-2 sm:max-w-[180px] min-w-[178px] items-center w-full shrink-0 sm:relative sm:pl-6 sm:border-l sm:border-l-gray-100/50 flex sm:flex-col flex-row-reverse"
    >
      <div
        v-if="!loading"
        class="w-8 h-8 ml-auto cursor-pointer flex items-center justify-center rounded absolute sm:right-0 -right-4 sm:top-2 sm:bottom-auto -bottom-4"
        @click="deleteProduct(data.id)"
      >
        <i class="icon-trash text-xl transition-200 hover:text-red"></i>
      </div>
      <div class="w-full sm:ml-0 ml-6">
        <UISkeleton v-bind="{ loading }" width="60%" height="20px">
          <p
            v-if="Number(data?.product?.price)"
            class="text-base font-semibold"
          >
            {{ formatMoneyDecimal(data?.product?.price) }} UZS
          </p>
          <p v-else class="text-base font-semibold">{{ $t('on_deal') }}</p>
        </UISkeleton>
        <UISkeleton
          v-bind="{ loading }"
          width="50%"
          height="18px"
          margin="2px 0 0 0"
        >
          <p
            v-if="data?.product?.sale_price"
            class="text-red line-through text-xs"
          >
            {{ formatMoneyDecimal(data?.product?.sale_price) }} UZS
          </p>
        </UISkeleton>
      </div>
      <UISkeleton
        v-bind="{ loading }"
        width="150px"
        height="40px"
        margin="auto 0 0 0"
      >
        <UICounter
          :model-value="data.quantity"
          class="mt-auto"
          :min="1"
          :max="data.product.in_stock_count"
          @update:model-value="updateValue"
        />
      </UISkeleton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { formatMoneyDecimal } from '@/utils'
import { useBasketStore } from '~/store/basket'
import { ICartProduct } from '~/types'

const { updateCartProduct, deleteCartProduct } = useBasketController()
const store = useBasketStore()
interface Props {
  loading: boolean
  data: ICartProduct
}
const props = defineProps<Props>()
const form = unref(props)

const updateValue = async (e: number) => {
  form.data.quantity = e
  await updateCartProduct(props.data.id, props.data.product.id, e)
  await store.fetchCheckData()
}
const deleteProduct = async (id: number) => {
  await deleteCartProduct(id)
  await store.fetchCartProductsList(false)
  await store.fetchCheckData()
}
</script>
