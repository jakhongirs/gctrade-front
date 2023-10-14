<template>
  <header class="w-full">
    <div class="bg-yellow-100 dark:bg-gray-400 w-full py-1">
      <div class="container flex items-center justify-between">
        <p>{{ $t('address') }}: Toshkent</p>
        <div class="flex items-center gap-4">
          <a href="https://t.me/bozor_com"> t.me/bozor_com</a>
          <a href="tel:+998955156515"> +998 95 515 65 15</a>
          <UILanguageSwitcher />
          <UIThemeSwitcher />
        </div>
      </div>
    </div>
    <div class="container flex items-center justify-between py-4">
      <div class="flex items-center">
        <NuxtLink to="/" class="text-3xl"> Main Logo </NuxtLink>
        <UIButton
          :text="$t('catalog')"
          size="small"
          variant="light"
          class="ml-10"
        />
      </div>
      <div class="min-w-[600px]">
        <FormInput :placeholder="$t('search_for_product')" />
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gray-400/40"></div>
        <div class="w-8 h-8 rounded-lg bg-gray-400/40"></div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts"></script>
