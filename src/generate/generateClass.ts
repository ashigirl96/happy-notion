import { RawField } from '@/fields'
import { addClass } from '@/generate/addClass'
import type { MappedConfig } from '@/types'
import type { SourceFile } from 'ts-morph'

export async function generateClasses(sourceFile: SourceFile, mappedConfig: MappedConfig) {
  for (const [className, { raw: envVar, evaluated: databaseId }] of Object.entries(
    mappedConfig.databases,
  )) {
    const response = await mappedConfig.client.databases.retrieve({ database_id: databaseId })
    const fields = Object.values(response.properties).map((value) => {
      if ('type' in value) {
        return {
          name: value.name,
          type: RawField[value.type as keyof RawField],
        }
      }
    })

    addClass(sourceFile, {
      className,
      envVar,
      fields,
    })
    // console.log(`Retrieved database ${JSON.stringify(response.properties, null, 2)}`)
  }
}
