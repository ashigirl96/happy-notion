import { describe, expect, it } from 'bun:test'
import { AbstractDatabase } from '.'
import {
  CheckboxField,
  DateField,
  MultiSelectField,
  NumberField,
  PeopleField,
  RelationField,
  RichTextField,
  SelectField,
  StatusField,
  TitleField,
  UrlField,
} from '../fields'

function createMockClient({
  queryFn,
  createFn,
  appendFn,
  updateFn,
  retrieveFn,
  updateDatabaseFn,
  retrieveDatabaseFn,
}: {
  queryFn?: (args: any) => any
  createFn?: (args: any) => any
  updateFn?: (args: any) => any
  appendFn?: (args: any) => any
  retrieveFn?: (args: any) => any
  updateDatabaseFn?: (args: any) => any
  retrieveDatabaseFn?: (args: any) => any
}) {
  return {
    databases: {
      query: queryFn || (() => Promise.resolve({ results: [] })),
      update: updateDatabaseFn || (() => Promise.resolve({ id: 'updated-database-id' })),
      retrieve:
        retrieveDatabaseFn ||
        (() =>
          Promise.resolve({
            properties: {
              MultiSelect: {
                name: 'MultiSelect',
                type: 'multi_select',
                multi_select: {
                  options: [
                    {
                      name: 'test1',
                    },
                    {
                      name: 'test2',
                    },
                  ],
                },
              },
              Select: {
                name: 'Select',
                type: 'select',
                select: {
                  options: [
                    {
                      name: 'test1',
                    },
                    {
                      name: 'test2',
                    },
                  ],
                },
              },
            },
          })),
    },
    pages: {
      create: createFn || (() => Promise.resolve({ id: 'new-page-id' })),
      update: updateFn || (() => Promise.resolve({ id: 'updated-page-id' })),
      retrieve: retrieveFn || (() => Promise.resolve({})), // デフォルトは空オブジェクト返却
    },
    blocks: {
      children: {
        append: appendFn || (() => Promise.resolve()),
      },
    },
  }
}

class TestDatabase extends AbstractDatabase<TestDatabase> {
  id = 'test-database-id'
  Checkbox = new CheckboxField('Checkbox')
  URL = new UrlField('URL')
  Relation = new RelationField('Relation')
  Select = new SelectField('Select')
  Assigned = new PeopleField('Assigned')
  Status = new StatusField('Status')
  MultiSelect = new MultiSelectField('MultiSelect')
  Text = new RichTextField('Text')
  Number = new NumberField('Number')
  Date = new DateField('Date')
  Name = new TitleField('Name')

  /** biome-ignore lint/complexity/noUselessConstructor: <explanation> */
  constructor(client: any) {
    super(client)
  }
}

const mockCondition = {
  property: 'criteria',
  title: {
    contains: 'value',
  },
}

const mockResult = {
  object: 'page',
  properties: {
    x: 1,
  },
}

