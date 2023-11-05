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
    fetchManufacturer() {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IManufacture>>('product/manufacturer/', {
            params: {
              limit: 50,
            },
          })
          .then((res) => {
            this.data = res?.results
            this.count = res?.count
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    fetchManufacturerSingle(id: number) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IManufacture>>(`product/manufacturer/${id}/`, {
            params: {
              limit: 50,
            },
          })
          .then((res) => {
            this.single = res?.results
            this.count = res?.count
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
