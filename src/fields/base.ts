import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'

type Kind = CreatePageParameters['properties'] extends Record<string, infer U>
  ? U extends { type?: infer V }
    ? V extends string
      ? V
      : never
    : never
  : never

type Value<T> = CreatePageParameters['properties'] extends Record<string, infer U>
  ? U extends { type?: T }
    ? U
    : never
  : never

export abstract class BaseField<K extends Kind> {
  protected constructor() {}

  abstract fill(value: unknown): Value<K>
}
