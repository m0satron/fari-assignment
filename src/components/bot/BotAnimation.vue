<template>
  <div class="container relative">
    <audio ref="audioElement" crossorigin="anonymous" autoplay hidden></audio>
    <div
      class="bot-back absolute rounded-xl"
      :style="state.isPlaying && { transform: `scale(${scaleFactorBack})` }"
    />
    <div
      class="bot-mid absolute rounded-xl"
      :style="state.isPlaying && { transform: `scale(${scaleFactorMid})` }"
    />
    <div
      class="bot-top absolute rounded-xl"
      :style="state.isPlaying && { transform: `scale(${scaleFactorTop})` }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted, reactive } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  audioSrc: {
    type: String,
    default: ''
  }
})

const audioElement = ref<HTMLAudioElement | null>(null)

let audioContext: AudioContext | undefined
let analyser: AnalyserNode | undefined
let dataArray: Uint8Array | undefined
let animationFrameId: number | null = null

const state = reactive({
  isPlaying: false,
  volume: 0
})

const setupAudioAnalysis = () => {
  audioContext = new window.AudioContext()
  analyser = audioContext.createAnalyser()
  analyser.fftSize = 256 // Smaller FFT size for granularity
  dataArray = new Uint8Array(analyser.frequencyBinCount)

  if (audioElement.value) {
    const source = audioContext.createMediaElementSource(audioElement.value)
    source.connect(analyser)
    analyser.connect(audioContext.destination) // Also connect to the destination so you can hear it
  }
}

const startVolumeAnalysis = () => {
  state.isPlaying = true
  loop()
}

const stopVolumeAnalysis = () => {
  state.isPlaying = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

const loop = () => {
  if (!state.isPlaying) return

  if (analyser && dataArray) {
    analyser.getByteFrequencyData(dataArray)
    const average = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length
    state.volume = average
  }
  animationFrameId = requestAnimationFrame(loop)
}

onMounted(loop)

onUnmounted(() => animationFrameId && cancelAnimationFrame(animationFrameId))

watch(
  () => [props.audioSrc, props.loading],
  ([newSrc, isLoading]) => {
    if (isLoading) return

    if (newSrc && audioElement.value) {
      audioElement.value.src = newSrc

      audioElement.value.onplay = () => {
        if (!audioContext) setupAudioAnalysis()
        startVolumeAnalysis()
      }

      audioElement.value.onpause = stopVolumeAnalysis
      audioElement.value.onended = stopVolumeAnalysis

      audioElement.value.play().catch((error) => console.error('Error playing audio:', error))
    }
  },
  { immediate: true }
)

const generateScaleFactor = (baseVolume: number, randomnessFactor = 0.05) => {
  const randomOffset = (Math.random() * 2 - 1) * randomnessFactor
  const scaleFactor = 1 + baseVolume / 128 + randomOffset
  return scaleFactor
}

const scaleFactorBack = computed(() => generateScaleFactor(state.volume, 0.16))
const scaleFactorMid = computed(() => generateScaleFactor(state.volume, 0.09))
const scaleFactorTop = computed(() => generateScaleFactor(state.volume, 0.06))
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/functions/opacity.scss' as fn;

.container {
  position: relative;
  height: 12rem;
  width: 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bot {
  &-back,
  &-mid,
  &-top {
    transition: transform 0.05s ease-in-out;
  }
}

.bot {
  &-back {
    top: 0;
    left: 0;
    background-color: fn.opacity(c.$white, 0.25);
    height: 12rem;
    width: 12rem;
  }

  &-mid {
    top: 1rem;
    left: 1rem;
    background-color: fn.opacity(c.$white, 0.5);
    height: 10rem;
    width: 10rem;
  }

  &-top {
    top: 2.3rem;
    left: 2.3rem;
    background-color: c.$white;
    height: 7.3rem;
    width: 7.3rem;
  }
}
</style>
