#!/usr/bin/env bun

import * as fs from 'node:fs'
import * as path from 'node:path'
import { Project, StructureKind, type Type } from 'ts-morph'

// プロジェクトの初期化
const project = new Project({})

// 解析対象のファイルパス
const inputFilePath = path.resolve(
  __dirname,
  '../node_modules/@notionhq/client/build/src/api-endpoints.d.ts',
)

// ファイルをプロジェクトに追加
const sourceFile = project.addSourceFileAtPath(inputFilePath)

// 出力ディレクトリの作成（存在しない場合）
const outputDir = path.resolve(__dirname, 'generated')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

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
    // @ts-expect-error
    filterTypeText = filterProperty.getType().getText()
  }

  // フィルター型の詳細を取得
  const filterTypeDeclaration = sourceFile.getTypeAliasOrThrow(filterTypeText).getType()

  // メソッドと型の生成
  const { methods, typeDefinitions } = generateMethods(className, filterTypeDeclaration, filterName)

  const outputFilePath = path.resolve(__dirname, `generated/${className}.ts`)
  const outputFile = project.createSourceFile(outputFilePath, '', { overwrite: true })

  // BaseFieldのインポートを追加
  outputFile.addImportDeclaration({
    namedImports: ['BaseField', 'type FillValue'],
    moduleSpecifier: '@/fields/base',
  })

  // 型定義の追加
  for (const typeDef of typeDefinitions) {
    outputFile.addTypeAlias(typeDef)
  }

  // クラスの生成
  outputFile.addClass({
    name: className,
    isExported: true,
    extends: `BaseField<"${typeValue}">`,
    ctors: [
      {
        parameters: [
          {
            name: 'property',
            type: 'string',
            hasQuestionToken: false,
            isReadonly: true,
          },
        ],
        statements: ['super()'],
      },
    ],
    methods: methods,
  })

  // 条件型の生成
  if (typeDefinitions.length > 0) {
    const conditionTypeName = `${className}Condition`
    const conditionType = {
      name: conditionTypeName,
      isExported: true,
      type: typeDefinitions.map((typeDef) => typeDef.name).join(' | '),
    }
    outputFile.addTypeAlias(conditionType)
  }

  // ファイルの保存
  outputFile.saveSync()
}

// ヘルパー関数
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

function generateMethods(className: string, filterType: Type, filterName: string) {
  const methods: any[] = []
  const typeDefinitions: any[] = []

  methods.push({
    kind: StructureKind.Method,
    name: 'fill',
    returnType: `FillValue<'${filterName}'>`,
    parameters: [{ name: 'value', type: 'unknown' }],
    statements: `return { ${filterName}: value }`,
  })

  for (const subType of filterType.getUnionTypes()) {
    if (!subType.isObject()) continue

    const properties = subType.getProperties()
    if (properties.length === 0) continue

    const prop = properties[0]
    const propName = prop.getName()
    const declarations = prop.getDeclarations()
    if (declarations.length === 0) continue // 宣言が存在しない場合はスキップ

    // 宣言から型を取得
    const propType = declarations[0].getType()

    if (
      !(
        propType.isString() ||
        propType.isNumber() ||
        propType.isBoolean() ||
        propType.getText() === 'true'
      )
    ) {
      // プリミティブ型でない場合、メソッドと型定義を生成しない
      continue
    }

    // メソッド名の決定（camelCaseに変換）
    const methodName = toCamelCase(propName)

    // パラメータの有無
    const hasParam = propType.getText() !== 'true'

    // 型名の決定
    const typeName = `${className}${toPascalCase(propName)}`

    // 戻り値の型定義
    const typeAlias = hasParam
      ? {
          name: typeName,
          isExported: true,
          type: `{ property: string; ${filterName}: { ${propName}: ${propType.getText()} } }`,
        }
      : {
          name: typeName,
          isExported: true,
          type: `{ property: string; ${filterName}: { ${propName}: true } }`,
        }

    typeDefinitions.push(typeAlias)

    // 戻り値の型名
    const returnType = typeName

    // 戻り値のオブジェクト構造
    const returnStatement = hasParam
      ? `return { property: this.property, ${filterName}: { ${propName}: value } };`
      : `return { property: this.property, ${filterName}: { ${propName}: true } };`

    // メソッドの生成
    const method = {
      kind: StructureKind.Method,
      name: methodName,
      returnType: returnType,
      parameters: hasParam ? [{ name: 'value', type: propType.getText() }] : [],
      statements: returnStatement,
    }

    methods.push(method)
  }

  return { methods, typeDefinitions }
}
