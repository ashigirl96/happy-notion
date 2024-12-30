import { BaseField, type FillValue } from '@/fields/base'

export type TitleFieldEquals = { property: string; title: { equals: string } }
export type TitleFieldDoesNotEqual = { property: string; title: { does_not_equal: string } }
export type TitleFieldContains = { property: string; title: { contains: string } }
export type TitleFieldDoesNotContain = { property: string; title: { does_not_contain: string } }
export type TitleFieldStartsWith = { property: string; title: { starts_with: string } }
export type TitleFieldEndsWith = { property: string; title: { ends_with: string } }

export class TitleField extends BaseField<'title'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'title'> {
    return { title: value }
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
}

export type TitleFieldCondition =
  | TitleFieldEquals
  | TitleFieldDoesNotEqual
  | TitleFieldContains
  | TitleFieldDoesNotContain
  | TitleFieldStartsWith
  | TitleFieldEndsWith