describe('AbstractDatabase', () => {
  it('findPageById: success', async () => {
    // retrieveが正常にpageを返すモック
    const mockClient = createMockClient({
      retrieveFn: () =>
        Promise.resolve({
          object: 'page',
          id: 'page-id-123',
          properties: {
            Checkbox: {
              type: 'checkbox',
              checkbox: true,
            },
          },
        }),
    })
    const db = new TestDatabase(mockClient as any)

    const result = await db.findPageById('page-id-123').match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )
    expect(result.id).toBe('page-id-123')
    expect(result.properties.Checkbox).toBe(true)
  })

  it('findPageById: error (invalid response)', async () => {
    // retrieveがpageオブジェクト以外を返すモック
    const mockClient = createMockClient({
      retrieveFn: () => Promise.resolve({ object: 'database' }),
    })
    const db = new TestDatabase(mockClient as any)

    await db.findPageById('invalid-page-id').match(
      (_okValue) => {
        throw new Error(`Should not return ok ${JSON.stringify(_okValue, null, 2)}`)
      },
      (errValue) => {
        expect(errValue.message).toBe('Invalid response')
      },
    )
  })

  it('should update pages via chain', async () => {
    // A, Bから middle を辿って to に紐付ける想定のモックデータ
    const mockPages = [
      {
        object: 'page',
        id: 'pageA',
        properties: {
          // from.property が Relation なら ["middle-id-1"] のように想定
          Relation: { relation: [{ id: 'middle-id-1' }] },
        },
      },
      {
        object: 'page',
        id: 'pageB',
        properties: {
          Relation: { relation: [{ id: 'middle-id-2' }] },
        },
      },
    ]
    const middlePages: Record<string, any> = {
      'middle-id-1': {
        object: 'page',
        id: 'middle-id-1',
        properties: {
          // middle.property も Relation として ["to-id-1"] を返すと仮定
          Relation: { relation: [{ id: 'to-id-1' }] },
        },
      },
      'middle-id-2': {
        object: 'page',
        id: 'middle-id-2',
        properties: {
          Relation: { relation: [{ id: 'to-id-2' }] },
        },
      },
    }

    // 手動モック: 呼ばれたときの引数を配列で保存しておき、後で検証する
    const updateCalls: any[] = []
    const updateFnMock = (args: any) => {
      updateCalls.push(args)
      return Promise.resolve({ id: args.page_id })
    }

    // モッククライアント生成
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve({ results: mockPages }),
      retrieveFn: (args) => Promise.resolve(middlePages[args.page_id]),
      updateFn: updateFnMock,
    })

    // テスト用DBインスタンス
    const db = new TestDatabase(mockClient as any)

    // chainで使用するcriteria
    const criteria = {
      where: db.Name.contains('some-value'),
      from: db.Relation, // Aから見た"中継先"のフィールド
      middle: db.Relation, // "中継先"から最終的につなぐ先に関するフィールド
      to: db.Relation, // Aに書き込む先のフィールド
    }

    // 実行
    await db.chain(criteria).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )

    // 呼ばれた回数・引数をテスト
    expect(updateCalls.length).toBe(2)

    // 1回目
    expect(updateCalls[0]).toEqual({
      page_id: 'pageA',
      properties: {
        Relation: { relation: [{ id: 'to-id-1' }] },
      },
    })
    // 2回目
    expect(updateCalls[1]).toEqual({
      page_id: 'pageB',
      properties: {
        Relation: { relation: [{ id: 'to-id-2' }] },
      },
    })
  })

  it('savePage: create (no existing page)', async () => {
    const mockClient = createMockClient({})
    const db = new TestDatabase(mockClient as any)

    const result = await db
      .savePage({
        where: db.Name.contains('test'),
        properties: {
          Select: db.Select.fill('added'),
          MultiSelect: db.MultiSelect.fill(['added1', 'added2']),
        },
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
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve({ results: [{ id: 'existing-page-id', ...mockResult }] }),
    })
    const db = new TestDatabase(mockClient as any)

    const result = await db
      .savePage({
        where: db.Name.contains('test'),
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
    const mockClient = createMockClient({
      queryFn: () =>
        Promise.resolve({
          results: [
            { id: 'page1', ...mockResult },
            { id: 'page2', ...mockResult },
          ],
        }),
    })
    const db = new TestDatabase(mockClient as any)

    // ここではエラーが返ってくることを検証
    await db
      .savePage({
        where: db.Name.contains('test'),
        properties: {},
      })
      .match(
        (_okValue) => {
          throw new Error(`Should not return ok ${JSON.stringify(_okValue, null, 2)}`)
        },
        (errValue) => {
          expect(errValue.message).toBe('Multiple pages found')
        },
      )
  })

  it('findBy: no results', async () => {
    const mockClient = createMockClient({})
    const db = new TestDatabase(mockClient as any)

    const result = await db.findPagesBy({ where: mockCondition }).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )
    expect(result).toEqual([])
  })

  it('findPagesBy works', async () => {
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve(mockResponse),
    })
    const db = new TestDatabase(mockClient as any)

    const results = await db.findPagesBy({ where: mockCondition }).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )
    const properties = results[0].properties

    expect(properties.Checkbox).toEqual(true)
    expect(properties.URL).toEqual('https://example.com')
    expect(properties.Relation).toEqual(['16c34b35-bfa4-8167-b767-e3b946e7a7ab'])
    expect(properties.Select).toEqual('test10')
    expect(properties.Assigned).toEqual('d7176521-3a9a-43d2-b9ed-56cc16cc85b0')
    expect(properties.Status).toEqual('In progress')
    expect(properties.MultiSelect).toEqual(['test1', 'test2', 'test3'])
    expect(properties.Text).toEqual('test3test4test5')
    expect(properties.Number).toEqual(10)
    expect(properties.Date.toISOString()).toEqual('2024-12-31T15:00:00.000Z')
    expect(properties.Name).toEqual('test1')
  })
})

