import { BaseField, type FillValue } from '@/fields/base'

export type CreatedTimeFieldEquals = { property: string; created_time: { equals: string } }
export type CreatedTimeFieldBefore = { property: string; created_time: { before: string } }
export type CreatedTimeFieldAfter = { property: string; created_time: { after: string } }
export type CreatedTimeFieldOnOrBefore = {
  property: string
  created_time: { on_or_before: string }
}
export type CreatedTimeFieldOnOrAfter = { property: string; created_time: { on_or_after: string } }
export type CreatedTimeFieldIsEmpty = { property: string; created_time: { is_empty: true } }
export type CreatedTimeFieldIsNotEmpty = { property: string; created_time: { is_not_empty: true } }

export class CreatedTimeField extends BaseField<'created_time'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'created_time'> {
    return { created_time: value }
  }

  equals(value: string): CreatedTimeFieldEquals {
    return { property: this.property, created_time: { equals: value } }
  }

  before(value: string): CreatedTimeFieldBefore {
    return { property: this.property, created_time: { before: value } }
  }

  after(value: string): CreatedTimeFieldAfter {
    return { property: this.property, created_time: { after: value } }
  }

  onOrBefore(value: string): CreatedTimeFieldOnOrBefore {
    return { property: this.property, created_time: { on_or_before: value } }
  }

  onOrAfter(value: string): CreatedTimeFieldOnOrAfter {
    return { property: this.property, created_time: { on_or_after: value } }
  }

  isEmpty(): CreatedTimeFieldIsEmpty {
    return { property: this.property, created_time: { is_empty: true } }
  }

  isNotEmpty(): CreatedTimeFieldIsNotEmpty {
    return { property: this.property, created_time: { is_not_empty: true } }
  }
}

export type CreatedTimeFieldCondition =
  | CreatedTimeFieldEquals
  | CreatedTimeFieldBefore
  | CreatedTimeFieldAfter
  | CreatedTimeFieldOnOrBefore
  | CreatedTimeFieldOnOrAfter
  | CreatedTimeFieldIsEmpty
  | CreatedTimeFieldIsNotEmpty
