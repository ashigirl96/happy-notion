#!/usr/bin/env bun

import * as fs from 'node:fs'
import * as path from 'node:path'
import { generate } from '@/generate'
import { type NotionConfig, notionConfig } from '@/types'
import { Command } from 'commander'
import { Project, SyntaxKind } from 'ts-morph'

// CLI のセットアップ
const program = new Command()

program.name('notion-happy').description('Notion Config Extractor CLI').version('1.0.0')

// generate コマンドの定義
program
  .command('generate')
  .description('Generate configuration from notion.config.ts')
  .option('-c, --config <path>', 'Path to notion.config.ts', 'notion.config.ts')
  .action(async (options) => {
    const configPath = path.resolve(process.cwd(), options.config)

    if (!fs.existsSync(configPath)) {
      console.error(`指定された設定ファイルが存在しません: ${configPath}`)
      process.exit(1)
    }

    const tsConfigFilePath = path.resolve(process.cwd(), 'tsconfig.json')
    const project = new Project({
      tsConfigFilePath,
      skipAddingFilesFromTsConfig: true,
    })

    const config = require(configPath)
    const evaluatedConfig = notionConfig.safeParse(config.config)
    if (!evaluatedConfig.success) {
      console.error(config)
      console.error('Invalid configuration:', evaluatedConfig.error.errors)
      process.exit(1)
    }

    const sourceFile = project.addSourceFileAtPath(configPath)

    // `config` 変数を探す
    const configVariable = sourceFile.getVariableDeclaration('config')

    if (!configVariable) {
      console.error('Cloud not find `config` variable.')
      process.exit(1)
    }

    // `config` のイニシャライザーがオブジェクトリテラルであることを確認
    const initializer = configVariable.getInitializer()

    if (!initializer || !initializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
      console.error('The initializer of `config` is not an object literal.')
      process.exit(1)
    }

    // `databases` プロパティを取得
    const databasesProp = initializer
      .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getProperty('databases')

    if (!databasesProp || !databasesProp.isKind(SyntaxKind.PropertyAssignment)) {
      console.error('Could not find `databases` property.')
      process.exit(1)
    }

    // `databases` のイニシャライザーがオブジェクトリテラルであることを確認
    const databasesInitializer = databasesProp
      .asKindOrThrow(SyntaxKind.PropertyAssignment)
      .getInitializer()

    if (!databasesInitializer || !databasesInitializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
      console.error('The initializer of `databases` is not an object literal.')
      process.exit(1)
    }

    const result: NotionConfig = {
      databases: {},
      apiKey: '',
    }
    const databasesObject = databasesInitializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
    for (const prop of databasesObject.getProperties()) {
      if (prop?.isKind(SyntaxKind.PropertyAssignment)) {
        const propName = prop.getName()
        result.databases[propName] = prop.getInitializerOrThrow().getText()
      }
    }

    // API キーも抽出
    const apiKeyProp = initializer
      .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getProperty('apiKey')
    //
    if (apiKeyProp?.isKind(SyntaxKind.PropertyAssignment)) {
      result.apiKey = apiKeyProp.getInitializerOrThrow().getText()
    } else {
      console.warn('Could not find `apiKey` property.')
    }

    const rawConfig = notionConfig.safeParse(result)
    if (!rawConfig.success) {
      console.error('Invalid configuration:', rawConfig.error.errors)
      process.exit(1)
    }
    await generate(rawConfig.data, evaluatedConfig.data)
  })

// コマンドライン引数の解析
program.parse(process.argv)
