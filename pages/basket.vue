<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container my-12">
      <UISectionTitle title="basket" class="mb-6" />
      <div class="grid grid-cols-12 gap-6">
        <div class="lg:col-span-8 col-span-12 bg-white shadow p-5 rounded">
          <div v-if="loading">
            <template v-for="(item, index) in 4" :key="index">
              <CardsBasket :data="{}" loading />
              <hr v-if="index !== 3" class="h-0.5 bg-gray-400/20 w-full my-2" />
            </template>
          </div>
          <template v-else>
            <div v-if="data?.length">
              <template v-for="(item, index) in data" :key="index">
                <CardsBasket :data="item" :loading="loading" />
                <hr
                  v-if="index !== data?.length - 1"
                  class="h-0.5 bg-gray-400/20 w-full my-2"
                />
              </template>
            </div>
            <SectionsNoData v-else />
          </template>
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
                {{ formatMoneyDecimal(check?.quantity) }}
              </p>
            </li>
            <li
              class="flex items-center justify-between py-2 border-b border-b-gray-100/40"
            >
              <p class="text-sm text-dark-400">{{ $t('total') }}:</p>
              <p class="text-sm text-dark-400 font-medium">
                {{ formatMoneyDecimal(check?.total_price) }} UZS
              </p>
            </li>
            <li class="flex items-center justify-between py-2">
              <p class="text-sm text-red">{{ $t('discount') }}:</p>
              <p class="text-sm text-red font-medium">
                {{ formatMoneyDecimal(check?.total_savings) }} UZS
              </p>
            </li>
          </ul>
          <hr class="h-0.5 bg-gray-400/20 w-full my-2" />
          <UIButton
            :text="$t('send_order')"
            size="small"
            :disabled="!data?.length"
            :variant="!data?.length ? 'outline' : 'primary'"
            :class="{ '!cursor-not-allowed !bg-gray-400': !data?.length }"
            class="w-full mt-6"
            @click="openModal"
          />
        </div>
      </div>
    </div>
    <UIModal title="order" :show="showModal">
      <div>
        <h3 class="text-lg text-dark-400 font-medium mb-6 text-center">
          {{ $t('send_order') }}
        </h3>
        <FormLabel :label-text="$t('name')" label-for="name" class="mb-1" />
        <FormInput
          id="name"
          v-model="form.name"
          :error="$v.name.$error"
          :placeholder="$t('enter_name')"
        />
        <FormLabel
          :label-text="$t('phone_number')"
          label-for="phone"
          class="mt-4 mb-1"
        />
        <div
          class="w-full flex items-center bg-blue/[0.05] rounded-lg relative outline-0 border-2 border-solid border-transparent focus-within:border-blue main-transition"
          :class="[{ '!border-red focus-within:!border-red': $v.phone.$error }]"
        >
          <div class="pl-4 text-dark">+998</div>
          <div class="relative w-full">
            <input
              id="phone"
              v-model="form.phone"
              v-maska
              data-maska="## ### ## ##"
              type="text"
              placeholder="91 223 86 77"
              class="py-2 pl-1 pr-4 text-dark read-only:!text-dark-400 focus:border-0 dark:text-white leading-21 border-0 outline-0 bg-transparent w-full z-[1] relative"
            />
          </div>
        </div>
        <div class="mt-8 flex items-center gap-4">
          <UIButton
            :text="$t('cancel')"
            size="small"
            variant="light"
            class="w-full"
            @click="onCloseModal"
          />
          <UIButton
            :text="$t('send')"
            size="small"
            class="w-full"
            :loading="submitLoading"
            @click="onSubmit"
          />
        </div>
      </div>
    </UIModal>
    <UIModal title="order" :show="status">
      <div>
        <div class="flex flex-col justify-center items-center min-h-[200px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="133"
            height="132"
            viewBox="0 0 133 132"
            fill="none"
          >
            <path
              d="M66.5 121C96.8757 121 121.5 96.3757 121.5 66C121.5 35.6243 96.8757 11 66.5 11C36.1243 11 11.5 35.6243 11.5 66C11.5 96.3757 36.1243 121 66.5 121Z"
              fill="#16CC53"
            />
            <path
              d="M41.75 66L58.25 82.5L91.25 49.5"
              stroke="white"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h3 class="text-lg text-dark-400 font-medium mt-6 text-center">
            {{ $t('successfully_ordered') }}
          </h3>
        </div>
        <div class="mt-8 flex items-center gap-4">
          <UIButton
            :text="$t('go_home')"
            size="small"
            variant="light"
            class="max-w-[280px] mx-auto"
            @click="$router.push('/')"
          />
        </div>
      </div>
    </UIModal>
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

import { useBasketStore } from '~/store/basket'

const store = useBasketStore()
const data = computed(() => store.products)
const count = computed(() => store.count)
const loading = computed(() => store.loading)
const check = computed(() => store.check)
const breadcrumbs = computed(() => {
  return [
    {
      title: 'basket',
      url: '/basket',
    },
  ]
})
const status = ref(false)
const submitLoading = ref(false)
const showModal = ref(false)
const form = reactive({
  name: '',
  phone: '',
})
const rules = {
  name: { required },
  phone: { required },
}

const $v = useVuelidate(rules, form)
const openModal = () => {
  if (!data.value?.length) return

  showModal.value = true
}
const onCloseModal = () => {
  showModal.value = false
  form.name = ''
  form.phone = ''
  $v.value.$reset()
}
const onSubmit = async () => {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    submitLoading.value = true
    try {
      const data = await useApi().$post('product/order/create/', {
        body: {
          cart: store.cartId,
          name: form.name,
          phone: '+998' + form.phone.replace(/\s/g, ''),
        },
      })
      const cart = useCookie('cart')
      cart.value = undefined
      showModal.value = false
      setTimeout(() => {
        status.value = true
      }, 200)
    } catch (err) {
      console.log(err)
    } finally {
      submitLoading.value = false
    }
  }
}

store.fetchCartProductsList()
store.fetchCheckData()
</script>
