// Original file: proto/enum.proto

export const Role = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
} as const;

export type Role =
  | 'USER'
  | 0
  | 'ASSISTANT'
  | 1

export type Role__Output = typeof Role[keyof typeof Role]
