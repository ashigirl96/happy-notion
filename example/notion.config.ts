import type { NotionConfig } from '../src'

export const config: NotionConfig = {
  databases: {
    Tasks: process.env.DATABASE1_ID ?? '',
  },
  apiKey: process.env.NOTION_TOKEN ?? '',
}
