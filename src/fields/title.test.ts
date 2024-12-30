import { describe, expect, it } from 'bun:test'
import { TitleField } from '@/fields/title'

describe('Title', () => {
  it('should be a string', () => {
    const x = new TitleField('hello')
    expect(x.fill('world')).toEqual(
      expect.objectContaining({
        title: expect.arrayContaining([
          expect.objectContaining({ text: expect.objectContaining({ content: 'world' }) }),
        ]),
      }),
    )
  })
})
