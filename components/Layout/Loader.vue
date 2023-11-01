<template>
  <transition name="fade">
    <div
      v-if="loading"
      class="background-shadow-loader w-full h-screen fixed inset-0 z-[99999] flex items-center justify-center bg-white"
    >
      <div class="flipping">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const loading = ref(true)

onMounted(() => {
  const body = document.body
  body.style.overflow = 'hidden'
  setTimeout(() => {
    loading.value = false
    body.style.overflow = 'auto'
  }, 1000)
})
</script>

<style scoped>
.background-shadow-loader {
  backdrop-filter: blur(28px);
}
/* Define the keyframes for animating the first path */

.flipping {
  width: 105.6px;
  height: 105.6px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.flipping div {
  animation: flipping-18i5bq 1.5s calc(var(--delay) * 1s) infinite backwards;
  background-color: #de1e00;
}

.flipping div:nth-child(1) {
  --delay: 0.1;
}

.flipping div:nth-child(2) {
  --delay: 0.2;
}

.flipping div:nth-child(3) {
  --delay: 0.3;
}

.flipping div:nth-child(4) {
  --delay: 0.4;
}

.flipping div:nth-child(5) {
  --delay: 0.5;
}

.flipping div:nth-child(6) {
  --delay: 0.6;
}

.flipping div:nth-child(7) {
  --delay: 0.7;
}

.flipping div:nth-child(8) {
  --delay: 0.8;
}

.flipping div:nth-child(9) {
  --delay: 0.9;
}

@keyframes flipping-18i5bq {
  0% {
    transform: perspective(67.2px) rotateX(-90deg);
  }

  50%,
  75% {
    transform: perspective(67.2px) rotateX(0);
  }

  100% {
    opacity: 0;
    transform: perspective(67.2px) rotateX(0);
  }
}
</style>
