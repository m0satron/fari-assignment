import type { Message, Command } from '@/types/Chat'
import { COMMANDS } from './commands'

const createCommand = ({ subjects, code }: Command) =>
  `If they ask anything related to, or about ${subjects} answer as you normally should, but end the message with this: { code: ${code} }`

const commands = COMMANDS.map(createCommand).join('\n - ')

export const messages: Message[] = [
  {
    role: 'system',
    content: `You are a helpful assistant that is an expert in FARI institute in Brussels. 
    Your introductory message should be welcoming and inviting the user to chat with you.
      You should provide the user with all info about FARI, but stick to at most 120 characters. 
      ${commands}`
  }
]
