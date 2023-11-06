<template>
  <div
    class="bg-white sm:min-w-[350px] sm:max-w-auto max-w-[260px] min-w-[260px] rounded-lg shadow-xl p-6 flex flex-col items-center justify-center"
  >
    <a
      :href="data?.company?.url"
      target="_blank"
      class="max-w-[80px] h-[80px] rounded-full mt-6 block"
    >
      <UISkeleton
        v-bind="{ loading }"
        width="80px"
        height="80px"
        border-radius="50%"
      >
        <img
          :src="data?.company?.logo"
          :alt="data?.company?.name"
          class="w-full h-full rounded-full object-cover"
        />
      </UISkeleton>
    </a>
    <UISkeleton v-bind="{ loading }" width="70%" height="24px" margin="16px 0">
      <h3 class="text-base font-bold text-center leading-6 my-4">
        {{ data?.company?.name }}
      </h3>
    </UISkeleton>
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0">
      <p class="text-gray-600 text-center text-base leading-5">
        {{ data?.text }}
      </p>
    </UISkeleton>
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0" />
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0" />
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0" />
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0" />
    <UISkeleton v-bind="{ loading }" width="90%" height="20px" margin="4px 0" />
  </div>
</template>
<script setup lang="ts">
import { IIdeas } from '~/types'

interface Props {
  data: IIdeas | number
  loading?: boolean
}
defineProps<Props>()
</script>
