import { generate } from './src'

generate()

// import { Client } from '@notionhq/client'
// import * as n from './src'
//
// export class Architecture extends n.AbstractDatabase<Architecture> {
//   id = process.env.INPUT_DATABASE_ID ?? ''
//   title = new n.TextField('title')
//   outputs = new n.RelationField('outputs')
//
//   // biome-ignore lint/complexity/noUselessConstructor: <explanation>
//   constructor(client: Client) {
//     super(client)
//   }
// }
//
// export class Word extends n.AbstractDatabase<Word> {
//   id = process.env.WORD_DATABASE_ID ?? ''
//   Name = new n.TextField('Name')
//   pronunciation = new n.RichTextField('pronunciation')
//   type = new n.SelectField('type')
//   ref = new n.UrlField('ref')
//
//   // biome-ignore lint/complexity/noUselessConstructor: <explanation>
//   constructor(client: Client) {
//     super(client)
//   }
// }
//
// export class Daily extends n.AbstractDatabase<Daily> {
//   id = process.env.DAILY_DATABASE_ID ?? ''
//   Categories = new n.MultiSelectField('Categories')
//
//   // biome-ignore lint/complexity/noUselessConstructor: <explanation>
//   constructor(client: Client) {
//     super(client)
//   }
// }
//
// const client = new Client({ auth: process.env.NOTION_TOKEN })
// export const databases = {
//   architecture: new Architecture(client),
//   word: new Word(client),
//   daily: new Daily(client),
// }
//
// async function main() {
//   await databases.word.savePage({
//     emoji: '📚',
//     // update: {
//     //   pageId: '16b34b35bfa48025b1f4e2ec6a5063db',
//     //   isAppendChildren: async (client) => {
//     //     const blocks = await client.blocks.children.list({
//     //       block_id: '16b34b35bfa48025b1f4e2ec6a5063db',
//     //     })
//     //     return blocks.results.length < 3
//     //   },
//     // },
//     children: [
//       {
//         object: 'block',
//         type: 'paragraph',
//         paragraph: {
//           rich_text: [
//             {
//               type: 'text',
//               text: {
//                 content: 'test',
//               },
//             },
//           ],
//         },
//       },
//     ],
//     properties: {
//       Name: databases.word.Name.property('test'),
//       ref: databases.word.ref.property('https://example.com'),
//     },
//   })
// }
//
// void main()
