<template>
  <div
    role="select"
    class="flex relative flex-column align-center bg-color-primary flex align-center justify-between border-l border-white rounded-l2 color-white selectbox text-size-md text-weight-md"
    :class="{ 'selectbox--active': areOptionsVisible }"
    ref="target"
  >
    <div
      class="flex align-center justify-end w-full relative"
      @click="areOptionsVisible = !areOptionsVisible"
    >
      <span class="visible-item mr-medium"> {{ visibleOption }} </span>
      <AkChevronDown
        class="color-white absolute icon"
        :class="{ 'icon--active': areOptionsVisible }"
      />
    </div>

    <template v-if="options && options.length">
      <div class="flex flex-column options" :class="{ 'options--visible': areOptionsVisible }">
        <option
          v-for="option in options"
          :key="option.value"
          @click="() => selectOption(option)"
          class="option"
          :class="{
            'option--visible': areOptionsVisible,
            'bg-color-blue-light selected': selectedOption?.value === option.value
          }"
        >
          {{ option.label }}
        </option>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { AkChevronDown } from '@kalimahapps/vue-icons'
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

type Option = {
  label: string
  value: string | number
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: Option['value']): void
}>()

defineProps<{
  options: Option[]
  modelValue: Option['value']
}>()

const selectedOption = ref<Option>()

const visibleOption = computed(() => selectedOption.value?.label || 'select')

const areOptionsVisible = ref(false)

const target = ref<HTMLDivElement | null>(null)

onClickOutside(target, () => (areOptionsVisible.value = false))

function selectOption(option: Option) {
  selectedOption.value = option
  areOptionsVisible.value = false

  emit('update:modelValue', option.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/variables/colors.scss' as c;
@use '@/assets/variables/spacings.scss' as s;
@use '@/assets/variables/borders.scss' as b;
@use '@/assets/functions/opacity.scss' as fn;

.selectbox {
  width: 12rem;
  transition: all 300ms ease-in-out;
  cursor: pointer;

  &--active {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    transition: all 100ms ease-out;
  }
}

.visible-item {
  padding: s.$small;
}

.icon {
  position: absolute;
  top: s.$small;
  right: s.$small;
  transition: all 300ms ease-in-out;

  &--active {
    transform: rotateX(180deg);
  }
}

.options {
  position: absolute;
  top: 3.6rem;
  width: 12rem;
  background-color: c.$primary;
  border-bottom-left-radius: b.$rounded-large;
  border-bottom-right-radius: b.$rounded-large;
  border: 2px solid c.$white;
  border-top: 0;
  max-height: 0;
  transition: all 300ms ease-in-out;
  overflow: hidden;
  opacity: 0;
  &--visible {
    opacity: 1;
    max-height: 1000px;
    transition: max-height 300ms ease-in-out;
  }
}

.option {
  border-top: 2px solid c.$blue-light;
  width: 100%;
  padding: s.$small;
  transition: all 300ms ease-in-out;
  text-align: end;
  &:hover {
    &:not(.selected) {
      background-color: fn.opacity(c.$blue-light, 0.3);
    }
  }
}
</style>
