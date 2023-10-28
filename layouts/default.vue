<template>
  <div class="flex flex-col min-h-screen relative">
    <LayoutHeader :open="isOpen" class="z-10" @on-open="isOpen = !isOpen" />
    <Transition name="fade" mode="out-in">
      <LayoutCatalogButton :is-open="isOpen" @on-click="isOpen = !isOpen" />
    </Transition>
    <div class="bg-white-100 pt-[128px] grow relative z-0 pb-16">
      <slot />
    </div>
    <LayoutFooter class="mt-auto" />
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)

watch(isOpen, (val) => {
  val
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'auto')
})
</script>
