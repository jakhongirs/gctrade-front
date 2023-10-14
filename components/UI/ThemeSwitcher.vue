<template>
  <button
    aria-label="Theme switcher"
    :class="[showLabel ? 'justify-between px-3' : 'justify-center']"
    class="w-10 h-10 bg-gray-200 flex items-center rounded-2lg main-transition hover:bg-blue-100 active:scale-90 active:duration-100 dark:bg-dark-500 text-dark dark:text-white"
    @click="toggleTheme"
  >
    <Transition v-if="showLabel" name="scale-fade" mode="out-in">
      <span :key="theme" class="font-readex">{{ $t(theme) }}</span>
    </Transition>
    <Transition name="scale-fade" mode="out-in">
      <span v-if="theme === 'dark'" class="icon-moon text-2xl text-white" />
      <span v-else class="icon-sun text-2xl text-dark" />
    </Transition>
  </button>
</template>
<script lang="ts" setup>
import { useTheme } from '#imports'

interface Props {
  showLabel?: boolean
}
defineProps<Props>()

const { toggleTheme, theme } = useTheme()
</script>
