import { BaseField, type FillValue } from '@/fields/base'

export type LastEditedByFieldContains = { property: string; last_edited_by: { contains: string } }
export type LastEditedByFieldDoesNotContain = {
  property: string
  last_edited_by: { does_not_contain: string }
}
export type LastEditedByFieldIsEmpty = { property: string; last_edited_by: { is_empty: true } }
export type LastEditedByFieldIsNotEmpty = {
  property: string
  last_edited_by: { is_not_empty: true }
}

export class LastEditedByField extends BaseField<'last_edited_by'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'last_edited_by'> {
    return { last_edited_by: value }
  }

  contains(value: string): LastEditedByFieldContains {
    return { property: this.property, last_edited_by: { contains: value } }
  }

  doesNotContain(value: string): LastEditedByFieldDoesNotContain {
    return { property: this.property, last_edited_by: { does_not_contain: value } }
  }

  isEmpty(): LastEditedByFieldIsEmpty {
    return { property: this.property, last_edited_by: { is_empty: true } }
  }

  isNotEmpty(): LastEditedByFieldIsNotEmpty {
    return { property: this.property, last_edited_by: { is_not_empty: true } }
  }
}

export type LastEditedByFieldCondition =
  | LastEditedByFieldContains
  | LastEditedByFieldDoesNotContain
  | LastEditedByFieldIsEmpty
  | LastEditedByFieldIsNotEmpty
