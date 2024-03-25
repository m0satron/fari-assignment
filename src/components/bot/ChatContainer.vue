<template>
  <div class="container">
    <MessageBox ref="messageBox" :messages="messages" :loading="loading" />
    <ChatInput v-model="textInput" @post:message="(message) => emit('post:message', message)" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MessageBox from '@/components/bot/MessageBox.vue'
import ChatInput from '@/components/bot/ChatInput.vue'
import type { Message } from '@/types/Chat'

defineProps<{
  messages: Message[]
  loading?: boolean
}>()

const emit = defineEmits<{
  (event: 'post:message', value: string): void
}>()

const textInput = ref<string>('')
</script>

<style scoped lang="scss">
.container {
  height: fit-content;
  overflow: hidden;
}
</style>
