<template>
  <footer class="bg-white shadow sm:py-10 pt-6 pb-4 mt-16">
    <div
      class="container lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16"
    >
      <div class="sm:mb-0 mb-4">
        <NuxtLink to="/" class="text-3xl">
          <img src="/svg/logo.svg" alt="" class="max-w-[180px]" />
        </NuxtLink>
        <p class="text-gray-600 text-sm mt-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          corporis cumque dicta, dolore eos et iure laboriosam libero minima
          veritatis!
        </p>
      </div>
      <ul class="sm:mb-0 mb-4">
        <li class="mb-2">
          <NuxtLink
            to="/about"
            class="transition-200 text-sm text-dark-400 hover:text-red"
          >
            {{ $t('about') }}</NuxtLink
          >
        </li>
        <li class="mb-2">
          <NuxtLink
            to="/contact"
            class="transition-200 text-sm text-dark-400 hover:text-red"
          >
            {{ $t('contacts') }}</NuxtLink
          >
        </li>
        <li class="mb-2">
          <NuxtLink
            to="/products"
            class="transition-200 text-sm text-dark-400 hover:text-red"
          >
            {{ $t('products') }}</NuxtLink
          >
        </li>
        <li class="mb-2">
          <NuxtLink
            to="/categories"
            class="transition-200 text-sm text-dark-400 hover:text-red"
          >
            {{ $t('categories') }}</NuxtLink
          >
        </li>
      </ul>
      <div>
        <p class="text-sm text-dark-400 font-medium mb-4">
          {{ $t('on_social_media') }}:
        </p>
        <div class="flex items-center gap-4 my-4">
          <a href="">
            <i
              class="icon-telegram transition-200 text-gray-600 hover:text-telegram text-xl"
            ></i>
          </a>
          <a href="">
            <i
              class="icon-instagram transition-200 text-gray-600 hover:text-red text-xl"
            ></i>
          </a>
          <a href="">
            <i
              class="icon-facebook-square transition-200 text-gray-600 hover:text-facebook text-xl"
            ></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
