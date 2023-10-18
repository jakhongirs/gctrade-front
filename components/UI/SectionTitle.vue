<template>
  <div
    class="flex justify-between items-center"
    :class="{ '!justify-center flex-col': center }"
  >
    <h2 class="text-2xl font-medium text-dark" :class="{ '!text-3xl': center }">
      {{ $t(title) }}
    </h2>
    <p v-if="center" class="text-sm text-gray-600">
      Our partners are the most trustworthy partners
    </p>
    <nuxt-link
      v-if="link && !center"
      :to="link"
      class="group transition-200 hover:text-red text-base flex items-center text-gray-600"
    >
      {{ $t(linkText) }}
      <i
        class="ml-1 icon-arrow-right text-gray-600 text-xl group-hover:text-red"
      ></i>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
  link?: string
  linkText?: string
  center?: boolean
}
defineProps<Props>()
</script>
