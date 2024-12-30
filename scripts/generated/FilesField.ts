import { BaseField, type FillValue } from '@/fields/base'

export class FilesField extends BaseField<'files'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'files'> {
    return { files: value }
  }
}
