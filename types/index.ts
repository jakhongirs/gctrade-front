export interface IResponse<T = any> {
  count: number
  next: string | null
  previous: null | string
  results: T[]
}

export interface IChildCategory {
  id: number
  title: string
  slug: string
  parent: number
}
export interface ICategory {
  id: number
  title: string
  slug: string
  icon: string
  categories: IChildCategory[] | []
}
export interface IPartners {
  id: number
  logo: string
  name: string
  order: number
  url: string
}
export interface IIdeas {
  id: number
  company: {
    id: number
    name: string
    logo: string
    url: string
  }
  text: string
}
export interface IManufacturer {
  id: number
  title: string
  logo: string
}
export interface IProduct {
  id: number
  manufacturer: IManufacturer
  category: ICategory
  title: string
  slug: string
  description: HTMLElement
  features: HTMLElement
  price: string
  sale_price: string
  in_stock_count: number
  views_count: number
  is_recommended: boolean
  is_active: boolean
  is_sale: boolean
  gallery: string[]
  is_in_saved: boolean
  is_in_cart: boolean
  sold_count: number
}
export interface IRecentProduct {
  id: number
  product: IProduct
}

export interface ICartProduct {
  id: number
  cart: number
  quantity: number
  product: IProduct
}

export interface ICheck {
  total_price: number
  total_savings: number
  quantity: number
}

export interface IManufacture {
  id: number
  title: string
  logo: string | null
}
export interface ISaved {
  id: number
  fingerprint: string
  product: IProduct
}
