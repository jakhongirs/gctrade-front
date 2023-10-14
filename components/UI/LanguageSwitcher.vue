<template>
  <div ref="root" class="relative">
    <button
      aria-label="Language switcher"
      class="w-full min-w-[140px] px-3 h-10 flex items-center gap-2 rounded-2lg main-transition active:scale-90 active:duration-100 text-dark font-readex dark:bg-dark-500 dark:text-white"
      :class="{
        '!rounded-b-none': show && position === 'bottom',
        '!rounded-t-none': show && position === 'top',
      }"
      @click="toggleSwitcher"
    >
      <span class="inline-block w-[22px]">
        <img
          :src="`/svg/flags/${$i18n.locale}.svg`"
          width="22px"
          height="22px"
          alt="language flag"
        />
      </span>
      <span class="w-full inline-block text-left">{{
        originTranslations[$i18n.locale]
      }}</span>
      <span
        class="icon-chevron-down main-transition"
        :class="{ 'rotate-180': show }"
      ></span>
    </button>
    <ul
      :class="[
        {
          '!opacity-100 !visible': show,
          '!top-10': show && position === 'bottom',
          '!bottom-10': show && position === 'top',
        },
        listPositions[position],
      ]"
      class="absolute overflow-hidden opacity-0 z-20 main-transition invisible left-0 w-full bg-gray-200 py-1 list-none border-gray-300/20 rounded-2lg dark:bg-dark-500"
    >
      <li
        v-for="lang in $i18n.availableLocales"
        :key="lang"
        :class="[
          lang === $i18n.locale
            ? 'text-blue bg-blue/10 dark:!text-blue'
            : 'text-dark',
        ]"
        class="cursor-pointer flex items-center gap-x-2 py-2 transition-colors duration-300 hover:bg-blue/10 px-3 font-readex lang-sw-item dark:text-white"
        @click="changeLocale(lang)"
      >
        <img :src="`/svg/flags/${lang}.svg`" :alt="lang" />
        <span>{{ originTranslations[lang] }}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'

interface Props {
  position?: 'bottom' | 'top'
}
withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

const originTranslations = {
  en: 'English',
  ru: 'Русский',
  uz: "O'zbekcha",
}

const listPositions = {
  bottom: 'top-12 border-t rounded-t-none',
  top: 'bottom-12 border-b rounded-b-none',
}

const show = ref(false)
const root = ref<HTMLDivElement>()
onClickOutside(root, (event) => (show.value = false))
function toggleSwitcher() {
  if (show.value) {
    return (show.value = false)
  }
  show.value = true
}

function changeLocale(lang: string) {
  const savedLocale = useCookie('locale')
  savedLocale.value = lang
  window.location.reload()
}
</script>
