#!/usr/bin/env bun

import * as fs from 'node:fs'
import * as path from 'node:path'
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
  .action((options) => {
    const configPath = path.resolve(process.cwd(), options.config)

    if (!fs.existsSync(configPath)) {
      console.error(`指定された設定ファイルが存在しません: ${configPath}`)
      process.exit(1)
    }

    const project = new Project({
      // tsconfig.json のパスを指定
      tsConfigFilePath: path.resolve(process.cwd(), 'tsconfig.json'),
      skipAddingFilesFromTsConfig: true,
    })

    const sourceFile = project.addSourceFileAtPath(configPath)

    // `config` 変数を探す
    const configVariable = sourceFile.getVariableDeclaration('config')

    if (!configVariable) {
      console.error('`config` 変数が見つかりませんでした。')
      process.exit(1)
    }

    // `config` のイニシャライザーがオブジェクトリテラルであることを確認
    const initializer = configVariable.getInitializer()

    if (!initializer || !initializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
      console.error('`config` の初期化がオブジェクトリテラルではありません。')
      process.exit(1)
    }

    // `databases` プロパティを取得
    const databasesProp = initializer
      .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getProperty('databases')

    if (!databasesProp || !databasesProp.isKind(SyntaxKind.PropertyAssignment)) {
      console.error('`databases` プロパティが見つかりませんでした。')
      process.exit(1)
    }

    // `databases` のイニシャライザーがオブジェクトリテラルであることを確認
    const databasesInitializer = databasesProp
      .asKindOrThrow(SyntaxKind.PropertyAssignment)
      .getInitializer()

    if (!databasesInitializer || !databasesInitializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
      console.error('`databases` の初期化がオブジェクトリテラルではありません。')
      process.exit(1)
    }

    // 抽出したいプロパティ名を指定
    const targetProps = ['Tasks', 'Projects', 'User']
    const result: Record<string, string> = {}

    const databasesObject = databasesInitializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression)

    for (const propName of targetProps) {
      const prop = databasesObject.getProperty(propName)
      if (prop?.isKind(SyntaxKind.PropertyAssignment)) {
        const value = prop.getInitializerOrThrow().getText()
        result[propName] = value
      } else {
        console.warn(`\`${propName}\` プロパティが見つかりませんでした。`)
      }
    }

    // API キーも抽出
    const apiKeyProp = initializer
      .asKindOrThrow(SyntaxKind.ObjectLiteralExpression)
      .getProperty('apiKey')

    if (apiKeyProp?.isKind(SyntaxKind.PropertyAssignment)) {
      const apiKeyValue = apiKeyProp.getInitializerOrThrow().getText()
      result.apiKey = apiKeyValue
    } else {
      console.warn('`apiKey` プロパティが見つかりませんでした。')
    }

    console.log(JSON.stringify(result, null, 2))
  })

// コマンドライン引数の解析
program.parse(process.argv)
