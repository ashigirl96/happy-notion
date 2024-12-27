import { TextField } from '@/fields/text'

export type UrlFieldProperty = {
  url: string | null
}

export class UrlField extends TextField {
  constructor(readonly content: string) {
    super(content)
  }

  // TODO: 後で直す
  // @ts-ignore
  override property(value: string): UrlFieldProperty {
    return {
      url: value,
    }
  }
}
