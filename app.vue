<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBasketStore } from '~/store/basket'

const { init } = useTheme()

const store = useBasketStore()

await store.initCart()
await store.fetchCartIdList()
await store.fetchCartProductsList(false)
init()
</script>
