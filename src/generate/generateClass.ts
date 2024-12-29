import { RawField, RawFieldKeys } from '@/fields'
import { addClass } from '@/generate/addClass'
import type { MappedConfig } from '@/types'
import type { GetDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { SourceFile } from 'ts-morph'

type ResponseProperties = GetDatabaseResponse['properties']
type ResponseProperty = ResponseProperties[keyof ResponseProperties]
export async function generateClasses(sourceFile: SourceFile, mappedConfig: MappedConfig) {
  for (const [className, { raw: envVar, evaluated: databaseId }] of Object.entries(
    mappedConfig.databases,
  )) {
    const response = await mappedConfig.client.databases.retrieve({ database_id: databaseId })
    const fields = Object.values(response.properties)
      .map((value: ResponseProperty) => {
        if (isMappableType(value)) {
          return {
            name: value.name,
            type: RawField[value.type as keyof RawField],
          }
        }
      })
      .filter((value): value is { name: string; type: string } => value !== undefined)

    addClass(sourceFile, {
      className,
      envVar,
      fields,
    })
  }
}

function isMappableType(value: ResponseProperty) {
  return 'type' in value && RawFieldKeys.includes(value.type as keyof RawField)
}
