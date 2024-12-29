import type { Client } from '@notionhq/client'
import { z } from 'zod'

export const notionConfig = z.object({
  databases: z.record(z.string()),
  apiKey: z.string(),
})

export type NotionConfig = z.input<typeof notionConfig>

export const mappedConfig = z.object({
  databases: z.record(
    z.object({
      raw: z.string(),
      evaluated: z.string(),
    }),
  ),
  apiKey: z.string(),
})
export type MappedConfig = {
  databases: Record<string, { raw: string; evaluated: string }>
  client: Client
}
