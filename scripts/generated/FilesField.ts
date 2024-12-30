import { BaseField, type FillValue } from '@/fields/base'

export type FilesFieldIsEmpty = { property: string; files: { is_empty: true } }
export type FilesFieldIsNotEmpty = { property: string; files: { is_not_empty: true } }

export class FilesField extends BaseField<'files'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: unknown): FillValue<'files'> {
    return { files: value }
  }

  isEmpty(): FilesFieldIsEmpty {
    return { property: this.property, files: { is_empty: true } }
  }

  isNotEmpty(): FilesFieldIsNotEmpty {
    return { property: this.property, files: { is_not_empty: true } }
  }
}

export type FilesFieldCondition = FilesFieldIsEmpty | FilesFieldIsNotEmpty
