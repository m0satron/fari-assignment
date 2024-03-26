<template>
  <main>
    <div class="flex justify-around w-full">
      <Transition name="fade">
        <FariCard v-if="submitted" class="contact-form">
          <template #title>
            <h3 class="text-weight-sb mx-auto">Thank you</h3>
          </template>
          <template #content>
            <div class="form-group flex flex-column justify-around w-full">
              <p class="mb-medium mt-medium text-center">We will contact you shortly!</p>
            </div>
          </template>
        </FariCard>

        <FariCard v-else class="contact-form">
          <template #title>
            <h3 class="text-weight-sb mx-auto">Contact us</h3>
          </template>

          <template #content>
            <div class="flex flex-column w-full">
              <p class="mb-medium">
                We're happy to get in touch with you. Provide your email adress and a message and we
                will contact you shortly!
              </p>

              <div class="form-group flex flex-column">
                <div class="flex mb-base justify-around">
                  <TextInput
                    v-model="form!.firstName"
                    placeholder="First name"
                    class="grow-1 mr-base"
                  />
                  <TextInput v-model="form!.lastName" placeholder="Last name" />
                </div>
                <div class="flex justify-around mb-base">
                  <EmailInput class="grow-1 mr-base" v-model="form!.email" />
                  <PhoneInput v-model="form!.phone" />
                </div>
                <TextArea v-model="form!.message" />
              </div>
            </div>
          </template>

          <template #actions>
            <FariButton
              @click="submit"
              :disabled="!valid"
              label="Submit"
              type="primary"
              class="ml-medium"
            />
          </template>
        </FariCard>
      </Transition>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import FariButton from '@/components/FariButton.vue'
import FariCard from '@/components/FariCard.vue'
import EmailInput from '@/components/form/EmailInput.vue'
import PhoneInput from '@/components/form/PhoneInput.vue'
import TextInput from '@/components/form/TextInput.vue'
import TextArea from '@/components/form/TextArea.vue'

const emit = defineEmits<{
  (event: 'submit', value: typeof form): void
}>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  phone: ''
})

const submitted = ref(false)

const valid = computed(() => form.email.length && form.message.length)

const submit = () => {
  emit('submit', form)
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.message = ''

  submitted.value = !submitted.value
}
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.contact-form {
  height: 41rem;
}
</style>
