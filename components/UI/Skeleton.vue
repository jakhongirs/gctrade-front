<template>
  <!--  <Transition name="skeleton" mode="out-in">-->
  <div
    v-if="loading"
    key="loading"
    class="flex-shrink-0"
    :style="{
      height: height,
      width: width,
      margin: margin,
    }"
  >
    <span class="skeleton" :class="preloaderClass" :style="shimmerStyles" />
  </div>
  <template v-else>
    <ClientOnly>
      <slot />
    </ClientOnly>
  </template>
  <!--  </Transition>-->
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  loading?: boolean
  height?: string
  width?: string
  maxWidth?: string
  margin?: string
  line?: string | number
  borderRadius?: string
  preloaderClass?: string | string[]
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: '20px',
  width: '50px',
  maxWidth: '100px',
  line: 1,
  borderRadius: '4px',
  preloaderClass: '',
})

const shimmerStyles = computed(() => {
  return {
    '--width': props.width,
    '--max-width': props.width,
    '--height': props.height,
    '--border-radius': props.circle ? '50%' : props.borderRadius,
  }
})
</script>

<style scoped>
.skeleton {
  background: #dddbdd;
  background-image: linear-gradient(
    to right,
    rgba(194, 198, 204, 0.3) 5.93%,
    rgba(255, 255, 255, 0.42) 26.56%,
    rgba(194, 198, 204, 0.3) 62.69%
  );
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  background-repeat: no-repeat;
  background-size: var(--width) var(--height);
  display: inline-block;
  position: relative;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeholderShimmer;
  animation-timing-function: linear;
}

.dark .skeleton {
  background: linear-gradient(
    to right,
    rgba(194, 198, 204, 0.3) 5.93%,
    rgba(255, 255, 255, 0.42) 26.56%,
    rgba(194, 198, 204, 0.3) 62.69%
  ) !important;
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}

.skeleton-enter-active,
.skeleton-leave-active {
  transition: all 0.1s ease-out;
}

.skeleton-enter,
.skeleton-leave-to {
  opacity: 0;
}
</style>
