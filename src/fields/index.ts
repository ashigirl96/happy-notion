import type { RelationField, RelationFieldCondition } from './relation'
import type { TextField, TextFieldCondition } from './text'

export { TextField } from './text'
export { RelationField } from './relation'

export type FindCriteria<T> = {
  where:
    | Condition<T[keyof T]>
    | { and: Array<Condition<T[keyof T]>> }
    | { or: Array<Condition<T[keyof T]>> }
}
export type Condition<T> = T extends TextField
  ? TextFieldCondition
  : T extends RelationField
    ? RelationFieldCondition
    : never
