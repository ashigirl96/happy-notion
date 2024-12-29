import { describe, expect, it } from 'bun:test'
import { AbstractDatabase } from '.'

function createMockClient(
  queryFn?: (args: any) => any,
  createFn?: (args: any) => any,
  updateFn?: (args: any) => any,
  appendFn?: (args: any) => any,
) {
  return {
    databases: {
      query: queryFn || (() => Promise.resolve({ results: [] })),
    },
    pages: {
      create: createFn || (() => Promise.resolve({ id: 'new-page-id' })),
      update: updateFn || (() => Promise.resolve({ id: 'updated-page-id' })),
    },
    blocks: {
      children: {
        append: appendFn || (() => Promise.resolve()),
      },
    },
  }
}

class TestDatabase extends AbstractDatabase<any> {
  constructor(client: any) {
    super(client)
    this.id = 'test-database-id'
  }
}

const mockCondition = {
  property: 'criteria',
  title: {
    contains: 'value',
  },
}

describe('AbstractDatabase', () => {
  it('findBy: no results', async () => {
    const mockClient = createMockClient()
    const db = new TestDatabase(mockClient as any)

    const result = await db.findBy({ where: mockCondition }).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )
    expect(result).toEqual([])
  })

  it('savePage: create (no existing page)', async () => {
    const mockClient = createMockClient()
    const db = new TestDatabase(mockClient as any)

    const result = await db
      .savePage({
        where: { where: mockCondition }, // ここに where があるので一応検索は行われるが mock で0件
        properties: {},
      })
      .match(
        (okValue) => okValue,
        (errValue) => {
          throw errValue
        },
      )
    expect(result.url).toBe('https://www.notion.so/newpageid')
  })

  it('savePage: update (single existing page)', async () => {
    // queryで1件返す mockClient
    const mockClient = createMockClient(() =>
      Promise.resolve({ results: [{ id: 'existing-page-id' }] }),
    )
    const db = new TestDatabase(mockClient as any)

    const result = await db
      .savePage({
        where: { where: mockCondition },
        properties: {},
        options: {
          isAppendChildren: async () => false,
        },
      })
      .match(
        (okValue) => okValue,
        (errValue) => {
          throw errValue
        },
      )
    expect(result.url).toBe('https://www.notion.so/updatedpageid')
  })

  it('savePage: error (multiple pages)', async () => {
    // queryで2件返す mockClient
    const mockClient = createMockClient(() =>
      Promise.resolve({ results: [{ id: 'page1' }, { id: 'page2' }] }),
    )
    const db = new TestDatabase(mockClient as any)

    // ここではエラーが返ってくることを検証
    await db
      .savePage({
        where: { where: mockCondition },
        properties: {},
      })
      .match(
        (_okValue) => {
          throw new Error('Should not return ok')
        },
        (errValue) => {
          expect(errValue.message).toBe('Multiple pages found')
        },
      )
  })
})
