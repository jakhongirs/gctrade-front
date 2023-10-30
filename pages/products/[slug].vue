<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-16">
      <div class="grid grid-cols-12 gap-6">
        <ClientOnly>
          <SectionsSingleSlider class="lg:col-span-5 col-span-12" />
        </ClientOnly>
        <div class="lg:col-span-7 col-span-12 flex flex-col h-full">
          <div class="flex items-center justify-between">
            <h2 class="text-dark-400 text-3xl font-bold shrink-0">
              Product name
            </h2>
            <UILikeButton class="!relative" />
          </div>
          <p class="text-dark-400 text-2xl font-medium mt-2">
            {{ formatMoneyDecimal(1540000) }} UZS
            <span class="text-red font-normal line-through text-sm">
              {{ formatMoneyDecimal(1560000) }} UZS
            </span>
          </p>
          <p class="text-base text-dark-400 leading-8 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque,
            deleniti eos ex fuga in iste iusto magnam perferendis quas quia,
            quod reiciendis repellat sapiente sed unde vel voluptatibus. Dolor,
            repellat!
          </p>
          <p class="text-base text-dark-400 font-semibold mt-2">
            <span class="font-normal"> {{ $t('category') }}: </span>
            Metall buyumlar
          </p>
          <hr class="h-0.5 bg-gray-400/50 w-full rounded my-4" />
          <div class="grid grid-cols-2 gap-6">
            <div class="flex items-center gap-4">
              <i class="text-red text-4xl icon-delivery"></i>
              <div>
                <p class="text-2xl font-semibold">{{ 300 }}+</p>
                <p class="text-sm text-gray-600">
                  {{ $t('order_count') }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <i class="text-red text-4xl icon-box"></i>
              <div>
                <p class="text-2xl font-semibold">{{ 101 }}</p>
                <p class="text-sm text-gray-600">
                  {{ $t('products_count') }}
                </p>
              </div>
            </div>
          </div>
          <hr class="h-0.5 bg-gray-400/50 w-full rounded my-4" />
          <UIButton :text="$t('to_cart')" class="mt-6 sm:w-fit w-full" />
          <!--          <hr class="h-0.5 bg-gray-400/50 w-full rounded my-4" />-->
        </div>
      </div>
      <div class="mt-16 lg:px-16">
        <h3 class="text-2xl font-medium mb-4">{{ $t('description') }}</h3>
        <div class="text-base text-dark-400 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab
          accusantium aliquam aliquid amet commodi cupiditate deleniti deserunt
          doloribus ducimus eius harum iste, iusto molestiae, nihil praesentium
          quas reiciendis sint vel voluptatum. A animi blanditiis consequuntur,
          culpa doloremque eaque, et fugiat fugit hic illo in inventore ipsa
          obcaecati quibusdam quis quod repellat repellendus repudiandae, saepe
          sint sit ullam veritatis voluptas? Ad cum deleniti doloremque earum
          illum inventore, iure mollitia nisi, obcaecati odio odit pariatur quis
          quisquam ratione soluta? Amet cum dicta, eveniet excepturi fugiat
          laboriosam neque perferendis quae suscipit veniam? Ab animi dolores
          eos ex expedita laboriosam officiis praesentium vel velit voluptas.
          Aliquam asperiores assumenda atque autem consectetur corporis
          exercitationem, expedita fugit inventore ipsam magnam minus mollitia
          obcaecati, odio placeat possimus quasi quisquam rem sapiente similique
          suscipit velit veritatis voluptatem? Autem corporis, eaque enim
          laboriosam nobis non omnis porro quisquam quod rerum. Alias aliquid
          aperiam, architecto blanditiis cumque delectus dolore eaque earum eius
          eligendi eveniet, harum illo laudantium mollitia natus numquam officia
          porro quis quod repellat temporibus veritatis voluptas. A adipisci aut
          corporis cumque, doloribus eligendi est ex exercitationem facere id
          ipsam iusto laboriosam magni minus nihil numquam omnis optio porro
          praesentium quasi quis rem repellat sequi ullam unde vel.
        </div>
      </div>
      <SectionsRecommendedProducts />
    </div>
  </div>
  <!-- End .main -->
</template>
<script setup lang="ts">
// import { minLength, required } from '@vuelidate/validators'

// import * as pkg from 'vue-toastification'

import { formatMoneyDecimal } from '@/utils'
// import { useForm } from '~/composables/useForm'

// const { useToast } = pkg

const single = ref()
const route = useRoute()
// const toast = useToast()
const descriptionEl = ref<HTMLDivElement>()

const breadcrumbs = computed(() => {
  return [
    {
      title: 'products',
      url: '/products',
    },
    {
      title: 'Metall buyum',
      url: '/',
    },
  ]
})

// function fetchProductSingle(meta?: boolean) {
//   return new Promise((resolve, reject) => {
//     useApi()
//       .$get(`/product/detail/${route.params.slug}/`, {
//         params: { is_meta: meta ? 1 : undefined },
//       })
//       .then((res) => {
//         if (!meta) {
//           single.value = res
//           descriptionEl.value.innerHTML = res.description
//         }
//         resolve(res)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }

// const { data, error } = await useAsyncData('productSingle', async () => {
//   return await fetchProductSingle(true)
// })
//
// if (error.value) {
//   showError({
//     statusCode: 404,
//   })
// }
//
// useMeta({
//   title: data.value?.meta_title,
//   description: data.value?.meta_description,
//   image: data.value?.meta_image,
// })

// const images = computed(() => {
//   return [
//     single.value?.image1 ? single.value?.image1?.replace('http', 'https') : '',
//     single.value?.image2 ? single.value?.image2?.replace('http', 'https') : '',
//     single.value?.image3 ? single.value?.image3?.replace('http', 'https') : '',
//     single.value?.image4 ? single.value?.image4?.replace('http', 'https') : '',
//   ].filter((i) => !!i)
// })
// const form = useForm(
//   {
//     full_name: '',
//     phone: '',
//     product: route.params.slug,
//   },
//   {
//     full_name: { required, minLength: minLength(3) },
//     phone: { required, minLength: minLength(7) },
//   }
// )
// const goToPurchase = () => {
//   const element = document.getElementById('form')
//   element.scrollIntoView({ behavior: 'smooth', block: 'center' })
// }
// const onSubmit = () => {
//   form.$v.value.$touch()
//   const toast = useToast()
//   if (!form.$v.value.$invalid) {
//     const data = {}
//     data.full_name = form.values.full_name
//     data.phone = '+' + form.values.phone?.replace(/\s/g, '')
//     data.product = form.values.product
//     useApi()
//       .$post(`/product/order/`, {
//         body: {
//           ...data,
//         },
//       })
//       .then((res) => {
//         for (const key in form.values) {
//           form.values[key] = ''
//         }
//         toast.success('Ваш заказ успешно отправлен!')
//       })
//       .catch((err) => {
//         toast.error('Что-то пошло не так! Пожалуйста, повторите попытку позже')
//       })
//       .finally(() => {
//         form.$v.value.$reset()
//       })
//   }
// }

const relatedProducts = ref([])

function fetchRelated() {
  return new Promise((resolve, reject) => {
    useApi()
      .$get(`/product/related/${route.params.slug}/`, {
        params: { limit: 4 },
      })
      .then((res) => {
        relatedProducts.value = res.results
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Promise.allSettled([fetchProductSingle(), fetchRelated()])
</script>
<style></style>
