<template>
  <div class="container sm:py-16 py-5">
    <SectionTitle
      title="categories"
      link="/categories"
      link-text="all_categories"
      class="mb-8"
    />
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <CardsCategory v-for="(item, index) in 6" :key="index" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionTitle from '~/components/UI/SectionTitle.vue'
</script>
