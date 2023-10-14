import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'light',
  }),
  actions: {
    changeTheme(_theme: string) {
      this.theme = _theme
    },
  },
})
