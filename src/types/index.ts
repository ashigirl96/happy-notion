import { z } from 'zod'

export const notionConfig = z.object({
  databases: z.record(z.string()),
  apiKey: z.string(),
})

export type NotionConfig = z.infer<typeof notionConfig>
