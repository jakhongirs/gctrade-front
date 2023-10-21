<template>
  <div>
    <div class="container grid grid-cols-12 gap-6 mt-10">
      <aside
        class="col-span-4 sticky top-[168px] shadow bg-white rounded-lg px-4 py-6 h-fit"
      >
        <h2 class="text-xl text-dark font-medium">Filter</h2>
      </aside>
      <div class="col-span-8">
        <UISectionTitle title="products" />
        <div class="grid grid-cols-3 gap-6 mt-6">
          <CardsProduct v-for="(item, index) in 9" :key="index" :ind="index" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
