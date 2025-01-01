import { BaseField, type FillValue } from '@/fields/base'

export type StatusFieldEquals = { property: string; status: { equals: string } }
export type StatusFieldDoesNotEqual = { property: string; status: { does_not_equal: string } }
export type StatusFieldIsEmpty = { property: string; status: { is_empty: true } }
export type StatusFieldIsNotEmpty = { property: string; status: { is_not_empty: true } }

export class StatusField extends BaseField<'status'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: string): FillValue<'status'> {
    return {
      status: {
        name: value,
      },
    }
  }

  map(filled: FillValue<'status'>): string {
    return filled.status.name
  }

  equals(value: string): StatusFieldEquals {
    return { property: this.property, status: { equals: value } }
  }

  doesNotEqual(value: string): StatusFieldDoesNotEqual {
    return { property: this.property, status: { does_not_equal: value } }
  }

  isEmpty(): StatusFieldIsEmpty {
    return { property: this.property, status: { is_empty: true } }
  }

  isNotEmpty(): StatusFieldIsNotEmpty {
    return { property: this.property, status: { is_not_empty: true } }
  }
}

export type StatusFieldCondition =
  | StatusFieldEquals
  | StatusFieldDoesNotEqual
  | StatusFieldIsEmpty
  | StatusFieldIsNotEmpty
