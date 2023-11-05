import { defineStore } from 'pinia'

import { IProduct, IResponse } from '~/types'

interface IFilter {
  limit?: number
  offset?: number
  category?: number[] | string
  is_sale?: boolean
  ordering?: string
  page?: number
  parent_category?: number
}
export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as IProduct[],
    count: 0,
    loading: true,
  }),
  actions: {
    async fetchProducts(params: IFilter) {
      this.loading = true
      try {
        const data = await useApi().$get<IResponse<IProduct>>('product/list/', {
          params,
        })
        if (data) {
          this.products = data?.results
          this.count = data?.count
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
  },
})
