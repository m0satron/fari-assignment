<template>
  <div class="flex flex-column align-center">
    <BotAnimation :audio-src="voiceMessage" class="mb-large" :loading="loading" />
    <ChatContainer
      :loading="loading"
      :messages="messages"
      class="mt-large mb-large"
      @post:message="(message) => $emit('post:message', message)"
    />
  </div>
</template>

<script lang="ts" setup>
import ChatContainer from '@/components/bot/ChatContainer.vue'
import BotAnimation from '@/components/bot/BotAnimation.vue'
import type { Message } from '@/types/Chat'
defineProps<{
  messages: Message[]
  voiceMessage: string
  loading?: boolean
}>()

defineEmits<{
  (event: 'post:message', value: string): void
}>()
</script>