const mockResponse = {
  results: [
    {
      object: 'page',
      id: '16c34b35-bfa4-812f-adc5-c275593d7f8f',
      created_time: '2024-12-30T06:18:00.000Z',
      last_edited_time: '2025-01-01T00:23:00.000Z',
      created_by: {
        object: 'user',
        id: '87bbabab-c7eb-478e-9c75-bc16bcbfad13',
      },
      last_edited_by: {
        object: 'user',
        id: 'd7176521-3a9a-43d2-b9ed-56cc16cc85b0',
      },
      cover: null,
      icon: null,
      parent: {
        type: 'database_id',
        database_id: '16c34b35-bfa4-8066-8824-f65284490271',
      },
      archived: false,
      in_trash: false,
      properties: {
        Checkbox: {
          id: 'ASB%60',
          type: 'checkbox',
          checkbox: true,
        },
        URL: {
          id: 'KV%3Cj',
          type: 'url',
          url: 'https://example.com',
        },
        Relation: {
          id: 'Re%5Bi',
          type: 'relation',
          relation: [
            {
              id: '16c34b35-bfa4-8167-b767-e3b946e7a7ab',
            },
          ],
          has_more: false,
        },
        Select: {
          id: 'Upgw',
          type: 'select',
          select: {
            id: '7e6e4934-7340-4c90-81a2-1fae4d395a06',
            name: 'test10',
            color: 'default',
          },
        },
        Assigned: {
          id: 'cUw%7B',
          type: 'people',
          people: [
            {
              object: 'user',
              id: 'd7176521-3a9a-43d2-b9ed-56cc16cc85b0',
            },
          ],
        },
        Status: {
          id: 'dgZD',
          type: 'status',
          status: {
            id: 'a494ba8f-8cb8-4f59-b89a-0b216d56f9d5',
            name: 'In progress',
            color: 'blue',
          },
        },
        MultiSelect: {
          id: 'jmNe',
          type: 'multi_select',
          multi_select: [
            {
              id: 'f28ab161-b99b-4d87-a6e2-60cb503e1fa5',
              name: 'test1',
              color: 'orange',
            },
            {
              id: '03d761f0-ce0c-442f-ba7f-9275b06b6397',
              name: 'test2',
              color: 'purple',
            },
            {
              id: '65ee496c-eb0b-408a-aaf8-fe48484285e6',
              name: 'test3',
              color: 'blue',
            },
          ],
        },
        Text: {
          id: 'mBY%3E',
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'test3',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'test3',
              href: null,
            },
            {
              type: 'text',
              text: {
                content: 'test4',
                link: null,
              },
              annotations: {
                bold: true,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'test4',
              href: null,
            },
            {
              type: 'text',
              text: {
                content: 'test5',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: true,
                code: false,
                color: 'default',
              },
              plain_text: 'test5',
              href: null,
            },
          ],
        },
        Number: {
          id: 'tQwi',
          type: 'number',
          number: 10,
        },
        Date: {
          id: '%7Bbhl',
          type: 'date',
          date: {
            start: '2025-01-01T00:00:00.000+09:00',
            end: null,
            time_zone: null,
          },
        },
        Name: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: 'test1',
                link: null,
              },
              annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              plain_text: 'test1',
              href: null,
            },
          ],
        },
      },
      url: 'https://www.notion.so/test1-16c34b35bfa4812fadc5c275593d7f8f',
      public_url: null,
    },
  ],
}
