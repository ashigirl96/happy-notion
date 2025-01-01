import { BaseField, type FillValue } from '@/fields/base'
import type { AnnotationForRequest } from '@/fields/notion-sdk-js-helper/customTypes'
import { richText } from '@/fields/notion-sdk-js-helper/richTextObject'

export type RichTextFieldEquals = { property: string; rich_text: { equals: string } }
export type RichTextFieldDoesNotEqual = { property: string; rich_text: { does_not_equal: string } }
export type RichTextFieldContains = { property: string; rich_text: { contains: string } }
export type RichTextFieldDoesNotContain = {
  property: string
  rich_text: { does_not_contain: string }
}
export type RichTextFieldStartsWith = { property: string; rich_text: { starts_with: string } }
export type RichTextFieldEndsWith = { property: string; rich_text: { ends_with: string } }
export type RichTextFieldIsEmpty = { property: string; rich_text: { is_empty: true } }
export type RichTextFieldIsNotEmpty = { property: string; rich_text: { is_not_empty: true } }

export class RichTextField extends BaseField<'rich_text'> {
  constructor(readonly property: string) {
    super()
  }

  fill(value: {
    text: string
    annotation?: AnnotationForRequest
    link?: string | undefined
  }): FillValue<'rich_text'> {
    return {
      rich_text: [richText(value)],
    }
  }

  map(filled: FillValue<'rich_text'>): string {
    return filled.rich_text
      .map((v) => {
        return v.type === 'text' ? v.text.content : ''
      })
      .join('')
  }

  equals(value: string): RichTextFieldEquals {
    return { property: this.property, rich_text: { equals: value } }
  }

  doesNotEqual(value: string): RichTextFieldDoesNotEqual {
    return { property: this.property, rich_text: { does_not_equal: value } }
  }

  contains(value: string): RichTextFieldContains {
    return { property: this.property, rich_text: { contains: value } }
  }

  doesNotContain(value: string): RichTextFieldDoesNotContain {
    return { property: this.property, rich_text: { does_not_contain: value } }
  }

  startsWith(value: string): RichTextFieldStartsWith {
    return { property: this.property, rich_text: { starts_with: value } }
  }

  endsWith(value: string): RichTextFieldEndsWith {
    return { property: this.property, rich_text: { ends_with: value } }
  }

  isEmpty(): RichTextFieldIsEmpty {
    return { property: this.property, rich_text: { is_empty: true } }
  }

  isNotEmpty(): RichTextFieldIsNotEmpty {
    return { property: this.property, rich_text: { is_not_empty: true } }
  }
}

export type RichTextFieldCondition =
  | RichTextFieldEquals
  | RichTextFieldDoesNotEqual
  | RichTextFieldContains
  | RichTextFieldDoesNotContain
  | RichTextFieldStartsWith
  | RichTextFieldEndsWith
  | RichTextFieldIsEmpty
  | RichTextFieldIsNotEmpty
