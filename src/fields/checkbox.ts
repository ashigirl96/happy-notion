import { BaseField, type FillValue } from '@/fields/base'

export type CheckboxFieldEquals = { property: string; checkbox: { equals: boolean } }
export type CheckboxFieldDoesNotEqual = { property: string; checkbox: { does_not_equal: boolean } }

export class CheckboxField extends BaseField<'checkbox'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: boolean): FillValue<'checkbox'> {
    return { checkbox: value }
  }

  equals(value: boolean): CheckboxFieldEquals {
    return { property: this.property, checkbox: { equals: value } }
  }

  doesNotEqual(value: boolean): CheckboxFieldDoesNotEqual {
    return { property: this.property, checkbox: { does_not_equal: value } }
  }
}

export type CheckboxFieldCondition = CheckboxFieldEquals | CheckboxFieldDoesNotEqual
