import { describe, it } from 'bun:test'
import { TextField } from './text'

describe('Title', () => {
  it('should be a string', () => {
    const x = new TextField('hello')
    console.log(x)
  })
})
