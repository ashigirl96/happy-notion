import { generateClasses } from '@/generate/generateClass'
import type { MappedConfig, NotionConfig } from '@/types'
import { Client } from '@notionhq/client'
// generate.ts
import { IndentationText, Project, QuoteKind } from 'ts-morph'

function initializeSourceFile() {
  const tsConfigFilePath = require.resolve('../../tsconfig.json')
  const project = new Project({
    tsConfigFilePath,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      quoteKind: QuoteKind.Single,
    },
  })

  const sourceFile = project.createSourceFile('generated.ts', '', { overwrite: true })
  // add import statements
  sourceFile.addImportDeclarations([
    {
      namedImports: ['Client'],
      moduleSpecifier: '@notionhq/client',
    },
    {
      namespaceImport: 'n',
      moduleSpecifier: './src',
    },
  ])
  return sourceFile
}

// addClass('Word', 'Word', 'WORD_DATABASE_ID', [
//   { name: 'Name', type: 'TextField' },
//   { name: 'pronunciation', type: 'RichTextField' },
//   { name: 'type', type: 'SelectField' },
//   { name: 'ref', type: 'UrlField' },
// ])
//
// addClass('Daily', 'Daily', 'DAILY_DATABASE_ID', [{ name: 'Categories', type: 'MultiSelectField' }])
//
// // クライアントの作成と databases オブジェクトのエクスポート
// sourceFile.addStatements(`
// const client = new Client({ auth: process.env.NOTION_TOKEN })
// export const databases = {
//   architecture: new Architecture(client),
//   word: new Word(client),
//   daily: new Daily(client),
// }
// `)
//
// // ファイルの保存
// sourceFile.saveSync()
//
// console.log('TypeScript ファイルが生成されました: generated.ts')

function mapConfig(raw: NotionConfig, evaluated: NotionConfig): MappedConfig {
  return {
    databases: Object.fromEntries(
      Object.entries(raw.databases).map(([key, value]) => [
        key,
        {
          raw: value,
          evaluated: evaluated.databases[key],
        },
      ]),
    ),
    client: new Client({ auth: evaluated.apiKey }),
  }
}

export async function generate(raw: NotionConfig, evaluated: NotionConfig) {
  const sourceFile = initializeSourceFile()
  const mapped = mapConfig(raw, evaluated)
  await generateClasses(sourceFile, mapped)
  console.log(sourceFile.getFullText())
}
