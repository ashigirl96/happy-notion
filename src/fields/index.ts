import type { RichTextField, RichTextFieldProperty } from '@/fields/rich-text'
import type { UrlField, UrlFieldProperty } from '@/fields/url'
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import type {
  MultiSelectField,
  MultiSelectFieldCondition,
  MultiSelectFieldProperty,
} from './multi-select'
import type { RelationField, RelationFieldCondition } from './relation'
import type { SelectField, SelectFieldCondition, SelectFieldProperty } from './select'
import type { TextField, TextFieldCondition, TextFieldProperty } from './text'

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

// id: never;   Name: TextFieldProperty;   findBy: never;   save: never;
