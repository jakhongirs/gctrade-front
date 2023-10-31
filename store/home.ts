import { defineStore } from 'pinia'

import { ICategory, IResponse } from '~/types'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    categories: [] as ICategory[],
    categoriesCount: 0,
  }),
  actions: {
    async fetchCategories() {
      try {
        const data = await useApi().$get<IResponse<ICategory>>(
          `product/categories/`
        )
        if (data) {
          this.categoriesCount = data.count
          this.categories = data?.results
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})
