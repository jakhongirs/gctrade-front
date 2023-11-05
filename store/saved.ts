import { defineStore } from 'pinia'

import { IResponse, ISaved } from '~/types'

export const useSavedStore = defineStore('savedStore', {
  state: () => ({
    count: 0,
    data: [] as ISaved[],
    loading: false,
  }),
  actions: {
    fetchSavedProducts() {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<ISaved>>('product/saved-products/')
          .then((res) => {
            this.data = res.results
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
