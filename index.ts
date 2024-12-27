import { Client } from '@notionhq/client'
import { AbstractDatabase, RelationField, TextField } from './src'

export class Architecture extends AbstractDatabase<Architecture> {
  id = process.env.INPUT_DATABASE_ID ?? ''
  title = new TextField('title')
  category = new RelationField('category')

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(client: Client) {
    super(client)
  }
}

async function main() {
  const client = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const architecture = new Architecture(client)
  const results = await architecture.findBy({
    where: {
      and: [architecture.title.contains('建築はどうして'), architecture.category.isNotEmpty()],
    },
  })
  console.log(results)
}

void main()
