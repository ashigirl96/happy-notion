import type { Client } from '@notionhq/client'
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import {
  MultiSelectField,
  type MultiSelectFieldCondition,
  type MultiSelectFieldProperty,
} from './multi-select'
import { RelationField, type RelationFieldCondition } from './relation'
import { RichTextField, type RichTextFieldProperty } from './rich-text'
import { SelectField, type SelectFieldCondition, type SelectFieldProperty } from './select'
import { TextField, type TextFieldCondition, type TextFieldProperty } from './text'
import { UrlField, type UrlFieldProperty } from './url'

export { TextField } from './text'
export { SelectField } from './select'
export { RelationField } from './relation'
export { RichTextField } from './rich-text'
export { UrlField } from './url'
export { MultiSelectField } from './multi-select'

export type FindCriteria<T> = {
  where:
    | Condition<T[keyof T]>
    | { and: Array<Condition<T[keyof T]>> }
    | { or: Array<Condition<T[keyof T]>> }
}
export type Condition<T> = T extends TextField | RichTextField | UrlField
  ? TextFieldCondition
  : T extends RelationField
    ? RelationFieldCondition
    : T extends SelectField
      ? SelectFieldCondition
      : T extends MultiSelectField
        ? MultiSelectFieldCondition
        : never

type ExcludedKeys = 'id' | 'save' | 'findBy'
export type BlockObjectRequest = Exclude<CreatePageParameters['children'], undefined>[0]
export type SaveCriteria<T> = {
  update?: {
    pageId: string
    isAppendChildren: (client: Client) => Promise<boolean>
  }
  emoji?: Extract<CreatePageParameters['icon'], { type?: 'emoji' }>['emoji']
  children?: BlockObjectRequest[]
  properties: {
    [K in keyof T as K extends ExcludedKeys ? never : K]?: T[K] extends TextField
      ? TextFieldProperty
      : T[K] extends RichTextField
        ? RichTextFieldProperty
        : T[K] extends SelectField
          ? SelectFieldProperty
          : T[K] extends UrlField
            ? UrlFieldProperty
            : T[K] extends MultiSelectField
              ? MultiSelectFieldProperty
              : never
  }
}

export const RawField = {
  relation: RelationField.name,
  title: TextField.name,
  multi_select: MultiSelectField.name,
  select: SelectField.name,
  url: UrlField.name,
  rich_text: RichTextField.name,
}
export type RawField = typeof RawField

// id: never;   Name: TextFieldProperty;   findBy: never;   save: never;
console.log(RawField)
