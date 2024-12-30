import {} from '@sota1235/notion-sdk-js-helper'
import { richText } from '@sota1235/notion-sdk-js-helper/dist/richTextObject'
import { databases } from './generated'

async function create() {
  const response = await databases.Tasks.savePage({
    properties: {
      Name: databases.Tasks.Name.fill({ text: 'test1', annotation: { bold: true } }),
      Text: {
        rich_text: [richText('test3', { underline: true }), richText('test4', { underline: true })],
      },
    },
  })
  if (response.isOk()) {
    console.log(response.value)
  }

  richText('test1', {})
}

async function findBy() {
  const response = await databases.Tasks.findBy({
    where: databases.Tasks.Name.contains('test1'),
  })
  if (response.isOk()) {
    console.log(response.value)
  }
}

void create()
// void findBy()
