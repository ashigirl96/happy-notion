import { BaseField, type FillValue } from '@/fields/base'
import { richText } from './notion-sdk-js-helper'

export type TitleFieldEquals = { property: string; title: { equals: string } }
export type TitleFieldDoesNotEqual = { property: string; title: { does_not_equal: string } }
export type TitleFieldContains = { property: string; title: { contains: string } }
export type TitleFieldDoesNotContain = { property: string; title: { does_not_contain: string } }
export type TitleFieldStartsWith = { property: string; title: { starts_with: string } }
export type TitleFieldEndsWith = { property: string; title: { ends_with: string } }
export type TitleFieldIsEmpty = { property: string; title: { is_empty: true } }
export type TitleFieldIsNotEmpty = { property: string; title: { is_not_empty: true } }

export class TitleField extends BaseField<'title'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: string): FillValue<'title'> {
    return {
      title: [richText({ text: value })],
    }
  }

  equals(value: string): TitleFieldEquals {
    return { property: this.property, title: { equals: value } }
  }

  doesNotEqual(value: string): TitleFieldDoesNotEqual {
    return { property: this.property, title: { does_not_equal: value } }
  }

  contains(value: string): TitleFieldContains {
    return { property: this.property, title: { contains: value } }
  }

  doesNotContain(value: string): TitleFieldDoesNotContain {
    return { property: this.property, title: { does_not_contain: value } }
  }

  startsWith(value: string): TitleFieldStartsWith {
    return { property: this.property, title: { starts_with: value } }
  }

  endsWith(value: string): TitleFieldEndsWith {
    return { property: this.property, title: { ends_with: value } }
  }

  isEmpty(): TitleFieldIsEmpty {
    return { property: this.property, title: { is_empty: true } }
  }

  isNotEmpty(): TitleFieldIsNotEmpty {
    return { property: this.property, title: { is_not_empty: true } }
  }
}

export type TitleFieldCondition =
  | TitleFieldEquals
  | TitleFieldDoesNotEqual
  | TitleFieldContains
  | TitleFieldDoesNotContain
  | TitleFieldStartsWith
  | TitleFieldEndsWith
  | TitleFieldIsEmpty
  | TitleFieldIsNotEmpty
