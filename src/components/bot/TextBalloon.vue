<template>
  <div
    v-if="message.role === 'user'"
    class="text-balloon bg-color-blue-light color-primary rounded-l rounded-ee-none pt-base pb-base pl-medium pr-medium text-size-md text-weight-md"
  >
    {{ message.content }}
  </div>

  <div
    v-else-if="message.role === 'assistant'"
    class="text-balloon bg-color-primary border-l border-blue-light rounded-l rounded-ss-none pt-base pb-base pl-medium pr-medium text-size-md text-weight-md"
  >
    {{ message.content }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Message } from '@/types/Chat'

defineProps<{
  message: Message
}>()
</script>

<style scoped lang="scss">
.text-balloon {
  width: fit-content;
  max-width: 25rem;
  word-wrap: break-word;
}

.assistant {
  width: 26rem;
}
</style>
