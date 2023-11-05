<template>
  <UIButton
    :text="$t(!count ? 'not_available' : isInCart ? 'in_cart' : 'to_cart')"
    size="small"
    :variant="!count ? 'outline' : isInCart ? 'light' : 'primary'"
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
  count?: number
}
const props = defineProps<Props>()
const isInCart = ref(props.saved)
const { loading, addProductToCart } = useBasketController()
const addToCart = () => {
  if (isInCart.value || !props.count) return

  addProductToCart(props.productId).then(() => (isInCart.value = true))
}
</script>
