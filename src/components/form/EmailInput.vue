<template>
  <input
    type="email"
    v-model="emailAdress"
    placeholder="example@email.com"
    class="bg-color-primary border-l border-blue-light rounded-m pt-base pb-base pl-medium pr-medium text-size-md text-weight-md color-white textbox"
  />
</template>

<script lang="ts" setup>
const emailAdress = defineModel()
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/variables/borders.scss' as b;

.textbox {
  width: 400px;
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
