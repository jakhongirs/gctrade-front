<template>
  <div class="pt-3 pb-2 px-4 container flex items-center gap-1.5">
    <template v-for="(item, index) in crumbs" :key="index">
      <NuxtLink
        v-if="index !== crumbs.length - 1"
        :to="item.url"
        class="text-sm text-dark transition-200 hover:text-reddit"
      >
        {{ item.title }}
      </NuxtLink>
      <i
        v-if="index !== crumbs.length - 1"
        class="icon-arrow-right text-lg text-gray-400"
      ></i>
      <span v-if="index === crumbs.length - 1" class="text-sm text-gray-600">
        {{ item.title }}
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

interface Props {
  list: any[]
}
const props = defineProps<Props>()
const { t } = useI18n()
const crumbs = computed(() => {
  if (props.list?.length) {
    return [{ title: t('dashboard'), url: '/' }, ...props.list]
  } else {
    return [{ title: t('dashboard'), url: '/' }]
  }
})
</script>
