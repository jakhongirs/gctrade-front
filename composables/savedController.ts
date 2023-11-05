import { useSavedStore } from '~/store/saved'

export const useSavedController = () => {
  const loading = ref(false)
  const store = useSavedStore()
  const fingerPrint = useCookie('visitorId')
  const saveProduct = async (id: number) => {
    loading.value = true
    try {
      const data = await useApi().$post('product/saved-products/create/', {
        body: {
          product: id,
          fingerprint: fingerPrint.value,
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
  const deleteSavedProduct = async (id: number) => {
    try {
      const data = await useApi().$delete(
        `product/saved-products/delete/${id}/`
      )
      store.count--
      const product = store.data.find((el) => el.product.id === id)
      if (product) {
        store.data = store.data.splice(store.data.indexOf(product), 1)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return { loading, saveProduct, deleteSavedProduct }
}
