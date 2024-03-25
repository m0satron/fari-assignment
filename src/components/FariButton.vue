<template>
  <button
    ref="button"
    class="flex justify-evenly align-center rounded-xl pt-small pb-small pl-medium pr-medium text-size-md text-weight-md"
    :class="buttonClass"
    :style="`color: ${parentBG}`"
    :disabled="disabled"
  >
    <slot name="prepend-icon"></slot>
    <p class="button-text">{{ label }}</p>

    <slot name="append-icon"></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import type { Button } from '@/types/Button.ts'

const props = defineProps<Button>()

const buttonClass = computed(
  () => `${props.type || 'primary'} color-${props.type || 'primary'} ${props.disabled || ''}`
)

const button = ref<HTMLElement>()

const hasBackgroundColor = (element: HTMLElement) => {
  const style = window.getComputedStyle(element)
  return (
    style.backgroundColor &&
    style.backgroundColor !== 'transparent' &&
    style.backgroundColor !== 'rgba(0, 0, 0, 0)'
  )
}

const findParentWithBackgroundColor = (element: HTMLElement) => {
  let parent = element.parentElement

  while (parent && parent !== document.body) {
    if (hasBackgroundColor(parent)) return parent

    parent = parent.parentElement
  }

  if (hasBackgroundColor(document.body)) return document.body

  return null
}

const parentBG = ref()

watchEffect(() => {
  if (!button.value || !buttonClass.value || !buttonClass.value.includes('primary')) return null

  const parentWithBackground = findParentWithBackgroundColor(button.value)

  if (parentWithBackground) {
    const backgroundColor = getComputedStyle(parentWithBackground).backgroundColor
    parentBG.value = backgroundColor

    return backgroundColor
  } else return null
})
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/variables/borders.scss' as b;
@use '@/assets/functions/opacity.scss' as fn;

button {
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &--disabled {
    pointer-events: none;
    background-color: fn.opacity(c.$white, 0.6);
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}

.primary {
  background-color: c.$white;
  border: none;
  &:hover {
    background-color: fn.opacity(c.$white, 0.9);
  }

  &:active {
    background-color: fn.opacity(c.$white, 0.8);
    box-shadow: inset 0px 0px 0px b.$l c.$white;
  }
}

.secondary {
  background-color: transparent;
  border: b.$l solid c.$white;
  color: white;

  &:hover {
    background-color: fn.opacity(c.$white, 0.1);
  }

  &:active {
    background-color: fn.opacity(c.$white, 0.2);
  }
}

.button-text {
  margin: 0 0.6rem;
}
</style>
