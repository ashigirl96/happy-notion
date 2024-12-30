import { BaseField, type FillValue } from '@/fields/base'

export class FormulaField extends BaseField<'formula'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'formula'> {
    return { formula: value }
  }
}
