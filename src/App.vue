<template>
  <Layout>
    <template #left v-if="code">
      <div>
        <transition name="slide-fade" mode="out-in">
          <FariCard
            v-if="code == '1'"
            title="About"
            content="Our vision is to strengthen Fundamental Human Rights and safeguard Sustainability. We help citizens, politicians, companies as well as not-for-profit organizations to address local, every day or long-term challenges in the Brussels-Capital Region, Belgium and Europe."
            height="40rem"
          />
          <FariCard
            v-else-if="code == '2'"
            title="The team"
            content="We facilitate interdisciplinary research collaboration, connecting people across disciplines, expertise, and institutions to enhance the accessibility and impact of science and innovation on society."
            height="40rem"
          />
          <FariCard
            v-else-if="code == '3'"
            title="Our mission"
            content="Our mission is to study, develop, and foster the adoption and governance of AI, Data and Robotics technologies in an inclusive, ethical and sustainable way."
            height="40rem"
          />
          <FariCard
            v-else-if="code == '4'"
            title="History"
            content="We involve ethical and civic steering committees onboard to actively participate, guarantee the applicability, acceptability and relevance of our projects. The initiative is driven by AI and Data ethics. For every potential project, we ensure to be aligned with the legal requirements of, for instance fairness, transparency and accountability, while respecting academic freedom and integrating ethical and societal concerns. We ensure that all FARI projects consider the EU’s seven key requirements for responsible AI, both in the context of research and in the context of use. All FARI’s projects will respect the ground rules of the responsible research and innovation."
            height="40rem"
          />
          <ContactForm v-else-if="code == '5'" />
        </transition>
      </div>
    </template>
    <template #center>
      <FariBot
        :messages="messages"
        :loading="loading"
        @post:message="postPessage"
        :voice-message="voiceMessage"
        class="w-full"
      />
    </template>

    <template #right v-if="facts && facts.length">
      <div class="relative flex" style="flex-wrap: nowrap; flex: 1; height: 40rem">
        <template v-for="(fact, index) in facts" :key="fact">
          <transition name="slide-fade" mode="out-in">
            <FariCard
              v-if="cardIndex == index"
              @close="cardIndex++"
              :title="fact.title"
              height="40rem"
              dismissable
              class="absolute"
            >
              <template #content>
                <div class="flex flex-column content-center align-center w-full">
                  <p class="mb-base">{{ fact.content }}</p>
                  <iframe
                    width="560"
                    height="280"
                    src="https://www.youtube.com/embed/NS3BH1Q5HT8?si=l2xfHXZ6Tu8HuWSa"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </template>
              <template #actions>
                <FariButton
                  label="previous"
                  type="secondary"
                  :disabled="cardIndex === 0"
                  @click="cardIndex--"
                  class="mr-medium"
                />
                <FariButton
                  label="next"
                  :disabled="cardIndex === facts.length - 1"
                  @click="cardIndex++"
                />
              </template>
            </FariCard>
          </transition>
        </template>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import FariCard from '@/components/FariCard.vue'
import FariButton from '@/components/FariButton.vue'
import ContactForm from '@/components/form/ContactForm.vue'
import FariBot from '@/components/bot/FariBot.vue'
import Layout from '@/layout/BaseLayout.vue'

import { useOpenAIStore } from '@/stores/openAI'

const { getChatResponse, initChat } = useOpenAIStore()
const { messages, code, voiceMessage, loading, facts } = storeToRefs(useOpenAIStore())

const postPessage = async (message: string) => await getChatResponse(message)

const cardIndex = ref(0)

onMounted(initChat)
</script>
<style scoped lang="scss">
@use '@/assets/variables/spacings.scss' as s;

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s ease;
}

.slide-fade-enter-from {
  transform: translateY(200px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-200px);
  opacity: 0;
}

.slot-wrapper {
  flex: 1 0 0%;
  &:not(.center-slot) {
    margin-bottom: s.$base;
  }
}
</style>
