// tests/kebabToCamel.test.ts

import { describe, expect, it } from 'bun:test'
import { kebabToCamel } from './kebabToCamel'

describe('kebabToCamel', () => {
  it('ハイフンで区切られた単語をキャメルケースに変換する', () => {
    expect(kebabToCamel('hello-world')).toBe('helloWorld')
    expect(kebabToCamel('kebab-case-to-camel-case')).toBe('kebabCaseToCamelCase')
    expect(kebabToCamel('singleword')).toBe('singleword') // ハイフンがない場合
  })

  it('空文字列を処理する', () => {
    expect(kebabToCamel('')).toBe('')
  })

  it('複数の連続するハイフンを処理する', () => {
    expect(kebabToCamel('multiple--hyphens')).toBe('multipleHyphens')
  })

  it('大文字を含む文字列を処理する', () => {
    expect(kebabToCamel('hello-World')).toBe('helloWorld')
    expect(kebabToCamel('HELLO-WORLD')).toBe('HELLOWORLD')
  })

  it('数字を含む文字列を処理する', () => {
    expect(kebabToCamel('version-2-0')).toBe('version20')
  })
})
