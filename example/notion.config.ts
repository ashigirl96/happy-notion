import type { NotionConfig } from '../src'

const config: NotionConfig = {
  databases: {
    Tasks: process.env.DATABASE1_ID ?? '',
    Projects: process.env.DATABASE2_ID ?? '',
    User: process.env.DATABASE3_ID ?? '',
  },
  apiKey: process.env.NOTION_TOKEN ?? '',
}

export default config
