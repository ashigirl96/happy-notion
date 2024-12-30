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
      const typeAlias = declarations[0].getType().getAliasSymbol()
      const initializer = declarations[0].getType().getLiteralValue()
      if (typeof initializer === 'string') {
        typeValue = initializer
      }
    }
  }

  // typeが指定されていない場合はデフォルトのクラス名を使用
  const className = typeValue ? `${toPascalCase(typeValue)}Field` : 'UnknownField'

  // 対応するフィルターのプロパティ名と型を取得
  const filterProperty = properties.find(
    (p) => p.getName() !== 'property' && p.getName() !== 'type',
  )
  if (!filterProperty) continue

  const filterName = filterProperty.getName()
  const filterTypeSymbol = filterProperty.getTypeAtLocation(sourceFile).getAliasSymbol()
  let filterTypeText: string
  if (filterTypeSymbol && filterTypeSymbol.getDeclarations().length > 0) {
    filterTypeText = filterTypeSymbol.getDeclarations()[0].getType().getText()
  } else {
    filterTypeText = filterProperty.getType().getText()
  }

  // フィルター型の詳細を取得
  const filterTypeDeclaration = sourceFile.getTypeAliasOrThrow(filterTypeText).getType()

  // メソッドの生成
  const methods = generateMethods(filterTypeDeclaration, filterName, sourceFile)

  const outputFilePath = path.resolve(__dirname, `generated/${className}.ts`)
  const outputFile = project.createSourceFile(outputFilePath, '', { overwrite: true })

  // クラスの生成
  outputFile.addClass({
    name: className,
    isExported: true,
    // プロパティの定義を削除し、コンストラクタ引数に修飾子を追加
    ctors: [
      {
        parameters: [
          {
            name: 'property',
            type: 'string',
            isReadonly: true,
            hasQuestionToken: false,
            scope: undefined,
          },
        ],
        statements: ['super()'],
      }
    ],
    methods: methods,
  })

  // ファイルの保存
  outputFile.saveSync()
}

// ヘルパー関数
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function generateMethods(filterType: Type, filterName: string, sourceFile: any) {
  const methods: any[] = []

  for (const subType of filterType.getUnionTypes()) {
    if (!subType.isObject()) continue

    const properties = subType.getProperties()
    if (properties.length === 0) continue

    const prop = properties[0]
    const propName = prop.getName()
    const propType = prop.getTypeAtLocation(sourceFile)

    // メソッド名の決定
    let methodName = toPascalCase(propName).charAt(0).toLowerCase() + toPascalCase(propName).slice(1)

    // パラメータの有無
    const hasParam = propType.getText() !== 'true'

    // 戻り値のオブジェクト構造
    // 例: { title: { equals: value, property: this.property } }
    let returnStatement: string
    if (hasParam) {
      returnStatement = `return { ${filterName}: { ${propName}: value, property: this.property } };`
    } else {
      returnStatement = `return { ${filterName}: { ${propName}: true, property: this.property } };`
    }

    // メソッドの生成
    if (hasParam) {
      methods.push({
        name: methodName,
        parameters: [{ name: 'value', type: propType.getText() }],
        statements: returnStatement,
      })
    } else {
      methods.push({
        name: methodName,
        parameters: [],
        statements: returnStatement,
      })
    }
  }

  return methods
}
