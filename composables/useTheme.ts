import { useMainStore } from '~/store/main'

type TTheme = 'light' | 'dark'

export const useTheme = () => {
  const mainStore = useMainStore()
  const savedTheme = useCookie<TTheme>('theme')
  const theme = computed(() => mainStore.theme)

  if (!savedTheme.value) {
    savedTheme.value = 'light'
  }
  mainStore.theme = savedTheme.value

  function changeTheme(_theme: TTheme) {
    mainStore.theme = _theme
  }

  function toggleTheme() {
    mainStore.changeTheme(mainStore.theme === 'light' ? 'dark' : 'light')
  }

  function init() {
    useHead({
      htmlAttrs: {
        class: mainStore.theme === 'dark' ? 'dark' : 'light',
      },
    })
  }

  watch(
    () => mainStore.theme,
    () => {
      savedTheme.value = mainStore.theme
      const htmlEl = document.querySelector<HTMLElement>('html')!
      htmlEl.classList.toggle('dark', mainStore.theme === 'dark')
    }
  )

  return {
    theme,
    changeTheme,
    toggleTheme,
    init,
  }
}
