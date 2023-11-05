<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useBasketStore } from '~/store/basket'
import { useSavedStore } from '~/store/saved'

const { init } = useTheme()

const store = useBasketStore()

await store.initCart()
await store.fetchCartIdList()
await store.fetchCartProductsList()
init()
</script>
