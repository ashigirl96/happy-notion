// クラス定義の関数
import type { SourceFile } from 'ts-morph'

export function addClass(
  sourceFile: SourceFile,
  options: {
    className: string
    envVar: string
    fields: { name: string; type: string }[]
  },
) {
  const { className, envVar, fields } = options
  sourceFile.addClass({
    name: className,
    isExported: true,
    extends: `n.AbstractDatabase<${className}>`,
    properties: [
      {
        name: 'id',
        initializer: envVar,
        isPublic: true,
      },
      ...fields.map((field) => ({
        name: field.name,
        initializer: `new n.${field.type}('${field.name}')`,
        isPublic: true,
      })),
    ],
    ctors: [
      {
        parameters: [
          {
            name: 'client',
            type: 'Client',
          },
        ],
        statements: ['super(client)'],
        docs: ['biome-ignore lint/complexity/noUselessConstructor: <explanation>'],
      },
    ],
  })
}
