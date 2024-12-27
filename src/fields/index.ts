import type { RichTextField, RichTextFieldProperty } from '@/fields/rich-text'
import type { RelationField, RelationFieldCondition } from './relation'
import type { SelectField, SelectFieldCondition, SelectFieldProperty } from './select'
import type { TextField, TextFieldCondition, TextFieldProperty } from './text'

export { TextField } from './text'
export { SelectField } from './select'
export { RelationField } from './relation'
export { RichTextField } from './rich-text'

export type FindCriteria<T> = {
  where:
    | Condition<T[keyof T]>
    | { and: Array<Condition<T[keyof T]>> }
    | { or: Array<Condition<T[keyof T]>> }
}
export type Condition<T> = T extends TextField | RichTextField
  ? TextFieldCondition
  : T extends RelationField
    ? RelationFieldCondition
    : T extends SelectField
      ? SelectFieldCondition
      : never

type ExcludedKeys = 'id' | 'save' | 'findBy'
export type SaveCriteria<T> = {
  properties: {
    [K in keyof T as K extends ExcludedKeys ? never : K]?: T[K] extends TextField
      ? TextFieldProperty
      : T[K] extends RichTextField
        ? RichTextFieldProperty
        : T[K] extends SelectField
          ? SelectFieldProperty
          : never
  }
}

// id: never;   Name: TextFieldProperty;   findBy: never;   save: never;
