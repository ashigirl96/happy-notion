import { generateClasses } from '@/generate/generateClass'
import type { MappedConfig, NotionConfig } from '@/types'
import { Client } from '@notionhq/client'

export async function main(raw: NotionConfig, evaluated: NotionConfig) {
  const mapped = mapConfig(raw, evaluated)
  await generateClasses(mapped)
}

function mapConfig(raw: NotionConfig, evaluated: NotionConfig): MappedConfig {
  return {
    databases: Object.fromEntries(
      Object.entries(raw.databases).map(([key, value]) => [
        key,
        {
          raw: value,
          evaluated: evaluated.databases[key],
        },
      ]),
    ),
    client: new Client({ auth: evaluated.apiKey }),
  }
}
