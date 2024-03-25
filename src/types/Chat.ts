export type Role = 'user' | 'system' | 'assistant'
export type Content = string

export interface Message {
  role: Role
  content: Content
}

export interface Command {
  readonly subjects: string
  readonly code: number
}
