import { defineStore } from 'pinia'

import { IPartners, IResponse } from '~/types'

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'light',
    partners: [] as IPartners[],
  }),
  actions: {
    changeTheme(_theme: string) {
      this.theme = _theme
    },
    async fetchPartners() {
      try {
        const data = await useApi().$get<IResponse<IPartners>>(`partners/`)
        if (data) {
          this.partners = data?.results
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})
