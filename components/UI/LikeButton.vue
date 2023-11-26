<template>
  <div
    class="w-8 h-8 rounded-md absolute z-10 bg-white-100/70 flex items-center justify-center cursor-pointer"
    @click="isSaved ? onDelete(productId) : onSave(productId)"
  >
    <i
      class="text-dark text-2xl transition-200"
      :class="
        isSaved ? 'icon-heart-solid !text-red' : 'icon-heart hover:text-red'
      "
    ></i>
  </div>
</template>
<script setup lang="ts">
import { useSavedController } from '~/composables/savedController'

interface Props {
  saved?: boolean
  productId: number
}
const props = defineProps<Props>()

const isSaved = ref(false)
const { saveProduct, deleteSavedProduct } = useSavedController()

async function onDelete(id: number) {
  isSaved.value = false
  await deleteSavedProduct(id)
}
async function onSave(id: number) {
  isSaved.value = true
  await saveProduct(id)
}
onMounted(() => {
  isSaved.value = props.saved
})
</script>
