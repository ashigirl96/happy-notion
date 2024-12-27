import { Client } from '@notionhq/client'
import { type FindCriteria, RelationField, TextField } from './src'

const client = new Client({
  auth: process.env.NOTION_TOKEN,
})

const id = process.env.INPUT_DATABASE_ID ?? ''
export class Architecture {
  Title: TextField
  category: RelationField

  constructor() {
    this.Title = new TextField('title')
    this.category = new RelationField('category')
  }

  async findBy(criteria: FindCriteria<Architecture>) {
    console.dir(
      {
        database_id: id,
        filter: criteria.where,
      },
      { depth: null },
    )
    const response = await client.databases.query({
      database_id: id,
      // @ts-expect-error
      filter: criteria.where,
    })
    return response.results
  }
}

async function main() {
  const architecture = new Architecture()
  console.log(architecture.Title.contains('hello'))
  const results = await architecture.findBy({
    where: {
      and: [architecture.Title.contains('建築はどうして'), architecture.category.isNotEmpty()],
    },
  })
  console.log(results)
}

void main()
