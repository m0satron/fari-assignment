<template>
  <textarea
    v-model="text"
    :placeholder="placeholder || 'type your message here...'"
    class="bg-color-primary border-l border-blue-light rounded-m pt-base pb-base pl-medium pr-medium text-size-md color-white textbox"
  />
</template>

<script lang="ts" setup>
const text = defineModel<string>()

defineProps<{
  placeholder?: string
}>()
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/variables/borders.scss' as b;

.textbox {
  width: 100%;
  height: 6em;
  line-height: 1em;
  outline: c.$blue;
  transition: all 100ms ease-in-out;

  &:focus {
    outline: c.$blue-light solid 0.12rem;
  }

  &::placeholder {
    color: c.$white;
  }
}
</style>
