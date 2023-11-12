import { NitroFetchRequest } from 'nitropack'
import { FetchOptions } from 'ofetch'

import { generateUniqueId } from '~/utils'

export const useApi = (apiUrl?: string) => {
  const expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 1)
  const visitorId = useCookie('visitorId', {
    expires: expirationDate,
  })
  if (!visitorId.value) {
    visitorId.value = generateUniqueId()
  }

  const baseURL =
    apiUrl ||
    (import.meta.env.VITE_API_BASE_URL as string) ||
    'https://jakhongirs.jprq.app/api/v1/'
  const locale = useCookie('locale')
  const loading = ref(false)

  function $service(options?: FetchOptions) {
    return $fetch.create({
      ...options,
      baseURL,
      headers: {
        ...options?.headers,
        'Accept-Language': locale.value || 'uz',
        Fingerprint: visitorId.value,
      },
    })
  }

  function $get<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      $service(options)(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'POST' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => reject(error.response))
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PUT' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => reject(error.response))
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'PATCH' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => reject(error.response))
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      $service({ ...options, method: 'DELETE' })(endpoint)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => reject(error.response))
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
