import { defineStore } from 'pinia'
import type { Message } from '@/types/Chat'
import { facts } from './randomFacts'
import { messages } from './chat'

const transformMessage = (message: string): Message => ({ role: 'user', content: message })

const extractCode = (message: Message) =>
  (message.content.match(/\{ code: (\d+) \}/) || [])[1] || '1'

const removeCode = (message: Message): Message => ({
  role: message.role,
  content: message.content.replace(/\s*\{ code: \d+ \}/, '')
})

interface Fact {
  title: string
  content: string
}

interface OpenAIState {
  code: string | null
  voiceMessage: string
  messages: Message[]
  facts: Fact[]
  loading: boolean
}

function extractObjects(str: string) {
  const regex =
    /{\s*(title:\s*"([^"]*)",\s*content:\s*"([^"]*)"|content:\s*"([^"]*)",\s*title:\s*"([^"]*)")\s*}/g
  let matches
  const results = []

  while ((matches = regex.exec(str)) !== null) {
    const title = matches[2] || matches[5]
    const content = matches[3] || matches[4]
    results.push({ title, content })
  }

  return results
}

export const useOpenAIStore = defineStore('openAIstore', {
  state: (): OpenAIState => ({
    code: null,
    voiceMessage: '',
    messages: messages,
    facts: [],
    loading: false
  }),
  actions: {
    async getChatResponse(message: string) {
      try {
        this.loading = true

        this.messages.push(transformMessage(message))

        const response = await fetch('http://localhost:3001/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ input: this.messages })
        })
        if (!response.ok) throw new Error('Network response was not ok.')
        const data = await response.json()

        this.code = extractCode(data.response.choices[0].message)

        const cleanedMessage = removeCode(data.response.choices[0].message)
        const voiceMessage = await this.getVoice(cleanedMessage.content)

        if (voiceMessage) this.voiceMessage = voiceMessage

        this.messages.push(cleanedMessage)
        this.loading = false

        await this.getRandomFacts(message)

        return data.response.choices[0].message
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    },

    async getRandomFacts(message: string) {
      try {
        const body = JSON.stringify({ input: [...facts, transformMessage(message)] })

        const response = await fetch('http://localhost:3001/random-facts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        })

        if (!response.ok) throw new Error('Network response was not ok.')
        const data = await response.json()

        const extractedFacts = extractObjects(data.response.choices[0].message.content)
        this.facts = extractedFacts

        console.log(extractedFacts)

        return this.facts
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    },

    async getVoice(text: string) {
      try {
        let audioSrc = ''

        const response = await fetch('http://localhost:3001/voice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        })
        const data = await response.json()

        if (data.success) {
          audioSrc = `http://localhost:3001${data.audioPath}`
          return audioSrc
        } else {
          console.error('Failed to fetch TTS audio:', data.message)
        }
      } catch (error) {
        console.error('Error fetching TTS audio:', error)
      }
    },

    async initChat() {
      try {
        const response = await fetch('http://localhost:3001/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ input: this.messages })
        })

        if (!response.ok) throw new Error('Network response was not ok.')

        const data = await response.json()

        const cleanedMessage = removeCode(data.response.choices[0].message)
        this.messages.push(cleanedMessage)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
      }
    }
  }
})
