import { useSavedStore } from '~/store/saved'

export const useSavedController = () => {
  const loading = ref(false)
  const store = useSavedStore()
  const fingerPrint = useCookie('visitorId')
  const saved = computed(() => store.data)
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
      const product = saved.value?.find((el) => el.product.id === id)
      console.log(product, store.data)
      if (product) {
        store.data.splice(saved.value.indexOf(product), 1)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return { loading, saveProduct, deleteSavedProduct }
}
