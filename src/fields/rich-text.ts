import { TextField } from '@/fields/text'

export type RichTextFieldProperty = {
  rich_text: {
    text: {
      content: string
    }
  }[]
}

export class RichTextField extends TextField {
  constructor(readonly content: string) {
    super(content)
  }

  // TODO: 後で直す
  // @ts-ignore
  override property(value: string): RichTextFieldProperty {
    return {
      rich_text: [
        {
          text: {
            content: value,
          },
        },
      ],
    }
  }
}
