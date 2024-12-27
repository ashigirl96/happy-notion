import { Client } from '@notionhq/client'
import {
  AbstractDatabase,
  MultiSelectField,
  RelationField,
  RichTextField,
  SelectField,
  TextField,
  UrlField,
} from './src'

export class Architecture extends AbstractDatabase<Architecture> {
  id = process.env.INPUT_DATABASE_ID ?? ''
  title = new TextField('title')
  outputs = new RelationField('outputs')

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(client: Client) {
    super(client)
  }
}

export class Word extends AbstractDatabase<Word> {
  id = process.env.WORD_DATABASE_ID ?? ''
  Name = new TextField('Name')
  pronunciation = new RichTextField('pronunciation')
  type = new SelectField('type')
  ref = new UrlField('ref')

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(client: Client) {
    super(client)
  }
}

export class Daily extends AbstractDatabase<Daily> {
  id = process.env.DAILY_DATABASE_ID ?? ''
  Categories = new MultiSelectField('Categories')

  // biome-ignore lint/complexity/noUselessConstructor: <explanation>
  constructor(client: Client) {
    super(client)
  }
}

async function main() {
  const client = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  // const architecture = new Architecture(client)
  // const results = await architecture.findBy({
  //   where: {
  //     ...architecture.outputs.isEmpty(),
  //     // and: [architecture.title.contains('建築はどうして'), architecture.outputs.isNotEmpty()],
  //   },
  // })
  // console.dir(results, { depth: null })
  const word = new Word(client)
  await word.save({
    emoji: '📚',
    children: [
      {
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'test',
              },
            },
          ],
        },
      },
    ],
    properties: {
      Name: word.Name.property('test'),
      ref: word.ref.property('https://example.com'),
    },
  })
}

void main()
