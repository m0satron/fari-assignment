export type ButtonType = 'primary' | 'secondary'

export interface Button {
  label: string
  type?: 'primary' | 'secondary'
  disabled?: boolean
}
