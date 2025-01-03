import type { NotionConfig } from '../src'

export const config: NotionConfig = {
  databases: {
    Tasks: process.env.TASK_DATABASE_ID ?? '',
    Epic: process.env.EPIC_DATABASE_ID ?? '',
    Category: process.env.CATEGORY_DATABASE_ID ?? '',
  },
  apiKey: process.env.NOTION_TOKEN ?? '',
}
