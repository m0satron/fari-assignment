<template>
  <button
    class="flex border-none justify-around align-center relative bg-color-white rounded-xl icon-container"
    :class="{
      'icon-container--disabled': disabled,
      'icon-container--sm': size === 'sm',
      'icon-container--lg': size === 'lg'
    }"
    :disabled="disabled"
  >
    <Component :is="icon" class="color-primary" />
  </button>
</template>

<script lang="ts" setup>
import { McSendFill, BxMicrophone, BxMicrophoneOff, ClCloseLg } from '@kalimahapps/vue-icons'
import { computed } from 'vue'

const props = defineProps<{
  disabled?: boolean
  icon: 'send' | 'microphone' | 'microphone-off' | 'close'
  size?: 'sm' | 'md' | 'lg'
}>()

const icons = {
  send: McSendFill,
  microphone: BxMicrophone,
  'microphone-off': BxMicrophoneOff,
  close: ClCloseLg
}

const icon = computed(() => icons[props.icon])
</script>
<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/functions/opacity.scss' as fn;

.icon-container {
  font-size: 2rem;
  width: 3rem;
  height: 3rem;
  transition: all 200ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: fn.opacity(c.$white, 0.8);
  }

  &:active {
    background-color: fn.opacity(c.$white, 0.8);
    border: 0.3rem solid fn.opacity(c.$white, 0.8);
  }

  &--disabled {
    pointer-events: none;
    background-color: fn.opacity(c.$white, 0.6);
  }

  &--sm {
    width: 2rem;
    height: 2rem;
  }
}
</style>
