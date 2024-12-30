import { BaseField, type FillValue } from '@/fields/base'

export type LastEditedTimeFieldEquals = { property: string; last_edited_time: { equals: string } }
export type LastEditedTimeFieldBefore = { property: string; last_edited_time: { before: string } }
export type LastEditedTimeFieldAfter = { property: string; last_edited_time: { after: string } }
export type LastEditedTimeFieldOnOrBefore = {
  property: string
  last_edited_time: { on_or_before: string }
}
export type LastEditedTimeFieldOnOrAfter = {
  property: string
  last_edited_time: { on_or_after: string }
}
export type LastEditedTimeFieldIsEmpty = { property: string; last_edited_time: { is_empty: true } }
export type LastEditedTimeFieldIsNotEmpty = {
  property: string
  last_edited_time: { is_not_empty: true }
}

export class LastEditedTimeField extends BaseField<'last_edited_time'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'last_edited_time'> {
    return { last_edited_time: value }
  }

  equals(value: string): LastEditedTimeFieldEquals {
    return { property: this.property, last_edited_time: { equals: value } }
  }

  before(value: string): LastEditedTimeFieldBefore {
    return { property: this.property, last_edited_time: { before: value } }
  }

  after(value: string): LastEditedTimeFieldAfter {
    return { property: this.property, last_edited_time: { after: value } }
  }

  onOrBefore(value: string): LastEditedTimeFieldOnOrBefore {
    return { property: this.property, last_edited_time: { on_or_before: value } }
  }

  onOrAfter(value: string): LastEditedTimeFieldOnOrAfter {
    return { property: this.property, last_edited_time: { on_or_after: value } }
  }

  isEmpty(): LastEditedTimeFieldIsEmpty {
    return { property: this.property, last_edited_time: { is_empty: true } }
  }

  isNotEmpty(): LastEditedTimeFieldIsNotEmpty {
    return { property: this.property, last_edited_time: { is_not_empty: true } }
  }
}

export type LastEditedTimeFieldCondition =
  | LastEditedTimeFieldEquals
  | LastEditedTimeFieldBefore
  | LastEditedTimeFieldAfter
  | LastEditedTimeFieldOnOrBefore
  | LastEditedTimeFieldOnOrAfter
  | LastEditedTimeFieldIsEmpty
  | LastEditedTimeFieldIsNotEmpty
