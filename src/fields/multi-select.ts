import { BaseField, type FillValue } from '@/fields/base'

export type MultiSelectFieldContains = { property: string; multi_select: { contains: string } }
export type MultiSelectFieldDoesNotContain = {
  property: string
  multi_select: { does_not_contain: string }
}
export type MultiSelectFieldIsEmpty = { property: string; multi_select: { is_empty: true } }
export type MultiSelectFieldIsNotEmpty = { property: string; multi_select: { is_not_empty: true } }

export class MultiSelectField extends BaseField<'multi_select'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: string[]): FillValue<'multi_select'> {
    return {
      multi_select: value.map((v) => ({
        name: v,
      })),
    }
  }

  map(filled: FillValue<'multi_select'>): string[] {
    return filled.multi_select.map((v) => v.name)
  }

  contains(value: string): MultiSelectFieldContains {
    return { property: this.property, multi_select: { contains: value } }
  }

  doesNotContain(value: string): MultiSelectFieldDoesNotContain {
    return { property: this.property, multi_select: { does_not_contain: value } }
  }

  isEmpty(): MultiSelectFieldIsEmpty {
    return { property: this.property, multi_select: { is_empty: true } }
  }

  isNotEmpty(): MultiSelectFieldIsNotEmpty {
    return { property: this.property, multi_select: { is_not_empty: true } }
  }
}

export type MultiSelectFieldCondition =
  | MultiSelectFieldContains
  | MultiSelectFieldDoesNotContain
  | MultiSelectFieldIsEmpty
  | MultiSelectFieldIsNotEmpty
