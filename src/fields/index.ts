import type { AbstractDatabase } from '@/core'
import type { FillValue } from '@/fields/base'
import { CheckboxField, type CheckboxFieldCondition } from '@/fields/checkbox'
import { DateField, type DateFieldCondition } from '@/fields/date'
import { EmailField, type EmailFieldCondition } from '@/fields/email'
import { NumberField, type NumberFieldCondition } from '@/fields/number'
import { PeopleField, type PeopleFieldCondition } from '@/fields/people'
import { StatusField, type StatusFieldCondition } from '@/fields/status'
import { TitleField, type TitleFieldCondition } from '@/fields/title'
import type { Client } from '@notionhq/client'
import type { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { MultiSelectField, type MultiSelectFieldCondition } from './multi-select'
import { RelationField, type RelationFieldCondition } from './relation'
import { RichTextField, type RichTextFieldCondition } from './rich-text'
import { SelectField, type SelectFieldCondition } from './select'
import { UrlField, type UrlFieldCondition } from './url'

export { CheckboxField } from './checkbox'
export { DateField } from './date'
export { EmailField } from './email'
export { NumberField } from './number'
export { PeopleField } from './people'
export { StatusField } from './status'
export { TitleField } from './title'
export { SelectField } from './select'
export { RelationField } from './relation'
export { RichTextField } from './rich-text'
export { UrlField } from './url'
export { MultiSelectField } from './multi-select'

export type FindOptions = {
  isRaw?: boolean
}

export type FindCriteria<T> = {
  where:
    | Condition<T[keyof T]>
    | { and: Array<Condition<T[keyof T]>> }
    | { or: Array<Condition<T[keyof T]>> }
}
export type Condition<T> = T extends CheckboxField
  ? CheckboxFieldCondition
  : T extends DateField
    ? DateFieldCondition
    : T extends EmailField
      ? EmailFieldCondition
      : T extends MultiSelectField
        ? MultiSelectFieldCondition
        : T extends NumberField
          ? NumberFieldCondition
          : T extends PeopleField
            ? PeopleFieldCondition
            : T extends RelationField
              ? RelationFieldCondition
              : T extends RichTextField
                ? RichTextFieldCondition
                : T extends SelectField
                  ? SelectFieldCondition
                  : T extends StatusField
                    ? StatusFieldCondition
                    : T extends TitleField
                      ? TitleFieldCondition
                      : T extends UrlField
                        ? UrlFieldCondition
                        : never

export const RawField = {
  checkbox: CheckboxField.name,
  date: DateField.name,
  email: EmailField.name,
  multi_select: MultiSelectField.name,
  number: NumberField.name,
  people: PeopleField.name,
  relation: RelationField.name,
  rich_text: RichTextField.name,
  select: SelectField.name,
  status: StatusField.name,
  title: TitleField.name,
  url: UrlField.name,
} as const
export type RawField = typeof RawField
// 逆マッピングの定義
type InverseRawField = {
  [K in keyof RawField as RawField[K]]: K
}

// クラス型からクラス名を取得するユーティリティ型
type GetFieldName<F> = F extends { name: infer N }
  ? N extends keyof InverseRawField
    ? N
    : never
  : never

// FillValueForFieldの定義
type FillValueForField<F> = GetFieldName<F> extends keyof InverseRawField
  ? FillValue<InverseRawField[GetFieldName<F>]>
  : never

// プロパティの型定義
type PropertiesType<T, ExcludedKeys> = {
  [K in keyof T as K extends ExcludedKeys ? never : K]?: FillValueForField<T[K]>
}

type ExcludedKeys<T extends AbstractDatabase<any>> = keyof AbstractDatabase<T>
export type BlockObjectRequest = Exclude<CreatePageParameters['children'], undefined>[0]
export type SaveCriteria<T extends AbstractDatabase<any>> = {
  options?: {
    isAppendChildren: (client: Client) => Promise<boolean>
  }
  where?: FindCriteria<T>
  emoji?: Extract<CreatePageParameters['icon'], { type?: 'emoji' }>['emoji']
  children?: BlockObjectRequest[]
  properties: PropertiesType<T, ExcludedKeys<T>>
}

export const RawFieldKeys = Object.keys(RawField) as Array<keyof RawField>
