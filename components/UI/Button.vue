<template>
  <button
    v-bind="{ disabled }"
    class="rounded-lg w-fit flex-center cursor-pointer main-transition relative group disabled:!pointer-events-none"
    :class="[
      sizes[size],
      variants[variant],
      { 'pointer-events-none': loading },
    ]"
  >
    <Transition mode="out-in" name="fade">
      <span :key="loading" class="flex items-center justify-center">
        <span v-show="loading" class="loader inline-block">
          <svg class="circular" viewBox="25 25 50 50">
            <circle
              :class="{
                '!stroke-white': variant === 'outline' || variant === 'primary',
              }"
              class="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-miterlimit="10"
            />
          </svg>
        </span>
        <span v-show="!loading" class="flex justify-center items-center gap-1">
          <span
            :class="[
              textClass,
              {
                '!text-base !leading-19': size === 'small',
              },
            ]"
            class="font-normal text-center items-center justify-center letter-3"
          >
            {{ text }}
          </span>
          <span
            v-if="iconName"
            class="text-base main-transition"
            :class="`icon-${iconName}`"
          ></span>
        </span>
      </span>
    </Transition>
  </button>
</template>

<script setup lang="ts">
// ******* PROPS *******

interface Props {
  text?: string
  textClass?: string
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'light' | 'white' | 'outline' | string
  size?: 'normal' | 'small' | string
  iconName?: string
}

withDefaults(defineProps<Props>(), {
  hasShadow: true,
  text: 'Button',
  textClass: '',
  shadowColor: '',
  disabled: false,
  loading: false,
  variant: 'primary',
  size: 'normal',
  iconName: '',
})

const sizes = {
  small: '!px-4 !py-2 !rounded-10 !text-base',
  normal: '!px-5 !py-3 !text-lg',
}

const variants = {
  primary: 'bg-blue text-white hover:bg-blue-800 ',
  light: 'bg-blue/20 text-blue hover:!bg-blue-300',
  white: 'bg-white text-blue !outline-white/20 hover:bg-blue-200',
  outline: '!bg-transparent text-blue hover:text-blue-800 !outline-none',
}
</script>

<style scoped>
.loader {
  position: relative;
  margin: 0 auto;
  width: 20px;
}

.loader:before {
  content: '';
  display: block;
  padding-top: 100%;
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke: #1a77f9;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
