<template>
  <div>
    <div class="w-full max-h-[400px] md:min-h-[390px] min-h-[190px] h-full">
      <img
        src="/fake/about1.png"
        alt=""
        class="w-full max-h-[400px] h-full object-cover"
      />
    </div>
    <UIBreadcrumb :list="breadcrumbs" />

    <div class="container mt-6">
      <h2
        class="lg:text-4xl md:text-2xl text-xl text-dark font-medium text-center"
      >
        {{ $t('about') }}
      </h2>
      <div class="mt-8">
        <div
          class="md:text-base text-sm text-gray-600 leading-7 mx-auto flex flex-col justify-center items-center max-w-[900px]"
        >
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
            cumque dolorum exercitationem facere, in quo recusandae suscipit
            voluptas voluptatum? Adipisci blanditiis ipsa officiis sapiente
            voluptate! Accusantium, architecto culpa esse ex harum hic ipsam
            iure minima nam neque non nostrum numquam officia pariatur possimus
            quas quidem rem sapiente similique unde vel velit veritatis vero.
            Beatae dolore incidunt minima rem sint.
          </span>
          <img
            src="/fake/about.png"
            alt="gc_trade_about"
            class="max-w-[600px] mx-auto my-8 object-cover w-full h-auto rounded-xl"
          />
          Alias, aliquam aliquid consectetur doloribus eligendi enim et, eveniet
          laborum laudantium libero magni nisi numquam obcaecati, quasi quisquam
          sapiente sint soluta unde vero voluptates. Alias asperiores aspernatur
          atque dolorem ea eveniet ex harum illo itaque molestiae, odit officia
          quasi quibusdam, quos rerum, similique sint sit ullam vitae voluptas!
          Accusantium aliquid aperiam beatae corporis dolore doloremque dolorum,
          eligendi enim esse fuga fugit inventore magnam maxime nam nesciunt
          nostrum numquam optio pariatur provident qui quisquam quo ratione
          repellendus saepe sed soluta, tenetur ullam veniam vitae, voluptate! A
          aliquam animi asperiores consequatur delectus deserunt dolorem error
          esse fugit maiores non, perferendis perspiciatis quibusdam quod
          reprehenderit sit soluta ullam unde voluptates voluptatum.
        </div>
      </div>
    </div>
    <div class="bg-white my-10">
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

const { t } = useI18n()

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
</script>
