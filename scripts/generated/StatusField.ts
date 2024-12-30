import { BaseField, type FillValue } from '@/fields/base'

export type StatusFieldEquals = { property: string; status: { equals: string } }
export type StatusFieldDoesNotEqual = { property: string; status: { does_not_equal: string } }

export class StatusField extends BaseField<'status'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'status'> {
    return { status: value }
  }

  equals(value: string): StatusFieldEquals {
    return { property: this.property, status: { equals: value } }
  }

  doesNotEqual(value: string): StatusFieldDoesNotEqual {
    return { property: this.property, status: { does_not_equal: value } }
  }
}

export type StatusFieldCondition = StatusFieldEquals | StatusFieldDoesNotEqual
