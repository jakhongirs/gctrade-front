<template>
  <div>
    <UIBreadcrumb :list="breadcrumbs" />
    <div class="container mt-16">
      <UISectionTitle title="contacts" class="mb-8" />
      <div class="grid grid-cols-12 gap-6">
        <div class="lg:col-span-6 col-span-12">
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('address') }}:</span> Toshkent
            shahar, Yakkasaroy tuman, Rakat MFY,4-uy, 8-xonadon
          </p>
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('phone') }}:</span>
            <a href="tel:+998912238677">+99891 223 86 77</a>
          </p>
          <p class="text-base text-dark-500">
            <span class="font-medium mr-2">{{ $t('email') }}:</span>
            <a href="mailto:azizho@gmail.com">azizho@gmail.com</a>
          </p>
          <div class="flex items-center gap-4 my-4">
            <a href="">
              <i
                class="icon-telegram transition-200 text-gray-600 hover:text-telegram text-2xl"
              ></i>
            </a>
            <a href="">
              <i
                class="icon-instagram transition-200 text-gray-600 hover:text-red text-2xl"
              ></i>
            </a>
            <a href="">
              <i
                class="icon-facebook-square transition-200 text-gray-600 hover:text-facebook text-2xl"
              ></i>
            </a>
          </div>
          <form>
            <h3 class="text-dark-500 text-xl font-medium mb-4">
              {{ $t('send_question') }}
            </h3>
            <FormInput :placeholder="$t('enter_full_name')" />
            <div class="grid lg:grid-cols-2 gap-4 my-4">
              <FormInput :placeholder="$t('enter_phone')" />
              <FormInput :placeholder="$t('enter_email')" />
            </div>
            <FormTeaxtArea :placeholder="$t('question')" />
            <UIButton :text="$t('send')" variant="light" class="mt-8 w-full" />
          </form>
        </div>
        <div class="lg:col-span-6 col-span-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47974.15629348366!2d69.14957108499183!3d41.2787297265129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef54dff55a28b%3A0x82dd813f9f2443!2sTradegroup!5e0!3m2!1sen!2s!4v1698288927508!5m2!1sen!2s"
            width="600"
            height="450"
            class="h-full"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const breadcrumbs = computed(() => {
  return [
    {
      title: 'contacts',
      url: '/contact',
    },
  ]
})
</script>
