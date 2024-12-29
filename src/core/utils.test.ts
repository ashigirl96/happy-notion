import { describe, expect, it } from 'bun:test'
import { toNotionURL } from './utils'

describe('utils', () => {
  it('toNotionURL', () => {
    const url = toNotionURL('abcd-efgh')
    expect(url).toBe('https://www.notion.so/abcdefgh')
  })
})
