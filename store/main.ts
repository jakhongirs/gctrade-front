import { defineStore } from 'pinia'

import { IMembers, IPartners, IResponse } from '~/types'

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'light',
    partners: [] as IPartners[],
    team: [] as IMembers[],
    count: 0,
    loading: true,
    about: {},
  }),
  actions: {
    changeTheme(_theme: string) {
      this.theme = _theme
    },
    async fetchPartners() {
      try {
        const data = await useApi().$get<IResponse<IPartners>>(
          `partners/feedback/`
        )
        if (data) {
          this.partners = data?.results
        }
      } catch (err) {
        console.log(err)
      }
    },
    fetchTeamMembers() {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IMembers>>('contact-us/employee_contact/')
          .then((res) => {
            this.count = res.count
            this.team = res.results
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
    fetchAbout() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('contact-us/about_us/')
          .then((res) => {
            this.about = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
