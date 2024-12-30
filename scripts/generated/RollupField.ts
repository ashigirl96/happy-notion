import { BaseField, type FillValue } from '@/fields/base'

export class RollupField extends BaseField<'rollup'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'rollup'> {
    return { rollup: value }
  }
}
