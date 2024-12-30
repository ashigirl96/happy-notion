import { BaseField, type FillValue } from '@/fields/base'

export type EmailFieldEquals = { property: string; email: { equals: string } }
export type EmailFieldDoesNotEqual = { property: string; email: { does_not_equal: string } }
export type EmailFieldContains = { property: string; email: { contains: string } }
export type EmailFieldDoesNotContain = { property: string; email: { does_not_contain: string } }
export type EmailFieldStartsWith = { property: string; email: { starts_with: string } }
export type EmailFieldEndsWith = { property: string; email: { ends_with: string } }

export class EmailField extends BaseField<'email'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'email'> {
    return { email: value }
  }

  equals(value: string): EmailFieldEquals {
    return { property: this.property, email: { equals: value } }
  }

  doesNotEqual(value: string): EmailFieldDoesNotEqual {
    return { property: this.property, email: { does_not_equal: value } }
  }

  contains(value: string): EmailFieldContains {
    return { property: this.property, email: { contains: value } }
  }

  doesNotContain(value: string): EmailFieldDoesNotContain {
    return { property: this.property, email: { does_not_contain: value } }
  }

  startsWith(value: string): EmailFieldStartsWith {
    return { property: this.property, email: { starts_with: value } }
  }

  endsWith(value: string): EmailFieldEndsWith {
    return { property: this.property, email: { ends_with: value } }
  }
}

export type EmailFieldCondition =
  | EmailFieldEquals
  | EmailFieldDoesNotEqual
  | EmailFieldContains
  | EmailFieldDoesNotContain
  | EmailFieldStartsWith
  | EmailFieldEndsWith
