import type { MappedConfig } from '@/types'

export async function generateClasses(mappedConfig: MappedConfig) {
  for (const [_databaseName, { evaluated: databaseId }] of Object.entries(mappedConfig.databases)) {
    const response = await mappedConfig.client.databases.retrieve({ database_id: databaseId })
    console.log(`Retrieved database ${JSON.stringify(response.properties, null, 2)}`)
  }
}
