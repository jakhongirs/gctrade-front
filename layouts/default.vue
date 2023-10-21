<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader />
    <div class="bg-white-100 pt-[128px] grow">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
