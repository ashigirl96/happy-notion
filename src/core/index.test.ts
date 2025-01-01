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
}: {
  queryFn?: (args: any) => any
  createFn?: (args: any) => any
  updateFn?: (args: any) => any
  appendFn?: (args: any) => any
}) {
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

describe('AbstractDatabase', () => {
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

  it('savePage: create (no existing page)', async () => {
    const mockClient = createMockClient({})
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
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve({ results: [{ id: 'existing-page-id' }] }),
    })
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
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve({ results: [{ id: 'page1' }, { id: 'page2' }] }),
    })
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

  it('_findPagesBy', async () => {
    const mockClient = createMockClient({
      queryFn: () => Promise.resolve(mockResponse),
    })
    const db = new TestDatabase(mockClient as any)

    const result = await db._findPagesBy({ where: mockCondition }).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )

    console.log(result)
  })
})

const mockResponse = {
  results: [
    {
      object: 'page',
      id: '16c34b35-bfa4-812f-adc5-c275593d7f8f',
      created_time: '2024-12-30T06:18:00.000Z',
      last_edited_time: '2024-12-30T06:18:00.000Z',
      created_by: {
        object: 'user',
        id: '87bbabab-c7eb-478e-9c75-bc16bcbfad13',
      },
      last_edited_by: {
        object: 'user',
        id: '87bbabab-c7eb-478e-9c75-bc16bcbfad13',
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
          relation: [],
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
          people: [],
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
              id: 'd4d16023-5c43-4ba4-9b5b-84c15d711b28',
              name: 'test10',
              color: 'gray',
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
