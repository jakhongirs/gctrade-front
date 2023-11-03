import { useBasketStore } from '~/store/basket'

export const useBasketController = () => {
  const loading = ref(false)
  const store = useBasketStore()
  const addProductToCart = async (id: number) => {
    loading.value = true
    try {
      const data = await useApi().$post('product/cart-item/create/', {
        body: {
          cart: store.cartId,
          product: id,
          quantity: 1,
        },
      })
      if (data) {
        store.count++
      }
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
  const updateCartProduct = async (productId: number, amount: number) => {
    console.log('update product', productId, amount)
    try {
      const data = await useApi().$patch(
        `product/cart-item/update/${store.cartId}/`,
        {
          body: {
            cart: store.cartId,
            product: productId,
            quantity: amount,
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const checkData = () => {}
  return { loading, addProductToCart, updateCartProduct }
}
