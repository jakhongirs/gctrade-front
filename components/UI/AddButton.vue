<template>
  <UIButton
    :text="$t(isInCart ? 'in_cart' : 'to_cart')"
    size="small"
    :variant="isInCart ? 'light' : 'primary'"
    class="w-full mt-auto"
    text-class="!text-xs"
    :loading="loading"
    @click.stop.prevent="addToCart"
  />
</template>
<script setup lang="ts">
interface Props {
  saved?: boolean
  productId: number
}
const props = defineProps<Props>()
const isInCart = ref(props.saved)
const { loading, addProductToCart } = useBasketController()
const addToCart = () => {
  if (isInCart.value) return

  addProductToCart(props.productId).then(() => (isInCart.value = true))
}
</script>
