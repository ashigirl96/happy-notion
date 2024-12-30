import { BaseField } from '@/fields/base'
import { richText } from '@/fields/notion-sdk-js-helper/richTextObject'
import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export type TextFieldProperty = {
  title: TextRichTextItemResponse[]
}
export type TextFieldEquals = {
  property: string
  title: {
    equals: string
  }
}
export type TextFieldDoesNotEqual = {
  property: string
  title: {
    does_not_equal: string
  }
}
export type TextFieldContains = {
  property: string
  title: {
    contains: string
  }
}
export type TextFieldDoesNotContain = {
  property: string
  title: {
    does_not_contain: string
  }
}
export type TextFieldStartsWith = {
  property: string
  title: {
    starts_with: string
  }
}
export type TextFieldEndsWith = {
  property: string
  title: {
    ends_with: string
  }
}
export type TextFieldIsEmpty = {
  property: string
  title: {
    is_empty: true
  }
}
export type TextFieldIsNotEmpty = {
  property: string
  title: {
    is_not_empty: true
  }
}

type Fill = Parameters<typeof richText>[0]

export class TextField extends BaseField<TextFieldProperty, Fill> {
  constructor(readonly content: string) {
    super(content)
  }

  fill(value: Fill): TextFieldProperty {
    return {
      title: [richText(value)],
    }
  }

  equals(value: string): TextFieldEquals {
    return {
      property: this.content,
      title: {
        equals: value,
      },
    }
  }

  doesNotEqual(value: string): TextFieldDoesNotEqual {
    return {
      property: this.content,
      title: {
        does_not_equal: value,
      },
    }
  }

  contains(value: string): TextFieldContains {
    return {
      property: this.content,
      title: {
        contains: value,
      },
    }
  }

  doesNotContain(value: string): TextFieldDoesNotContain {
    return {
      property: this.content,
      title: {
        does_not_contain: value,
      },
    }
  }

  startsWith(value: string): TextFieldStartsWith {
    return {
      property: this.content,
      title: {
        starts_with: value,
      },
    }
  }

  endsWith(value: string): TextFieldEndsWith {
    return {
      property: this.content,
      title: {
        ends_with: value,
      },
    }
  }

  isEmpty(): TextFieldIsEmpty {
    return {
      property: this.content,
      title: {
        is_empty: true,
      },
    }
  }

  isNotEmpty(): TextFieldIsNotEmpty {
    return {
      property: this.content,
      title: {
        is_not_empty: true,
      },
    }
  }
}
export type TextFieldCondition =
  | TextFieldEquals
  | TextFieldDoesNotEqual
  | TextFieldContains
  | TextFieldDoesNotContain
  | TextFieldStartsWith
  | TextFieldEndsWith
  | TextFieldIsEmpty
  | TextFieldIsNotEmpty
