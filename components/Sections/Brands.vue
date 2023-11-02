<template>
  <ClientOnly>
    <div class="bg-white py-16">
      <UISectionTitle title="partners" center class="mb-6" />

      <div class="marquee mb-8">
        <div class="marquee__group_left">
          <CardsBrand
            v-for="(item, index) in loading ? 100 : generateItem(data)"
            :key="'F' + index"
            :brand="item"
            :loading="loading"
            is-gray
          />
        </div>
      </div>

      <div class="marquee mb-6">
        <div class="marquee__group_right">
          <CardsBrand
            v-for="(item, index) in loading ? 100 : generateItem(data)"
            :key="'G' + index"
            :brand="item"
            :loading="loading"
            is-gray
          />
        </div>
      </div>

      <div class="marquee">
        <div class="marquee__group_left">
          <CardsBrand
            v-for="(item, index) in loading ? 100 : generateItem(data)"
            :key="'H' + index"
            :brand="item"
            :loading="loading"
            is-gray
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { IPartners, IResponse } from '~/types'

const data = ref<IPartners[]>([])
const loading = ref(false)
function generateItem(arr: IPartners[]) {
  let index = 0 // 1 / 2
  const generatedArray = [] // [{id: 1},{id: 2}, {id: 3}, {id: 1}]
  const checkResponseLength = arr?.length // 3
  const checkAdditionalItems = 100 - checkResponseLength // 97
  for (let i = 0; i <= checkAdditionalItems; i++) {
    generatedArray.push(arr[index])
    if (index + 1 === checkResponseLength) {
      index = 0
    } else {
      index++
    }
  }
  return generatedArray
}

try {
  loading.value = true
  const brands = useAsyncData('brands', () =>
    useApi().$get<IResponse<IPartners>>(`partners/`, {
      params: {
        limit: 50,
      },
    })
  )
  if (brands.data.value) {
    data.value = brands.data.value?.results
  }
} catch (err) {
  console.log(err)
} finally {
  loading.value = false
}
</script>

<style>
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: 3rem;
}

.marquee__group_left {
  flex-shrink: 0;
  margin-left: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  min-width: 100%;
  animation: scroll-left 1000s linear infinite;
}
.marquee__group_left:hover {
  animation-play-state: paused;
}

.marquee__group_right {
  flex-shrink: 0;
  margin-right: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  min-width: 100%;
  animation: scroll-right 1000s linear infinite;
}
.marquee__group_right:hover {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee__group_left {
    animation-play-state: paused;
  }
}

.marquee__group_left h4 {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid #ccc;
  padding: 3rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 3rem));
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(calc(0 + 3rem));
  }
}
</style>
