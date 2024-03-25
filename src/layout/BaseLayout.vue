<template>
  <div class="flex flex-wrap w-full h-full justify-evenly align-end content-center p-base gap-1">
    <div class="slot-wrapper">
      <slot name="left" />
    </div>

    <div class="slot-wrapper center-slot">
      <slot name="center" />
    </div>
    <div class="slot-wrapper">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/variables/spacings.scss' as s;

.slot-wrapper {
  flex: 1 0 0%;
  &:not(.center-slot) {
    margin-bottom: s.$base;
  }
}
</style>
