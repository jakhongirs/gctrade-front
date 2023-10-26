<template>
  <div class="container py-16">
    <UISectionTitle
      title="recommended_products"
      link=""
      link-text=""
      class="mb-6"
    />
    <div class="grid grid-cols-4 gap-6">
      <CardsProduct v-for="(item, index) in 4" :key="index" :ind="index" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
