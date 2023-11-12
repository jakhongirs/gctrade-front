import { defineStore } from 'pinia'

import { IProduct, IResponse } from '~/types'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    data: [] as IProduct[],
    loading: true,
    history: [],
    historyLoading: true,
    popular: [],
    popularLoading: true,
  }),
  actions: {
    fetchSearchData(search: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IProduct>>('product/list/', {
            params: {
              limit: 50,
              search,
            },
          })
          .then((res) => {
            this.data = res.results
            if (!search) {
              this.data = []
            }
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
    fetchSearchHistory() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('product/search-history/', {
            params: {
              limit: 30,
            },
          })
          .then((res) => {
            this.history = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchPopularSearch() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('product/popular-search-history/')
          .then((res) => {
            this.popular = res?.popular_searches
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
