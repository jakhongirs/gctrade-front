import { defineStore } from 'pinia'

import { IManufacture, IResponse } from '~/types'

export const useManufacturerStore = defineStore('manufactureStore', {
  state: () => ({
    loading: true,
    count: 0,
    data: [] as IManufacture[],
    single: [] as IManufacture[],
  }),
  actions: {
    fetchManufacturer(params: {
      parent_category: number | undefined
      child_category: number | undefined
    }) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IManufacture>>('product/manufacturer/', {
            params: {
              limit: 50,
              ...params,
            },
          })
          .then((res) => {
            this.data = res?.results
            this.count = res?.count
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
  },
})
