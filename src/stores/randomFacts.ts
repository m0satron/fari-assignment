import { COMMANDS } from './commands'
import type { Command, Message } from '@/types/Chat'

const createRandomFactsCommand = ({ subjects }: Command) =>
  `I want 3 random facts about related to, or about, I want a title for every fact. 
  
  Structure it like this:
  [
    { title: // the title of the fact, content: // the actual facts }
    // the other 2 facts should also be in this array
  ]

  here are the subjects:
  ${subjects}`

const randomFacts = COMMANDS.map(createRandomFactsCommand)

export const facts: Message[] = [
  {
    role: 'system',
    content: `You are a helpful assistant that is an expert in FARI institute in Brussels.
    You should provide the user with all info about FARI, stick to a maximum of 680 characters. 
      ${randomFacts}`
  }
] as const
