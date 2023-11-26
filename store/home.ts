import { defineStore } from 'pinia'

import { ICategory, IContact, IResponse } from '~/types'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    categories: [] as ICategory[],
    categoriesCount: 0,
    loading: true,
    filteredCategories: [] as ICategory[],
    banner: [],
    bannerLoading: true,
    contact: {} as IContact,
  }),
  actions: {
    async fetchCategories(params?: {
      page: number
      limit: number
      offset: number
    }) {
      this.loading = true
      try {
        const data = await useApi().$get<IResponse<ICategory>>(
          `product/categories/`,
          {
            params,
          }
        )
        if (data) {
          this.categoriesCount = data.count
          this.categories = data?.results
          this.loading = false
        }
      } catch (err) {
        console.log(err)
        this.loading = false
      }
    },
    async fetchFilteredCategories(params: {
      id?: string | undefined
      categories__id?: string | undefined
    }) {
      this.loading = true
      try {
        const data = await useApi().$get<IResponse<ICategory>>(
          `product/categories/`,
          {
            params,
          }
        )
        if (data) {
          this.filteredCategories = data?.results
          this.loading = false
        }
      } catch (err) {
        this.loading = false
      }
    },
    fetchBanner() {
      this.bannerLoading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get('product/banner/')
          .then((res) => {
            this.banner = res.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            this.bannerLoading = false
          })
      })
    },
    fetchContact() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IContact>('contact-us/')
          .then((res) => {
            this.contact = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
