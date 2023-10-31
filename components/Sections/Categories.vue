<template>
  <div class="container sm:py-16 py-5">
    <SectionTitle
      title="categories"
      link="/categories"
      link-text="all_categories"
      class="mb-8"
    />
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      <CardsCategory v-for="(item, index) in data" :key="index" :data="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import SectionTitle from '~/components/UI/SectionTitle.vue'
import { useHomeStore } from '~/store/home'
import { ICategory } from '~/types'

const store = useHomeStore()
const data = computed((): ICategory[] => store.categories)
</script>
