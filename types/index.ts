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
