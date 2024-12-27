import { Client } from '@notionhq/client'
import { AbstractDatabase, RelationField, TextField } from './src'

const client = new Client({
  auth: process.env.NOTION_TOKEN,
})

const id = process.env.INPUT_DATABASE_ID ?? ''
export class Architecture extends AbstractDatabase<Architecture> {
  title: TextField
  category: RelationField

  constructor(client: Client, id: string) {
    super(client, id)
    this.title = new TextField('title')
    this.category = new RelationField('category')
  }
}

async function main() {
  const architecture = new Architecture(client, id)
  const results = await architecture.findBy({
    where: {
      and: [architecture.title.contains('建築はどうして'), architecture.category.isNotEmpty()],
    },
  })
  console.log(results)
}

void main()
