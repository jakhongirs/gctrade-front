<template>
  <a
    :href="brand?.url"
    target="_blank"
    class="cursor-pointer transition-200 bg-white p-4 rounded-2xl w-full h-[136px] flex justify-center items-center group inline-block"
    :class="{
      '!bg-white-100 !h-[80px] !w-[150px] md:!h-[112px] md:!w-[234px]': isGray,
    }"
  >
    <UISkeleton v-bind="{ loading }" width="200px" height="62px">
      <img
        :src="brand?.logo"
        :alt="brand?.name"
        width="200px"
        height="62px"
        class="w-full h-full grayscale transition-200 group-hover:scale-105 group-hover:grayscale-0 max-h-[62px] max-w-[200px] mx-auto object-contain"
      />
    </UISkeleton>
  </a>
</template>

<script lang="ts" setup>
import { IPartners } from '~/types'

interface Props {
  brand: IPartners
  loading?: boolean
  isGray?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isGray: false,
})
</script>

<style lang="scss" scoped></style>
