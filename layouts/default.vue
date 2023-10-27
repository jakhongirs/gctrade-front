<template>
  <div class="flex flex-col min-h-screen relative">
    <LayoutHeader :open="isOpen" class="z-10" @on-open="isOpen = !isOpen" />
    <Transition name="fade" mode="out-in">
      <div
        v-if="isOpen"
        class="fixed min-h-screen w-full inset-0 bg-white z-[998] pt-[128px]"
      >
        <div class="container pt-16">
          <ul @click="isOpen = !isOpen">
            <li class="text-xl text-dark font-medium mb-4">
              <NuxtLink to="/"> {{ $t('pages') }} </NuxtLink>
            </li>
            <li class="text-base text-dark mb-2 transition-200 hover:text-red">
              <NuxtLink to="/about"> {{ $t('about') }} </NuxtLink>
            </li>
            <li class="text-base text-dark mb-2 transition-200 hover:text-red">
              <NuxtLink to="/products"> {{ $t('products') }} </NuxtLink>
            </li>
            <li class="text-base text-dark mb-2 transition-200 hover:text-red">
              <NuxtLink to="/categories"> {{ $t('categories') }} </NuxtLink>
            </li>
            <li class="text-base text-dark mb-2 transition-200 hover:text-red">
              <NuxtLink to="/contact"> {{ $t('contacts') }} </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <div class="bg-white-100 pt-[128px] grow relative z-0">
      <slot />
    </div>
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
