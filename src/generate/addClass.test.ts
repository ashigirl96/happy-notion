// tests/addClass.test.ts
import { describe, expect, it } from 'bun:test'
import { addClass } from '@/generate/addClass'
import { Project, ScriptTarget } from 'ts-morph'

describe('addClass Function', () => {
  it('should add a class with the specified properties and constructor', () => {
    // プロジェクトの初期化（メモリ上で）
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        target: ScriptTarget.ESNext,
        module: 1, // CommonJS
      },
    })

    // ソースファイルの作成（メモリ上に）
    const sourceFile = project.createSourceFile('testFile.ts', '', { overwrite: true })

    // addClass 関数の呼び出し
    addClass(sourceFile, {
      className: 'TestClass',
      envVar: 'TEST_ENV_VAR',
      fields: [
        { name: 'name', type: 'TextField' },
        { name: 'age', type: 'NumberField' },
      ],
    })

    // 生成されたクラスを取得
    const classDeclaration = sourceFile.getClass('TestClass')
    expect(classDeclaration).toBeDefined()

    if (classDeclaration) {
      // クラスがエクスポートされているか
      expect(classDeclaration.isExported()).toBe(true)

      // クラスの継承を確認
      expect(classDeclaration.getExtends()?.getText()).toBe('n.AbstractDatabase<TestClass>')

      // プロパティの確認
      const properties = classDeclaration.getProperties()
      expect(properties.length).toBe(3) // id, name, age

      // id プロパティの確認
      const idProperty = classDeclaration.getProperty('id')
      expect(idProperty).toBeDefined()
      expect(idProperty?.getInitializer()?.getText()).toBe("process.env.TEST_ENV_VAR ?? ''")

      // name プロパティの確認
      const nameProperty = classDeclaration.getProperty('name')
      expect(nameProperty).toBeDefined()
      expect(nameProperty?.getInitializer()?.getText()).toBe("new n.TextField('name')")

      // age プロパティの確認
      const ageProperty = classDeclaration.getProperty('age')
      expect(ageProperty).toBeDefined()
      expect(ageProperty?.getInitializer()?.getText()).toBe("new n.NumberField('age')")

      // コンストラクタの確認
      // biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
      const constructor = classDeclaration.getConstructors()[0]
      expect(constructor).toBeDefined()

      if (constructor) {
        // パラメータの確認
        const params = constructor.getParameters()
        expect(params.length).toBe(1)
        expect(params[0].getName()).toBe('client')
        expect(params[0].getType().getText()).toBe('Client')

        // コンストラクタ内のステートメント確認
        const statements = constructor
          .getBody()
          ?.getStatements()
          .map((stmt: { getText: () => any }) => stmt.getText())
        expect(statements).toContain('super(client)')

        // ドキュメントコメントの確認
        const docs = constructor.getJsDocs()
        expect(docs.length).toBe(1)
        expect(docs[0].getComment()).toBe(
          '// biome-ignore lint/complexity/noUselessConstructor: <explanation>',
        )
      }
    }
  })
})
