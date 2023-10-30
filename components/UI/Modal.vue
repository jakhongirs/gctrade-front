<template>
  <Teleport to="body">
    <Transition mode="out-in" @enter="onEnter" @leave="onLeave">
      <div
        v-if="show"
        class="fixed top-0 left-0 w-full h-full z-[10000] flex items-center justify-center bg-dark/50 p-1"
      >
        <dialog
          :class="dialogClass"
          class="bg-white dark:bg-dark-500 shadow-xl rounded-[22px] p-4 sm:max-w-[500px] max-w-[320px] w-full backdrop:bg-transparent"
          @click="onBackdropClick"
        >
          <div
            v-if="withHeader"
            class="bg-blue-200 dark:bg-dark dark:text-white p-2.5 rounded-xl flex items-center justify-between text-lg text-dark leading-21 font-medium"
          >
            {{ title }}
            <span
              class="icon-close-circle-regular text-xl text-dark dark:text-white cursor-pointer transition duration-200 ease-in-out hover:!text-red"
              @click="emit('close')"
            ></span>
          </div>
          <slot />
        </dialog>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import gsap from 'gsap'

interface Props {
  withHeader?: boolean
  title?: string
  show: boolean
  backdropClose?: boolean
  dialogClass?: string | string[]
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

let dialogTimeline: gsap.core.Timeline
let wrapperTimeline: gsap.core.Timeline

onMounted(() => {
  dialogTimeline = gsap.timeline()
  wrapperTimeline = gsap.timeline()
})
function onEnter(el: HTMLDivElement) {
  const dialog = el.querySelector('dialog') as HTMLDialogElement
  dialog.showModal()
  document.body.style.overflow = 'hidden'
  wrapperTimeline.fromTo(
    el,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 0.3,
    }
  )
  dialogTimeline.fromTo(
    dialog,
    {
      opacity: 0,
      scale: 1.1,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    }
  )
}
function onLeave(el: HTMLDialogElement, done) {
  const dialog = el.querySelector('dialog') as HTMLDialogElement
  wrapperTimeline.fromTo(
    el,
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: 0.3,
    }
  )
  dialogTimeline.fromTo(
    dialog,
    {
      opacity: 1,
      scale: 1,
    },
    {
      opacity: 0,
      scale: 1.1,
      duration: 0.3,
      onComplete: () => {
        dialog.close()
        document.body.style.overflow = 'auto'
        done()
      },
    }
  )
}

// watch(
//   () => props.show,
//   () => {
//     const dialog = document.getElementById(props.id) as HTMLDialogElement
//
//     if (props.show) {
//       dialog.showModal()
//       document.body.style.overflow = 'hidden'
//       gsap.fromTo(
//         dialog,
//         {
//           opacity: 0,
//           scale: 1.1,
//         },
//         {
//           opacity: 1,
//           scale: 1,
//           duration: 0.3,
//         }
//       )
//     } else {
//       gsap.fromTo(
//         dialog,
//         {
//           opacity: 1,
//           scale: 1,
//         },
//         {
//           opacity: 0,
//           scale: 1.1,
//           duration: 0.3,
//           onComplete: () => {
//             document.body.style.overflow = 'auto'
//             dialog.close()
//           },
//         }
//       )
//     }
//   }
// )
function onBackdropClick(e: MouseEvent) {
  if (props.show && props.backdropClose) {
    const dialog = document.getElementById(props.id) as HTMLDialogElement
    const dialogDimensions = dialog.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions?.left ||
      e.clientX > dialogDimensions?.right ||
      e.clientY < dialogDimensions?.top ||
      e.clientY > dialogDimensions?.bottom
    ) {
      emit('close')
    }
  }
}
</script>

<style>
/*dialog {*/
/*  opacity: 0;*/
/*  transition: opacity 0.5s;*/
/*}*/
/*dialog[open] {*/
/*  animation: open 0.3s;*/
/*  opacity: 1;*/
/*}*/
/*@keyframes open {*/
/*  from {*/
/*    opacity: 0;*/
/*    scale: 0.1;*/
/*  }*/
/*  to {*/
/*    opacity: 1;*/
/*    scale: 1;*/
/*  }*/
/*}*/
</style>
