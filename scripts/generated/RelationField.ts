import { BaseField, type FillValue } from '@/fields/base'

export type RelationFieldContains = { property: string; relation: { contains: string } }
export type RelationFieldDoesNotContain = {
  property: string
  relation: { does_not_contain: string }
}
export type RelationFieldIsEmpty = { property: string; relation: { is_empty: true } }
export type RelationFieldIsNotEmpty = { property: string; relation: { is_not_empty: true } }

export class RelationField extends BaseField<'relation'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'relation'> {
    return { relation: value }
  }

  contains(value: string): RelationFieldContains {
    return { property: this.property, relation: { contains: value } }
  }

  doesNotContain(value: string): RelationFieldDoesNotContain {
    return { property: this.property, relation: { does_not_contain: value } }
  }

  isEmpty(): RelationFieldIsEmpty {
    return { property: this.property, relation: { is_empty: true } }
  }

  isNotEmpty(): RelationFieldIsNotEmpty {
    return { property: this.property, relation: { is_not_empty: true } }
  }
}

export type RelationFieldCondition =
  | RelationFieldContains
  | RelationFieldDoesNotContain
  | RelationFieldIsEmpty
  | RelationFieldIsNotEmpty
