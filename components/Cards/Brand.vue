<template>
  <nuxt-link
    :to="{ path: '/products', query: { manufacturers: brand?.id } }"
    class="cursor-pointer transition-200 bg-white p-4 rounded-2xl w-full h-[136px] flex justify-center items-center group inline-block"
    :class="{
      '!bg-white-100 !h-[106px] !w-[220px] md:!h-[112px] md:!w-[234px]': isGray,
    }"
  >
    <img
      src="/fake/brand.png"
      :alt="brand?.title"
      width="200px"
      height="62px"
      class="w-full h-full grayscale transition-200 group-hover:scale-105 group-hover:grayscale-0 max-h-[62px] max-w-[200px] mx-auto object-contain"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  brand?: any
  loading?: boolean
  isGray?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isGray: false,
})
</script>

<style lang="scss" scoped></style>
