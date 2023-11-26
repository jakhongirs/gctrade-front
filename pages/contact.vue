<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-16">
      <UISectionTitle title="contacts" class="mb-8" />
      <div class="grid grid-cols-12 gap-6">
        <div class="lg:col-span-6 col-span-12">
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('address') }}:</span>
            {{ contact?.address }}
          </p>
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('phone') }}:</span>
            <a :href="`tel:${contact?.phone?.[0].phone}`">
              {{ formatPhone(contact?.phone?.[0].phone) }}
            </a>
          </p>
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('email') }}:</span>
            <a :href="`mailto:${contact?.email}`"> {{ contact?.email }} </a>
          </p>
          <!--          <div class="flex items-center gap-4 my-4">-->
          <!--            <a href="">-->
          <!--              <i-->
          <!--                class="icon-telegram transition-200 text-gray-600 hover:text-telegram text-2xl"-->
          <!--              ></i>-->
          <!--            </a>-->
          <!--            <a href="">-->
          <!--              <i-->
          <!--                class="icon-instagram transition-200 text-gray-600 hover:text-red text-2xl"-->
          <!--              ></i>-->
          <!--            </a>-->
          <!--            <a href="">-->
          <!--              <i-->
          <!--                class="icon-facebook-square transition-200 text-gray-600 hover:text-facebook text-2xl"-->
          <!--              ></i>-->
          <!--            </a>-->
          <!--          </div>-->
          <form class="mt-8" @submit.prevent="onSubmit">
            <h3 class="text-dark-500 text-xl font-medium mb-4">
              {{ $t('send_question') }}
            </h3>
            <FormInput
              v-model="form.name"
              :error="$v.name.$error"
              :placeholder="$t('enter_full_name')"
            />
            <div class="grid lg:grid-cols-2 gap-4 my-4">
              <input
                v-model="form.phone"
                v-maska
                :placeholder="$t('enter_phone')"
                :class="[
                  {
                    '!border-red focus-within:!border-red !border focus:!border-red':
                      $v.phone.$error,
                  },
                ]"
                class="w-full flex items-center bg-blue/[0.05] rounded-lg outline-0 border border-solid border-transparent focus:!border-blue main-transition py-2 px-4 text-dark read-only:!text-dark-400 dark:text-white leading-21 text-base z-[1] relative"
                type="text"
                data-maska="+### ## ### ## ##"
              />
              <FormInput
                v-model="form.email"
                :error="$v.email.$error"
                :placeholder="$t('enter_email')"
              />
            </div>
            <FormTeaxtArea
              v-model="form.question"
              :error="$v.question.$error"
              :placeholder="$t('question')"
            />
            <UIButton
              :text="$t('send')"
              variant="light"
              size="small"
              :loading="loading"
              class="mt-8 w-full h-10"
            />
          </form>
        </div>
        <div class="lg:col-span-6 col-span-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47974.15629348366!2d69.14957108499183!3d41.2787297265129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef54dff55a28b%3A0x82dd813f9f2443!2sTradegroup!5e0!3m2!1sen!2s!4v1698288927508!5m2!1sen!2s"
            width="600"
            height="450"
            class="h-full !w-full"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
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
            {{ $t('successfully_sent') }}
          </h3>
        </div>
        <div class="mt-8 flex items-center gap-4">
          <UIButton
            :text="$t('close')"
            size="small"
            variant="light"
            class="max-w-[280px] mx-auto"
            @click="status = false"
          />
        </div>
      </div>
    </UIModal>
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'

const { t } = useI18n()
const store = useHomeStore()
const contact = computed(() => store.contact)
const breadcrumbs = computed(() => {
  return [
    {
      title: t('contacts'),
      url: '/contact',
    },
  ]
})
const loading = ref(false)
const status = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '+998',
  question: '',
})
const rules = {
  name: { required },
  email: { required },
  phone: { required },
  question: { required },
}
const $v = useVuelidate(rules, form)

const onSubmit = () => {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    loading.value = true
    useApi()
      .$post('contact-us/contact_form/', {
        body: { ...form },
      })
      .then((res) => {
        status.value = true
        $v.value.$reset()
        form.phone = '+998'
        form.name = ''
        form.email = ''
        form.question = ''
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

useSeoMeta({
  title: `GC Trade - ${t('contacts')}`,
  description: 'GC Trade is a base ecommerce',
})
</script>
