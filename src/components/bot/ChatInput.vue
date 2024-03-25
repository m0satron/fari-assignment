<template>
  <div class="flex align-center">
    <div v-if="isSupported">
      <FariIconButton
        @click="toggleRecording"
        :icon="isListening ? 'microphone-off' : 'microphone'"
        class="mr-base"
      />
    </div>

    <TextInput v-model="textInput" />

    <FariIconButton
      @click="postMessage"
      icon="send"
      class="ml-base"
      :disabled="!textInput.length"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useSpeechRecognition } from '@vueuse/core'
import TextInput from '@/components/form/TextInput.vue'
import FariIconButton from '@/components/FariIconButton.vue'

const emit = defineEmits<{
  (event: 'post:message', value: string): void
}>()

const { enter, space } = useMagicKeys()

const textInput = ref('')

const { isSupported, isListening, result, start, stop } = useSpeechRecognition()

const toggleRecording = () => (isListening.value ? stop() : start())

watchEffect(() => (textInput.value = result.value))

function postMessage() {
  emit('post:message', textInput.value)
  textInput.value = ''
  stop()
}

whenever(enter, postMessage)
whenever(space, toggleRecording)
</script>
