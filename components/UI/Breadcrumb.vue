<template>
  <div class="pt-3 pb-2 px-4 container flex items-center gap-1.5">
    <template v-for="(item, index) in crumbs" :key="index">
      <NuxtLink
        v-if="index !== crumbs.length - 1"
        :to="item.url"
        class="text-sm text-dark transition-200 hover:text-reddit"
      >
        {{ $t(item.title) }}
      </NuxtLink>
      <i
        v-if="index !== crumbs.length - 1"
        class="icon-arrow-right text-lg text-gray-400"
      ></i>
      <span v-if="index === crumbs.length - 1" class="text-sm text-gray-600">
        {{ $t(item.title) }}
      </span>
    </template>
  </div>
</template>
<script setup lang="ts">
interface Props {
  list: any[]
}
const props = defineProps<Props>()

const crumbs = computed(() => {
  if (props.list?.length) {
    return [{ title: 'dashboard', url: '/' }, ...props.list]
  } else {
    return [{ title: 'dashboard', url: '/' }]
  }
})
</script>
