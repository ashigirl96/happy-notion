#!/usr/bin/env bun

import * as path from 'node:path'
import { Project, type Type } from 'ts-morph'

// プロジェクトの初期化
const project = new Project({
})

// 解析対象のファイルパス
const inputFilePath = path.resolve(
  __dirname,
  '../node_modules/@notionhq/client/build/src/api-endpoints.d.ts',
)

// ファイルをプロジェクトに追加
const sourceFile = project.addSourceFileAtPath(inputFilePath)

// 出力ファイルの準備
const outputFilePath = path.resolve(__dirname, 'generatedClasses.ts')
const outputFile = project.createSourceFile(outputFilePath, '', { overwrite: true })

// PropertyFilter型の取得
const propertyFilterType = sourceFile.getTypeAliasOrThrow('PropertyFilter').getType()

// ユニオンの各メンバーを処理
for (const unionType of propertyFilterType.getUnionTypes()) {
  // 各ユニオン型がオブジェクト型であることを確認
  if (!unionType.isObject()) continue

  const properties = unionType.getProperties()
  const typeProperty = properties.find((p) => p.getName() === 'type')
  const propertyProperty = properties.find((p) => p.getName() === 'property')

  if (!propertyProperty) continue

  // typeプロパティが存在し、リテラル型であることを確認
  let typeValue: string | undefined
  if (typeProperty) {
    const declarations = typeProperty.getDeclarations()
    if (declarations.length > 0) {
      const initializer = (declarations[0].getType() as Type).getLiteralValue()
      if (typeof initializer === 'string') {
        typeValue = initializer
      }
    }
  }

  // typeが指定されていない場合はデフォルトのクラス名を使用
  const className = typeValue ? `${toPascalCase(typeValue)}Field` : 'UnknownField'

  // propertyプロパティの型を取得
  const _propertyType = unionType.getProperty('property')?.getTypeAtLocation(sourceFile)
  // 通常はstringなのでスキップ

  // 対応するフィルターのプロパティ名と型を取得
  const filterProperty = properties.find(
    (p) => p.getName() !== 'property' && p.getName() !== 'type',
  )
  if (!filterProperty) continue

  const filterName = filterProperty.getName()
  const filterType =
    filterProperty
      .getTypeAtLocation(sourceFile)
      .getAliasSymbol()
      ?.getDeclarations()[0]
      .getType()
      .getText() || filterProperty.getType().getText()

  // Generating class TitleField
  //   - Filter name: title
  //   - Filter type: TextPropertyFilter
  console.log(`Generating class ${className}`)
  console.log(`  - Filter name: ${filterName}`)
  console.log(`  - Filter type: ${filterType}`)
}

// ヘルパー関数
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}
