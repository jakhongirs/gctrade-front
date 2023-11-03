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
  const updateCartProduct = async (
    cartId: number,
    productId: number,
    amount: number
  ) => {
    console.log('update product', productId, amount)
    try {
      const data = await useApi().$patch(
        `product/cart-item/update/${cartId}/`,
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

  const deleteCartProduct = async (id: number) => {
    try {
      const data = await useApi().$delete(`product/cart-item/delete/${id}/`)
    } catch (err) {
      console.log(err)
    }
  }
  return { loading, addProductToCart, updateCartProduct, deleteCartProduct }
}
