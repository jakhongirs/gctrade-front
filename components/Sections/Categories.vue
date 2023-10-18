<template>
  <div class="container py-16">
    <SectionTitle
      title="categories"
      link="/categories"
      link-text="all_categories"
      class="mb-8"
    />
    <div class="grid grid-cols-3 gap-6">
      <CardsCategory v-for="(item, index) in 6" :key="index" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionTitle from '~/components/UI/SectionTitle.vue'
</script>
