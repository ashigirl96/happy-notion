import type { NotionConfig } from '@/types'

export function main(raw: NotionConfig, evaluated: NotionConfig) {
  console.log(raw, evaluated)
}
