import { Client } from '@notionhq/client'
import { AbstractDatabase, RelationField, TextField } from './src'

export class Architecture extends AbstractDatabase<Architecture> {
  title = new TextField('title')
  category = new RelationField('category')

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(client: Client, id: string) {
    super(client, id)
  }
}

async function main() {
  const client = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const id = process.env.INPUT_DATABASE_ID ?? ''
  const architecture = new Architecture(client, id)
  const results = await architecture.findBy({
    where: {
      and: [architecture.title.contains('建築はどうして'), architecture.category.isNotEmpty()],
    },
  })
  console.log(results)
}

void main()
