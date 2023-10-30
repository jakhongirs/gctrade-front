import { defineStore } from 'pinia'

export const useBasketStore = defineStore('basketStore', () => {
  const count = ref(0)

  function incrementCount() {
    count.value++
  }

  return { count, incrementCount }
})
