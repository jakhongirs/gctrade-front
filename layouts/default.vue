<template>
  <div class="flex flex-col min-h-screen relative">
    <LayoutHeader :open="isOpen" class="z-10" @on-open="isOpen = !isOpen" />
    <Transition name="fade" mode="out-in">
      <div>
        <LayoutCatalogButton
          class="md:block hidden"
          :is-open="isOpen"
          @on-click="isOpen = !isOpen"
        />
        <LayoutResponsiveMenu
          class="md:hidden block"
          :is-open="isOpen"
          @on-click="isOpen = !isOpen"
        />
      </div>
    </Transition>
    <div
      class="bg-white-100 lg:pt-[128px] sm:pt-[76px] pt-[127px] grow relative z-0 pb-16"
    >
      <slot />
    </div>
    <LayoutFooter class="mt-auto" />
    <LayoutLoader />
  </div>
</template>
<script setup lang="ts">
const isOpen = ref(false)
const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
  {
    deep: true,
  }
)
watch(isOpen, (val) => {
  val
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'auto')
})
</script>
