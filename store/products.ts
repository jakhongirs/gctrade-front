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
    fetchProducts(params: IFilter) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IProduct>>('product/list/', {
            params,
          })
          .then((res) => {
            this.products = res.results
            this.count = res.count
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
  },
})
