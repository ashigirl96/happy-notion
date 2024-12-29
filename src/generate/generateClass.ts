import { addClass } from '@/generate/addClass'
import type { MappedConfig } from '@/types'
import type { SourceFile } from 'ts-morph'

export async function generateClasses(sourceFile: SourceFile, mappedConfig: MappedConfig) {
  for (const [_databaseName, { evaluated: databaseId }] of Object.entries(mappedConfig.databases)) {
    const response = await mappedConfig.client.databases.retrieve({ database_id: databaseId })

    addClass(sourceFile, {
      className: 'Word',
      envVar: 'WORD_DATABASE_ID',
      fields: [
        { name: 'Name', type: 'TextField' },
        { name: 'pronunciation', type: 'RichTextField' },
        { name: 'type', type: 'SelectField' },
        { name: 'ref', type: 'UrlField' },
      ],
    })
    console.log(`Retrieved database ${JSON.stringify(response.properties, null, 2)}`)
  }
}
