<template>
  <div>
    <div class="w-full max-h-[400px] min-h-[390px] h-full">
      <img
        src="/fake/about1.png"
        alt=""
        class="w-full max-h-[400px] h-full object-cover"
      />
    </div>
    <UIBreadcrumb :list="breadcrumbs" />

    <div class="container mt-6">
      <h2 class="text-4xl text-dark font-medium text-center">
        {{ $t('about') }}
      </h2>
      <div class="mt-8">
        <div
          class="text-base text-gray-600 leading-7 mx-auto flex flex-col justify-center items-center max-w-[900px]"
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

      <div class="py-16">
        <UISectionTitle center title="statistics" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const breadcrumbs = computed(() => {
  return [
    {
      title: 'about',
      url: '/about',
    },
  ]
})
</script>
