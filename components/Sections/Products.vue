<template>
  <div class="container py-14">
    <UISectionTitle
      title="products"
      link="/products"
      link-text="all_products"
      class="mb-6"
    />
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
      <CardsProduct v-for="(item, index) in 8" :key="index" :ind="index" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
