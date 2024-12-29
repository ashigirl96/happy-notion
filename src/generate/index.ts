import { generateClasses } from '@/generate/generateClass'
import type { MappedConfig, NotionConfig } from '@/types'
import { Client } from '@notionhq/client'
// generate.ts
import {
  IndentationText,
  Project,
  QuoteKind,
  type SourceFile,
  VariableDeclarationKind,
} from 'ts-morph'

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
      moduleSpecifier: '@ashigirl96/happy-notion',
    },
  ])
  return sourceFile
}

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
    apiKey: raw.apiKey,
    client: new Client({ auth: evaluated.apiKey }),
  }
}

function addNotionClientStatement(sourceFile: SourceFile, apiKey: string) {
  sourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'client',
        initializer: `new Client({ auth: ${apiKey} })`,
      },
    ],
  })
}

function addExportDatabaseEntries(sourceFile: SourceFile, mapped: MappedConfig) {
  const entries = Object.entries(mapped.databases).map(([className]) => {
    return `${className}: new ${className}(client)`
  })

  sourceFile.addVariableStatement({
    isExported: true,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'databases',
        initializer: `{\n${entries.join(',\n')}\n}`,
      },
    ],
  })
}

export async function generate(raw: NotionConfig, evaluated: NotionConfig) {
  const sourceFile = initializeSourceFile()
  const mapped = mapConfig(raw, evaluated)
  await generateClasses(sourceFile, mapped)
  addNotionClientStatement(sourceFile, mapped.apiKey)
  addExportDatabaseEntries(sourceFile, mapped)
  sourceFile.saveSync()
  console.log(sourceFile.getFullText())
}
