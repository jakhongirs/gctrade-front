<template>
  <div class="w-full">
    <footer class="bg-white shadow sm:py-10 pt-6 pb-4 md:mb-0 mb-[49px]">
      <div
        class="container lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16"
      >
        <div class="sm:mb-0 mb-4">
          <NuxtLink to="/" class="text-3xl">
            <img src="/svg/logo.svg" alt="" class="max-w-[180px]" />
          </NuxtLink>
          <p class="text-gray-600 text-sm mt-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium corporis cumque dicta, dolore eos et iure laboriosam
            libero minima veritatis!
          </p>
        </div>
        <ul class="sm:mb-0 mb-8">
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
    <div
      class="fixed bottom-0 left-0 w-full py-1 px-4 border-t border-t-gray-100 bg-white md:hidden flex justify-around"
    >
      <NuxtLink
        to="/"
        class="flex flex-col items-center justify-end text-dark-400 text-xs"
      >
        <i class="icon-hamburger-menu text-[#8B8E99] text-3xl shrink-0"></i>
        {{ $t('dashboard') }}
      </NuxtLink>
      <NuxtLink
        to="/categories"
        class="flex flex-col items-center justify-end text-dark-400 text-xs gap-1"
      >
        <i class="icon-search-regular text-[#8B8E99] text-2xl shrink-0"></i>
        {{ $t('categories') }}
      </NuxtLink>
      <NuxtLink
        to="/saved"
        class="flex flex-col items-center justify-end text-dark-400 text-xs"
      >
        <i class="icon-heart text-[#8B8E99] text-3xl shrink-0"></i>
        {{ $t('loved') }}
      </NuxtLink>
      <NuxtLink
        to="/basket"
        class="flex flex-col items-center justify-end text-dark-400 text-xs"
      >
        <i class="icon-basket-regular text-[#8B8E99] text-3xl shrink-0"></i>
        {{ $t('basket') }}
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
