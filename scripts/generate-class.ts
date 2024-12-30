#!/usr/bin/env bun

import * as path from 'node:path'
import { Project, type Type } from 'ts-morph'

// プロジェクトの初期化
const project = new Project({ })

// 解析対象のファイルパス
const inputFilePath = path.resolve(
  __dirname,
  '../node_modules/@notionhq/client/build/src/api-endpoints.d.ts',
)

// ファイルをプロジェクトに追加
const sourceFile = project.addSourceFileAtPath(inputFilePath)

// 出力ファイルの準備

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

  // フィルター型の詳細を取得
  const filterTypeDeclaration = sourceFile.getTypeAliasOrThrow(filterType).getType()

  // メソッドの生成
  const methods = generateMethods(filterTypeDeclaration, filterName, sourceFile)

  const outputFilePath = path.resolve(__dirname, `generated/${className}.ts`)
  const outputFile = project.createSourceFile(outputFilePath, '', { overwrite: true })

  // クラスの生成
  outputFile.addClass({
    name: className,
    isExported: true,
    properties: [
      {
        name: 'property',
        scope: 'private',
        isReadonly: true,
        type: 'string',
      },
    ],
    constructor: {
      parameters: [
        {
          name: 'property',
          type: 'string',
          scope: undefined,
          isReadonly: true,
          isPrivate: true,
        },
      ],
      statements: [],
    },
    methods: methods,
  })

  outputFile.saveSync()
}

// ヘルパー関数
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
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
    let methodName: string
    let _returnObject: any

    switch (propName) {
      case 'equals':
        methodName = 'equals'
        break
      case 'does_not_equal':
        methodName = 'doesNotEqual'
        break
      case 'contains':
        methodName = 'contains'
        break
      case 'does_not_contain':
        methodName = 'doesNotContain'
        break
      case 'starts_with':
        methodName = 'startsWith'
        break
      case 'ends_with':
        methodName = 'endsWith'
        break
      case 'is_empty':
        methodName = 'isEmpty'
        break
      case 'is_not_empty':
        methodName = 'isNotEmpty'
        break
      default:
        methodName = propName
    }

    // パラメータの有無
    const hasParam = propType.getText() !== 'true'

    // 戻り値のオブジェクト構造
    const _returnTypeObject: any = {
      [filterName]: {
        [propName]: hasParam ? '{value}' : true,
        property: 'this.property',
      },
    }

    // メソッドの生成
    if (hasParam) {
      methods.push({
        name: methodName,
        parameters: [{ name: 'value', type: propType.getText() }],
        returnType: 'any',
        statements: `return { ${filterName}: { ${propName}: value, property: this.property } };`,
      })
    } else {
      methods.push({
        name: methodName,
        parameters: [],
        returnType: 'any',
        statements: `return { ${filterName}: { ${propName}: true, property: this.property } };`,
      })
    }
  }

  return methods
}
