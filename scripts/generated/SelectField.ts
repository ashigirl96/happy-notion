import { BaseField, type FillValue } from '@/fields/base'

export type SelectFieldEquals = { property: string; select: { equals: string } }
export type SelectFieldDoesNotEqual = { property: string; select: { does_not_equal: string } }

export class SelectField extends BaseField<'select'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'select'> {
    return { select: value }
  }

  equals(value: string): SelectFieldEquals {
    return { property: this.property, select: { equals: value } }
  }

  doesNotEqual(value: string): SelectFieldDoesNotEqual {
    return { property: this.property, select: { does_not_equal: value } }
  }
}

export type SelectFieldCondition = SelectFieldEquals | SelectFieldDoesNotEqual
