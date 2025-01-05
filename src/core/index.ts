import type { DatabaseProperties, DatabaseProperty } from '@/core/types'
import { toNotionURL } from '@/core/utils'
import type { Chainable, FindCriteria, SaveCriteria } from '@/fields'
import { BaseField } from '@/fields/base'
import { kebabToCamel } from '@/generate/kebabToCamel'
import type { Client } from '@notionhq/client'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { ResultAsync, err, ok } from 'neverthrow'

type RawPage = Extract<QueryDatabaseResponse['results'][0], { object: 'page'; properties: any }>
type Page<T extends AbstractDatabase<T>> = RawPage & {
  properties: DatabaseProperties<T>
}

export abstract class AbstractDatabase<T extends AbstractDatabase<any>> {
  protected id!: string

  protected constructor(protected client: Client) {}

  private isProperty(key: string): key is DatabaseProperty<T> {
    return key in this && this[key] instanceof BaseField
  }

  /**
   * Notion ページをクエリして返す
   */
  findPagesBy(criteria: FindCriteria<T>): ResultAsync<Page<T>[], Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const response = await this.client.databases.query({
          database_id: this.id,
          filter: criteria.where,
        })
        const results = response.results.filter((r) => isPage(r))
        return results.map((result) => {
          const keys = Object.keys(result.properties)
            .map((v) => AbstractDatabase.mapPropertyName(v))
            .filter((v) => this.isProperty(v))

          const properties = keys.reduce(
            (acc, key) => {
              const field = this[key] as BaseField<any>
              acc[key] = field.map(result.properties[key])
              return acc
            },
            {} as Record<string, unknown>,
          )

          return {
            ...result,
            properties,
          } as Page<T>
        })
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  /**
   * 指定 ID のページを取得する
   */
  findPageById(id: string): ResultAsync<Page<T>, Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const response = await this.client.pages.retrieve({ page_id: id })
        if (response.object !== 'page' || !('properties' in response)) {
          throw new Error('Invalid response')
        }
        const keys = Object.keys(response.properties)
          .map((v) => AbstractDatabase.mapPropertyName(v))
          .filter((v) => this.isProperty(v))

        const properties = keys.reduce(
          (acc, key) => {
            const field = this[key] as BaseField<any>
            acc[key] = field.map(response.properties[key])
            return acc
          },
          {} as Record<string, unknown>,
        )

        return {
          ...response,
          properties,
        } as Page<T>
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  /**
   * A<=>B、B<=>C というように紐付いているとき、
   * A<=>C を自動的に紐付けられるようチェーンをつなぐメソッド
   */
  chain(criteria: Chainable<T>): ResultAsync<void, Error> {
    // ここでは `chain` 自体を async にせず、
    // 内部で async 関数を `ResultAsync.fromPromise` でラップする
    return this.findPagesBy({ where: criteria.where }).andThen((pages) => {
      return ResultAsync.fromPromise(
        (async () => {
          // 取得したページそれぞれに対して処理する
          for (const page of pages) {
            const middleId = last(page.properties[criteria.from.property] as unknown as string[])
            // from => middle => to で辿りつくページの ID を取得
            const toId = await this.findPageById(middleId).match(
              (middlePage) =>
                last(middlePage.properties[criteria.middle.property] as unknown as string[]),
              () => '',
            )
            // toId を A の対象プロパティに更新
            await this.client.pages.update({
              page_id: page.id,
              properties: {
                [criteria.to.property]: criteria.to.fill(toId),
              },
            })
          }
        })(),
        (e) => (e instanceof Error ? e : new Error(String(e))),
      )
    })
  }

  /**
   * ページを新規作成 or 更新し、その URL を返す
   */
  savePage(criteria: SaveCriteria<T>): ResultAsync<{ url: string }, Error> {
    return this.updateSelect(criteria)
      .andThen(() => this.existsPage(criteria))
      .andThen((existsResult) => {
        switch (existsResult.kind) {
          case 'create':
            return this.createPage(criteria)
          case 'update':
            return this.updatePage(criteria, existsResult.page.id)
          default:
            return ResultAsync.fromSafePromise(Promise.reject(new Error('Unexpected error')))
        }
      })
  }

  /**
   * where が指定されていない場合 -> 新規作成
   * where から検索して 0 件 -> create
   * where から検索して 1 件 -> update
   * where から検索して 複数件 -> エラー
   */
  private existsPage(
    criteria: SaveCriteria<T>,
  ): ResultAsync<{ kind: 'create' } | { kind: 'update'; page: RawPage }, Error> {
    // where がない場合
    if (!criteria.where) {
      return ResultAsync.fromSafePromise(Promise.resolve({ kind: 'create' }))
    }

    // where がある場合
    return this.findPagesBy({ where: criteria.where }).andThen((pages) => {
      if (pages.length === 0) {
        return ok({ kind: 'create' } as const)
      }
      if (pages.length === 1) {
        return ok({ kind: 'update', page: pages[0] } as const)
      }
      return err(new Error('Multiple pages found'))
    })
  }

  /**
   * ページを新規作成
   */
  private createPage(criteria: SaveCriteria<T>): ResultAsync<{ url: string }, Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const response = await this.client.pages.create({
          parent: {
            database_id: this.id,
          },
          icon: criteria.emoji
            ? {
                type: 'emoji',
                emoji: criteria.emoji,
              }
            : undefined,
          children: criteria.children,
          properties: criteria.properties,
        })
        return {
          url: toNotionURL(response.id),
        }
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  /**
   * ページを更新
   */
  private updatePage(
    criteria: SaveCriteria<T>,
    pageId: string,
  ): ResultAsync<{ url: string }, Error> {
    return ResultAsync.fromPromise(
      (async () => {
        const { options } = criteria
        const response = await this.client.pages.update({
          page_id: pageId,
          icon: criteria.emoji
            ? {
                type: 'emoji',
                emoji: criteria.emoji,
              }
            : undefined,
          properties: criteria.properties,
        })

        // オプションで children を追加するかどうか
        if (options?.isAppendChildren) {
          const shouldAppendChildren = await options.isAppendChildren(this.client, pageId)
          if (shouldAppendChildren && criteria.children) {
            await this.client.blocks.children.append({
              block_id: pageId,
              children: criteria.children,
            })
          }
        }

        return { url: toNotionURL(response.id) }
      })(),
      (e) => (e instanceof Error ? e : new Error(String(e))),
    )
  }

  private updateSelect(criteria: SaveCriteria<T>): ResultAsync<boolean, Error> {
    const _ = async () => {
      const response = await this.client.databases.retrieve({ database_id: this.id })
      const properties = response.properties
      for (const [key, value] of Object.entries(criteria.properties)) {
        const propertyKind = Object.keys(value)[0]
        if (propertyKind === 'select' && properties[key].type === 'select') {
          // @ts-expect-error
          properties[key].select.options = [...properties[key].select.options, value.select]
        } else if (propertyKind === 'multi_select' && properties[key].type === 'multi_select') {
          properties[key].multi_select.options = [
            ...properties[key].multi_select.options,
            // @ts-expect-error
            ...value.multi_select,
          ]
        }
      }
      await this.client.databases.update({
        database_id: this.id,
        properties,
      })
      return true
    }
    return ResultAsync.fromPromise(_(), (e) => (e instanceof Error ? e : new Error(String(e))))
  }

  static mapPropertyName(name: string): string {
    return kebabToCamel(name)
  }
}

function isPage(result: QueryDatabaseResponse['results'][0]): result is RawPage {
  return result.object === 'page' && 'properties' in result
}

function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
