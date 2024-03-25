import type { Command } from '@/types/Chat'

export const COMMANDS: Command[] = [
  {
    subjects: 'the staff, the people working there, the team',
    code: 2
  },
  {
    subjects: 'the mission or goal of FARI',
    code: 3
  },
  {
    subjects: 'when FARI was founded',
    code: 4
  },
  {
    subjects: 'contacting, reaching out, getting in touch',
    code: 5
  },
  {
    subjects: 'anything else',
    code: 1
  }
] as const
