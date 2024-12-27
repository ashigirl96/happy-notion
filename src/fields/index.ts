import type { RichTextField, RichTextFieldProperty } from '@/fields/rich-text'
import type { RelationField, RelationFieldCondition } from './relation'
import type { TextField, TextFieldCondition, TextFieldProperty } from './text'

export { TextField } from './text'
export { RelationField } from './relation'

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
    : never

// export type SaveCriteria<T> = {
//   properties: {
//     [K in keyof T]: T[K] extends TextField ? TextFieldProperty : never
//   }
// }
type ExcludedKeys = 'id' | 'save' | 'findBy'
export type SaveCriteria<T> = {
  properties: {
    [K in keyof T as K extends ExcludedKeys ? never : K]?: T[K] extends TextField
      ? TextFieldProperty
      : T[K] extends RichTextField
        ? RichTextFieldProperty
        : never
  }
}

// id: never;   Name: TextFieldProperty;   findBy: never;   save: never;
