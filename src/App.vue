<template>
  <Layout>
    <template #left v-if="code">
      <div>
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
      <div>
        <FariCard
          :title="facts[imageIndex].title"
          :content="facts[imageIndex].content"
          height="40rem"
        >
          <template #actions>
            <FariButton
              label="previous"
              type="secondary"
              @click="imageIndex > 0 && imageIndex--"
              class="mr-medium"
            />
            <FariButton label="next" @click="() => imageIndex <= facts.length && imageIndex++" />
          </template>
        </FariCard>
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

const imageIndex = ref(0)

onMounted(initChat)
</script>
