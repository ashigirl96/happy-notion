import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'

type Kind = CreatePageParameters['properties'] extends Record<string, infer U>
  ? U extends { type?: infer V }
    ? V extends string
      ? V
      : never
    : never
  : never

export type FillValue<T> = CreatePageParameters['properties'] extends Record<string, infer U>
  ? U extends { type?: T }
    ? U
    : never
  : never

// export type MapValue = CreatePageParameters['properties'] extends Record<string, infer U>
//   ? U extends { type?: Kind }
//   : never
type MapValue = CreatePageParameters['properties'] extends Record<string, infer U>
  ? U extends { type?: string }
    ? U
    : never
  : never

export abstract class BaseField<K extends Kind> {
  protected constructor() {}

  abstract fill(value: unknown): FillValue<K>

  map(value: MapValue) {
    switch (value.type) {
      case 'checkbox': {
        return Boolean(value.checkbox)
      }
      case 'date': {
        return new Date(value.date.start)
      }
      case 'email': {
        return value.email
      }
      case 'multi_select': {
        return value.multi_select.map((v) => v.name)
      }
      case 'number': {
        return value.number
      }
      case 'people': {
        // TODO: never check
        return value.people.map((v) => v.id)
      }
      case 'phone_number': {
        // TODO: never check
        return value.phone_number
      }
      case 'relation': {
        return value.relation.map((v) => v.id)
      }
      case 'rich_text': {
        return value.rich_text
          .map((v) => {
            return v.type === 'text' ? v.text.content : ''
          })
          .join('')
      }
      case 'select': {
        return value.select.name
      }
      case 'status': {
        return value.status.name
      }
      case 'title': {
        return value.title
          .map((v) => {
            return v.type === 'text' ? v.text.content : ''
          })
          .join('')
      }
      case 'url': {
        return value.url
      }
      default:
        return null
    }
  }
}
