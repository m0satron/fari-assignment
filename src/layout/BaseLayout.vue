<template>
  <div class="flex flex-wrap w-full h-full justify-evenly align-center content-center p-base gap-1">
    <div class="slot-wrapper">
      <transition name="slide-fade" mode="out-in">
        <slot name="left" />
      </transition>
    </div>

    <div class="slot-wrapper center-slot">
      <transition name="slide-fade" mode="out-in">
        <slot name="center" />
      </transition>
    </div>
    <div class="slot-wrapper">
      <transition name="slide-fade" mode="out-in">
        <slot name="right" />
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/variables/spacings.scss' as s;

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  transform: translateY(-200px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}

.slot-wrapper {
  flex: 1 0 0%;
  &:not(.center-slot) {
    margin-bottom: s.$base;
  }
}
</style>
