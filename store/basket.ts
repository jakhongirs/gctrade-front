import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import { ICartProduct, ICheck, IResponse } from '~/types'

export const useBasketStore = defineStore('basketStore', {
  state: () => ({
    cartId: 0,
    cartIdList: {} as { id: number; fingerprint: string },
    products: [] as ICartProduct[],
    loading: true,
    count: 0,
    check: {} as ICheck,
  }),
  actions: {
    async initCart() {
      const expirationDate = new Date()
      expirationDate.setFullYear(expirationDate.getFullYear() + 1)
      const cart = useCookie('cart', {
        expires: expirationDate,
      })
      if (cart.value) {
        this.cartId = +cart.value
      } else {
        await this.createCart()
      }
      // await this.fetchCartIdList()
      // await this.fetchCartProductsList()
    },
    async createCart() {
      try {
        const expirationDate = new Date()
        expirationDate.setFullYear(expirationDate.getFullYear() + 1)
        const cart = useCookie('cart', {
          expires: expirationDate,
        })
        const visitorId = useCookie('visitorId')
        const data = await useApi().$post<{ fingerprint: string; id: number }>(
          'product/cart/create/',
          {
            body: {
              fingerprint: visitorId.value,
            },
          }
        )
        if (data) {
          this.cartId = data?.id
          cart.value = '' + data?.id
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCartIdList() {
      try {
        const data = await useApi().$get<
          IResponse<{ id: number; fingerprint: string }>
        >('product/cart/list/')
        if (data) {
          this.cartIdList = data.results?.[0]
        }
      } catch (err) {
        console.log(err)
      }
    },
    async fetchCartProductsList(loading: boolean) {
      this.loading = loading
      try {
        const data = await useApi().$get<IResponse<ICartProduct>>(
          `product/cart-items/${this.cartId}/`
        )
        if (data) {
          this.count = data.count
          this.products = data.results
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    async fetchCheckData() {
      try {
        const data = await useApi().$get<ICheck>(
          `product/cart/total-price/${this.cartId}/`
        )
        if (data) {
          this.check = data
        }
      } catch (err) {
        console.log(err)
      }
    },
  },
})
