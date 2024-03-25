<template>
  <div
    class="card color-white rounded-l p-base text-size-md text-weight-md flex flex-column"
    :style="{ width, height }"
  >
    <div class="flex weight-sb mb-small">
      <slot v-if="$slots.title" name="title" />
      <h3 v-if="title" class="text-size-xl text-weight-sb">{{ title }}</h3>

      <FariIconButton
        v-if="dismissable"
        @click="emit('close')"
        icon="close"
        size="sm"
        class="ml-auto"
      />
    </div>

    <div class="flex mt-medium">
      <slot name="content"></slot>
      <p v-if="content">{{ content }}</p>
    </div>

    <div v-if="$slots.actions || actions" class="flex justify-end weight-sb mt-auto">
      <slot name="actions" />
      <template v-if="actions && actions.length">
        <template v-for="action in actions" :key="action.label">
          <FariButton
            v-if="action"
            v-bind="action"
            @click="handleAction(action)"
            class="mr-medium"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import FariButton from '@/components/FariButton.vue'
import type { Button } from '@/types/Button'
import FariIconButton from '@/components/FariIconButton.vue'

interface EventButton extends Button {
  event: {
    name: string
    payload: unknown
  }
}

defineProps<{
  title?: string
  content?: string
  actions?: [EventButton, EventButton?]
  dismissable?: boolean
  width?: string
  height?: string
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: string, payload?: unknown): void
}>()

function handleAction(action: EventButton) {
  emit(action.event.name, action.event.payload)
}
</script>

<style scoped lang="scss">
.card {
  word-wrap: break-word;
  background-color: #316dbe;
}
</style>
