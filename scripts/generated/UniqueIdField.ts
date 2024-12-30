import { BaseField, type FillValue } from '@/fields/base'

export type UniqueIdFieldEquals = { property: string; unique_id: { equals: number } }
export type UniqueIdFieldDoesNotEqual = { property: string; unique_id: { does_not_equal: number } }
export type UniqueIdFieldGreaterThan = { property: string; unique_id: { greater_than: number } }
export type UniqueIdFieldLessThan = { property: string; unique_id: { less_than: number } }
export type UniqueIdFieldGreaterThanOrEqualTo = {
  property: string
  unique_id: { greater_than_or_equal_to: number }
}
export type UniqueIdFieldLessThanOrEqualTo = {
  property: string
  unique_id: { less_than_or_equal_to: number }
}
export type UniqueIdFieldIsEmpty = { property: string; unique_id: { is_empty: true } }
export type UniqueIdFieldIsNotEmpty = { property: string; unique_id: { is_not_empty: true } }

export class UniqueIdField extends BaseField<'unique_id'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'unique_id'> {
    return { unique_id: value }
  }

  equals(value: number): UniqueIdFieldEquals {
    return { property: this.property, unique_id: { equals: value } }
  }

  doesNotEqual(value: number): UniqueIdFieldDoesNotEqual {
    return { property: this.property, unique_id: { does_not_equal: value } }
  }

  greaterThan(value: number): UniqueIdFieldGreaterThan {
    return { property: this.property, unique_id: { greater_than: value } }
  }

  lessThan(value: number): UniqueIdFieldLessThan {
    return { property: this.property, unique_id: { less_than: value } }
  }

  greaterThanOrEqualTo(value: number): UniqueIdFieldGreaterThanOrEqualTo {
    return { property: this.property, unique_id: { greater_than_or_equal_to: value } }
  }

  lessThanOrEqualTo(value: number): UniqueIdFieldLessThanOrEqualTo {
    return { property: this.property, unique_id: { less_than_or_equal_to: value } }
  }

  isEmpty(): UniqueIdFieldIsEmpty {
    return { property: this.property, unique_id: { is_empty: true } }
  }

  isNotEmpty(): UniqueIdFieldIsNotEmpty {
    return { property: this.property, unique_id: { is_not_empty: true } }
  }
}

export type UniqueIdFieldCondition =
  | UniqueIdFieldEquals
  | UniqueIdFieldDoesNotEqual
  | UniqueIdFieldGreaterThan
  | UniqueIdFieldLessThan
  | UniqueIdFieldGreaterThanOrEqualTo
  | UniqueIdFieldLessThanOrEqualTo
  | UniqueIdFieldIsEmpty
  | UniqueIdFieldIsNotEmpty
