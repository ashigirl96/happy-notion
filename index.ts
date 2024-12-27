import { Client } from '@notionhq/client'
import { AbstractDatabase, RelationField, TextField } from './src'
import { RichTextField } from './src/fields/rich-text'

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
    properties: {
      Name: word.Name.property('test'),
      pronunciation: word.pronunciation.property('test'),
    },
  })
}

void main()
