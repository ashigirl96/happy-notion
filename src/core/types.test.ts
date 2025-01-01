import { describe, it } from 'bun:test'
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
import { AbstractDatabase } from './index'
import type { DatabaseProperties } from './types'

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

describe('DatabaseProperties', () => {
  it('works', () => {
    const db = new TestDatabase(null)
    const result = await db._findPagesBy({ where: db.URL.contains('x') }).match(
      (okValue) => okValue,
      (errValue) => {
        throw errValue
      },
    )
    result[0].properties.Date

    type Hoge = DatabaseProperties<TestDatabase>
    const x: Hoge = {
      URL: 'string',
      Select: 'hoge',
      Checkbox: true,
      Relation: [],
    }
    // type Hoge = ReturnType<typeof db.Checkbox.map>
    // expectTypeOf(db).toEqualTypeOf<DatabaseProperties<TestDatabase>>()
  })
})
