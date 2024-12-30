import { BaseField, type FillValue } from '@/fields/base'

export type DateFieldEquals = { property: string; date: { equals: string } }
export type DateFieldBefore = { property: string; date: { before: string } }
export type DateFieldAfter = { property: string; date: { after: string } }
export type DateFieldOnOrBefore = { property: string; date: { on_or_before: string } }
export type DateFieldOnOrAfter = { property: string; date: { on_or_after: string } }
export type DateFieldIsEmpty = { property: string; date: { is_empty: true } }
export type DateFieldIsNotEmpty = { property: string; date: { is_not_empty: true } }

export class DateField extends BaseField<'date'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'date'> {
    return { date: value }
  }

  equals(value: string): DateFieldEquals {
    return { property: this.property, date: { equals: value } }
  }

  before(value: string): DateFieldBefore {
    return { property: this.property, date: { before: value } }
  }

  after(value: string): DateFieldAfter {
    return { property: this.property, date: { after: value } }
  }

  onOrBefore(value: string): DateFieldOnOrBefore {
    return { property: this.property, date: { on_or_before: value } }
  }

  onOrAfter(value: string): DateFieldOnOrAfter {
    return { property: this.property, date: { on_or_after: value } }
  }

  isEmpty(): DateFieldIsEmpty {
    return { property: this.property, date: { is_empty: true } }
  }

  isNotEmpty(): DateFieldIsNotEmpty {
    return { property: this.property, date: { is_not_empty: true } }
  }
}

export type DateFieldCondition =
  | DateFieldEquals
  | DateFieldBefore
  | DateFieldAfter
  | DateFieldOnOrBefore
  | DateFieldOnOrAfter
  | DateFieldIsEmpty
  | DateFieldIsNotEmpty
