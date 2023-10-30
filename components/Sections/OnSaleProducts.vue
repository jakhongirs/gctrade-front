<template>
  <div class="container sm:py-16 py-5">
    <UISectionTitle
      title="sale_products"
      link="/products?sale=true"
      link-text="all_sale_products"
      class="mb-6"
    />
    <div class="grid lg:grid-cols-4 grid-cols-2 sm:gap-6 gap-3">
      <CardsProduct v-for="(item, index) in 8" :key="index" :ind="index" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
