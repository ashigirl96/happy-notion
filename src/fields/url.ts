import { BaseField, type FillValue } from '@/fields/base'

export type UrlFieldEquals = { property: string; url: { equals: string } }
export type UrlFieldDoesNotEqual = { property: string; url: { does_not_equal: string } }
export type UrlFieldContains = { property: string; url: { contains: string } }
export type UrlFieldDoesNotContain = { property: string; url: { does_not_contain: string } }
export type UrlFieldStartsWith = { property: string; url: { starts_with: string } }
export type UrlFieldEndsWith = { property: string; url: { ends_with: string } }
export type UrlFieldIsEmpty = { property: string; url: { is_empty: true } }
export type UrlFieldIsNotEmpty = { property: string; url: { is_not_empty: true } }

export class UrlField extends BaseField<'url'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: string): FillValue<'url'> {
    return { url: value }
  }

  map(filled: FillValue<'url'>): string | null {
    return filled.url
  }

  equals(value: string): UrlFieldEquals {
    return { property: this.property, url: { equals: value } }
  }

  doesNotEqual(value: string): UrlFieldDoesNotEqual {
    return { property: this.property, url: { does_not_equal: value } }
  }

  contains(value: string): UrlFieldContains {
    return { property: this.property, url: { contains: value } }
  }

  doesNotContain(value: string): UrlFieldDoesNotContain {
    return { property: this.property, url: { does_not_contain: value } }
  }

  startsWith(value: string): UrlFieldStartsWith {
    return { property: this.property, url: { starts_with: value } }
  }

  endsWith(value: string): UrlFieldEndsWith {
    return { property: this.property, url: { ends_with: value } }
  }

  isEmpty(): UrlFieldIsEmpty {
    return { property: this.property, url: { is_empty: true } }
  }

  isNotEmpty(): UrlFieldIsNotEmpty {
    return { property: this.property, url: { is_not_empty: true } }
  }
}

export type UrlFieldCondition =
  | UrlFieldEquals
  | UrlFieldDoesNotEqual
  | UrlFieldContains
  | UrlFieldDoesNotContain
  | UrlFieldStartsWith
  | UrlFieldEndsWith
  | UrlFieldIsEmpty
  | UrlFieldIsNotEmpty
