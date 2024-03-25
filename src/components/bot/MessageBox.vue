<template>
  <div ref="messageBox" class="flex flex-column message-box">
    <TextBalloon
      :key="message.content"
      v-for="message in messages"
      v-bind="{ message, loading }"
      class="mb-base"
      :class="message.role"
    />

    <LoadingBalloon v-if="loading" class="mb-base" />
  </div>
</template>

<script setup lang="ts">
import TextBalloon from '@/components/bot/TextBalloon.vue'
import LoadingBalloon from '@/components/bot/LoadingBalloon.vue'
import type { Message } from '@/types/Chat'
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  messages: Message[]
  loading?: boolean
}>()

const messageBox = ref<HTMLDivElement | null>(null)
watch(
  () => props.messages?.length,
  () =>
    nextTick(
      () => messageBox.value && (messageBox.value.scrollTop = messageBox.value?.scrollHeight)
    ),
  { immediate: true }
)
</script>

<style scoped lang="scss">
.message-box {
  height: 30rem;
  overflow: scroll;
  scroll-behavior: smooth;
  transition: all 200ms ease-in-out;
  transition: scroll 200ms ease-in-out;
}

.user {
  align-self: flex-end;
}

.assistant {
  align-self: flex-start;
}
</style>
