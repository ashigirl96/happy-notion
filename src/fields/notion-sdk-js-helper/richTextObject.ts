/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2022 Sota Sugiura
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import type { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Annotation, AnnotationForRequest, TextColor } from './customTypes'

export const DEFAULT_COLOR: TextColor = 'default'

// https://developers.notion.com/reference/rich-text
export type RichText = ReturnType<typeof richText>

export const richText = ({
  text,
  link,
  annotation,
}: {
  text: string
  annotation?: AnnotationForRequest
  link?: string | undefined
}): TextRichTextItemResponse => ({
  type: 'text',
  text: {
    content: text,
    link: link === undefined ? null : linkObject(link),
  },
  annotations: {
    ...defaultAnnotation,
    ...annotation,
  },
  plain_text: text,
  href: null,
})

// https://developers.notion.com/reference/rich-text#link-objects
export type LinkObject = Exclude<TextRichTextItemResponse['text']['link'], null>
export const linkObject = (link: string): LinkObject => ({
  url: link,
})

// https://developers.notion.com/reference/rich-text#annotations
export const defaultAnnotation: Annotation = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: 'default',
}

export const annotation = (options: {
  bold?: boolean
  italic?: boolean
  strikethrough?: boolean
  underline?: boolean
  code?: boolean
  color?: TextColor
}): Annotation => ({
  bold: options.bold ?? false,
  italic: options.italic ?? false,
  strikethrough: options.strikethrough ?? false,
  underline: options.underline ?? false,
  code: options.code ?? false,
  color: options.color ?? 'default',
})
