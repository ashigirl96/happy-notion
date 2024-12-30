import { BaseField, type FillValue } from '@/fields/base'

export type CreatedByFieldContains = { property: string; created_by: { contains: string } }
export type CreatedByFieldDoesNotContain = {
  property: string
  created_by: { does_not_contain: string }
}
export type CreatedByFieldIsEmpty = { property: string; created_by: { is_empty: true } }
export type CreatedByFieldIsNotEmpty = { property: string; created_by: { is_not_empty: true } }

export class CreatedByField extends BaseField<'created_by'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'created_by'> {
    return { created_by: value }
  }

  contains(value: string): CreatedByFieldContains {
    return { property: this.property, created_by: { contains: value } }
  }

  doesNotContain(value: string): CreatedByFieldDoesNotContain {
    return { property: this.property, created_by: { does_not_contain: value } }
  }

  isEmpty(): CreatedByFieldIsEmpty {
    return { property: this.property, created_by: { is_empty: true } }
  }

  isNotEmpty(): CreatedByFieldIsNotEmpty {
    return { property: this.property, created_by: { is_not_empty: true } }
  }
}

export type CreatedByFieldCondition =
  | CreatedByFieldContains
  | CreatedByFieldDoesNotContain
  | CreatedByFieldIsEmpty
  | CreatedByFieldIsNotEmpty
