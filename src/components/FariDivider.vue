<template>
  <div :class="dividerClass"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  orientation: 'horizontal' | 'vertical'
}>()

const dividerClass = computed(() => ({
  'divider-horizontal': props.orientation === 'horizontal',
  'divider-vertical': props.orientation === 'vertical'
}))
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/variables/borders.scss' as b;
@use '@/assets/functions/opacity.scss' as fn;

.divider-horizontal {
  height: b.$m;
  width: 100%;
  background-color: c.$blue-light;
}

.divider-vertical {
  width: b.$m;
  height: 100%; /* You might want to set a fixed height depending on your layout */
  background-color: c.$blue-light;
}
</style>
