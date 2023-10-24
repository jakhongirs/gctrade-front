<template>
  <header class="w-full bg-white fixed top-0 z-[999]">
    <div class="bg-white-100 w-full py-1">
      <div class="container flex items-center justify-between">
        <div class="group">
          <a
            href="/"
            class="flex items-center transition-200 text-sm group-hover:text-red"
          >
            <i
              class="icon-map-square text-gray text-xl mr-1 transition-200 group-hover:text-red"
            ></i>
            Toshkent
          </a>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://t.me/bozor_com"
            class="flex items-center text-sm transition-200 group hover:text-red"
          >
            <i
              class="icon-telegram text-base text-gray mr-2 group-hover:text-red transition-200"
            ></i
            >t.me/bozor_com</a
          >
          <a
            href="tel:+998955156515"
            class="flex items-center text-sm transition-200 group hover:text-red"
            ><i
              class="icon-phone text-2xl text-gray mr-2 group-hover:text-red transition-200"
            ></i>
            +998 95 515 65 15</a
          >
          <UILanguageSwitcher />
          <!--          <UIThemeSwitcher />-->
        </div>
      </div>
    </div>
    <div
      class="container bg-white w-full flex items-center justify-between py-4"
    >
      <div class="flex items-center">
        <NuxtLink to="/" class="text-3xl">
          <img src="/svg/logo.svg" alt="" class="max-w-[180px]" />
        </NuxtLink>
      </div>
      <div class="min-w-[600px] flex">
        <UIButton
          :text="$t('catalog')"
          size="small"
          variant="custom"
          text-class="text-white"
          class="mr-6 header-burger min-w-[150px] -ml-20"
        />
        <!--        <LayoutCatalogButton />-->
        <FormInput
          :placeholder="$t('search_for_product')"
          input-class="!py-2"
        />
      </div>
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-white-100 flex items-center justify-center group cursor-pointer"
        >
          <i
            class="icon-heart text-2xl text-gray-600 group-hover:text-red transition-200"
          ></i>
        </div>
        <div
          class="w-8 h-8 rounded-lg bg-white-100 flex items-center justify-center group cursor-pointer"
        >
          <i
            class="icon-basket text-2xl text-gray-600 group-hover:text-red transition-200"
          ></i>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts"></script>
<style>
header {
  filter: drop-shadow(0 8px 44px rgba(56, 56, 56, 0.12));
}
.header-burger {
  background: linear-gradient(84.8deg, #383838 0%, #6f6f6f 131.39%);
}

.header-burger::before {
  content: '';
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 7px;
  transition: opacity 0.2s ease-in-out;
  background: linear-gradient(84.8deg, #d7d7d7 0%, #f4f4f4 131.39%);
  top: 0;
  left: 0;
}

.header-burger:hover::before {
  opacity: 1;
}
.header-burger:hover .text-class {
  color: #040e1a !important;
}
</style>
