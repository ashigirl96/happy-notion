import { BaseField, type FillValue } from '@/fields/base'

export type LastEditedByFieldContains = { property: string; last_edited_by: { contains: string } }
export type LastEditedByFieldDoesNotContain = {
  property: string
  last_edited_by: { does_not_contain: string }
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
}

export type LastEditedByFieldCondition = LastEditedByFieldContains | LastEditedByFieldDoesNotContain
