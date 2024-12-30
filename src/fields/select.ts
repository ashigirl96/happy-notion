import { BaseField, type FillValue } from '@/fields/base'

export type SelectFieldEquals = { property: string; select: { equals: string } }
export type SelectFieldDoesNotEqual = { property: string; select: { does_not_equal: string } }
export type SelectFieldIsEmpty = { property: string; select: { is_empty: true } }
export type SelectFieldIsNotEmpty = { property: string; select: { is_not_empty: true } }

export class SelectField extends BaseField<'select'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: string): FillValue<'select'> {
    return {
      select: {
        name: value,
      },
    }
  }

  equals(value: string): SelectFieldEquals {
    return { property: this.property, select: { equals: value } }
  }

  doesNotEqual(value: string): SelectFieldDoesNotEqual {
    return { property: this.property, select: { does_not_equal: value } }
  }

  isEmpty(): SelectFieldIsEmpty {
    return { property: this.property, select: { is_empty: true } }
  }

  isNotEmpty(): SelectFieldIsNotEmpty {
    return { property: this.property, select: { is_not_empty: true } }
  }
}

export type SelectFieldCondition =
  | SelectFieldEquals
  | SelectFieldDoesNotEqual
  | SelectFieldIsEmpty
  | SelectFieldIsNotEmpty
