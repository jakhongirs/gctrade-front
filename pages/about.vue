<template>
  <div>
    <div class="w-full max-h-[400px] md:min-h-[390px] min-h-[190px] h-full">
      <img
        :src="about?.cover || '/fake/about1.png'"
        alt=""
        class="w-full max-h-[400px] h-full object-cover"
      />
    </div>
    <UIBreadcrumb :list="breadcrumbs" />

    <div class="container mt-6">
      <h2
        class="lg:text-4xl md:text-2xl text-xl text-dark font-medium text-center"
      >
        {{ about?.title || $t('about') }}
      </h2>
      <div class="mt-8">
        <div
          class="md:text-base text-sm text-gray-600 leading-7 mx-auto flex flex-col justify-center items-center max-w-[900px] description"
          v-html="about?.description"
        ></div>
      </div>
    </div>
    <div class="bg-white my-10">
      <div class="py-6 container">
        <UISectionTitle title="team_members" center />
        <div
          v-if="loading"
          class="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 mt-10"
        >
          <div
            v-for="(item, index) in 5"
            :key="index"
            class="flex flex-col items-center"
          >
            <UISkeleton
              v-bind="{ loading }"
              width="100px"
              height="100px"
              class="rounded-full"
              border-radius="50%"
            />
            <UISkeleton
              v-bind="{ loading }"
              width="90%"
              height="28px"
              class="rounded-full"
              margin="16px 0"
            />
            <UISkeleton
              v-bind="{ loading }"
              width="70%"
              height="24px"
              margin="2px 0"
            />
            <UISkeleton
              v-bind="{ loading }"
              width="90%"
              height="24px"
              margin="2px 0"
            />
            <UISkeleton
              v-bind="{ loading }"
              width="60%"
              height="24px"
              margin="2px 0"
            />
          </div>
        </div>
        <div
          v-if="!loading"
          class="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-6 mt-10"
        >
          <div
            v-for="(item, index) in members"
            :key="index"
            class="flex flex-col items-center"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="object-cover aspect-square rounded-full border border-green-500 max-w-[100px]"
            />
            <h3 class="my-3 sm:text-lg text-sm text-dark-400 font-semibold">
              {{ item.name }}
            </h3>
            <a
              :href="`tel:${item.phone}`"
              class="block sm:text-base text-xs text-dark-400 transition-200 hover:text-blue"
            >
              {{ item.phone }}
            </a>
            <a
              :href="`mailto:${item.email}`"
              class="block sm:text-base text-xs text-dark-400 transition-200 hover:text-blue"
            >
              {{ item.email }}
            </a>
            <a
              :href="`https://t.me/${item.telegram_username?.replace(
                /@/g,
                ''
              )}`"
              target="_blank"
              class="block sm:text-base text-xs text-dark-400 transition-200 hover:text-blue"
            >
              {{ item.telegram_username }}
            </a>
          </div>
        </div>
      </div>
      <div class="pt-10 pb-16 container">
        <UISectionTitle center title="statistics" />
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-14">
          <div
            v-for="(item, index) in statistics"
            :key="index"
            class="flex items-center gap-4"
          >
            <i class="text-red text-4xl" :class="item.icon"></i>
            <div>
              <p class="text-3xl font-bold">{{ item.value }}</p>
              <p class="text-sm text-gray-600">
                {{ $t(item.title) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SectionsTopProducts />
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useMainStore } from '~/store/main'

const { t } = useI18n()
const store = useMainStore()

const members = computed(() => store.team)
const loading = computed(() => store.loading)
const about = computed(() => store.about)
const breadcrumbs = computed(() => {
  return [
    {
      title: t('about'),
      url: '/about',
    },
  ]
})
const statistics = [
  {
    icon: 'icon-checklist',
    title: 'successful_shipments',
    value: '2 000+',
  },
  {
    icon: 'icon-users-group',
    title: 'happy_customers',
    value: '50+',
  },
  {
    icon: 'icon-list-heart',
    title: 'product_types',
    value: '3 000+',
  },
  {
    icon: 'icon-basket-regular',
    title: 'in_market_since',
    value: '2013',
  },
]
useSeoMeta({
  title: `GC Trade - ${t('about')}`,
  description: 'GC Trade is a base ecommerce',
})
store.fetchTeamMembers()
store.fetchAbout()
</script>
<style>
.description img {
  max-width: 900px !important;
}
</style>
